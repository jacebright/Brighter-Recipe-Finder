import { checkIfNA, displayModal } from "./recipeModal.mjs";
const dialog = document.querySelector("dialog");
const closeButton = document.querySelector("dialog button");

// run the Recipe finder API
const recipeOptions = {
    method: "GET",
    headers: {
        "x-rapidapi-key": "23254c5730msh5fd0181328cd6c3p1116a7jsn3eca1c27c4cd",
        "x-rapidapi-host": "tasty.p.rapidapi.com"
    }
};

// fetch the data from the api and then leverage it to populate the cards and modal
export function findRecipes(foods) {
    fetch(`https://tasty.p.rapidapi.com/recipes/list?from=0&size=12&q=${foods}`, recipeOptions)
        .then(res => res.json())
        .then(data => {jsonToHTML(data); console.log(data);})
        .catch(error => console.error(error));

}

function jsonToHTML(json) {
    const cards = document.getElementById("cards");
    cards.innerHTML = "";
    json.results.forEach(object => {
        // create html elements
        const card = document.createElement("div");
        card.classList.add("card");

        // The many divs are for the card flip effect
        const content = document.createElement("div");
        const innerDiv = document.createElement("div");
        const frontDiv = document.createElement("div");
        const backDiv = document.createElement("div");
        const recipeName = document.createElement("h3");
        const image = document.createElement("img");
        const button = document.createElement("button");
        const time = document.createElement("h4");
        const calories = document.createElement("h4");
        const rating = document.createElement("h4");

        content.classList.add("flip-card");
        innerDiv.classList.add("flip-card-inner");
        frontDiv.classList.add("flip-card-front");
        backDiv.classList.add("flip-card-back");

// parse the information from json to the proper elements
        recipeName.innerHTML = object.name;
        time.innerHTML = checkIfZero(object.total_time_minutes, "minutes");
        calories.innerHTML = checkIfZero(object.nutrition.calories, "calories");
        rating.innerHTML = addRating(object.user_ratings.score);        

        image.setAttribute("src", object.thumbnail_url);
        image.setAttribute("alt", object.name);
        image.classList.add("cardImg");

        button.innerHTML = "Make This Recipe!";
        button.addEventListener("click", () => {
            displayModal(object, dialog);
        });
        button.classList.add("btn");
        button.classList.add("btn-primary");


        frontDiv.appendChild(image);
        backDiv.appendChild(recipeName);
        backDiv.appendChild(time);
        backDiv.appendChild(calories);
        backDiv.appendChild(rating);
        backDiv.appendChild(button);
        innerDiv.appendChild(frontDiv);
        innerDiv.appendChild(backDiv);
        content.appendChild(innerDiv);
        card.appendChild(content);
        cards.appendChild(card);
    });
}

// close the dialog box
closeButton.addEventListener("click", () => {
    dialog.close();
})


// helper functions to avoid displaying null or missing data
function checkIfNull(object){
    if (object == null) {
        return "";
    }
    else return object;
}

function checkIfZero(object, units){
    if (checkIfNA(checkIfNull(object)) == "0" || checkIfNA(checkIfNull(object)) == "") {
        return "";
    } else return `${object} ${units}`;
}

function addRating(object){
    if (checkIfNA(checkIfNull(object)) == "0" || checkIfNA(checkIfNull(object)) == "") {
        return "";
    } else return `Rating: ${(parseFloat(object) * 5).toFixed(1)} Stars`;
}
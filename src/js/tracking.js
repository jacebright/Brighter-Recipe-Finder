import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

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

function findRecipes(foods) {
    fetch(`https://tasty.p.rapidapi.com/recipes/list?from=0&size=8&q=${foods}`, recipeOptions)
        .then(res => res.json())
        .then(data => jsonToHTML(data))
        .catch(error => console.error(error));
}

// run the nutritional fetching api
const nutritionOptions = {
    method: "GET",
    headers: {
        "x-rapidapi-key": "23254c5730msh5fd0181328cd6c3p1116a7jsn3eca1c27c4cd",
        "x-rapidapi-host": "nutrition-by-api-ninjas.p.rapidapi.com"
    }
};

// convert a string to query format
function stringToQuery(string) {
    return string.replace(/\s/g, "%20");
}

// if the submit button is pressed, submit the string to the nutrition api
document.getElementById("search").addEventListener("click", () => {
    const input = document.getElementById("foodSearch").value;
    const foods = stringToQuery(input);

    fetch(`https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition?query=${foods}`, nutritionOptions)
        .then(res => res.json())
        .then(data => findRecipes(getNames(data)))
        .catch(error => console.error(error));
})

// get the name of each food
function getNames(json){
    let names = "";
    json.forEach(object => {
        names = names + "," + object.name;
    });
    return names;
}

function jsonToHTML(json){
    const cards = document.getElementById("cards");
    cards.innerHTML = "";
    json.results.forEach(object => {
        // create html elements
        const card = document.createElement("section");
        card.classList.add("card");
        card.setAttribute("style", "width: 18rem;");

        const content = document.createElement("div");
        const recipeName = document.createElement("h3");
        const image = document.createElement("img");
        const button = document.createElement("button");
        const time = document.createElement("p");

        recipeName.innerHTML = object.name;
        recipeName.classList.add("card-title")

        content.classList.add("card-body");

        image.setAttribute("src", object.thumbnail_url);
        image.setAttribute("alt", object.name);
        image.classList.add("card-img-top");

        button.innerHTML = "Make This Recipe!";
        button.addEventListener("click", () => {
            displayModal(object);
        });
        button.classList.add("btn");
        button.classList.add("btn-primary");

        card.appendChild(image);
        content.appendChild(recipeName);
        content.appendChild(button);
        card.appendChild(content);

        cards.appendChild(card);
    });
} 

// fill the modal with the instructions and show it
function displayModal(object){
    const instructions = object.instructions;
    
    const element = document.getElementById("instructions");
    element.innerHTML = "";

    const ingrDiv = ingredientDisplay(object.sections);
    const instDiv = instructionDisplay(object.instructions);
    
    element.appendChild(ingrDiv);
    element.appendChild(instDiv);

    dialog.showModal();
}

function instructionDisplay(instructions){
    const div = document.createElement("div");

    const heading = document.createElement("h3");
    heading.innerHTML = "Instructions:"
    div.appendChild(heading);

    instructions.forEach(instruction => {
        const description = document.createElement("p");
        description.innerHTML = `${instruction.position}. ${instruction.display_text}`;
        
        div.appendChild(description);
    });
    return div;
}

function ingredientDisplay(ingredients){
    const div = document.createElement("div");
    ingredients.forEach(section => {
        const category = document.createElement("h3");
        if (section.name !== null){
            category.innerHTML = `${section.name}:`;
        }
        else {
            category.innerHTML = "Ingredients:"
        }
        div.appendChild(category);
        section.components.forEach(ingredient => {
            const item = document.createElement("p");
            item.innerHTML = ingredient.raw_text;
            div.appendChild(item);
        })
              
    });
    return div;
}

// close the dialog box
closeButton.addEventListener("click", () => {
    dialog.close();
})
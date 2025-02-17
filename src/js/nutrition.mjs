import { findRecipes } from "./finder.mjs";
import { saveToLocalStorage } from "./utils.mjs";

// run the nutritional fetching api
const nutritionOptions = {
    method: "GET",
    headers: {
        "x-rapidapi-key": "23254c5730msh5fd0181328cd6c3p1116a7jsn3eca1c27c4cd",
        "x-rapidapi-host": "nutrition-by-api-ninjas.p.rapidapi.com"
    }
};


// fetch the food information and pass it to the recipe finder
export function fetchNutrition(foods){
    fetch(`https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition?query=${foods}`, nutritionOptions)
        .then(res => res.json())
        .then(data => findRecipes(getNames(data)))
        .catch(error => console.error(error));
}

// get the name of each food and save the string to local storage
function getNames(json){
    let names = "";
    json.forEach(object => {
        names = names + "," + object.name;
    });
    saveToLocalStorage("foods", names);
    return names;
}
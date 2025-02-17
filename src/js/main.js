import { findRecipes } from "./finder.mjs";
import { fetchNutrition } from "./nutrition.mjs";
import { getLocalStorage } from "./utils.mjs";


const localKey = "foods";

// check if the user has visited before, if they have then load the recipes from
// their most recent visit
function loadVisit(){
    if (getLocalStorage(localKey) !== null) {
        findRecipes(getLocalStorage(localKey))
    }
}

window.onload = loadVisit();


// Event Listeners

// if the submit button is pressed, submit the string to the nutrition api 
document.getElementById("search").addEventListener("click", () => {
    const input = document.getElementById("foodSearch").value;
    const foods = stringToQuery(input);

    fetchNutrition(foods);
})




// Helper Functions

// convert a string to query format
function stringToQuery(string) {
    return string.replace(/\s/g, "%20");
}

// dynamic copyright year
const today = new Date();
let year = today.getFullYear();

document.querySelector("#currentyear").innerHTML = year;
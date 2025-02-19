

// fill the modal with the instructions and display it
export function displayModal(object, dialog){
  
    const element = document.getElementById("instructions");
    element.innerHTML = "";

    const ingrDiv = ingredientDisplay(object.sections);
    const instDiv = instructionDisplay(object.instructions);
    
    element.appendChild(ingrDiv);
    element.appendChild(instDiv);

    dialog.showModal();
}

// display parsing for the top half of the dialog parsed from the returned JSON
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

// display parsing for the second half of the dialog parsed from returned JSON
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
            item.innerHTML = checkIfNA(ingredient.raw_text);
            div.appendChild(item);
        })
              
    });
    return div;
}

// function to check if a string is N/A. If it is, replace it with a blank string instead
export function checkIfNA(string) {
    if (string == "n/a") {
        string = "";
    }
    return string;
}


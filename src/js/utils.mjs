export function renderWithTemplate(
    template,
    parentElement,
    data,
    callback
  ) {
    parentElement.insertAdjacentHTML("afterbegin", template);
  
    if(callback)
      callback(data);
  }

export async function loadTemplate(path){
    const response = await fetch(path);
    const contents = await response.text();
    
    return contents;
}

export async function loadHeaderFooter(){
    const header = document.getElementById("page-header");
    const footer = document.getElementById("page-footer");

    const headerTemplate = await loadTemplate("../partials/header.html");
    const footerTemplate = await loadTemplate("../partials/footer.html");
    
    renderWithTemplate(headerTemplate,header);
    renderWithTemplate(footerTemplate, footer);
}
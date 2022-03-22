import App from "../App.js";

const app = new App();

app.index();

// Ajoute l'évenement qui ouvre ou ferme l'autocomplétion
window.addEventListener("click", async (e) => {

  if(e.target.classList.contains("find_btn")){
    openDropDown(e);
  } else if(!(e.target.classList.contains("item_drop_down")) ) {
    closeDropDown();
  }
});

// Ajoute l'évenement de recherche sur l'input editer 
const searchInputs = document.getElementsByClassName("find_btn");
for (let index = 0; index < searchInputs.length; index++) {
  const searchInput = searchInputs[index];
  searchInput.addEventListener("input", (e) => {
    app.searchInDropDown(e);
  });
}

// Ajoute l'évenement de recherche sur l'input général 
const general_input = document.getElementById("general_input");
general_input.addEventListener("input", (e) => {
  
  app.controllerSearch();
  
});

// Modifie le style de l'autocompletion pour le faire disparaitre
const closeDropDown = () => {
  var activeDropDown = document.getElementsByClassName("active")[0];
  if (activeDropDown) {
    var arrowImg = activeDropDown.getElementsByClassName("img_drop_down")[0];
    var dropDown = activeDropDown.getElementsByClassName("drop_down")[0];

    activeDropDown.classList.remove("active");
    activeDropDown.style.flex = "0";
    dropDown.style.display = "none";
    arrowImg.style.transform = "rotate(0deg)";
    
  }
}

// Modifie le style de l'autocompletion qui vient d'etre clicker pour l'afficher
const openDropDown = (e) => {
  app.selectedInput = e.target.getAttribute("data-id");
  
  closeDropDown();

  var parentElement = e.target.parentElement;
  var arrowImg = document.getElementsByClassName("img_drop_down")[0];
  var dropDown = parentElement.getElementsByClassName("drop_down")[0];
  parentElement.classList.add("active");
  parentElement.style.flex = "1";
  dropDown.style.display = "block";
  arrowImg.style.transform = "rotate(180deg)";

};





// export default {searchWithTags};
import { recipes } from "/js/data/recipes.js";
import Recipe from "./templates/Recipe.js";

class App {
  constructor() {
    this.mainContent = document.getElementById("main");
    this.tagsContent = document.getElementById("tags");
    this.recipes = [];
    this.ingredients = [];
    this.appliances = [];
    this.ustensils = [];
    this.tags = [];
  }

  index() {
    // je récupère les data de mon fichier
    for (let index = 0; index < recipes.length; index++) {
      var recipe = recipes[index];
      if (index % 3 === 0) {
        var element = document.createElement("div");
        element.setAttribute(
          "class",
          "card-row row row-cols-1 row-cols-md-3 row-cols-xl-3 g-4"
        );
      }

      const recipeClass = new Recipe(recipe);
      const result = recipeClass.buildCard();

      element.appendChild(result);

      this.recipes.push(recipeClass);
      this.mainContent.appendChild(element);
      
    }
  }

  show_ingredients() {
    const domParent = document.getElementById("data_list_ingre");
    domParent.setAttribute("data-class-tag","tag_input_1");
    
    for (let index = 0; index < this.recipes.length; index++) {
      const recipeClass = this.recipes[index];
      for ( let indexBis = 0; indexBis < recipeClass.ingredients.length;indexBis++ ) {

        const ingredient = recipeClass.ingredients[indexBis].ingredient.toLowerCase();
       

        if (this.ingredients.indexOf(ingredient.toLowerCase()) === -1) {
          this.ingredients.push(ingredient.toLowerCase());
          var li = document.createElement("li");
          li.setAttribute("class","item_drop_down");
          
          li.innerText = ingredient;
          domParent.appendChild(li);
        }
        
         
      }
    }
    
  }
  
  show_appliance() {
    const domParent = document.getElementById("data_list_app");
    domParent.setAttribute("data-class-tag","tag_input_2");
    for ( let index = 0; index < this.recipes.length; index++ ) {
      const appliance = this.recipes[index].appliance;
      

      if (this.appliances.indexOf(appliance.toLowerCase()) === -1) {
        this.appliances.push(appliance.toLowerCase());
        var li = document.createElement("li");
        li.setAttribute("class","item_drop_down");
        
        li.innerText = appliance;
        domParent.appendChild(li);
      }

    }
  
  }
  
  show_ustensils() {
    const domParent = document.getElementById("data_list_utens");
    domParent.setAttribute("data-class-tag","tag_input_3");
    
    for (let index = 0; index < this.recipes.length; index++) {
      const recipeClass = this.recipes[index];
      for ( let indexBis = 0; indexBis < recipeClass.ustensils.length;indexBis++ ) {

        const ustensils = recipeClass.ustensils[indexBis].toLowerCase();
       
        if (this.ustensils.indexOf(ustensils.toLowerCase()) === -1) {
          this.ustensils.push(ustensils.toLowerCase());
          var li = document.createElement("li");
          li.setAttribute("class","item_drop_down");
          
          li.innerText = ustensils;
          domParent.appendChild(li);
        }
        
      }
    }
    
  }

  search(event) {
    var parentElement = event.target.parentElement;

    var input = event.target.value;
    
    input = input.split(",").pop().trim()
    
    var domItemDropDown = parentElement.getElementsByClassName("item_drop_down");
    var domNot_found = parentElement.getElementsByClassName("not_found");

    var nbIngredients = 0;

    for (var i = 0; i < domItemDropDown.length; i++) {

      if (!domItemDropDown[i].innerHTML.toLowerCase().includes(input.toLowerCase())) {
        domItemDropDown[i].style.display = "none";
      } else {
        domItemDropDown[i].style.display = "list-item";
        nbIngredients++;
      }
    }
    
    domNot_found[0].style.display = nbIngredients <= 0?  "block" : "none";
     
  }

  
  // Ajoute l'evenement sur l'autocompletion
  appendEventItemDropDown() {
    
    var listAutocomplete = document.getElementsByClassName("item_drop_down");
    
    for (let index = 0; index < listAutocomplete.length; index++) {
      var li = listAutocomplete[index];

      li.addEventListener("click", (e) => {
        
        var selected = e.target.innerText;
        var selectedInput = e.target.parentElement.getAttribute("data-class-tag");
        // var inputValue = document.getElementsByClassName(`${selectedInput}`);

        this.tags.push(selected);

        var tag = document.createElement("div")
        tag.setAttribute("class", `tag ${selectedInput} d-inline-flex`);
        tag.innerHTML = selected;

        var btnDelete = document.createElement("button")
        
        btnDelete.addEventListener("click",(e) => {
          tag.remove();
        })
        
        btnDelete.innerHTML = '<img src="/img/delete.svg">';
        tag.appendChild(btnDelete);
        this.tagsContent.appendChild(tag);

        console.log(this.tags);
      });
    }
  }

}

export default App;


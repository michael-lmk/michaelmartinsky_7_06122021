import { recipes } from "/js/data/recipes.js";
import Recipe from "./templates/Recipe.js";

class App {
  constructor() {
    this.currentRecipes = []; // Toutes les recettes triées
    this.ingredients    = []; // Tout les ingrédiants
    this.appliances     = []; // Tout les appareils
    this.ustensils      = []; // Tout les ustensils
  }

  /**
   * Affiche tout les recette et rempli currentRecipe
   */
  index() {
    this.currentRecipes = [];

    // je récupère les data de mon fichier
    for (let index = 0; index < recipes.length; index++) {
      var recipeClass = new Recipe(recipes[index]);

      this.currentRecipes.push(recipeClass);
    }

    Recipe.renderCardContainer(this);
  }

  /**
   * Controller de la recherche
   */
  controllerSearch() {
    let general_input = document.getElementById("general_input").value;
    if (general_input.length >= 3) {
      this.currentRecipes = [];
      this.searchRecipe();
    }

    let tags = document.getElementsByClassName("tag"); 
    if (tags.length > 0) {
      this.searchWithTags();
    }
    console.log(tags.length === 0 && general_input.length < 3,tags.length);
    if (tags.length === 0 && general_input.length < 3) {
      this.index()
    }
    
  }

  /**
   * Fonction de suggestion pour les utilisateurs sur les dropdown
   */
  searchInDropDown(event) {
    var parentElement = event.target.parentElement;

    var input = event.target.value;

    var domItemDropDown =
      parentElement.getElementsByClassName("item_drop_down");
    var domNot_found = parentElement.getElementsByClassName("not_found");

    var nbIngredients = 0;

    for (var i = 0; i < domItemDropDown.length; i++) {
      if (
        !domItemDropDown[i].innerHTML
          .toLowerCase()
          .includes(input.toLowerCase())
      ) {
        domItemDropDown[i].style.display = "none";
      } else {
        domItemDropDown[i].style.display = "list-item";
        nbIngredients++;
      }
    }

    domNot_found[0].style.display = nbIngredients <= 0 ? "block" : "none";
  }

  /**
   * Recherche general sur la description le titre et les ingredients d'un recherche
   */
  searchRecipe() {
    var general_input = document.getElementById("general_input");
    var inputValue = general_input.value.toLowerCase();

    document.getElementById("main").innerHTML = "";

    // Je boucle sur chaque recette
    for (let indexRecipe = 0; indexRecipe < recipes.length; indexRecipe++) {
      var recipe = new Recipe(recipes[indexRecipe]);
      var isIncluded = false;

      // Verification dans la description
      isIncluded = recipe.description.toLowerCase().includes(inputValue);

      if (!isIncluded) {
        // Verification dans le name de la recette
        isIncluded = recipe.name.toLowerCase().includes(inputValue);
      }

      if (!isIncluded) {
        // Verification dans les ingredients
        for (const key in recipe.ingredient) {
          const element = recipe.ingredient[key];

          isIncluded = element.ingredient.toLowerCase().includes(inputValue);
        }
      }

      // Ajout de la recette dans un tableau
      if (isIncluded) {
        this.currentRecipes.push(recipe);
      }
    }

    Recipe.renderCardContainer(this);
  }

  /**
   * Filtre les recettes en fonction des tags
   */ 
  searchWithTags() {
    const tags_ingre = document.getElementsByClassName("tag_input_1");
    const tags_appli = document.getElementsByClassName("tag_input_2");
    const tags_usten = document.getElementsByClassName("tag_input_3");

    // Boucle sur les recettes affiché actuellement
    for (let index = 0; index < this.currentRecipes.length; index++) {
      const recipe = this.currentRecipes[index];
      const ingredientsArray = recipe.getIngredientName();
      var isIncluded = false;
      
      if (tags_ingre.length > 0 && this.searchByIngredients(tags_ingre,ingredientsArray)) {
        isIncluded = true;
      }

      if (tags_appli.length > 0 && this.searchByAppliances(tags_appli,recipe)) {
        isIncluded = true;
      }

      if (tags_usten.length > 0 && this.searchByUstensils(tags_usten,recipe)) {
        isIncluded = true;
      }

      // Ajout de la recette dans un tableau
      if (!isIncluded){ 
        this.currentRecipes.splice(index, 1);
      }
    }
    
    Recipe.renderCardContainer(this);
  }

  searchByIngredients(tags_ingre,ingredientsArray) {
    // Boucle sur les tags d'ingredients
    for (let i_ingre = 0; i_ingre < tags_ingre.length; i_ingre++) {
      const tag_ingre = tags_ingre[i_ingre].innerText.toLowerCase();

      if (ingredientsArray.includes(tag_ingre)) {
        return true;
      }
    }
  }

  searchByAppliances(tags_appli,recipe) {
    //Boucle pour vérifier les appareils
    for (let i_appli = 0; i_appli < tags_appli.length; i_appli++) {
      const tag_appli = tags_appli[i_appli].innerText.toLowerCase();

      if (recipe.appliance.toLowerCase().includes(tag_appli)) {
        return true;
      }
    }
  }

  searchByUstensils(tags_usten,recipe) {
    //Boucle pour vérifier les ustensils
    for (let i_usten = 0; i_usten < tags_usten.length; i_usten++) {
      const tag_usten = tags_usten[i_usten].innerText.toLowerCase();

      if (recipe.ustensils.includes(tag_usten)) {
        return true;
      }
    }
  }

  // Ajoute l'evenement sur l'autocompletion
  appendEventItemDropDown() {
    var listAutocomplete = document.getElementsByClassName("item_drop_down");

    for (let index = 0; index < listAutocomplete.length; index++) {
      var li = listAutocomplete[index];

      li.addEventListener("click", (e) => {
        var selectedValue = e.target.innerText;
        var selectedInput =
          e.target.parentElement.getAttribute("data-class-tag");

        var tag = document.createElement("div");
        tag.setAttribute("class", `tag ${selectedInput} d-inline-flex`);
        tag.innerHTML = selectedValue;

        var btnDelete = document.createElement("button");

        btnDelete.addEventListener("click", (e) => {
          tag.remove();
          this.controllerSearch();
        });

        btnDelete.innerHTML = '<img src="/img/delete.svg">';

        tag.appendChild(btnDelete);
        document.getElementById("tags").appendChild(tag);
        this.controllerSearch();
      });
    }
  }

  // Créer la liste dans le drop down des ingredients
  show_ingredients() {
    const domParent = document.getElementById("data_list_ingre");
    domParent.innerHTML = "";
    domParent.setAttribute("data-class-tag", "tag_input_1");
    this.ingredients = [];

    for (let index = 0; index < this.currentRecipes.length; index++) {
      const recipeClass = this.currentRecipes[index];

      for (
        let indexBis = 0;
        indexBis < recipeClass.ingredients.length;
        indexBis++
      ) {
        const ingredient =
          recipeClass.ingredients[indexBis].ingredient.toLowerCase();

        if (this.ingredients.indexOf(ingredient.toLowerCase()) === -1) {
          this.ingredients.push(ingredient.toLowerCase());
          var li = document.createElement("li");
          li.setAttribute("class", "item_drop_down");

          li.innerText = ingredient;
          domParent.appendChild(li);
        }
      }
    }
  }

  // Créer la liste dans le drop down des appareils
  show_appliance() {
    const domParent = document.getElementById("data_list_app");
    domParent.innerHTML = "";
    domParent.setAttribute("data-class-tag", "tag_input_2");
    this.appliances = [];

    for (let index = 0; index < this.currentRecipes.length; index++) {
      const appliance = this.currentRecipes[index].appliance;

      if (this.appliances.indexOf(appliance.toLowerCase()) === -1) {
        this.appliances.push(appliance.toLowerCase());
        var li = document.createElement("li");
        li.setAttribute("class", "item_drop_down");

        li.innerText = appliance;
        domParent.appendChild(li);
      }
    }
  }

  // Créer la liste dans le dropdown des ustensils
  show_ustensils() {
    const domParent = document.getElementById("data_list_utens");
    domParent.innerHTML = "";
    domParent.setAttribute("data-class-tag", "tag_input_3");
    this.ustensils = [];

    for (let index = 0; index < this.currentRecipes.length; index++) {
      const recipeClass = this.currentRecipes[index];
      for (
        let indexBis = 0;
        indexBis < recipeClass.ustensils.length;
        indexBis++
      ) {
        const ustensils = recipeClass.ustensils[indexBis].toLowerCase();

        if (this.ustensils.indexOf(ustensils.toLowerCase()) === -1) {
          this.ustensils.push(ustensils.toLowerCase());
          var li = document.createElement("li");
          li.setAttribute("class", "item_drop_down");

          li.innerText = ustensils;
          domParent.appendChild(li);
        }
      }
    }
  }
}

export default App;

import { recipes } from "/js/data/recipes.js";

class App {
  constructor() {
    this.mainContent = document.getElementById("main");
    this.recipes = [];
    this.ingredients = [];
  }

  async index() {
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
      const result = await recipeClass.buildCard();
      element.appendChild(result);
      this.recipes.push(recipeClass);
      this.mainContent.appendChild(element);

      for ( let indexBis = 0; indexBis < recipeClass.ingredients.length;indexBis++ ) {

        const ingredient = recipeClass.ingredients[indexBis].ingredient.toLowerCase();
        const domParent = document.getElementById("data_list_ingre");

        if (this.ingredients.indexOf(ingredient.toLowerCase()) === -1) {
          this.ingredients.push(ingredient.toLowerCase());
          var li = document.createElement("li");
          li.setAttribute("class","ingredient");
          li.innerText = ingredient;
          domParent.appendChild(li);
        }
        
         
      }
    }
  }

  search_ingredients() {
    let input = document.getElementById("input_search_ingre").value;

    input = input.split(",").pop().trim()

    let domIngredients = document.getElementsByClassName("ingredient");

    for (var i = 0; i < domIngredients.length; i++) {

      if (!domIngredients[i].innerHTML.toLowerCase().includes(input)) {
        domIngredients[i].style.display = "none";
      } else {
        domIngredients[i].style.display = "list-item";
      }
    }
  }
}

const app = new App();

app.index();

const searchInputIngre = document.getElementById("input_search_ingre");
searchInputIngre.addEventListener("input", (e) => {
  app.search_ingredients();

});


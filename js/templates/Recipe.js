
class Recipe {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.servings = data.servings;
    this.ingredients = data.ingredients;
    this.time = data.time, 
    this.description = data.description;
    this.appliance = data.appliance;
    this.ustensils = data.ustensils;
    
  }

  /**
   * Affichage des recettes par rapport à currentRecipes
   * @param this de la class app 
   */
  static renderCardContainer(app) {
    
    var nbRecipe = 0;
    let arrayRecipes = app.currentRecipes;
    let main = document.getElementById("main");
    main.innerHTML = "";

    for (let index = 0; index < arrayRecipes.length; index++) {
      const recipe = arrayRecipes[index];
      if (nbRecipe % 3 === 0) {
        var element = document.createElement("div");

        element.setAttribute(
          "class",
          "card-row row row-cols-1 row-cols-md-3 row-cols-xl-3 g-4"
        );
      }
      nbRecipe++;
      
      const result = recipe.buildCard();
  
      element.appendChild(result);
  
      main.appendChild(element);

    }

    app.show_ingredients();
    app.show_appliance();
    app.show_ustensils();

    app.appendEventItemDropDown();
    
  }

  buildCard() {
    const element = document.createElement("div");
    element.setAttribute("class", "col");
    element.innerHTML = `
                    <div class="card">
                        <img src="./img/card-img.svg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <div class="card-header">
                                <h4 class="card-title">${this.name}</h4>
                                <h4 class="card-time"><img class="img_clock" src="./img/clock.svg">${this.time} min</h4>
                            </div>
                            <div class="row">
                                <div class="col-6"> 
                                    <p class="card-text"><ul> </ul></p>
                                </div>
                                <div class="col-6">
                                    <p class="card-text right">${this.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

    this.ingredients.forEach((ingredient) => {
      element.getElementsByClassName("card-text")[0].innerHTML += `<li><b>${
        ingredient.ingredient
      }</b>: ${ingredient.quantity ? ingredient.quantity : ""} ${
        ingredient.unit ? ingredient.unit : ""
      }</li>`;
    });
    return element;
  }

  /**
   * Recupere les noms d'ingredients de la recette 
   */
   getIngredientName() {
    let ingredientsNames = [];
    
    for (let index = 0; index < this.ingredients.length; index++) {
      const ingredient = this.ingredients[index];
      ingredientsNames.push(ingredient.ingredient.toLowerCase());
    }

    return ingredientsNames;
  }
}

export default Recipe;

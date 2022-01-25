
import { recipes } from "/js/data/recipes.js";

class App {
    constructor() {
        this.mainContent = document.getElementById("main");
        this.recipes = [];
    }

    async index() {
        // je récupère les data de mon fichier 
        // recipes.map(async(recipe,i) => {
        for (let index = 0; index < recipes.length; index++) {
            var recipe = recipes[index];
            if ((index % 4) === 0) {
                
                var element = document.createElement("div");    
                element.setAttribute("class","card-row row row-cols-1 row-cols-md-3 row-cols-xl-4 g-4")
            }

            const recipeClass = new Recipe(recipe);
            const result = await recipeClass.buildCard();
            element.appendChild(result)
            this.recipes.push(recipeClass);
            this.mainContent.appendChild(element)
        }
            

        // })
    }
    
}

const app = new App();

app.index();
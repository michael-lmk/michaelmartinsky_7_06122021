
import { recipes } from "/js/data/recipes.js";

class App {
    constructor() {
        this.$indexMain = document.querySelector('#main');
        this.recipes = [];
    }

    async index() {
        
        // je récupère les data de mon fichier 
        // const receipesData = await this.RecipeApi.getRecipes();
        console.log(recipes);
    }
    
}

const app = new App();

app.index();
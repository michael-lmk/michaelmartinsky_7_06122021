import { recipes } from "./data/recipes.js";

const mainContent = document.getElementById("main");
const input_drop_downs = document.getElementsByClassName("find_btn");

function getIngredients () {
    const test = recipes.map((recipe) => {return recipe.ingredients})
    
    var merged = test.flat(1)
    
    var ingredients = [];

    merged.forEach(element => {
        if (!ingredients.includes(element.ingredient)) {
            ingredients.push(element.ingredient);
        }      
    });

    return ingredients
}

const ingredients = getIngredients();

console.log(ingredients);

function buildCard () {
    mainContent.innerHTML = "";

    var html = ``;
    var smartvar = 0;

    recipes.forEach((recipe,i) => {
        if( smartvar === i && i !== 0 ){
            html += `</div>`;
        }

        if( smartvar === i ){
            html += `<div class="card-row row row-cols-1 row-cols-md-3 row-cols-xl-4 g-4">`;
            smartvar = smartvar + 4;
        }
        
        
        html += `<div class="col ">
                    <div class="card ">
                        <img src="./img/card-img.svg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <div class="card-header">
                                <h4 class="card-title">${recipe.name}</h4>
                                <h4 class="card-time"><img class="img_clock" src="./img/clock.svg">${recipe.time} min</h4>
                            </div>
                            <div class="row">
                            <div class="col-6"> 
                                <p class="card-text"><ul>`;

                                recipe.ingredients.forEach(ingredient => {
                                    html += `<li><b>${ingredient.ingredient}</b>: ${ingredient.quantity? ingredient.quantity: ""} ${ingredient.unit? ingredient.unit: ""}</li>`;
                                });

                                html += `</ul></p>
                            </div>
                            <div class="col-6">
                                <p class="card-text right">${recipe.description}</p>
                            </div>
                            
                        </div>
                        </div>
                    </div>
                </div>`;
        
        
        
        // console.log(recipe);
    });
    mainContent.innerHTML = html;
}

function buildDropDown () {
    
}


for (let index = 0; index < input_drop_downs.length; index++) {
    const element = input_drop_downs[index];

    element.addEventListener("focus", (e) => {

        var test = `drop_down_${index+1}`;
        
        document.getElementById(test).style.display = "block";
       
    })

    element.addEventListener("blur", (e) => {
        var test = `drop_down_${index+1}`;
        
        document.getElementById(test).style.display = "none";
    })
}



buildCard();
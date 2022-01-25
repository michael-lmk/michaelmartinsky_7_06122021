


class Recipe {
    
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.servings = data.servings;
        this.ingredients = data.ingredients;
        this.time = data.time,
        this.description = data.description
        this.appliance = data.appliance;
        this.ustensils = data.ustensils;
        
    }

    async buildCard () {            
        const element = document.createElement("div");
        element.setAttribute("class","col")
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

        this.ingredients.forEach(ingredient => { 
            element.getElementsByClassName("card-text")[0].innerHTML += `<li><b>${ingredient.ingredient}</b>: ${ingredient.quantity? ingredient.quantity: ""} ${ingredient.unit? ingredient.unit: ""}</li>`;
        });
        return element;
    }
}
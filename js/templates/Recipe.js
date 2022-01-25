


class Receipe {
    
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.servings = data.servings;
        this.ingredients = data.ingredients;
        this.time = data.time,
        this.description = data.description
        this.appliance = data.appliance;
        this.ustensils = data.ustensils;
        this.mainContent = document.getElementById("main");
    }

    buildCard () {
    
            // var smartvar = 0;
            // if( smartvar === i && i !== 0 ){
            //     html += `</div>`;
            // }
    
            // if( smartvar === i ){
            //     html += `<div class="card-row row row-cols-1 row-cols-md-3 row-cols-xl-4 g-4">`;
            //     smartvar = smartvar + 4;
            // }
            
            
            this.mainContent.innerHTML += `<div class="col ">
                        <div class="card ">
                            <img src="./img/card-img.svg" class="card-img-top" alt="...">
                            <div class="card-body">
                                <div class="card-header">
                                    <h4 class="card-title">${this.name}</h4>
                                    <h4 class="card-time"><img class="img_clock" src="./img/clock.svg">${this.time} min</h4>
                                </div>
                                <div class="row">
                                <div class="col-6"> 
                                    <p class="card-text"><ul>`;
    
                                    this.ingredients.forEach(ingredient => {
                                        html += `<li><b>${ingredient.ingredient}</b>: ${ingredient.quantity? ingredient.quantity: ""} ${ingredient.unit? ingredient.unit: ""}</li>`;
                                    });
    
                                    html += `</ul></p>
                                </div>
                                <div class="col-6">
                                    <p class="card-text right">${this.description}</p>
                                </div>
                                
                            </div>
                            </div>
                        </div>
                    </div>`;
            
            
            
            // console.log(recipe);
        
        mainContent.innerHTML = html;
    }
}
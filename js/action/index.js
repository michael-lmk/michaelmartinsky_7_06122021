const input_drop_downs = document.getElementsByClassName("find_btn");

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
const input_drop_downs = document.getElementsByClassName("find_btn");

function buildDropDown() { }

const changeStateDropDown = (index,e) => {
  
    var dropDown = document.getElementById(`drop_down_${index + 1}`);
    var imgDropDown = `img_drop_down_${index + 1}`;
   
    var findDivContainer = document.getElementsByClassName(`find_div_container_${index + 1}`)[0];

    if (findDivContainer.contains(e.target)) {

      dropDown.style.display = "block";
      document.getElementsByClassName(imgDropDown)[0].style.transform = "rotate(180deg)";
      var dropDownWidth = dropDown.clientWidth ;
      findDivContainer.style.flex = "1";

    } else {

      dropDown.style.display = "none";
      document.getElementsByClassName(imgDropDown)[0].style.transform = "rotate(0deg)";
      findDivContainer.style.flex = "0";

    }

}

for (let index = 0; index < input_drop_downs.length; index++) {
  window.addEventListener("click", (e) => changeStateDropDown(index,e))
}

var listAutocomplete = document.getElementsByClassName("ingredient")
for (let index = 0; index < listAutocomplete.length; index++) {
  var li = listAutocomplete[index];

  li.addEventListener("click", function (e) {
    var selected = e.target.innerText;
    var inputValue = document.getElementById("input_search_ingre");
    var arrayInputValue = inputValue.value.split(",");
    
    arrayInputValue[arrayInputValue.length-1] = selected;
    
    inputValue.value = arrayInputValue.join(",")+","; 

  })  
};

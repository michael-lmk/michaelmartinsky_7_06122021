import App from "../App.js";

const app = new App();

app.index()
app.show_ingredients();
app.show_appliance();
app.show_ustensils();

app.appendEventItemDropDown();



const searchInputs = document.getElementsByClassName("find_btn");
for (let index = 0; index < searchInputs.length; index++) {
  const searchInput = searchInputs[index];
  searchInput.addEventListener("input", (e) => {
    app.search(e);
  });
}


const closeDropDown = () => {
  var activeDropDown = document.getElementsByClassName("active")[0];
  if (activeDropDown) {
    var arrowImg = activeDropDown.getElementsByClassName(`img_drop_down`)[0];
    var dropDown = activeDropDown.getElementsByClassName("drop_down")[0];

    activeDropDown.classList.remove("active");
    activeDropDown.style.flex = "0";
    dropDown.style.display = "none";
    arrowImg.style.transform = "rotate(0deg)";
    
  }
}


// Ouvre l'autocompletion qui vient d'etre clicker
const openDropDown = (e) => {
  app.selectedInput = e.target.getAttribute("data-id");
  console.log(app.selectedInput);
  closeDropDown();

  var parentElement = e.target.parentElement;
  var arrowImg = document.getElementsByClassName(`img_drop_down`)[0];
  var dropDown = parentElement.getElementsByClassName("drop_down")[0];
  parentElement.classList.add("active")
  parentElement.style.flex = "1";
  dropDown.style.display = "block";
  arrowImg.style.transform = "rotate(180deg)";

};


window.addEventListener("click", async (e) => {

  if(e.target.classList.contains("find_btn")){
    openDropDown(e);
  } else if(!(e.target.classList.contains("item_drop_down")) ) {
    closeDropDown();
  }
});

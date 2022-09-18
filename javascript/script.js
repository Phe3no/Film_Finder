//create some constants
const hamburger = document.getElementById("hamburger-menu");
const hamburgerMenu = document.getElementById("nav-area");
const moviesInDomList = document.getElementById("movies");
const filmFilterRadioBtns = Array.from(
  document.getElementsByName("film-filter-group")
);
const menuItems = Array.from(document.getElementsByClassName("ffg-menuitem"));

const addMoviesToDom = function (movies) {
  movies.forEach((movie) => {
    //the complete creation of the required elements is done in a separate function
    createNeededElementsForMovies(movie);
  });
  //when you scrolled away from the top of the page, at your next filter command, the page scrolls to the top smoothly
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const clearMoviesInDom = function () {
  //itterate through the moviesInDom array removing each li-element one by one
  const moviesInDom = Array.from(moviesInDomList.getElementsByTagName("li"));
  moviesInDom.forEach((movie) => {
    movie.remove();
  });
};

const createNeededElementsForMovies = function (movie) {
  //creat new elements in order below
  const newLi = document.createElement("li");
  const newA = document.createElement("a");
  const newImg = document.createElement("img");
  //add necessities to the new elements
  newA.href = "https://www.imdb.com/title/" + movie.imdbID;
  newA.addEventListener("click", uncheckAllRadioBtns);
  newImg.src = movie.poster;
  //append the new elements in order below, the parent is declared in the top of the script
  moviesInDomList.appendChild(newLi);
  newLi.appendChild(newA);
  newA.appendChild(newImg);
};

//without this function, after an image is clicked and you move away from the website,
//wenn you return to film finder, the page will reload but the last clicked radiobtn would still be activated
//same goes for when you enter a search string
const uncheckAllRadioBtns = function () {
  filmFilterRadioBtns.forEach((btn) => {
    btn.checked = false;
  });
};

const menuClassToggle = function () {
  document.getElementById("nav-area").classList.toggle("nav-area-show");
};

const checkMenuClassToggleState = function () {
  if (document.getElementById("nav-area").classList.contains("nav-area-show")) {
    menuClassToggle();
  }
};

const addEventListeners = function () {
  //add eventlistener for the hamburger
  hamburger.addEventListener("click", () => {
    menuClassToggle();
  });
  //add eventlistener for the hamburger-menu
  hamburgerMenu.addEventListener("mouseleave", () => {
    checkMenuClassToggleState();
  });
  //add eventlisteners for the hamburger-menu-items
  menuItems.forEach((menuItem) => {
    menuItem.addEventListener("click", handleOnMenuItemClick);
  });
  //add eventlistener for the textinput
  const textInput = document.getElementById("header-input-bar");
  textInput.addEventListener("change", handleOnTextChangeEvent);
};

//filter the films according to the menu item clicked
//this wil also check the corresponding radiobutton
const handleOnMenuItemClick = function (event) {
  //target the parent element of the radio-button or the label
  console.log(event.target.parentElement.id);
  switch (event.target.parentElement.id) {
    case "ffg-mi1":
      filmFilterRadioBtns[0].checked = true;
      filterLatestMovies("2014");
      break;
    case "ffg-mi2":
      filmFilterRadioBtns[1].checked = true;
      filterMovies("avengers");
      break;
    case "ffg-mi3":
      filmFilterRadioBtns[2].checked = true;
      filterMovies("x-men");
      break;
    case "ffg-mi4":
      filmFilterRadioBtns[3].checked = true;
      filterMovies("princess");
      break;
    case "ffg-mi5":
      filmFilterRadioBtns[4].checked = true;
      filterMovies("batman");
      break;
    default:
      filterMovies("");
  }
};

//filter the films according to the value of the textInputElement
const handleOnTextChangeEvent = function (event) {
  //call filterMovies() with value of the text-input-field as argument
  filterMovies(event.target.value);
  //reset the text input field and uncheck all radioBtns
  event.target.value = "";
  uncheckAllRadioBtns();
};

const filterMovies = function (wordInMovie) {
  const selectedMovies = [];
  movies.forEach((movie) => {
    //itterate through the array, make the movie.title lowercase and compare with the search string...
    //lowercase search is a nice extra feature right?
    if (movie.title.toLowerCase().includes(wordInMovie)) {
      selectedMovies.push(movie);
    }
  });
  clearMoviesInDom();
  addMoviesToDom(selectedMovies);
  checkMenuClassToggleState();
};

const filterLatestMovies = function () {
  const selectedMovies = [];
  movies.forEach((movie) => {
    // if statement does not work when year is a range, for example: 1992-1997 (X-Men: The Animated series)
    // in this case there is no film with a range where 2014 is a part of, so no problem ;-)
    if (movie.year >= 2014) {
      selectedMovies.push(movie);
    }
  });
  clearMoviesInDom();
  addMoviesToDom(selectedMovies);
  checkMenuClassToggleState();
};

addMoviesToDom(movies);
addEventListeners();

const menu = document.querySelector(".container-movies");

const showMenu = () => {
    menu.classList.toggle("movie-mobile--active");
  };
  
  menu.addEventListener("click", showMenu);
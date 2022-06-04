const menu = document.querySelector('#menu-text');
const container = document.querySelector('.container-movies');

const showMenu = () => {
    container.classList.toggle('movie-mobile--active')
}
container.addEventListener('click', showMenu);
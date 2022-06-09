const movies = document.querySelectorAll(".movie__poster");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const screen = document.querySelector(".screen__tittle");
const btnBuy = document.querySelector(".btn");
const price = document.querySelector('.total-price');
let movieName = "";
let moviePrice = "";

loadStorage();

const isFree = (e) => (!e.target.contains(".occupied") ? true : false);
const isSeat = (e) => (e.target.contains(".seat") ? true : false);

function makeTicket(movieName, moviePrice, seatIndex) {
  const ticket = {
    name: movieName,
    price: moviePrice,
    seat: seatIndex,
  };
  return ticket;
}

function removeClass(cls) {
  seats.forEach((seat) => {
    seat.classList.remove(cls);
  });
}

function selectedSeats() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  return selectedSeats;
}

function updatePrice() {
  const selectedSeat = selectedSeats();
  const TotalPrice = moviePrice * selectedSeat.length
  
  showPrice(TotalPrice)
}

function showPrice(newPrice) {
  price.textContent = `Total Price:$ ${newPrice.toFixed(2)}`
}

const selectSeat = seats.forEach((seat) => {
  seat.addEventListener("click", function (e) {
    if (isFree && isSeat) {
      e.target.classList.toggle("selected");
      updatePrice();
    }
  });
});

const selectMovie = movies.forEach((movie) => {
  movie.addEventListener("click", function (e) {
    removeClass("selected");
    movieName = movie.children[1].textContent;
    moviePrice = parseFloat(movie.children[2].textContent.slice(1));
    screen.textContent = movieName;
    showPrice(0)
    loadStorage();
  });
});

const buyTicket = () => {
  saveStorage();
  showPrice(0)
  loadStorage();
};

btnBuy.addEventListener("click", buyTicket);


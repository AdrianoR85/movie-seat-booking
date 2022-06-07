const menu = document.querySelector(".container-movies");
const movies = document.querySelectorAll(".movie__poster");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const screen = document.querySelector(".screen__tittle");
let movieName = '';
let moviePrice = '';
let booking = JSON.parse(localStorage.getItem('selectedSeats')) || []

function load() {
  /* Fazer uma verificação para saber qual é o filme*/
  if(booking.length > 0) {
    booking.forEach(book => {
      if(book['name'] === movieName) {
        const dados = book
        const seatList = dados['seat']
          seatList.forEach(s => {
            seats[s].classList.add('selected')
          })
      } 
    })
  }
}

const isFree = (e) => (!e.target.contains(".occupied") ? true : false);
const isSeat = (e) => (e.target.contains(".seat") ? true : false);

function makeTicket(movieName, moviePrice, seatIndex) {
  const ticket = {
    'name':movieName,
    'price': moviePrice,
    'seat': seatIndex
  }
  return ticket
}

function updateTicket() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const seatIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  const amountOfSeats = selectedSeats.length
  const exist =  booking.find(movie => movie.name === movieName)
  
 if(exist) {
  for(let i = 0; i < booking.length; i++) {
    if(booking[i]['name'] === movieName) {
     currantSeats = booking[i]['seat']
     newSeats = currantSeats.concat(seatIndex);
     booking[i]['seat'] = newSeats.filter(function(s, i){return newSeats.indexOf(s) === i});  
    }
  }
 } else {
    booking.push(makeTicket(movieName, moviePrice, seatIndex));
 }
   
  localStorage.setItem('selectedSeats', JSON.stringify(booking));

  document.querySelector(".total-price").textContent = `Total price:$ ${moviePrice * amountOfSeats}`
};

function cleanSeats() {
  
  seats.forEach((seat) => {
    seat.classList.remove("selected");
  });
}

const selectSeat = seats.forEach((seat) => {
  seat.addEventListener("click", function (e) {
    if (isFree && isSeat) {
      e.target.classList.toggle("selected");
      updateTicket();
    }
    });
});

const selectMovie = movies.forEach((movie) => {
  movie.addEventListener("click", function(e) {
    cleanSeats();
    movieName = movie.children[1].textContent;
    moviePrice = parseFloat(movie.children[2].textContent.slice(1));
    screen.textContent = movieName;
    load()
  })
});

const showMenu = () => {
  menu.classList.toggle("movie-mobile--active");
};

menu.addEventListener("click", showMenu);

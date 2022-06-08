let booking = JSON.parse(localStorage.getItem("selectedSeats")) || [];

function load() {
  /* Fazer uma verificação para saber qual é o filme*/
  if (booking.length > 0) {
    remveClass("occupied");

    booking.forEach((book) => {
      if (book["name"] === movieName) {
        const dados = book;
        const seatList = dados["seat"];
        seatList.forEach((s) => {
          seats[s].classList.add("occupied");
        });
      }
    });
  }
}

const saveStorage = () => {
  const selectedSeat = selectedSeats();
  const seatIndex = [...selectedSeat].map((seat) => [...seats].indexOf(seat));
  const exist = booking.find((movie) => movie.name === movieName);

  if (exist) {
    for (let i = 0; i < booking.length; i++) {
      if (booking[i]["name"] === movieName) {
        currantSeats = booking[i]["seat"];
        newSeats = currantSeats.concat(seatIndex);
        booking[i]["seat"] = newSeats.filter(function (s, i) {
          return newSeats.indexOf(s) === i;
        });
      }
    }
  } else {
    booking.push(makeTicket(movieName, moviePrice, seatIndex));
  }
  localStorage.setItem("selectedSeats", JSON.stringify(booking));
};

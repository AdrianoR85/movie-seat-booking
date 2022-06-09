let banco = JSON.parse(localStorage.getItem("selectedSeats")) || [];

function loadStorage() {
  if (banco.length > 0) {
    removeClass("occupied");

    banco.forEach((book) => {
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
  const exist = banco.find((movie) => movie.name === movieName);

  if (exist) {
    for (let i = 0; i < banco.length; i++) {
      if (banco[i]["name"] === movieName) { 
        banco[i]["seat"] = [...new Set([...banco[i]["seat"],...seatIndex])]
      }
    }
  } else {
    banco.push(makeTicket(movieName, moviePrice, seatIndex));
  }
  localStorage.setItem("selectedSeats", JSON.stringify(banco));
};

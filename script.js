let balance = 100;
let raceInProgress = false;

//function click button
function placeBet() {
  //check the button click during the race
  if (raceInProgress) {
    alert(
      "The race is already in progress. Please wait until it finishes to place another bet."
    );
    return;
  }

  const betAmount = parseInt(document.getElementById("betAmount").value);
  const selectedDriver = parseInt(
    document.getElementById("selectedDriver").value
  );

  //check amount bet
  if (betAmount < 5 || betAmount > balance) {
    alert("Invalid bet amount!");
    return;
  }

  // update balance and start the race
  balance -= betAmount;
  document.getElementById("balance").innerText = `Balance: R$${balance}`;
  document.getElementById("result").innerText = ` `;
  startRace(betAmount, selectedDriver);
}
//function start race
function startRace(betAmount, selectedDriver) {
  raceInProgress = true;
  resetRace();

  const raceInterval = setInterval(() => {
    moveCars();
    if (checkRaceFinish()) {
      clearInterval(raceInterval);
      determineResult(betAmount, selectedDriver);
      raceInProgress = false;
    }
  }, 50);
}

//function reset race objs
function resetRace() {
  const cars = document.querySelectorAll(".car");
  cars.forEach((car) => {
    car.style.left = "0";
  });
}

//function move images car
function moveCars() {
  const cars = document.querySelectorAll(".car");
  cars.forEach((car) => {
    const moveAmount = Math.floor(Math.random() * 5) + 1;
    car.style.left = `${parseInt(car.style.left) + moveAmount}px`;

    // Move the image inside the car div
    const carImage = car.querySelector("img");
    carImage.style.marginLeft = car.style.left;
  });
}

//function check final position
function checkRaceFinish() {
  const finishLine = 600; //position final 

  const cars = document.querySelectorAll(".car");

  for (let i = 0; i < cars.length; i++) {
    if (parseInt(cars[i].style.left) >= finishLine) {
      return true;
    }
  }
  return false;
}

//function result race
function determineResult(betAmount, selectedDriver) {
  const cars = document.querySelectorAll(".car");
  const winningDriver = getFirstToFinish(cars);

  //check winner 
  if (selectedDriver === winningDriver) {
    balance += betAmount * 2;
    document.getElementById(
      "result"
    ).innerText = `You won! Your selected pilot with color ${getDriverColor(
      selectedDriver
    )} was the first to finish. Current balance: R$${balance}`;
  } else {
    document.getElementById(
      "result"
    ).innerText = `You lost! Pilot with color ${getDriverColor(
      winningDriver
    )} was the first to finish. Current balance: R$${balance}`;
  }
  document.getElementById("balance").innerText = `Balance: R$${balance}`;
}

//function check winner car
function getFirstToFinish(cars) {
  const finishLine = 600; // Posição final desejada
  let winner = -1;

  cars.forEach((car, index) => {
    const currentPosition = parseInt(car.style.left);
    if (currentPosition >= finishLine && winner === -1) {
      winner = index + 1; // Piloto é index + 1
    }
  });

  return winner;
}

//function check winner color 
function getDriverColor(driverNumber) {
  switch (driverNumber) {
    case 1:
      return "Blue";
    case 2:
      return "Red";
    case 3:
      return "Purple";
    case 4:
      return "Yellow";
    case 5:
      return "Green";
    default:
      return "Unknown";
  }
}

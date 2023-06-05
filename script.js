"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
const displayMovements = function (movements) {
  containerMovements.innerHTML = "";
  movements.forEach(function (value, index) {
    const type = value > 0 ? "deposit" : "withdrawal";
    const html = `
            <div class="movements__row">
            <div class="movements__type movements__type--${type}">${
      index + 1
    }${type}</div>
<!--            <div class="movements__date">3 days ago</div>-->
            <div class="movements__value">${value}</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
displayMovements(account1.movements);

const displayCurrentBalance = function (movements) {
  labelBalance.textContent = movements.reduce((a, b) => a + b);
};
displayCurrentBalance(account1.movements);
// !add property for object accounts "username"
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name.at(0))
      .join("");
  });
};
createUsernames(accounts);
console.log(accounts);
//! Code challenge #1
let dogsJulia = [3, 5, 2, 12, 7];
let dogsKate = [4, 1, 15, 8, 3];
// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogs = [...dogsJulia.slice(1, dogsJulia.length - 2), ...dogsKate];
//   dogs.forEach(function (value, index, array) {
//     const type = value > 3 ? "adult" : "puppy";
//     if (value > 3) {
//       console.log(
//         `Dog number ${index} is an ${type}, and is ${value} years old`
//       );
//     } else {
//       console.log(`Dog number ${index} is still a ${type}🐶`);
//     }
//   });
// };
//? checkDogs(dogsJulia, dogsKate);
// !Max value
//? console.log(movements.reduce((acc, mov) => (acc > mov ? acc : mov)));
//? console.log(Math.max(...movements))
//! Code challenge #2
// dogsKate = [5, 2, 4, 1, 15, 8, 3];
// dogsJulia = [16, 6, 10, 5, 6, 1, 4];
// const calcAverageHumanAge = function (ages) {
//   let result = []; // Initialize result as an empty array
//   let humanAge = [];
//   ages.forEach(function (dogAge, index, array) {
//     dogAge <= 2 ? humanAge.push(2 * dogAge) : humanAge.push(16 + dogAge * 4);
//   });
//   const adults = humanAge.filter((el) => el >= 18);
//
//   result.push(adults.reduce((acc, age, i, arr) => acc + age / arr.length, 0));
//
//   return [adults, Math.round(result[0])];
// };

//? console.log(calcAverageHumanAge([...dogsKate, ...dogsJulia]));
// console.log(movements);
// const euroToDollar = 1.1;
// const convertToDollar = movements.map((money) => money * euroToDollar);
// console.log(convertToDollar);

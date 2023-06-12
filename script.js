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
const inputs = document.querySelectorAll("input");

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

/////////////////////////////////////////////////
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (value, index) {
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

const displayCurrentBalance = function (acc) {
  acc.balance = labelBalance.textContent = acc.movements.reduce(
    (a, b) => a + b
  );
};
const displaySummary = function (acc) {
  const sumIn = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, curr, i, arr) => acc + curr);
  labelSumIn.textContent = `${sumIn} Euro`;

  const sumOut = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, curr, i, arr) => acc + curr);
  labelSumOut.textContent = `${Math.abs(sumOut)} Euro`;

  const sumInterest = acc.movements
    .filter((mov) => mov > 0)
    .map((depp) => (depp * acc.interestRate) / 100)
    .filter((int) => {
      return int >= 1;
    })
    .reduce((acc, curr, i, arr) => acc + curr);
  labelSumInterest.textContent = `${sumInterest} Euro`;
};
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
// console.log(accounts);

const updateUI = function (acc) {
  displayMovements(acc.movements);
  displayCurrentBalance(acc);
  displaySummary(acc);
  ClearInput();
};
const ClearInput = function () {
  inputs.forEach((input) => {
    input.value = "";
    input.blur();
  });
};
let currentAccount;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiveAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  console.log(amount, receiveAcc);
  if (
    amount > 0 &&
    currentAccount.balance > amount &&
    receiveAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiveAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});
btnLoan.addEventListener("click", (e) => {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    //10%
    currentAccount.movements.push(amount);
    //Update Ui
    updateUI(currentAccount);
  }
});
btnClose.addEventListener("click", (e) => {
  e.preventDefault();
  const pin = Number(inputClosePin.value);
  const username = inputCloseUsername.value;
  if (currentAccount.pin === pin && username === currentAccount.username) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    updateUI(currentAccount);
  } else {
    console.log("wrong data for user:", currentAccount.username);
  }
});
let sorted = false;
btnSort.addEventListener("click", (e) => {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
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

// !Code Challenge #3
// const calcAverageHumanAge = (ages) => {
//   return ages
//     .map((age) => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter((age) => age >= 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
// };
// // const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// // const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// //? console.log(avg1, avg2);
// const account = accounts.find((el) => el.owner === "Steven Thomas Williams");
// //? console.log(account);

// !Code Challenge #4
const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

// !______________________________________________1 TASK____________________________________________________
// *first example
// dogs.map(function (value, index, array) {
//   return Object.assign(value, {
//     recommendedFood: `${Math.round(value.weight ** 0.75 * 28)} G`,
//   });
// });
// *second example
dogs.forEach((dog) => {
  dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
  // this part isn't include in code challenge
  const currentFood = dog.curFood;
  const lowerBound = dog.recommendedFood * 0.9;
  const upperBound = dog.recommendedFood * 1.1;

  if (currentFood > lowerBound && currentFood < upperBound) {
    console.log(`${dog.owners.join(", ")}'normal`);
  } else {
    console.log(`${dog.owners.join(", ")}'wrong`);
  }
});

// console.log(dogs);
//
// !______________________________________________2 TASK____________________________________________________
const owner = function (name) {
  const ownerDog = dogs.find((value) => value.owners.includes(name));
  return ownerDog.curFood > ownerDog.recommendedFood
    ? "too much"
    : "too little";
};
console.log("Sarah's dog eat: ", owner("Sarah"));

// !______________________________________________3 TASK____________________________________________________
const ownersEatTooMuch = () => {
  return dogs
    .filter((owner) => owner.curFood > owner.recommendedFood)
    .map((owner) => owner.owners)
    .flat();
};
const ownersEatTooLittle = () => {
  return dogs
    .filter((owner) => owner.curFood < owner.recommendedFood)
    .map((owner) => owner.owners)
    .flat();
};

console.log("Власники, собак які їдять забагато:", ownersEatTooMuch());
console.log("Власники, собак які їдять замало:", ownersEatTooLittle());
// !______________________________________________4 TASK____________________________________________________
const ownersEatTooMuchString = () => {
  const ownersTooMuch = ownersEatTooMuch();
  return ownersTooMuch.join(" and ") + "'s dogs eat too much!";
};
const ownersEatTooLittleString = () => {
  const ownersTooLittle = ownersEatTooLittle();
  return ownersTooLittle.join(" and ") + "'s dogs eat too little!";
};
console.log(ownersEatTooMuchString());
console.log(ownersEatTooLittleString());
// Matilda and Alice and Bob's dogs eat too much!
// !______________________________________________'5' && '6' TASK____________________________________________________
const eatSomeRecommendedFood = () => {
  return dogs.some((value, index, array) => {
    const currentFood = value.curFood;
    const lowerBound = value.recommendedFood * 0.9;
    const upperBound = value.recommendedFood * 1.1;
    return currentFood < upperBound && currentFood > lowerBound;
  });
};
console.log(eatSomeRecommendedFood());
// !______________________________________________7 TASK____________________________________________________
const eatNormalRecommendedFood = () => {
  const result = [];
  dogs.some((value, index, array) => {
    const currentFood = value.curFood;
    const lowerBound = value.recommendedFood * 0.9;
    const upperBound = value.recommendedFood * 1.1;
    if (currentFood > lowerBound && currentFood < upperBound) {
      result.push(value.owners[0]);
    }
  });
  return result;
};
console.log(eatNormalRecommendedFood());
// !______________________________________________8 TASK____________________________________________________
const copyDogSort = () => {
  return dogs.slice().sort((a, b) => {
    return a.recommendedFood - b.recommendedFood;
  });
};
console.log(copyDogSort());

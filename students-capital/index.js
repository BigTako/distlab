const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let capital = 0;
let laptopsN = 0;
let prices = [];
let expectedProfits = [];

function parsePositive(str) {
  const num = Number(str);
  if (isNaN(num) || num < 0) {
    rl.close();
    throw new Error("Invalid number. Please enter a positive number.");
  }
  return num;
}

function parsePositiveInt(str) {
  const num = parseFloat(str);
  if (isNaN(num) || num < 0 || !Number.isInteger(num)) {
    rl.close();
    throw new Error("Invalid number.Please enter a positive int.");
  }
  return num;
}

function parsePositivesArray(str) {
  const arr = str.split(",").map(Number);
  if (arr.some((item) => isNaN(item) || item < 0)) {
    rl.close();
    throw new Error(
      "Invalid number. Please enter positive numbers after comma."
    );
  }
  return arr;
}

function selectMostProfitable({ capital, prices, expectedProfits, laptopsN }) {
  return Array.from({ length: prices.length }, (_, i) => ({
    price: prices[i],
    expectedProfit: expectedProfits[i],
    ratio: expectedProfits[i] / prices[i],
  }))
    .sort((a, b) => b.ratio - a.ratio)
    .slice(0, laptopsN)
    .filter((laptop) => {
      if (laptop.price <= capital) {
        capital -= laptop.price;
        return true;
      }
      return false;
    });
}

function work(data) {
  const laptops = selectMostProfitable(data);
  const remainingCapital =
    data.capital - laptops.reduce((acc, curr) => acc + curr.price, 0);
  return {
    laptops,
    remainingCapital,
    totalProfit:
      remainingCapital +
      laptops.reduce((acc, curr) => acc + curr.expectedProfit, 0),
  };
}

rl.question(`Enter your initial capital(C) as number:`, (number) => {
  capital = parsePositive(number);
  rl.question(
    `Enter number of laptops you willing to buy(N) as positive int: `,
    (number) => {
      laptopsN = parsePositiveInt(number);
      rl.question(`Enter prices as numbers after comma: `, (str) => {
        prices = parsePositivesArray(str);
        rl.question(
          `Enter expected profits as numbers after comma: `,
          (str) => {
            expectedProfits = parsePositivesArray(str);
            rl.close();
            console.log(
              work({
                capital,
                prices,
                expectedProfits,
                laptopsN,
              })
            );
          }
        );
      });
    }
  );
});

const fs = require("node:fs");
const db = require("./db.json");

const content = JSON.stringify(generateDataSet());

fs.writeFile("mock-server/large-db.json", content, (err) => {
  if (err) {
    console.error(err);
  }
});

function generateDataSet() {
  const expenseCount = 900;
  const incomeCount = 40;
  const transactions = [];
  const categoryMetadata = db["category-metadata"];
  const today = Date.UTC(2024, 11, 25);
  const msInOneDay = 24 * 60 * 60 * 1000;
  for (let i = 0; i < expenseCount; i++) {
    transactions.push({
      id: String(1000 + i),
      amount: -randomInt(20000),
      category: String(randomSample(categoryMetadata).id),
      timestamp: today - randomInt(500) * msInOneDay
    });
  }
  for (let i = 0; i < incomeCount; i++) {
    transactions.push({
      id: String(100000 + i),
      amount: 40000 + randomInt(120000),
      category: "",
      timestamp: today - randomInt(500) * msInOneDay
    });
  }
  const largeDb = {
    "category-metadata": categoryMetadata,
    transactions,
  };
  return largeDb;
}

function randomInt(max) {
  return Math.trunc(Math.random() * max);
}

function randomSample(arr) {
  return arr[Math.trunc(arr.length * Math.random())];
}

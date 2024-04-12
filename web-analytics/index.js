const fs = require("fs");
const csv = require("csv-parser");

function parseCSV(file) {
  return new Promise((resolve, reject) => {
    const data = new Map();
    fs.createReadStream(file)
      .pipe(csv())
      .on("data", (row) => {
        const user = row.user_id;
        const product = row.product_id;
        if (!data.has(user)) {
          data.set(user, new Set());
        }
        data.get(user).add(product);
      })
      .on("end", () => {
        resolve(data);
      })
      .on("error", reject);
  });
}

async function findUsers(file1, file2) {
  const [data1, data2] = await Promise.all([parseCSV(file1), parseCSV(file2)]);
  const result = new Set();

  for (const [user, products] of data2.entries()) {
    if (data1.has(user)) {
      for (const product of products) {
        if (!data1.get(user).has(product)) {
          result.add(user);
          break;
        }
      }
    }
  }

  console.log(Array.from(result));
}

findUsers("day1.csv", "day2.csv").catch(console.error);

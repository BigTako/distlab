function getMaxCandies(pinatas) {
  var N = pinatas.length;
  var B = new Array(N + 2);
  B[0] = 1;
  B[N + 1] = 1;

  for (var i = 1; i <= N; i++) B[i] = pinatas[i - 1];

  var dp = new Array(N + 2);
  for (var i = 0; i < dp.length; i++) {
    dp[i] = new Array(N + 2).fill(0);
  }

  for (var length = 1; length < N + 1; length++) {
    for (var left = 1; left < N - length + 2; left++) {
      var right = left + length - 1;
      for (var last = left; last < right + 1; last++) {
        dp[left][right] = Math.max(
          dp[left][right],
          dp[left][last - 1] +
            B[left - 1] * B[last] * B[right + 1] +
            dp[last + 1][right]
        );
      }
    }
  }
  return dp[1][N];
}

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question(
  "Enter the array of numbers (separated by coma): ",
  (input) => {
    const pinatas = input.split(",").map(Number);
    const result = getMaxCandies(pinatas);
    console.log(`Max amount of candies: ${result}`);
    readline.close();
  }
);

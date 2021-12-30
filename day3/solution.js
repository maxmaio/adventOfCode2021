var fs = require('fs');
var input = fs.readFileSync('input.txt')
              .toString()
              .split("\n")
              .map(x => x.split(""));

let count = Array(12).fill(0);
for (let i= 0 ; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        if (input[i][j] === "1") {
            count[j]++;
        }
        else {
            count[j]--;
        }
    }
}

let epsilonRate = [];
let gammaRate = [];
for (let i = 0; i < count.length; i++) {
    if (count[i] > 0) {
        epsilonRate.push(0);
        gammaRate.push(1);
    }
    else {
        epsilonRate.push(1);
        gammaRate.push(0);
    }
}
gammaRate = parseInt(gammaRate.join(""), 2);
epsilonRate = parseInt(epsilonRate.join(""), 2);
console.log("part 1: " + (gammaRate * epsilonRate));
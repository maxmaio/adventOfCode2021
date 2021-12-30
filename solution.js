var fs = require('fs');
var input = fs.readFileSync('input.txt')
              .toString()
              .trim()
              .split("\n")
              .map((num) => parseInt(num));
let prev = input[0];
let count = 0;
for (let i = 0; i < input.length; i++) {
    if (prev < input[i]) {
        count++;
    }
    prev = input[i];
}
console.log(count);
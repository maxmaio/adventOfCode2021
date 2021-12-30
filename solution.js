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
console.log("part 1:" + count);

// Part 2
let a = 0;
let b = 0;
let c = 0;
count = 0;
for (let i = 0; i < input.length-3; i++) {
    a = input[i];
    b = input[i+1];
    c = input[i+2];
    d = input[i+3];
    let current = a + b + c;
    let next = b + c + d;
    if (current < next) {
        count++;
    }
}
console.log("part 2:" + count);
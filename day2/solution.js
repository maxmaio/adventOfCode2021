var fs = require('fs');
var input = fs.readFileSync('input.txt')
              .toString()
              .split("\n");

let x = 0;
let y = 0;
let curr;
for(let i = 0; i < input.length; i++) {
    curr = input[i].split(" ");
    if (curr[0] === "forward") {
        x += parseInt(curr[1]);
    }
    if(curr[0] === "up") {
        y-= parseInt(curr[1]);
    }
    if(curr[0] === "down") {
        y+= parseInt(curr[1]);
    }
}

console.log("part 1: " + (x * y));

// Part 2


x = 0;
y = 0;
aim = 0;

for(let i = 0; i < input.length; i++) {
    curr = input[i].split(" ");
    if (curr[0] === "forward") {
        x += parseInt(curr[1]);
        y += (parseInt(curr[1]) * aim);
    }
    if(curr[0] === "up") {
        aim -= parseInt(curr[1]);
    }
    if(curr[0] === "down") {
        aim += parseInt(curr[1]);
    }
}
console.log("part 2: " + (x *y));
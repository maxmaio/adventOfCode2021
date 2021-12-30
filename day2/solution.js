var fs = require('fs');
var input = fs.readFileSync('input.txt')
              .toString()
              .split("\n");
console.log(input);
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

console.log(x * y);
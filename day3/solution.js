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

//part 2
let part2Input = fs.readFileSync('input.txt')
              .toString()
              .split("\n")
let oxygenList = part2Input;
let co2List = part2Input;

for (let i = 0; i < input[0].length; i++) {
    if (oxygenList.length > 1) {
        let oxygencount = 0;
        oxygenList.forEach(binaryString =>{
            if (binaryString.charAt(i) === "0") {
                oxygencount--;
            } else {
                oxygencount++;
            }
        });

        oxygenList = oxygenList.filter(binaryString => {
            if (oxygencount < 0){
                return binaryString.charAt(i) === "0";
            }
            if (oxygencount >= 0) {
                return binaryString.charAt(i) === "1";
            }
        });
    }

    if (co2List.length > 1) {
        let co2Count = 0;
        co2List.forEach(binaryString =>{
            if (binaryString.charAt(i) === "0") {
                co2Count--;
            } else {
                co2Count++;
            }
        });

        co2List = co2List.filter(binaryString => {
            if (co2Count < 0){
                return binaryString.charAt(i) === "1";
            }
            if (co2Count >= 0) {
                return binaryString.charAt(i) === "0";
            }
        });
    }
}
console.log((parseInt(oxygenList[0],2) * parseInt(co2List[0],2)));

var fs = require('fs');

class Board {
    constructor(block_str, id) {
        this.id = id;
        this.block_str = block_str;
        let rows = block_str.split("\n");
        this.grid = rows.map((row) =>
            row
                .trim()
                .split(/\s+/)
                .map((v) => parseInt(v, 10))
        );

        this.board_size = this.grid.length;

        this.cells = {};
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0; col < this.grid[row].length; col++) {
                let cell = this.grid[row][col];
                this.cells[cell] = [row, col];
            }
        }

        // Top to bottom
        this.bingo_rows = Array(this.board_size).fill(0);

        // Left to right
        this.bingo_cols = Array(this.board_size).fill(0);
    }

    has(number) {
        return Boolean(this.cells[number]);
    }

    /**
     * @returns {Boolean} Returns true if adding the number makes a bingo, otherwise returns false (regardless of whether the number was added or not).
     */
    add(number) {
        if (!this.has(number)) {
            return false;
        }

        let [row, col] = this.cells[number];
        this.bingo_rows[row] += 1;
        this.bingo_cols[col] += 1;

        return this.bingo_rows[row] === 5 || this.bingo_cols[col] === 5;
    }

    hasBingo() {
        return this.bingo_rows.some((row) => row === 5) || this.bingo_cols.some((col) => col === 5);
    }

    print(called) {
        if (!called) {
            console.log(this.block_str);
        }

        let called_lookup = called.reduce((obj, num) => ((obj[num] = true), obj), {});

        let grid_str = this.grid
            .map((row) => {
                let rows = [];
                for (let cell of row) {
                    let padded_cell = String(cell).padStart(2);
                    rows.push(called_lookup[cell] ? green(padded_cell) : red(padded_cell));
                }

                return rows.join(" ");
            })
            .join("\n");

        console.log(grid_str);
    }

    getUncalled(called) {
        let called_lookup = called.reduce((obj, num) => ((obj[num] = true), obj), {});
        let uncalled = [];
        for (let num_str of Object.keys(this.cells)) {
            if (!called_lookup[num_str]) {
                uncalled.push(parseInt(num_str, 10));
            }
        }

        return uncalled;
    }

    getScore(called) {
        let uncalled = this.getUncalled(called);
        let uncalled_sum = uncalled.reduce((a, b) => a + b, 0);
        return uncalled_sum * called[called.length - 1];
    }
}

class Bingo {
    /**
     * @param {Number[]} numbers
     * @param {Board[]} boards
     */
    constructor(numbers, boards) {
        // Start at -1 so "pick next" will pick the first one
        this.picked = -1;
        this.numbers = numbers;
        this.boards = boards;

        this.called = [];
    }

    pickNext() {
        this.picked++;
        let number = this.numbers[this.picked];
        this.called.push(number);

        let bingos = [];
        for (let board of this.boards) {
            // For part two, make sure we don't double count boards that already won
            if (board.hasBingo()) {
                continue;
            }

            // If adding the number caused a bingo, add the board to our winners
            if (board.add(number)) {
                bingos.push(board);
            }
        }

        if (bingos.length > 0) {
            return bingos;
        }

        return false;
    }
}

let input = fs.readFileSync('input.txt')
                .toString()
                .trim()
                .split("\n\n")
                .reduce(
                    (obj, block, i) => {
                        if (i === 0){
                            obj.numbers = block.split(",").map(x => parseInt(x, 10));
                        } else{
                            obj.boards.push(new Board(block, i - 1));
                        }
                        return obj;
                    },
                    {numbers: undefined, boards: [] }
                );

// Part 1

let game = new Bingo(input.numbers, input.boards);

let winning_boards;

while (!winning_boards) {
    winning_boards = game.pickNext();
}

let [winning_board] = winning_boards;

console.log(winning_board.getScore(game.called));


// Part 2
let game2 = new Bingo(input.numbers, input.boards);

let winningBoards;
let boards_remaining = input.boards.length;

while (boards_remaining > 1) {
    winningBoards = game2.pickNext();
    if (winningBoards) {
        boards_remaining -= winningBoards.length;
    }
}

let [winningBoard] = winningBoards;


console.log(winningBoard.getScore(game2.called));
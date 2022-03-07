class Player {
    constructor() {
        this.inputs = [];
    }
    moves(id) {
        const move = parseInt(id)
        if (!this.inputs.includes(move)) this.inputs.push(move);
        console.log(this.inputs);
    }
}

class Game {
    constructor() {
        this.inputs = [];
        this.won = false;
        this.over = false;
        this.moves = 0;
        this.player = new Player();
        Game.drawBoard();
    }
    handleClick(id, cell) {
        console.log(cell);
        cell.classList.add("player");
        let value = Cell.getValue(id);
        if (value == "") Cell.addInput(id, "x");
        this.player.moves(id);
        console.log(this.player.inputs.length);
        if (this.player.inputs.length >= 3) {
            console.log('here');
            Game.checkWin(this.player.inputs);
        }
        this.gameState();
        this.moves += 1;
    }
    gameState() {
        let message;
        if (this.won == true) {
            this.over = true;
            message = "You won!";
            Game.clearBoard(message);
        };
    }
    restart() {
        this.inputs.length = 0;
        this.won = false;
        this.over = false;
        this.moves = 0;
        this.player.inputs = 0;

    }
    // static playerMoves() {
    //     const cells = document.querySelectorAll(".cell");
    //     cells.forEach(cell => {
    //         cell.addEventListener("click", function (cell) {
    //             let id = cell.target.dataset.index;
    //             game.handleClick(id, cell.target);
    //         })
    //     })

    // }
    static clearBoard(message) {
        let result = document.querySelector("#result");
        result.innerHTML = message;
        setTimeout(() => Game.newGame(), 3000);
    }
    static drawBoard() {
        console.log("Drew board");
        let board = document.querySelector("#board");
        board.innerHTML = `<div class="cell" data-index="1"></div>
        <div class="cell" data-index="2"></div>
        <div class="cell" data-index="3"></div>
        <div class="cell" data-index="4"></div>
        <div class="cell" data-index="5"></div>
        <div class="cell" data-index="6"></div>
        <div class="cell" data-index="7"></div>
        <div class="cell" data-index="8"></div>
        <div class="cell" data-index="9"></div>`
    }
    static newGame() {
        // let board = document.querySelector("#board");
        // while (board.firstChild) {
        //     // board.firstChild.remove()
        //     console.log(board.firstChild.innerHTML);
        // }
        cells.forEach(cell => {
            console.log(cell.innerHTML);
            cell.innerHTML = "";
        })
        Game.drawBoard();
    }

    static checkWin(playerInputs) {
        console.log("in check win");
        console.log(playerInputs);
        const combos =
            [[1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [1, 5, 9],
            [3, 5, 7]];
        combos.forEach(combo => {
            // const result = combo.includes(val => combo.every(val));
            if (combo.every(val => playerInputs.includes(val))) game.won = true;
        });
    }
}
class Cell {
    static addInput(id, input) {
        let cell = document.querySelector(`div[data-index="${id}"]`);
        cell.innerHTML = input;
        game.inputs[id - 1] = input;
        console.log(game.inputs);
    }
    static getValue(id) {
        let cell = document.querySelector(`div[data-index="${id}"]`);
        return cell.innerHTML;
    }
}

let game = new Game();
// let gam = new Game();
// Game.playerMoves();

document.querySelector("#restart").addEventListener("click", () => {
    console.log(game);
    game.restart();
    console.log(game);
    Game.newGame();
    // Game.drawBoard();

});

const cells = document.querySelectorAll(".cell");
cells.forEach(cell => {cell.addEventListener("click", function(cell){
    let id = cell.target.dataset.index;
    game.handleClick(id, cell.target);
})})


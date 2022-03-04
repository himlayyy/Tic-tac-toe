class Player {
    constructor() {
        this.moves = [];
    }
}
class Game {
    constructor() {
        this.usedCells = [];
        this.over = false;
        this.totalMoves = 0;
        this.player = new Player();
        Board.drawBoard();
    }
    handleClick(id) {
        if (this.over == true) {
            Board.disableBoard();
        }        
        else{
            if (Board.getCellVal(id) === "") Board.addCellVal(id, "X");
            this.newMove(parseInt(id));

            if (this.totalMoves >= 3) {
                this.checkWin(this.player.moves);
            }
        }
    }
    newMove(id) {
        console.log(this.usedCells.includes(id))

        if (!this.usedCells.includes(id)) {
            this.player.moves.push(id);
            this.usedCells.push(id);
            this.totalMoves += 1;
            console.log('new move added');
        }
    }
    restartGame() {
        this.usedCells.length = 0;
        this.over = false;
        this.totalMoves = 0;
        this.player.moves.length = 0;

        Board.redrawBoard();
    }
    checkWin(playerMoves) {
        console.log("in checkWin");
        const combos =
            [[1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [1, 5, 9],
            [3, 5, 7]];
        console.log(playerMoves);
        combos.forEach(combo => {
            if (combo.every(val => playerMoves.includes(val))) {
                this.over = true;
                console.log(combo);
                console.log("You won");
                Board.disableBoard();
            };
        })

    }
}

class Board {
    static drawBoard() {
        console.log("Drawing board");
        let board = document.getElementById("board");
        board.innerHTML = `<div class="cell" data-index="1"></div>
        <div class="cell" data-index="2"></div>
        <div class="cell" data-index="3"></div>
        <div class="cell" data-index="4"></div>
        <div class="cell" data-index="5"></div>
        <div class="cell" data-index="6"></div>
        <div class="cell" data-index="7"></div>
        <div class="cell" data-index="8"></div>
        <div class="cell" data-index="9"></div>`
        console.log("Board drawn");

        Board.cellListener();
    }
    static cellListener() {
        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => cell.addEventListener("click", (e) => {
            clicked(e.target);
        }));
    }
    static addCellVal(id, input) {
        let cell = document.querySelector(`div[data-index="${id}"]`);
        cell.textContent = input;
        // game.inputs[id-1] = input;
        cell.classList.add("player");

    }
    static getCellVal(id) {
        let cell = document.querySelector(`div[data-index="${id}"]`);
        return cell.textContent;
    }
    static redrawBoard() {
        console.log("Redrawing");
        let cells = document.querySelectorAll("cell");
        cells.forEach(cell => {
            cell.classList.remove("player");
            cell.textContent = "";
        })
        Board.drawBoard();
    }
    static disableBoard() {
        let cells = document.querySelectorAll("cell")
        cells.forEach(cell => cell.removeEventListener("click", clicked));
    }
}
function clicked(cell) {
    const id = cell.getAttribute("data-index");
    game.handleClick(id);
}

let game = new Game();
const restart = document.getElementById("restart");
restart.addEventListener("click", () => {
    console.log("Clicked redraw")
    game.restartGame();
    console.log("Restarted board");
})
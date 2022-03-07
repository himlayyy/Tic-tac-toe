class Player {
    constructor(letter) {
        this.moves = [];
        this.letter = letter;
    }
}
class Game {
    constructor() {
        this.usedCells = [];
        this.over = false;
        this.won = false;
        this.totalMoves = 0;
        this.gameWon = false;

        this.player1 = new Player("x");
        this.player2 = new Player("o");
        this.active = this.player1;
        Board.drawBoard();
    }

    setActive() {
        let active;
        if (this.active == this.player1) {
            active = this.player2;
        }
        else {
            active = this.player1;
        }
        this.active = active;
    }
    handleClick(id) {
        if (this.over == true) {
            Board.disableBoard();
        }
        else {
            if (Board.getCellVal(id) === "") Board.addCellVal(id, this.active.letter);

            this.newMove(parseInt(id));
            
            if (this.totalMoves >= 3) {
                this.checkWin(this.active.moves, this.active.letter);
            }
            // Gives the next move to other player
            this.setActive();
        }
    }
    newMove(id) {
        // Checks if the cell is in the moves array, meaning it's not empty/cell has a player move

        if (!this.usedCells.includes(id)) {
            this.active.moves.push(id);
            this.usedCells.push(id);
            this.totalMoves += 1;
            console.log("New move added")
        }
    }
    restartGame() {
        this.active = this.player1;
        this.usedCells.length = 0;
        this.over = false;
        this.won = false;
        this.totalMoves = 0;
        this.player1.moves.length = 0;
        this.player2.moves.length = 0;

        Board.redrawBoard();
    }
    checkWin(playerMoves, letter) {
        // Checks if the player has a winning combo
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
            if (combo.every(val => playerMoves.includes(val))) {
                this.over = true;
                this.won = true;
                this.gameResult(this.won, letter);
            }
            
        });
        if ((this.totalMoves === 9) && (this.won === false)) {
            this.gameResult(this.won, "");
        };
    }

    gameResult(result, letter) {
        // If this.won = true: a player has won the game. Checks which player to display player name
        // If this.won = false: game ends in a tie
        let res = document.querySelector("#result");
        let message = document.createElement("div");
        if (result === true) {
            message.innerText = `Player ${letter.toUpperCase()} has won!`;
        }
        else {
            message.innerText = "It's a tie";
        }

        res.append(message);
        Board.disableBoard();
    }
}

class Board {
    static drawBoard() {
        // Draws the board
        let board = document.getElementById("board");
        board.innerHTML = `<div class="box cell" data-index="1"></div>
        <div class="box cell" data-index="2"></div>
        <div class="box cell" data-index="3"></div>
        <div class="box cell" data-index="4"></div>
        <div class="box cell" data-index="5"></div>
        <div class="box cell" data-index="6"></div>
        <div class="box cell" data-index="7"></div>
        <div class="box cell" data-index="8"></div>
        <div class="box cell" data-index="9"></div>`

        Board.cellListener();
    }
    static cellListener() {
        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => cell.addEventListener("click", (e) => {
            // Evaluates cell contents;
            clicked(e.target);
        }));
        cells.forEach(cell => cell.addEventListener("mouseover", (e) => {
            // Evaluates cell contents
            cellHover(e.target);
        }));
        cells.forEach(cell => cell.addEventListener("mouseout", (e) => {
            // Evaluates cell contents
            cellMouseOut(e.target);
        }));

    }
    static addCellVal(id, input) {
        let cell = document.querySelector(`div[data-index="${id}"]`);
        cell.textContent = input;
        cell.classList.remove("hover");
        cell.classList.add(`player-${input}`);

    }
    static getCellVal(id) {
        let cell = document.querySelector(`div[data-index="${id}"]`);
        return cell.textContent;
    }
    static redrawBoard() {
        // Clears cells of styling and player moves
        let cells = document.querySelectorAll("cell");
        cells.forEach(cell => {
            cell.classList.remove("player");
            cell.textContent = "";
        })
        // Removes gameResult message
        let res = document.querySelector("#result");
        if (res.hasChildNodes()) res.firstChild.remove();

        Board.drawBoard();
    }
    static disableBoard() {
        let cells = document.querySelectorAll("cell")
        cells.forEach(cell => cell.removeEventListener("click", clicked));

        cells.forEach(cell => cell.removeEventListener("mouseover", cellHover));
        cells.forEach(cell => cell.removeEventListener("mouseout", cellMouseOut));
    }
}
function clicked(cell) {
    const id = cell.getAttribute("data-index");
    game.handleClick(id);
}
function cellHover(cell) {
    if (!cell.classList.contains("player-x") && !cell.classList.contains("player-o")) {
        cell.classList.toggle("hover");
    }
}
function cellMouseOut(cell) {
    if (cell.classList.contains("hover")) {
        cell.classList.remove("hover");
    }
}

let game = new Game();
const restart = document.getElementById("restart");
restart.addEventListener("click", () => {
    game.restartGame();
})
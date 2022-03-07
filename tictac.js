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
        this.totalMoves = 0;
        this.gameWon = false;
        // this.player = new Player("y");
        // this.other = new Player();
        // this.players = [this.player, this.other];
        this.player1 = new Player("x");
        this.player2 = new Player("o");
        this.active = this.player1;
        Board.drawBoard();
    }


    // To do before ko makalimot ani ugma. So what im trying to do with setActive is make player point to a different instance of Player()

    // Ang point nga dili nako usbon ang player sa class functions is kapoy hahaha

    // I'm trying to see if player.property works. ang intended result is like this: player.letter can switch between this.player1.letter OR this.player2.letter
    setActive(){
        let active;
        if (this.active == this.player1){
            active = this.player2;
        }
        else{
            active = this.player1;
        }
        this.active = active;
    }
    handleClick(id) {
        if (this.over == true) {
            Board.disableBoard();
        }        
        else{
            // if (Board.getCellVal(id) === "") Board.addCellVal(id, this.player.letter);
            if (Board.getCellVal(id) === "") Board.addCellVal(id, this.active.letter);
            this.newMove(parseInt(id));
            // So nauna ug switch before siya midung sa 
            console.log("New Move added");
            console.log(this.totalMoves)
            
            if (this.totalMoves === 9 ){
                console.log("total moves = 9")
                this.won = false;
                this.gameResult(this.won, "");
                console.log(this.won);
            }

            else if (this.totalMoves >= 3) {
                // this.checkWin(this.player.moves);
                console.log("total moves are 3+")
                this.checkWin(this.active.moves, this.active.letter);
            }
            this.setActive();
        }
    }
    newMove(id) {
        console.log(this.usedCells.includes(id))

        if (!this.usedCells.includes(id)) {
            // this.player.moves.push(id);
            this.active.moves.push(id);
            this.usedCells.push(id);
            this.totalMoves += 1;
            
            console.log('new move added');
            console.log(this.active);
            console.log(this.active.moves);
        }
    }
    restartGame() {
        this.active = this.player1;
        this.usedCells.length = 0;
        this.over = false;
        this.totalMoves = 0;
        this.player1.moves.length = 0;
        this.player2.moves.length = 0;

        Board.redrawBoard();
    }
    checkWin(playerMoves, letter) {
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
        console.log(playerMoves, letter);
        combos.forEach(combo => {
            if (combo.every(val => playerMoves.includes(val))) {
                this.over = true;
                this.won = true;
                console.log(playerMoves);
                console.log(combo);
                this.gameResult(this.won,letter)
            };
        })
    }
    gameResult(result, letter){
        console.log("in game result!")
        console.log(result);
        let res = document.querySelector("#result");
        let message = document.createElement("div");
        if(result == true){
            message.innerText = `${letter} has won!`;
        }
        else{
            message.innerText = "It's a tie";
        }
        res.append(message);
        console.log(message);
        
        Board.disableBoard();
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

        let res = document.querySelector("#result");
        console.log(res.child);
        if(res.hasChildNodes()) res.firstChild.remove();
       
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
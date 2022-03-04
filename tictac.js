class Player{
    constructor(){
        this.moves = [];
    }
    move(id){
        const move = parseInt(id)
    }
}
class Game {
    constructor(){
    //     this.usedCells = [];
    //     this.over = false;
    //     this.totalMoves = 0;
    //     let player = new Player();
        Board.drawBoard();
    }
    static handleClick(id) {
        if (Board.getCellVal(id) === "") Board.addCellVal(id, "X");
        // player.moves.append(id);        
        // this.usedCells.append(id);

        // this.totalMoves += 1;
        // console.log(player.moves);
        // console.log(this.usedCells);
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
        cells.forEach(cell => cell.addEventListener("click", cell => {
            console.log(cell.target);
            const id = cell.target.getAttribute("data-index");
            Game.handleClick(id);
        }))
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
}
// Board.drawBoard();
let game = new Game();
const restart = document.getElementById("restart");
restart.addEventListener("click", () => {
    console.log("Clicked redraw")
    Board.redrawBoard();
    console.log("Restarted board");
})
class Player{
    constructor(){
        this.inputs = [];
    }
    moves(id){
        if(!player.inputs.includes(id)) this.inputs.push(parseInt(id));
        console.log(player.inputs);
    }
}
class Game{
    constructor(){
        this.inputs = [];
        this.won = false;
        this.over = false;
        this.moves = 0;        
    }
    // }
    static handleClick(id){        
        let value = Cell.getValue(id);
        if(value == "") Cell.addInput(id, "x");
        player.moves(id);
        console.log(player.inputs.length);
        if (player.inputs.length >= 3){   
            console.log('here');     
            Game.checkWin(player.inputs);
        }
        Game.gameState();
        game.moves += 1;
    }
    static gameState(){
        if(game.won == true) {
            game.over = true;
            console.log("Game over");
        };
    }
    static checkWin(playerInputs){
        console.log("in check win");
        console.log(playerInputs);
        const combos =
       [ [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,4,7],
        [2,5,8],
        [3,6,9],
        [1,5,9],
        [3,5,7]];        
        combos.forEach(combo => {
            // const result = combo.includes(val => combo.every(val));
            if (combo.every(val => playerInputs.includes(val))) game.won = true;
        });
                
    }
}
class Cell{
    static addInput(id, input){
        let cell = document.querySelector(`div[data-index="${id}"]`);
        cell.innerHTML = input;
        game.inputs[id-1] = input;
        console.log(game.inputs);
    }
    static getValue(id){
        let cell = document.querySelector(`div[data-index="${id}"]`); 
        return cell.innerHTML;
    }
}

let game = new Game();
let player = new Player();

    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {cell.addEventListener("click", function(cell){
        let id = cell.target.dataset.index;
        Game.handleClick(id);
})})
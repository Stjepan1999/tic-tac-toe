const gameboard = (function(){
    const board = ['X', 'O', 'X', 'X', '0', 'O', 'O', 'X', 'O']


    const showBoard = () => {
        const gameboardDiv = document.querySelector(".gameboard")
        for (let i = 0; i < board.length; i++) {
            //Select cell by ID and current index
            const gameboardCell = document.querySelector(`#square${i+1}`); 
            gameboardCell.textContent = board[i]
            console.log(board[i])
        }
    };

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
    }

    return {showBoard, resetBoard}
})()


function createPlayer(name, symbol) {
    const player = {
        playerName: name,
        playerSymbol: symbol
    }

    return {player}
}

gameboard.showBoard()
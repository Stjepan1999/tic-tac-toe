const gameboard = (function(){
    const board = ['', '', '', '', '', '', '', '', '']


    const showBoard = () => {return board};

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
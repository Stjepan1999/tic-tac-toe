const gameboard = (function(){
    const board = ['', '', '', '', '', '', '', '', '']


    const showBoard = () => {
        const gameboardDiv = document.querySelector(".gameboard")
        for (let i = 0; i < board.length; i++) {
            //Select cell by ID and current index
            const gameboardSquare = document.querySelector(`#square${i+1}`); 
            gameboardSquare.textContent = board[i]
        }
    };


    const makeMove = (index, symbol) => {
        if (board[index] === '') {
            board[index] = symbol
        }
    }

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
    }

    return {showBoard, resetBoard, makeMove}
})()


function gameController() {

    const players = [
        {
        playerName: "Player one",
        playerSymbol: "X"
    }, {
        playerName: "Player two",
        playerSymbol: "O"
    }
    ]

    let activePlayerIndex = 0;

    const getActivePlayer = () => {
        console.log("test")
        return players[activePlayerIndex]}

    const switchPlayers = () => {
        activePlayerIndex = 1 - activePlayerIndex
    }

    return {getActivePlayer, switchPlayers}
}


const game = gameController()

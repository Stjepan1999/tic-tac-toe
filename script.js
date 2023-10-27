const gameboard = (function(){
    const board = ['', '', '', '', '', '', '', '', '']


    const showBoard = () => {
        for (let i = 0; i < board.length; i++) {
            //Select cell by ID and current index
            const gameboardSquare = document.querySelector(`#square${i+1}`); 
            gameboardSquare.textContent = board[i]
        }
    };


    const makeMove = (index, symbol) => {
        if (board[index] === '') {
            board[index] = symbol;
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
    const board = gameboard
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
        return players[activePlayerIndex]
    }
    
    const switchPlayers = () => {
        activePlayerIndex = 1 - activePlayerIndex
    }

    const playRound = (index) => {
        console.log(`${getActivePlayer().playerName} puts symbol to square ${index + 1}`);
        board.makeMove(index, getActivePlayer().playerSymbol);
        board.showBoard()

        switchPlayers();
        printNewRound();

    }

    const printNewRound = () => {
        board.showBoard();
        console.log(`${getActivePlayer().playerName}'s turn.`)
    }

    printNewRound()

    return {getActivePlayer, switchPlayers, playRound}
}


const game = gameController()


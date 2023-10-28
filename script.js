const gameboard = (function(){
    const board = ['', '', '', '', '', '', '', '', '']

    const getBoard = () => {return board}

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

    return {showBoard, resetBoard, makeMove, getBoard}
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

        checkWinner()
        switchPlayers();
        printNewRound();

    }

    const checkWinner = () => {
        const winningCombinations = [
            [0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]
        ];

        let isWinner;
        for (const combination of winningCombinations) {
            isWinner = true;
            for (const position of combination) {  
                //If there is no winner at each combination, 
                //exit the loop and check for other combination            
                if (board.getBoard()[position] !== getActivePlayer().playerSymbol) {
                    isWinner = false;
                    break
                }
            }
            
            if (isWinner) {
                console.log("Winner is: ", getActivePlayer().playerName)
                break
            }
        }
        //Checking if it is tie, if no empty space and no winner it is tie
        if (!board.getBoard().includes('') && !isWinner) {
            console.log("It is tie")
        }
    }

    const printNewRound = () => {
        console.log(`${getActivePlayer().playerName}'s turn.`)
    }

    printNewRound()

    return {getActivePlayer, switchPlayers, playRound}
}


const game = gameController()


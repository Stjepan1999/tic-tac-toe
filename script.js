const gameboard = (function(){
    const board = ['', '', '', '', '', '', '', '', '']

    const getBoard = () => {return board}

    const showBoard = () => {
        for (let i = 0; i < board.length; i++) {
            //Select cell by ID and current index
            const gameboardButton = document.querySelector(`[data-position="${i+1}"]`); 
            gameboardButton.textContent = board[i]
        }
    };

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
    }

    return {showBoard, resetBoard, getBoard}
})()


function gameController() {
    const board = gameboard
    const players = [
        {
        playerName: "PLAYER ONE",
        playerSymbol: "X",
        playerWins: 0,
    }, {
        playerName: "PLAYER TWO",
        playerSymbol: "O",
        playerWins: 0,
    }
    ]

    let activePlayerIndex = 0;
    let ties = 0;

    const getPlayers = () => players

    const getActivePlayer = () => {
        return players[activePlayerIndex]
    }
    
    const switchPlayers = () => {
        activePlayerIndex = 1 - activePlayerIndex
    }

    const playRound = (index) => {
        if (board.getBoard()[index] === '') {
            board.getBoard()[index] = getActivePlayer().playerSymbol;
            board.showBoard();

            let gameResult = checkWinner();

            //If gameResult return "winner" or "tie" new round is started with player "X"
            if (gameResult === undefined) {
                switchPlayers();
            } else {
                activePlayerIndex = 0;
            }
        }
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
                getActivePlayer().playerWins++
                showResult()
                showDialog()
                board.resetBoard()
                return "winner"
            }
        }
        //Checking if it is tie, if no empty space and no winner it is tie
        if (!board.getBoard().includes('') && !isWinner) {
            ties++
            showResult()
            board.resetBoard()
            return "tie"
        }
    }

    const showResult = () => {
        const playerOneResult = document.querySelector(".player-one-result")
        const tiesDiv = document.querySelector(".ties")
        const playerTwoResult = document.querySelector(".player-two-result")

        playerOneResult.textContent = players[0].playerWins
        playerTwoResult.textContent = players[1].playerWins
        tiesDiv.textContent = ties
    }





    const clickHandlerSquare = () => {
        const buttons = document.querySelectorAll(".gameboard-button")
        buttons.forEach((button) => {
            button.addEventListener("click", (event) => {
                const position = event.target.getAttribute("data-position") - 1
                if (board.getBoard()[position] === '') {
                    button.textContent = getActivePlayer().playerSymbol;
                }
                playRound(position)
                showCurrentPlayer()
            });
        })
    }

    const showCurrentPlayer = () => {
        const playerInfoDiv = document.querySelector(".player-info");
        playerInfoDiv.textContent = `${getActivePlayer().playerName}'S TURN`
    }

    const showDialog = () => {
        const dialog = document.querySelector("dialog")
        dialog.style.display = "flex";

        const resultMessage = document.querySelector(".dialog-message")
        resultMessage.textContent = `${getActivePlayer().playerName} WON THE ROUND`

        const nextRoundButton = document.querySelector(".next-round-button")
        nextRoundButton.addEventListener("click", () => {
            dialog.style.display = "none";
            board.showBoard()
        })
    }



    clickHandlerSquare()


    return {getActivePlayer, switchPlayers, playRound, getPlayers}
}


gameController()

const statusDisplay = document.querySelector('.game-status');

let gamActive = true;
let currentPlayer = 'x';
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => {
    return `player ${currentPlayer} has won`;
}

const drawMessage = () => {
    return `Game ended draw`;
}

const currentPlayerTurn = () => {
    return `player ${currentPlayer} has won`;
}

statusDisplay.innerHTML = currentPlayerTurn();

const winningCondition = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "x" ? "o" : "x";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningCondition.length; i++) {
        const winCondition = winningCondition[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gamActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gamActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gamActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gamActive = true;
    currentPlayer = 'x';
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll(".cell").forEach(cell => cell.innerHTML = "")
}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick))
document.querySelector('.game-restart').addEventListener('click', handleRestartGame);
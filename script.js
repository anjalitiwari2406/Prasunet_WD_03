// script.js
const cells = document.querySelectorAll('.cell');
const statusMessage = document.querySelector('.status-message');
const restartButton = document.querySelector('.restart-button');
const historyList = document.querySelector('.history-list');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameHistory = [];

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    checkResult();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusMessage.innerHTML = `Player ${currentPlayer}'s turn`;
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusMessage.innerHTML = `Player ${currentPlayer} wins!`;
        gameHistory.push(`Player ${currentPlayer} won.`);
        updateHistory();
        gameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        statusMessage.innerHTML = "Game ended in a draw!";
        gameHistory.push("Draw");
        updateHistory();
        gameActive = false;
        return;
    }
}

function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.innerHTML = "");
    statusMessage.innerHTML = `Player ${currentPlayer}'s turn`;
}

function updateHistory() {
    historyList.innerHTML = "";
    gameHistory.forEach((result, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Game ${index + 1}: ${result}`;
        historyList.appendChild(listItem);
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

// Initial message setup
statusMessage.innerHTML = `Player ${currentPlayer}'s turn`;

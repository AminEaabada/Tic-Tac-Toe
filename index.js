let cells = Array.from(document.querySelectorAll('.cell'));
const statusElement = document.getElementById('status');
const newGameButton = document.getElementById('new-game');
const restartButton = document.getElementById('restart');
let currentPlayer = 'X';
let winner = null;
let playerXWins = 0;
let playerOWins = 0;

function makeMove(index) {
    if (!cells[index].textContent && !winner) {
        cells[index].textContent = currentPlayer;
        cells[index].classList.add(currentPlayer);

        if (checkWinner(currentPlayer)) {
            winner = currentPlayer;
            statusElement.textContent = `${winner} wins!`;
            highlightWinnerCells();
            updateScore();
        } else if ([...cells].every(cell => cell.textContent)) {
            statusElement.textContent = "It's a draw!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusElement.textContent = `Current player: ${currentPlayer}`;
        }
    }
}

function checkWinner(player) {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winningCombos.some(combo => combo.every(index => cells[index].classList.contains(player)));
}

function highlightWinnerCells() {
    cells.forEach(cell => {
        if (cell.classList.contains(winner)) {
            cell.classList.add('winner');
        }
    });
}

function updateScore() {
    if (winner === 'X') {
        playerXWins++;
    } else if (winner === 'O') {
        playerOWins++;
    }
    statusElement.textContent = `Player X: ${playerXWins} - Player O: ${playerOWins}`;
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O', 'winner');
    });
    currentPlayer = 'X';
    winner = null;
    statusElement.textContent = `Current player: ${currentPlayer}`;
}

function newGame() {
    resetGame();
    playerXWins = 0;
    playerOWins = 0;
    statusElement.textContent = `Player X: ${playerXWins} - Player O: ${playerOWins}`;
}

newGameButton.addEventListener('click', newGame);
restartButton.addEventListener('click', resetGame);

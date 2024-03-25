const ROWS = 6;
const COLS = 7;
const board = [];
let currentPlayer = 1;

function createBoard() {
    const boardContainer = document.getElementById('board');

    for (let i = 0; i < ROWS; i++) {
        board[i] = [];
        for (let j = 0; j < COLS; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            board[i][j] = 0;
            boardContainer.appendChild(cell);
        }
    }

    boardContainer.addEventListener('click', handleClick);
}

function resetBoard() {
    const boardCells = document.querySelectorAll('.cell');
    boardCells.forEach(cell => {
        cell.classList.remove('player-one', 'player-two');
        cell.style.backgroundColor = 'white';
    });
    for (let i = 0; i < ROWS; i++) {
        board[i].fill(0);
    }
    currentPlayer = 1;
}

function handleClick(event) {
    const clickedCell = event.target;
    const row = parseInt(clickedCell.dataset.row);
    const col = parseInt(clickedCell.dataset.col);

    for (let i = ROWS - 1; i >= 0; i--) {
        if (board[i][col] === 0) {
            board[i][col] = currentPlayer;
            clickedCell.classList.add(currentPlayer === 1 ? 'player-one' : 'player-two');
            checkWin(i, col);
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            break;
        }
    }
}

function checkWin(row, col) {
    const directions = [
        [-1, 0], // up
        [1, 0], // down
        [0, -1], // left
        [0, 1], // right
        [-1, -1], // up-left
        [-1, 1], // up-right
        [1, -1], // down-left
        [1, 1] // down-right
    ];

    for (let direction of directions) {
        let count = 1;
        const [dx, dy] = direction;

        for (let i = 1; i < 4; i++) {
            const newRow = row + dx * i;
            const newCol = col + dy * i;

            if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS && board[newRow][newCol] === currentPlayer) {
                count++;
            } else {
                break;
            }
        }

        for (let i = 1; i < 4; i++) {
            const newRow = row - dx * i;
            const newCol = col - dy * i;

            if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS && board[newRow][newCol] === currentPlayer) {
                count++;
            } else {
                break;
            }
        }

        if (count >= 4) {
            alert(`Player ${currentPlayer} wins!`);
            resetBoard();
            break;
        }
    }
}

createBoard()
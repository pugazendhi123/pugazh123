let currentPlayer = 'X';
let cells = Array.from(document.querySelectorAll('.cell'));
let messageContainer = document.getElementById('message');
let winnerDisplay = document.createElement('p');
winnerDisplay.classList.add('big-text');

function handleClick(index) {
    if (cells[index].innerText === '') {
        cells[index].innerText = currentPlayer;
        if (checkWin()) {
            winnerDisplay.innerHTML = `<span style="font-weight:bold">${currentPlayer} wins!</span>`;
            messageContainer.innerHTML = '';
            messageContainer.appendChild(winnerDisplay);
            cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
        } else if (cells.every(cell => cell.innerText !== '')) {
            messageContainer.innerText = "It's a draw!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            messageContainer.innerText = `${currentPlayer}'s turn`;
        }
    }
}

function checkWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winConditions.some(condition => {
        const [a, b, c] = condition;
        return cells[a].innerText !== '' && cells[a].innerText === cells[b].innerText && cells[a].innerText === cells[c].innerText;
    });
}

function reset() {
    cells.forEach(cell => {
        cell.innerText = '';
        cell.addEventListener('click', handleCellClick);
    });
    currentPlayer = 'X';
    messageContainer.innerText = `${currentPlayer}'s turn`;
}

function handleCellClick(event) {
    const index = cells.indexOf(event.target);
    handleClick(index);
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));

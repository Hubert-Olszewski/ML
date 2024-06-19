document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('minesweeper');
    const width = 10;
    const height = 10;
    const mineCount = 20;
    let mineArray = Array(mineCount).fill('mine');
    let emptyArray = Array(width * height - mineCount).fill('empty');
    let gameArray = emptyArray.concat(mineArray);
    let shuffledArray = gameArray.sort(() => Math.random() - 0.5);

    // Create the board
    function createBoard() {
        for (let i = 0; i < width * height; i++) {
            const cell = document.createElement('div');
            cell.setAttribute('id', i);
            cell.classList.add('cell');
            grid.appendChild(cell);

            // Add event listener to cell
            cell.addEventListener('click', () => {
                revealCell(cell, i);
            });
        }

        for (let i = 0; i < shuffledArray.length; i++) {
            const cell = document.getElementById(i);
            if (shuffledArray[i] === 'mine') {
                cell.dataset.mine = 'true';
            }
        }
    }

    // Reveal cell and handle game logic
    function revealCell(cell, index) {
        if (cell.classList.contains('revealed')) return;
        cell.classList.add('revealed');

        if (cell.dataset.mine) {
            cell.innerHTML = '💣';
            alert('Game Over!');
            revealAllMines();
            return;
        }

        let total = 0;
        const isLeftEdge = (index % width === 0);
        const isRightEdge = (index % width === width - 1);

        // Check surrounding cells
        const surroundingCells = [
            index - width - 1, index - width, index - width + 1,
            index - 1, index + 1,
            index + width - 1, index + width, index + width + 1
        ];

        for (let i of surroundingCells) {
            if (i >= 0 && i < width * height) {
                if (shuffledArray[i] === 'mine') total++;
            }
        }

        if (total > 0) {
            cell.innerHTML = total;
        } else {
            for (let i of surroundingCells) {
                const neighbor = document.getElementById(i);
                if (neighbor) revealCell(neighbor, i);
            }
        }
    }

    function revealAllMines() {
        for (let i = 0; i < width * height; i++) {
            const cell = document.getElementById(i);
            if (cell.dataset.mine) {
                cell.innerHTML = '💣';
                cell.classList.add('revealed');
            }
        }
    }

    createBoard();
});

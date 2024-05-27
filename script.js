let fields = [null, null, null, null, null, null, null, null, null];
let currentPlayer = 'cross';
let gameOver = false;

function init(){
    render();
}

function handleCellClick(index, cell) {
    if (!fields[index] && !gameOver) {
        fields[index] = currentPlayer;

        if (currentPlayer === 'circle') {
            cell.innerHTML = generateCircleSVG();
            currentPlayer = 'cross';
        } else {
            cell.innerHTML = generateCrossSVG();
            currentPlayer = 'circle';
        }

        cell.onclick = null;

        const winner = checkWinner();
        if (winner) {
            gameOver = true;
            drawWinningLine(winner);
        }
    }
}

function render() {
    const contentDiv = document.getElementById('content');
    let tableHTML = '<table>';

    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            let cellContent = '';
            if (fields[index] === 'circle') {
                cellContent = generateCircleSVG();
            } else if (fields[index] === 'cross') {
                cellContent = generateCrossSVG();
            }
            tableHTML += `<td onclick="handleCellClick(${index}, this)">${cellContent}</td>`;
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';
    contentDiv.innerHTML = tableHTML;
}

function generateCircleSVG() {
    const svg = `
        <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="35" r="30" stroke="#00b0ef" stroke-width="5" fill="none">
                <animate 
                    attributeName="stroke-dasharray" 
                    from="0, 188.4" 
                    to="188.4, 188.4" 
                    dur="200ms" 
                    fill="freeze" />
            </circle>
        </svg>
    `;
    return svg;
}

function generateCrossSVG() {
    const svgHTML = `
        <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <line x1="15" y1="15" x2="55" y2="55" stroke="#FFC000" stroke-width="5">
                <animate 
                    attributeName="stroke-dasharray" 
                    from="0, 56.57" 
                    to="56.57, 0" 
                    dur="200ms" 
                    fill="freeze" />
            </line>
            <line x1="15" y1="55" x2="55" y2="15" stroke="#FFC000" stroke-width="5">
                <animate 
                    attributeName="stroke-dasharray" 
                    from="0, 56.57" 
                    to="56.57, 0" 
                    dur="200ms" 
                    fill="freeze" />
            </line>
        </svg>
    `;
    return svgHTML;
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return combination;
        }
    }

    return null;
}


function drawWinningLine(combination) {
    const lineColor = '#ffffff';
    const lineWidth = 5;

    const startCell = document.querySelectorAll(`td`)[combination[0]];
    const endCell = document.querySelectorAll(`td`)[combination[2]];
    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();


    const contentRect = document.getElementById('content').getBoundingClientRect();

    const lineLength = Math.sqrt(
        Math.pow(endRect.left - startRect.left, 2) + Math.pow(endRect.top - startRect.top, 2)  );
        Math.pow(endRect.left - startRect.left, 2) + Math.pow(endRect.top - startRect.top, 2) ;
    const lineAngle = Math.atan2(endRect.top - startRect.top, endRect.left - startRect.left);

  
    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.width = `${lineLength}px`;
    line.style.height = `${lineWidth}px`;
    line.style.backgroundColor = lineColor;
    line.style.transform = `rotate(${ lineAngle }rad)`;
    line.style.top = `${startRect.top + startRect.height / 2 - lineWidth / 2 - contentRect.top}px`;
    line.style.left = `${startRect.left + startRect.width / 2 - contentRect.left}px`;
    line.style.transformOrigin = `top left`;
    document.getElementById('content').appendChild(line);
}

function restartGame(){
    for (let index = 0; index < fields.length; index++) {
        fields[index] = null;        
    }
    render();
}
  



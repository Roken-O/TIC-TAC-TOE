let fields = [null,  null, null, null, null, null, null, null, null];
let currentPlayer = 'cross';

function init(){
    render();
}

function handleCellClick(index, cell) {
    // Prüft, ob das Feld an der Position 'index' im Array 'fields' leer ist
    if (!fields[index]) {
        // Setzt das Feld im Array 'fields' auf den aktuellen Spieler ('circle' oder 'cross')
        fields[index] = currentPlayer;

        // Prüft, welcher Spieler aktuell am Zug ist
        if (currentPlayer === 'circle') {
            // Setzt den HTML-Inhalt der Zelle auf die SVG-Grafik für den Kreis
            cell.innerHTML = generateCircleSVG();
            // Wechselt den aktuellen Spieler zu 'cross'
            currentPlayer = 'cross';
        } else {
            // Setzt den HTML-Inhalt der Zelle auf die SVG-Grafik für das Kreuz
            cell.innerHTML = generateCrossSVG();
            // Wechselt den aktuellen Spieler zu 'circle'
            currentPlayer = 'circle';
        }

        // Entfernt das onclick-Attribut von der Zelle, sodass diese nicht mehr anklickbar ist
        cell.onclick = null;
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
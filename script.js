let fields = [null, 'circle', 'cross', 'circle', null, null, null, null, 'cross'];

function init(){
    render();
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
            tableHTML += `<td>${cellContent}</td>`;
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
            <circle cx="35" cy="35" r="30" stroke="none" fill="#00b0ef">
                <animate 
                    attributeName="fill-opacity" 
                    from="0" 
                    to="1" 
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
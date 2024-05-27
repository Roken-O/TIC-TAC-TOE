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
                cellContent = 'o';
            } else if (fields[index] === 'cross') {
                cellContent = 'x';
            }
            tableHTML += `<td>${cellContent}</td>`;
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';
    contentDiv.innerHTML = tableHTML;
}


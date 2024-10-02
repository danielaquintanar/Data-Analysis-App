const analyzeButton = document.getElementById('analyzeButton');
const dataFile = document.getElementById('dataFile');
const ctx = document.getElementById('dataChart').getContext('2d');

analyzeButton.addEventListener('click', () => {
    const file = dataFile.files[0];
    if (!file) {
        alert("Por favor, selecciona un archivo CSV.");
        return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
        const data = event.target.result;
        processData(data);
    };
    reader.readAsText(file);
});

function processData(data) {
    const rows = data.split('\n').slice(1); // Ignorar la cabecera
    const labels = [];
    const values = [];
    rows.forEach(row => {
        const cols = row.split(',');
        labels.push(cols[0]); // Suponiendo que la primera columna son las etiquetas
        values.push(parseFloat(cols[1])); // Suponiendo que la segunda columna son los valores
    });
    generateChart(labels, values);
}

function generateChart(labels, values) {
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Valores de Proyecto',
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

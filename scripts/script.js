function createTemperatureChart({ canvasId, variableName, labelText, valueElementId }) {
    const ctx = document.getElementById(canvasId).getContext('2d');

    const MAX_POINTS = 10;
    const labels = Array(MAX_POINTS).fill('');
    const dataPoints = Array(MAX_POINTS).fill(null);

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: labelText,
                data: dataPoints,
                borderColor: 'black',
                backgroundColor: 'blue',
                tension: 0.3,
                fill: true,
                borderWidth: 1,
                pointRadius: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            scales: {
                y: {
                    beginAtZero: true,
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 10
                    },
                    title: {
                        display: true,
                        text: '°C'
                    }
                },
                x: {
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10
                    },
                    title: {
                        display: true,
                        text: 'Время'
                    }
                }
            }
        }
    });

    // обновление данных
    setInterval(() => {
        const shmem = new Shmem();
        shmem.loadVariables([{ name: variableName }]).done(vars => {
            const value = vars[0].value;
            const time = new Date().toLocaleTimeString();

            labels.push(time);
            dataPoints.push(value);

            if (labels.length > MAX_POINTS) {
                labels.shift();
                dataPoints.shift();
            }

            chart.update();

            // обновляем цифровое значение, если указано
            if (valueElementId) {
                document.getElementById(valueElementId).textContent = value.toFixed(1) + " °C";
            }
        });
    }, 2000);
}

createTemperatureChart({
    canvasId: 'podacha',
    variableName: 'T1',
    labelText: 'Подача (°C)',
    valueElementId: 'T1'
});

createTemperatureChart({
    canvasId: 'obratka',
    variableName: 'T2',
    labelText: 'Обратка (°C)',
    valueElementId: 'T2'
});

createTemperatureChart({
    canvasId: 'boiler',
    variableName: 'T5',
    labelText: 'Бойлер (°C)',
    valueElementId: 'T5'
});

createTemperatureChart({
    canvasId: 'batarei',
    variableName: 'T4',
    labelText: 'Батареи (°C)',
    valueElementId: 'T4'
});

createTemperatureChart({
    canvasId: 'asiki',
    variableName: 'ASPR',
    labelText: 'Асики (Bar)',
    valueElementId: 'ASPR'
});

createTemperatureChart({
    canvasId: 'otopleniye',
    variableName: 'OTPR',
    labelText: 'Отопление (Bar)',
    valueElementId: 'OTPR'
});

createTemperatureChart({
    canvasId: 'rashod',
    variableName: 'RASHOD',
    labelText: 'Расход (л.ч)',
    valueElementId: 'RASHOD'
});
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
    labelText: 'Температура подачи (°C)',
    valueElementId: 'T1-value'
});

createTemperatureChart({
    canvasId: 'obratka',
    variableName: 'T2',
    labelText: 'Обратка (°C)',
    valueElementId: 'T2-value'
});

createTemperatureChart({
    canvasId: 'boiler',
    variableName: 'T5',
    labelText: 'Бойлер (°C)',
    valueElementId: 'T5-value'
});

createTemperatureChart({
    canvasId: 'batarei',
    variableName: 'T4',
    labelText: 'Батареи (°C)',
    valueElementId: 'T4-value'
});

createTemperatureChart({
    canvasId: 'asiki',
    variableName: 'Pressure_asiki',
    labelText: 'Асики (Bar)',
    valueElementId: 'Asiki-value'
});

createTemperatureChart({
    canvasId: 'otopleniye',
    variableName: 'Pressure-otop',
    labelText: 'Отопление (Bar)',
    valueElementId: 'Otopleniye-value'
});

createTemperatureChart({
    canvasId: 'rashod',
    variableName: 'Flow',
    labelText: 'Расход (л.ч)',
    valueElementId: 'Flow-value'
});

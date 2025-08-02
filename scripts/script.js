function createTemperatureChart({ canvasId, variableName, labelText, valueElementId, unit }) {
    const ctx = document.getElementById(canvasId).getContext('2d');

    const MAX_POINTS = 10;
    const labels = Array(MAX_POINTS).fill('');
    const dataPoints = Array(MAX_POINTS).fill(null);

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                data: dataPoints,
                borderColor: '#4bb3fd',
                backgroundColor: 'transparent', 
                pointBackgroundColor: '#4bb3fd', 
                pointRadius: 3,  
                pointHoverRadius: 5,
                tension: 0.4,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 500,        // длительность анимации (в мс)
                easing: 'easeOutQuart' // плавное замедление
            },
            plugins: {
                legend: {
                    display: false
                }
            },
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
                        text: unit
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


    setInterval(() => {
        const shmem = new Shmem();
        shmem.loadVariables([{ name: variableName }]).done(vars => {
            const value = vars[0].value;
            console.log(variableName, 'value:', value, 'typeof:', typeof value);
            const time = new Date().toLocaleTimeString();

            labels.push(time);
            dataPoints.push(value);

            if (labels.length > MAX_POINTS) {
                labels.shift();
                dataPoints.shift();
            }

            chart.update();

            if (valueElementId) {
                const el = document.getElementById(valueElementId);
                if (el) {
                    let displayValue = '--';
                    if (!isNaN(parseFloat(value))) {
                        displayValue = parseFloat(value).toFixed(1);
                    }
                    el.textContent = displayValue + ' ' + unit;
                }
            }
        });
    }, 2000);
}


createTemperatureChart({
    canvasId: 'podacha',
    variableName: 'T1',
    labelText: 'Подача',
    valueElementId: 'T1',
    unit: '°C'
});

createTemperatureChart({
    canvasId: 'obratka',
    variableName: 'T2',
    labelText: 'Обратка',
    valueElementId: 'T2',
    unit: '°C'
});

createTemperatureChart({
    canvasId: 'boiler',
    variableName: 'T5',
    labelText: 'Бойлер',
    valueElementId: 'T5',
    unit: '°C'
});

createTemperatureChart({
    canvasId: 'batarei',
    variableName: 'T4',
    labelText: 'Батареи',
    valueElementId: 'T4',
    unit: '°C'
});

createTemperatureChart({
    canvasId: 'asiki',
    variableName: 'ASPR',
    labelText: 'Давление асики',
    valueElementId: 'ASPR',
    unit: 'Bar'
});

createTemperatureChart({
    canvasId: 'otopleniye',
    variableName: 'OTPR',
    labelText: 'Давление отопление',
    valueElementId: 'OTPR',
    unit: 'Bar'
});

createTemperatureChart({
    canvasId: 'rashod',
    variableName: 'RASHOD',
    labelText: 'Расход',
    valueElementId: 'RASHOD',
    unit: 'л.ч.'
});

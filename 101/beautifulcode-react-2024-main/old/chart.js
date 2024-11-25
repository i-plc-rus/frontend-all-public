import Chart from 'chart.js/auto';

export function renderChart(expenseData) {
    const ctx = document.getElementById('expense-chart').getContext('2d');
    const labels = expenseData.map(data => data.name);
    const data = expenseData.map(data => data.budget);

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Expense Distribution',
                data: data,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',  
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40'
                ],
                hoverOffset: 4
            }]
        }
    });
}

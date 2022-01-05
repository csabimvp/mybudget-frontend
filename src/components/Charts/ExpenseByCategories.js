// Importing 3rd party components
import { Bar } from 'react-chartjs-2';

export default function ExpenseByCategories({ data = {}, year, month }) {
    return (
        <div className='chart-outer'>
            <h1 className='section-title'>Expense Sum by Categories</h1>
            <div className='dashboard-bar-wrapper hidden-on-small'>
                <Bar
                    data={{
                        labels: data.map((category) => category.name),
                        datasets: [{
                            data: data.map((cat) => cat.value__sum),
                            backgroundColor: [
                                '#FF416C',
                                '#F27121',
                                '#cbb4d4',
                                '#1a2a6c',
                                '#8809d1',
                                '#da3acc',
                                '#e2f10c',
                                '#605C3C',
                            ],
                            borderColor: [
                                '#161b22',
                            ],
                            borderWidth: 2,
                        }]
                    }}
                    options={{
                        showScale: true,
                        pointDot: true,
                        showLines: false,
                        tooltips: {
                            "enabled": false
                        },
                        maintainAspectRatio: false,
                        plugins: {
                            title: {
                                display: true,
                                text: `${year} - ${month} (£)`,
                                padding: {
                                    top: 20,
                                    bottom: 20,
                                },
                                font: {
                                    weight: 'bold',
                                    size: '18px',
                                },
                                color: '#FFF8E7'
                            },
                            legend: {
                                display: false
                            },
                            datalabels: {
                                color: '#EEA47FFF',
                                anchor: 'end',
                                align: 'start',
                                offset: -18,
                                formatter: function (value) {
                                    return Math.round(value);
                                },
                                font: {
                                    family: 'Itim',
                                    size: 12,
                                    weight: 'bold'
                                }
                            }
                        },
                        scales: {
                            x: {
                                display: true,
                                ticks: {
                                    color: '#FFF8E7',
                                    font: {
                                        family: 'Itim',
                                        size: 10,
                                        weight: 'bold'
                                    }
                                },
                                grid: {
                                    color: '#bdc3c7'
                                }
                            },
                            y: {
                                display: true,
                                ticks: {
                                    color: '#FFF8E7',
                                    font: {
                                        family: 'Itim',
                                        size: 10,
                                        weight: 'bold'
                                    }
                                },
                                grid: {
                                    color: '#bdc3c7'
                                }
                            }
                        }
                    }}
                />
            </div>
        </div>
    )
}
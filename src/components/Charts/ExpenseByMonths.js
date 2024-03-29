// Importing 3rd party components
import { Bar } from 'react-chartjs-2';

export default function ExpenseByMonths({ months = {}, year }) {
    return (
        <div className='chart-outer'>
            <h1 className='section-title'>Expense Sum by Months for: {year}</h1>
            <div className='dashboard-months-wrapper hidden-on-small'>
                <Bar
                    data={{
                        labels: months.map((m) => m.month),
                        datasets: [{
                            label: 'Income',
                            data: months.map((m) => m.income),
                            backgroundColor: [
                                '#ADD8E6',
                            ],
                            borderColor: [
                                '#161b22',
                            ],
                            borderWidth: 2,
                        },
                        {
                            label: 'Expense',
                            data: months.map((m) => m.expense),
                            backgroundColor: [
                                '#FF416C',
                            ],
                            borderColor: [
                                '#161b22',
                            ],
                            borderWidth: 2,
                        },
                        {
                            label: 'Saving',
                            data: months.map((m) => m.saving),
                            backgroundColor: [
                                '#45B649',
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
                                display: false,
                                text: `Year: ${year}`,
                                padding: {
                                    top: 20,
                                    bottom: 20,
                                },
                                font: {
                                    weight: 'bold',
                                    size: '20px',
                                },
                                color: '#FFF8E7'
                            },
                            legend: {
                                display: true,
                                padding: {
                                    top: 10,
                                    bottom: 10,
                                },
                                labels: {
                                    color: '#EEA47FFF',
                                    font: {
                                        family: 'Itim',
                                        size: 20,
                                        weight: 'bold'
                                    }
                                }
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
                                    size: 10,
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
                                        size: 14,
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
                                        size: 14,
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
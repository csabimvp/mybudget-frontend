// Importing 3rd party components
import { Pie } from 'react-chartjs-2';

export default function IncomeVsSavingPie({ data = {} }) {
    const { year, month, expense, saving } = data

    return (
        <div className='chart-outer'>
            <h1 className='section-title'>Expense vs. Saving</h1>
            <div className='dashboard-pie-wrapper hidden-on-small'>
                <Pie
                    data={{
                        labels: ['expense', 'saving'],
                        datasets: [{
                            data: [expense, saving],
                            backgroundColor: [
                                '#FF416C',
                                '#45B649',
                            ],
                            borderColor: [
                                'rgba(245, 245, 245, 1)',
                                'rgba(245, 245, 245, 1)',
                            ],
                            borderWidth: 2
                        }],
                    }}
                    options={{
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
                                    size: '20px',
                                },
                                color: '#FFF8E7'
                            },
                            legend: {
                                display: true,
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
                                color: '#161b22',
                                anchor: 'center',
                                formatter: function (value) {
                                    return Math.round(value);
                                },
                                borderColor: '#161b22',
                                backgroundColor: '#fff',
                                borderRadius: 1,
                                borderWidth: 1,
                                font: {
                                    family: 'Itim',
                                    size: 14,
                                    weight: 'bold'
                                }
                            }
                        },
                    }}
                />
            </div>
        </div>
    )
}
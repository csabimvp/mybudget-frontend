// Import React
import { useEffect, useReducer } from 'react';

// Importing 3rd party components
import axios from 'axios';

// Importing custom functions and hooks
import ModellerReducer from './Store/ModellerReducer';
import RecurringPayments from './Layout/RecurringPayments';

export default function Modeller({ token = {} }) {
    const authkey = token['key']
    const username = token['user_username']
    const user = token['user']

    const [modellData, dispatchModellData] = useReducer(
        ModellerReducer,
        {
            modeller: [],
            recurring_payments: [],
            isLoading: false,
            isError: false,
        }
    )

    function handleRecurringPaymentFilter(items = {}) {
        const FilteredRecurringPayments = items.sort((a, b) => b.value - a.value)
        return FilteredRecurringPayments
    }

    useEffect(() => {
        dispatchModellData({ type: 'FETCH' })

        axios.all([
            axios.get(`https://www.csabakeller.com/api/mybudget/modeller/?username=${username}`, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Token " + authkey
                }
            }),
            axios.get(`https://www.csabakeller.com/api/mybudget/recurring_payments?user=${user}`, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Token " + authkey
                }
            })
        ])
            .then((response) => {
                const modellerData = response[0].data
                const recurringPayments = response[1].data
                dispatchModellData({
                    type: 'FETCH_SUCCESS',
                    payload: [modellerData, recurringPayments]
                })
            })
            .catch((error) => {
                dispatchModellData({ type: 'FETCH_FAILURE' })
                console.log(error)
            })
    }, [authkey, username, user])

    return (
        <div className='main-section'>
            <h2 className='fw-bold mt-5'>Annual Modeller</h2>
            <div className="loading-wrapper text-center">
                {modellData.isError && <h2>Something went wrong =( </h2>}
                {modellData.isLoading &&
                    <>
                        <h2>Loading Modeller...</h2>
                        <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </>
                }
            </div>

            {(typeof modellData.modeller.annaul_model != "undefined") ? (
                <>
                    <div className='row justify-content-center'>
                        <div className='saving'>
                            <h1>Projected Savings:</h1>
                            <hr className='mt-2'></hr>
                            <h2><strong>£ {modellData.modeller.annaul_model.annaul_saving}</strong><span style={{ color: '#222222' }}> - ({Math.round(modellData.modeller.annaul_model.annaul_saving_percent * 100)} %)</span></h2>
                        </div>
                    </div>

                    <div className='row justify-content-center'>
                        <div className='col-auto'>
                            <div className='income'>
                                <h1>Projected Income:</h1>
                                <hr className='mt-2'></hr>
                                <h2><strong>£ {modellData.modeller.annaul_model.annual_income}</strong></h2>
                            </div>
                        </div>
                        <div className='col-auto'>
                            <div className='expense'>
                                <h1>Projected Expenses:</h1>
                                <hr className='mt-2'></hr>
                                <h2><strong>£ {modellData.modeller.annaul_model.annual_expense}</strong><span style={{ color: '#222222' }}> - ({Math.round(modellData.modeller.annaul_model.annaul_expense_percent * 100)} %)</span></h2>
                            </div>
                        </div>
                    </div>

                    <div className='row justify-content-center'>
                        <h2 className='fw-bold mt-5'>Monthly Modeller</h2>
                    </div>
                    <div className='dashboard-month-wrapper col-6'>
                        <h3>Transactions: <strong>{modellData.modeller.monthly_model.total_transactions}</strong></h3>
                        <hr className='mt-2' />
                        <h3>Income: <strong>£ {modellData.modeller.monthly_model.income}</strong></h3>
                        <h3>Expenses: <span className='dashboard-expense-value'><strong>£ {modellData.modeller.monthly_model.expense}</strong></span></h3>
                        <h3>Saving: <span className='dashboard-saving-value'><strong>£ {modellData.modeller.monthly_model.saving}</strong></span></h3>
                        <hr className='mt-2' />
                        <p>Expense: <span className='dashboard-expense-value'><strong>{modellData.modeller.monthly_model.expense_percent * 100}%</strong></span> -·- Saving: <span className='dashboard-saving-value'><strong>{modellData.modeller.monthly_model.saving_percent * 100}%</strong></span></p>
                    </div>

                    <div className='row justify-content-center'>
                        <h2 className='fw-bold mt-5'>List of active Recurring Payments</h2>
                        <p className='lead'>Value - high to low</p>
                        <hr className='mb-4' />
                        {modellData.recurring_payments.length > 0 &&
                            handleRecurringPaymentFilter(modellData.recurring_payments).map((payment, index) => <RecurringPayments key={payment.id} data={payment} counter={index} />)
                        }
                    </div>
                </>
            ) : ('')}

            <>
            </>
        </div>
    )
}
// Import React
import { useEffect, useReducer } from 'react';

// Importing 3rd party components
import axios from 'axios';

// Importing custom functions and hooks
import ModellerReducer from './Store/ModellerReducer';

export default function Modeller({ token = {} }) {
    const authkey = token['key']
    const username = token['user_username']

    const [modellData, dispatchModellData] = useReducer(
        ModellerReducer,
        {
            data: [],
            isLoading: false,
            isError: false,
        }
    )

    console.log(modellData)

    useEffect(() => {
        dispatchModellData({ type: 'FETCH' })
        axios.get(`https://www.csabakeller.com/api/mybudget/modeller/?username=${username}`, {
            headers: {
                "Content-type": "application/json",
                "Authorization": "Token " + authkey
            }
        })
            .then((response) => {
                dispatchModellData({
                    type: 'FETCH_SUCCESS',
                    payload: response.data
                })
            })
            .catch((error) => {
                dispatchModellData({ type: 'FETCH_FAILURE' })
                console.log(error)
            })
    }, [authkey, username])

    return (
        <div className='main-section'>
            <h2 className='fw-bold mt-5'>Modeller</h2>
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

            {(typeof modellData.data != "undefined") ? (
                <>
                    <div className='row justify-content-center'>
                        <div className='saving'>
                            <h1>Projected Savings:</h1>
                            <hr className='mt-2'></hr>
                            <h2><strong>£ {modellData.data.annaul_model.annaul_saving}</strong><span style={{ color: '#222222' }}> - ({Math.round(modellData.data.annaul_model.annaul_saving_percent * 100)} %)</span></h2>
                        </div>
                    </div>

                    <div className='row justify-content-center'>
                        <div className='col-auto'>
                            <div className='income'>
                                <h1>Projected Income:</h1>
                                <hr className='mt-2'></hr>
                                <h2><strong>£ {modellData.data.annaul_model.annual_income}</strong></h2>
                            </div>
                        </div>
                        <div className='col-auto'>
                            <div className='expense'>
                                <h1>Projected Expenses:</h1>
                                <hr className='mt-2'></hr>
                                <h2><strong>£ {modellData.data.annaul_model.annual_expense}</strong><span style={{ color: '#222222' }}> - ({Math.round(modellData.data.annaul_model.annaul_expense_percent * 100)} %)</span></h2>
                            </div>
                        </div>
                    </div>

                    <div className='row justify-content-center'>
                        <h2 className='fw-bold mt-5'>Recurring Payments for a month</h2>
                    </div>
                    <div className='dashboard-month-wrapper col-6'>
                        <h3>Transactions: <strong>{modellData.data.monthly_model.total_transactions}</strong></h3>
                        <hr className='mt-2' />
                        <h3>Income: <strong>£ {modellData.data.monthly_model.income}</strong></h3>
                        <h3>Expenses: <span className='dashboard-expense-value'><strong>£ {modellData.data.monthly_model.expense}</strong></span></h3>
                        <h3>Saving: <span className='dashboard-saving-value'><strong>£ {modellData.data.monthly_model.saving}</strong></span></h3>
                        <hr className='mt-2' />
                        <p>Expense: <span className='dashboard-expense-value'><strong>{modellData.data.monthly_model.expense_percent * 100}%</strong></span> -·- Saving: <span className='dashboard-saving-value'><strong>{modellData.data.monthly_model.saving_percent * 100}%</strong></span></p>
                    </div>
                </>
            ) : ('')}

            <>
            </>
        </div>
    )
}
// Importing React components
import React, { useEffect, useReducer } from 'react';

// Importing 3rd party components
import axios from 'axios';

// Importing custom functions and hooks.
import ExpenseReducer from './Store/ExpenseReducer';

// Importing components
import ExpenseList from './Layout/ExpenseList';

export default function AnnualSummary({ token = {} }) {
    const authkey = token['key']
    const [expenses, dispatchExpenses] = useReducer(
        ExpenseReducer,
        {
            total: [],
            category: [],
            isLoading: false,
            isError: false,
        }
    )

    function handleExpenseFilter(items = {}) {
        const FilteredExpenses = items.filter(
            item => item.name !== 'Income'
        ).sort((a, b) => b.value__sum - a.value__sum)
        return FilteredExpenses
    }

    useEffect(() => {
        dispatchExpenses({ type: 'FETCH' })
        axios.all([
            axios.get('https://www.csabakeller.com/api/mybudget/annual-summary/', {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Token " + authkey
                }
            }),
            axios.get('https://www.csabakeller.com/api/mybudget/category-summary/', {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Token " + authkey
                }
            })
        ])
            .then((response) => {
                const totalData = response[0].data
                const categoryData = response[1].data['sum_categories']
                dispatchExpenses({
                    type: 'FETCH_SUCCESS',
                    payload: [totalData, categoryData]
                })
            })
            .catch((error) => {
                dispatchExpenses({ type: 'FETCH_FAILURE' })
            })
    }, [authkey, dispatchExpenses])


    return (
        <div className='main-section'>
            <h4>Annual Overview</h4>
            <div className="loading-wrapper text-center">
                {expenses.isError && <h2>Something went wrong =( </h2>}
                {expenses.isLoading &&
                    <>
                        <h2>Loading expenses...</h2>
                        <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </>
                }
            </div>
            <>

                <div className='row justify-content-center'>
                    <div className='transactions'>
                        <h1>Total Transactions:</h1>
                        <hr className='mt-2'></hr>
                        <h2><strong>{expenses.total['total_transactions']}</strong></h2>
                    </div>
                </div>

                <div className='row justify-content-center'>
                    <div className='col-auto'>
                        <div className='income'>
                            <h1>Total Income:</h1>
                            <hr className='mt-2'></hr>
                            <h2><strong>£ {expenses.total['income']}</strong></h2>
                        </div>
                    </div>
                    <div className='col-auto'>
                        <div className='expense'>
                            <h1>Total Expenses:</h1>
                            <hr className='mt-2'></hr>
                            <h2><strong>£ {expenses.total['expense']}</strong><span style={{ color: '#222222' }}> - ({expenses.total['expense_percent']} %)</span></h2>
                        </div>
                    </div>
                </div>


                <div className='row justify-content-center'>
                    <div className='saving'>
                        <h1>Total Savings:</h1>
                        <hr className='mt-2'></hr>
                        <h2><strong>£ {expenses.total['saving']}</strong><span style={{ color: '#222222' }}> - ({expenses.total['saving_percent']} %)</span></h2>
                    </div>
                </div>

            </>
            <div className='row justify-content-center'>
                <h2 className='fw-bold mt-5'>Expense summary by category:</h2>
                <hr className='mb-4' />
                {expenses.category.length > 0 &&
                    handleExpenseFilter(expenses.category).map(expense => <ExpenseList key={expense.id} expense={expense} />)
                }
            </div>
        </div>
    )
}
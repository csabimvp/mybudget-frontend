// Importing React components
import React, { useEffect, useState } from 'react';

// Importing 3rd party components
import axios from 'axios';

// Importing Components
import CategoryFilter from './Layout/CategoryFilter'
import ExpenseTable from './Layout/ExpenseTable';
import SearchTitle from './Forms/SearchTitle';
import MonthsFilter from './Layout/MonthsFilter';


export default function MonthlyDetail({ token = {} }) {

    // Setting constants
    const authkey = token['key']
    //const username = token['user_username']
    const user = token['user']
    const today = new Date().getMonth() + 1
    const months = [
        { id: 0, name: 'All months', active: true },
        { id: 1, name: 'January', active: false },
        { id: 2, name: 'February', active: false },
        { id: 3, name: 'March', active: false },
        { id: 4, name: 'April', active: false },
        { id: 5, name: 'May', active: false },
        { id: 6, name: 'June', active: false },
        { id: 7, name: 'July', active: false },
        { id: 8, name: 'August', active: false },
        { id: 9, name: 'September', active: false },
        { id: 10, name: 'October', active: false },
        { id: 11, name: 'November', active: false },
        { id: 12, name: 'December', active: false },
    ]

    // Setting React State variables
    const [categories, setCategories] = useState([])
    const [month, setMonth] = useState(months)
    const [payments, setPayments] = useState([])
    const [newCategoryFilter, setNewCategoryFilter] = useState({ id: '', name: 'All categories' })
    const [monthFilter, setMonthfilter] = useState({ id: '', name: 'All months' })
    const [titleFilter, setTitleFilter] = useState('')
    const [isLoading, setisLoading] = useState(false)
    const [isError, setisError] = useState(false)


    function handleCategoryFilter(e, category_id, category_name) {
        e.preventDefault();
        const newCat = categories.map(category => {
            if (category.id === category_id) {
                category_id === 0 ? setNewCategoryFilter({ id: '', name: 'All categories' }) : setNewCategoryFilter({ id: category_id, name: category_name })
                return {
                    id: category.id,
                    name: category.name,
                    active: true,
                }
            } else {
                return {
                    id: category.id,
                    name: category.name,
                    active: false
                }
            }
        })
        setCategories(newCat)
    };

    function handleMonthFilter(e, month_id, month_name) {
        e.preventDefault();
        const newMonth = months.map(month => {
            if (month.id === month_id) {
                month_id === 0 ? setMonthfilter({ id: '', name: 'Year-to-Date' }) : setMonthfilter({ id: month_id, name: month_name })
                return {
                    id: month.id,
                    name: month.name,
                    active: true,
                }
            } else {
                return {
                    id: month.id,
                    name: month.name,
                    active: false
                }
            }
        })
        setMonth(newMonth)
    };

    function resetFilters(e) {
        e.preventDefault();

        setNewCategoryFilter({ id: '', name: 'All categories' })
        setMonthfilter({ id: '', name: 'Year-to-Date' })
        setTitleFilter('')
    }

    function handleSumValues(items = {}) {
        //const sum_total = items.reduce((total, obj) => total = parseInt(obj.value, 10) + total, 0)
        const sum_total = items.reduce((total, obj) => total = parseFloat(obj.value) + total, 0)
        return sum_total.toFixed(2);
    }

    function handleSearch({ e, query }) {
        e.preventDefault();
        if (query.length === 0) {
            return setTitleFilter('')
        } else {
            const formattedQuery = query.charAt(0).toUpperCase() + query.slice(1)
            setTitleFilter(formattedQuery)
            return setTitleFilter
        }
    }

    useEffect(() => {
        axios.get(`https://www.csabakeller.com/api/mybudget/categories?user=${user}`, {
            headers: {
                "Content-type": "application/json",
                "Authorization": "Token " + authkey
            }
        })
            .then((response) => {
                const allCategories = response.data;
                allCategories.unshift({
                    id: 0,
                    name: "All Categories"
                })
                const allCats = allCategories.map(obj => {
                    // All categories marked as active straight away.
                    if (obj.id === 0) {
                        return ({ ...obj, active: true })
                    } else {
                        return ({ ...obj, active: false })
                    }
                })
                setCategories(allCats);
            })
            .catch((error) => {
                setisError(true)
            })
    }, [authkey, user])

    useEffect(() => {
        setisLoading(true)
        axios.get(`https://www.csabakeller.com/api/mybudget/payments?user=${user}&date_month=${monthFilter.id}&category=${newCategoryFilter.id}&title=${titleFilter}`, {
            headers: {
                "Content-type": "application/json",
                "Authorization": "Token " + authkey
            }
        })
            .then((response) => {
                const allPayments = response.data;
                setisLoading(false)
                setPayments(allPayments)
            })
            .catch((error) => {
                setisError(true)
                setisLoading(false)
            })
    }, [setPayments, newCategoryFilter, titleFilter, monthFilter, authkey, user])

    const filteredPayments = payments.filter(payment => {
        if (newCategoryFilter.id.length === 0) {
            return payment.category_name !== 'Income'
        } else {
            return payment
        }
    })

    const filteredMonths = month.filter(m => m.id <= today)

    return (
        <div className='monthly-main container-fluid'>
            <div className='row text-center justify-content center'>
                <h4>Detailed Expense Table</h4>
            </div>
            <div className='filters row mt-4'>
                <div className='filter-col col-auto'>
                    <div className='dropdown'>
                        <button className='btn btn-primary btn-lg dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
                            {newCategoryFilter.name}
                        </button>
                        <ul className="dropdown-menu">
                            {
                                categories.map(cat => <CategoryFilter key={cat.id} {...cat} onFilter={handleCategoryFilter} />)
                            }
                        </ul>
                    </div>
                </div>
                <div className='filter-col col-auto'>
                    <div className='dropdown'>
                        <button className='btn btn-primary btn-lg dropdown-toggle' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
                            {monthFilter.name}
                        </button>
                        <ul className="dropdown-menu">
                            {
                                filteredMonths.map(m => <MonthsFilter key={m.id} {...m} onFilter={handleMonthFilter} />)
                            }
                        </ul>
                    </div>
                </div>
                <div className='filter-col col-auto' id='SearchBar'>
                    <SearchTitle onSearch={handleSearch} />
                </div>
                <div className='filter-col col-auto'>
                    <button className='btn btn-outline-danger btn-lg' onClick={(e) => resetFilters(e)}>
                        Reset all filters
                    </button>
                </div>
            </div>
            <div className='row mt-4 total-card-wrapper'>
                <div className='total-card col'>
                    <h4>Transactions:</h4>
                    <hr className='mt-2'></hr>
                    <h3><strong>{filteredPayments.length}</strong></h3>
                </div>
                <div className='total-card col'>
                    <h4>Value:</h4>
                    <hr className='mt-2'></hr>
                    <h3><strong>£ {handleSumValues(filteredPayments)}</strong></h3>
                </div>
            </div>
            <div className='row mt-4'>
                <div className="loading-wrapper text-center">
                    {isError && <h2>Something went wrong =( </h2>}
                    {isLoading &&
                        <>
                            <h2>Loading expenses...</h2>
                            <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </>
                    }
                </div>
                <div className="col text-center">
                    <table className='budget-table table table-striped table-hover'>
                        <thead>
                            <tr>
                                <th className='table-hidden-onsmall' scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Category</th>
                                <th className='table-hidden-onsmall' scope="col">Description</th>
                                <th scope="col">Date</th>
                                <th scope="col">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredPayments.map((payment, i) => <ExpenseTable key={payment.id} payment={payment} rownum={i} />)
                            }
                        </tbody>
                        <tfoot>
                            <tr className='total'>
                                <td colSpan='5'><strong>Total:</strong></td>
                                <td className='total-value'><strong>£ {handleSumValues(filteredPayments)}</strong></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    )
}
// Importing React components
import React, { useEffect, useState } from 'react';

// Importing 3rd party components
import axios from 'axios';

// Importing Components
import NavList from './Layout/NavList';
import ExpenseTable from './Layout/ExpenseTable';
import SearchTitle from './Forms/SearchTitle';
import MonthsFilter from './Layout/MonthsFilter';


export default function MonthlyDetail({ token = {} }) {
    const authkey = token['key']
    const months = [
        { id: 0, name: 'All Months', active: true },
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
    const today = new Date().getMonth() + 1
    const [categories, setCategories] = useState([])
    const [month, setMonth] = useState(months)
    const [payments, setPayments] = useState([])
    const [catFilter, setCatfilter] = useState('')
    const [monthFilter, setMonthfilter] = useState('')
    const [titleFilter, setTitleFilter] = useState('')
    const [isLoading, setisLoading] = useState(false)
    const [isError, setisError] = useState(false)

    function handleCategoryFilter(category_id) {
        const newCat = categories.map(category => {
            if (category.id === category_id) {
                category_id === 0 ? setCatfilter('') : setCatfilter(category_id)
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

    function handleMonthFilter(month_id) {
        const newMonth = months.map(month => {
            if (month.id === month_id) {
                month_id === 0 ? setMonthfilter('') : setMonthfilter(month_id)
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
        axios.get('https://www.csabakeller.com/api/mybudget/categories', {
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
    }, [authkey])

    useEffect(() => {
        setisLoading(true)
        axios.get(`https://www.csabakeller.com/api/mybudget/payments?&date_month=${monthFilter}&category=${catFilter}&title=${titleFilter}`, {
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
    }, [setPayments, catFilter, titleFilter, monthFilter, authkey])

    const filteredPayments = payments.filter(payment => {
        if (catFilter.length === 0) {
            return payment.category_name !== 'Income'
        } else {
            return payment
        }
    })

    const filteredMonths = month.filter(m => m.id <= today)

    return (
        <div className='monthly-main container-fluid'>
            <div className='row text-center justify-content center'>
                <h4>Detailed Expense View</h4>
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
                <nav className='col-lg-2 d-md-block sidebar'>
                    <ul className="nav nav-pills flex-column">
                        {
                            categories.map(cat => <NavList key={cat.id} {...cat} onFilter={handleCategoryFilter} />)
                        }
                    </ul>
                </nav>
                <div className="col-lg-8">
                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Category</th>
                                <th scope="col">Description</th>
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
                <div className='col-lg-2 justify-content-center'>
                    <SearchTitle onSearch={handleSearch} />
                    <hr className='mt-4'></hr>
                    <ul className="month-filter list-group flex-column text-center mt-2">
                        {
                            filteredMonths.map(m => <MonthsFilter key={m.id} {...m} onFilter={handleMonthFilter} />)
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
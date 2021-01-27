// Importing React components
import React, { useEffect, useState } from 'react';

// Importing 3rd party components
import axios from 'axios';

// Importing Components
import NavList from './Layout/NavList';
import ExpenseTable from './Layout/ExpenseTable';
import SearchTitle from './Forms/SearchTitle';


export default function MonthlyDetail({ token = {} }) {
    const authkey = token['key']
    const [categories, setCategories] = useState([])
    const [payments, setPayments] = useState([])
    const [catFilter, setCatfilter] = useState('')
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
        axios.get(`https://www.csabakeller.com/api/mybudget/payments?&category=${catFilter}&title=${titleFilter}`, {
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
    }, [setPayments, catFilter, titleFilter, authkey])

    const filteredPayments = payments.filter(payment => {
        if (catFilter.length === 0) {
            return payment.category_name !== 'Income'
        } else {
            return payment
        }
    })

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
                    <ul className="nav nav-pills flex-column mb-2">
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
                    <p>Month filter</p>
                </div>
            </div>
        </div>
    )
}
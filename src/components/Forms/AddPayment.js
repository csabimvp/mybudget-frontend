// Importing React components
import React, { useEffect, useState } from 'react';

// Importing 3rd party components
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddPayment() {
    const authkey = 'cf97004e5a637518296a3c898b2a22f2a538cfa8'
    const user = 1
    const today = new Date().toISOString()
    const [startDate, setStartDate] = useState(new Date());
    const [myDate, setMyDate] = useState('')
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [value, setValue] = useState()
    const [recurring, setRecurring] = useState(false)
    const [categoryList, setCategoryList] = useState([])
    const [category, setCategory] = useState()
    const [ispending, setIsPending] = useState(false)
    const [successForm, setSuccessForm] = useState(false)

    function handleDateFormat(date) {
        const newDate = date.toISOString()
        setStartDate(date)
        setMyDate(newDate)
    }

    function handleSubmit(e) {
        e.preventDefault();

        setIsPending(true)

        if (recurring === false) {
            if (myDate === '') {
                const newExpense = {
                    user: user,
                    title: title,
                    description: description,
                    value: value,
                    category: parseInt(category),
                    created: today,
                }

                axios.post('https://www.csabakeller.com/api/mybudget/payments', newExpense, {
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": "Token " + authkey
                    }
                })
                    .then(result => {
                        //console.log(result)
                        setIsPending(false)
                        setSuccessForm(true)
                        setMyDate('')
                        setTimeout(() => {
                            setSuccessForm(false)
                        }, 2500)
                    })
                    .catch((error) => {
                        console.log(error.response.data)
                    })
            } else {
                const newExpense = {
                    user: user,
                    title: title,
                    description: description,
                    value: value,
                    category: parseInt(category),
                    created: myDate,
                }

                axios.post('https://www.csabakeller.com/api/mybudget/payments', newExpense, {
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": "Token " + authkey
                    }
                })
                    .then(result => {
                        //console.log(result)
                        setIsPending(false)
                        setSuccessForm(true)
                        setTimeout(() => {
                            setSuccessForm(false)
                        }, 2500)
                    })
                    .catch((error) => {
                        console.log(error.response.data)
                    })
            }

        } else {

            const newExpense = {
                user: user,
                title: title,
                description: description,
                value: value,
                category: parseInt(category),
            }

            axios.post('https://www.csabakeller.com/api/mybudget/recurring_payments', newExpense, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Token " + authkey
                }
            })
                .then(result => {
                    //console.log(result)
                    setIsPending(false)
                    setSuccessForm(true)
                    setTimeout(() => {
                        setSuccessForm(false)
                    }, 2500)
                })
                .catch((error) => {
                    console.log(error.response.data)
                })
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
                setCategory(allCategories[0].id)
                setCategoryList(allCategories);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [authkey, user])
    return (
        <>

            <button type="button" className="dashboard-filter-button" id='dashboard-filter-add-button' data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <i className="fas fa-plus"></i>
                Add Payment
            </button>


            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered add-payment-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Add New Payment</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={((e) => handleSubmit(e))}>
                                <div className='recurring-switch form-check form-switch mb-3 mt-2'>
                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={e => setRecurring(!recurring)} />
                                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">- Recurring Payment</label>
                                </div>
                                <div className='mb-3'>
                                    <input className='form-control' type='text' id='form-title' required placeholder="Title" onChange={e => setTitle(e.target.value)} />
                                </div>
                                <div className='input-group mb-3 mt-2'>
                                    <div className='col-8'>
                                        <select className="form-select" id='form-category' onChange={e => setCategory(e.target.value)}>
                                            {
                                                categoryList.map(category => <option key={category.id} value={category.id} label={category.name}></option>)
                                            }
                                        </select>
                                    </div>
                                    <div className='col-4 date-picker'>
                                        <DatePicker className='form-control' selected={startDate} onChange={(date) => handleDateFormat(date)} />
                                    </div>
                                </div>
                                <div className='input-group mb-3 mt-2'>
                                    <span className="input-group-text">£</span>
                                    <input className='form-control' id='floatingInput' type="text" required placeholder="Value" onChange={e => setValue(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label" placeholder="Description"></label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={e => setDescription(e.target.value)}></textarea>
                                </div>
                                <div className="modal-footer justify-content-center">
                                    <div>
                                        {!ispending && <button id='modal-add-payment-btn' type="submit">Add Payment</button>}
                                        {ispending && <button className=' mt-4 mb-3 disabled' type="submit">Adding payment...</button>}
                                    </div>
                                    <button type="button" id='modal-cancel-btn' data-bs-dismiss="modal">Cancel</button>
                                    <div className='success mt-4 text-center'>
                                        {successForm && <p className='lead'>Successfully added to database.</p>}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
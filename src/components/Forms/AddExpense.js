// Importing React components
import React, { useEffect, useState } from 'react';

// Importing 3rd party components
import axios from 'axios';
// import { Animated } from "react-animated-css";

export default function AddExpense({ token = {} }) {
    const authkey = token['key']
    const user = token['user']
    const today = new Date().toISOString()
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [value, setValue] = useState()
    const [recurring, setRecurring] = useState(false)
    const [categoryList, setCategoryList] = useState([])
    const [category, setCategory] = useState()
    const [ispending, setIsPending] = useState(false)
    const [successForm, setSuccessForm] = useState(false)

    function handleSubmit(e) {
        e.preventDefault();

        setIsPending(true)

        if (recurring === false) {
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
                    console.log(result)
                    setIsPending(false)
                    setSuccessForm(true)
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
            }

            axios.post('https://www.csabakeller.com/api/mybudget/recurring_payments', newExpense, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Token " + authkey
                }
            })
                .then(result => {
                    console.log(result)
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
        <div className='main-section'>
            <h4>Add New Payment</h4>
            <div className='login-wrapper'>
                <form onSubmit={((e) => handleSubmit(e))}>
                    <div className='recurring-switch form-check form-switch mb-3 mt-2'>
                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={e => setRecurring(!recurring)} />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">- Recurring Payment</label>
                    </div>
                    <div className='mb-3 mt-2'>
                        <select className="form-select" id='form-category' onChange={e => setCategory(e.target.value)}>
                            {
                                categoryList.map(category => <option key={category.id} value={category.id} label={category.name}></option>)
                            }
                        </select>
                    </div>
                    <div className='mb-3'>
                        <input className='form-control' type='text' id='form-title' placeholder="Title" onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className='input-group mb-3'>
                        <span className="input-group-text">£</span>
                        <input className='form-control' id='floatingInput' type="text" placeholder="Value" onChange={e => setValue(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label" placeholder="Description"></label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={e => setDescription(e.target.value)}></textarea>
                    </div>
                    <div>
                        {!ispending && <button className='btn btn-lg btn-primary mt-4 mb-3' type="submit">Add Payment</button>}
                        {ispending && <button className='btn btn-lg btn-primary mt-4 mb-3 disabled' type="submit">Adding payment...</button>}
                    </div>
                </form>
                {/*<Animated animationIn="bounceIn" animationOut="bounceOut" isVisible={true} animationInDuration={1500}>*/}
                <div className='success mt-4 text-center'>
                    {successForm && <p className='lead'>Successfully added to database.</p>}
                </div>
                {/*</Animated>*/}
            </div>
        </div>
    )
}
// Importing React components
import React, { useEffect, useState } from 'react';

// Importing 3rd party components
import axios from 'axios';
// import { Animated } from "react-animated-css";

export default function AddExpense({ token = {} }) {
    const authkey = token['key']
    const today = new Date().toISOString()
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [value, setValue] = useState()
    const [category, setCategory] = useState(3)
    const [categoryList, setCategoryList] = useState([])
    const [ispending, setIsPending] = useState(false)
    const [successForm, setSuccessForm] = useState(false)

    const newExpense = {
        title: title,
        description: description,
        value: value,
        category: parseInt(category),
        created: today,
    }

    function handleSubmit(e) {
        e.preventDefault();

        setIsPending(true)

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
                setCategoryList(allCategories);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [authkey])

    return (
        <div className='main-section'>
            <h4>Add New Expense</h4>
            <div className='login-wrapper'>
                <form onSubmit={((e) => handleSubmit(e))}>
                    <div className='mb-3 mt-2'>
                        <select className="form-select" id='form-category' ariaLabel="Default select example" onChange={e => setCategory(e.target.value)}>
                            {
                                categoryList.map(category => <option key={category.id} value={category.id} label={category.name}></option>)
                            }
                        </select>
                    </div>
                    <div className='mb-3'>
                        <input className='form-control' type='text' id='form-title' placeholder="Title" onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className='input-group mb-3'>
                        <span class="input-group-text">£</span>
                        <input className='form-control' id='floatingInput' type="text" placeholder="Value" onChange={e => setValue(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label" placeholder="Description"></label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={e => setDescription(e.target.value)}></textarea>
                    </div>
                    <div>
                        {!ispending && <button className='btn btn-lg btn-primary mt-4 mb-3' type="submit">Add Expense</button>}
                        {ispending && <button className='btn btn-lg btn-primary mt-4 mb-3 disabled' type="submit">Adding expense...</button>}
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
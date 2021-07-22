// Importing React components
import React, { useState, useEffect, useReducer } from 'react';

// Importing 3rd party components
import axios from 'axios';

// Importing custom functions and hooks
import Category from '../Layout/Category';
import categoryReducer from '../Store/CategoryReducer';

export default function AddCategory({ token = {} }) {
    const authkey = token['key']
    const user = token['user']
    const [categories, dispatchCategories] = useReducer(
        categoryReducer,
        {
            data: [],
            isLoading: false,
            isError: false,
        }
    )
    const [isExpanded, setExpanded] = useState(false)
    const [ispending, setIsPending] = useState(false)
    const [successForm, setSuccessForm] = useState(false)
    const [newCategoryName, setNewCategoryName] = useState()

    function handleToggle(e) {
        e.preventDefault()
        const prev_state = isExpanded
        prev_state ? setExpanded(false) : setExpanded(true)
    }

    function handleSubmitNewCategory(e) {
        e.preventDefault();

        setIsPending(true)

        const newCategory = {
            user: user,
            name: newCategoryName,
        }

        console.log(newCategory)

        axios.post('https://www.csabakeller.com/api/mybudget/categories', newCategory, {
            headers: {
                "Content-type": "application/json",
                "Authorization": "Token " + authkey
            }
        })

            .then(result => {
                setIsPending(false)
                setSuccessForm(true)
                setTimeout(() => {
                    setSuccessForm(false)
                }, 2500)
                dispatchCategories({
                    type: 'ADD',
                    payload: result.data
                })
            })
            .catch((error) => {
                dispatchCategories({ type: 'FETCH_FAILURE' })
            })
    }

    useEffect(() => {
        dispatchCategories({ type: 'FETCH' })

        axios.get(`https://www.csabakeller.com/api/mybudget/categories?user=${user}`, {
            headers: {
                "Content-type": "application/json",
                "Authorization": "Token " + authkey
            }
        })
            .then((response) => {
                const allCategories = response.data;
                dispatchCategories({
                    type: 'FETCH_SUCCESS',
                    payload: allCategories
                })
            })
            .catch((error) => {
                dispatchCategories({ type: 'FETCH_FAILURE' })
            })
    }, [authkey, user])

    return (
        <div className='main-categories'>
            {
                isExpanded ? (
                    <>
                        <form onSubmit={((e) => handleSubmitNewCategory(e))}>
                            <div className='row g-2'>

                                <div className='form-floating mb-3'>
                                    <input className='form-control' type='text' id='form-title' placeholder="example.com" onChange={e => setNewCategoryName(e.target.value)} />
                                    <label htmlFor='form-title'>Title</label>
                                </div>


                            </div>
                            <div className='d-flex w-100 justify-content-between mt-4' style={{ letterSpacing: '3rem' }}>
                                <button type="button" className="btn btn-secondary btn-lg" onClick={((e) => handleToggle(e))}>
                                    Cancel
                                </button>
                                <div>
                                    {!ispending && <button className="btn btn-primary btn-lg" type="submit">Add New Category</button>}
                                    {ispending && <button className='btn btn-lg btn-primary mt-4 mb-3 disabled' type="submit">Adding category...</button>}
                                </div>
                            </div>
                        </form>
                        <div className='success mt-4 text-center'>
                            {successForm && <p className='lead'>Successfully added to database.</p>}
                        </div>
                    </>
                ) : (
                    <div className='d-grid gap-2 col-6 mx-auto mt-4'>
                        <button className="btn btn-primary btn-lg" type="button" onClick={((e) => handleToggle(e))}>
                            <i className="fas fa-plus ml-2 px-2"></i>
                            Add New Category
                        </button>
                    </div>
                )
            }

            <div className='row justify-content-center mt-4'>
                <h2 className='fw-bold text-center mt-4'>My categories:</h2>
                <hr className='mt-4' />
                <div className="loading-wrapper text-center">
                    {categories.isError && <h2>Something went wrong =( </h2>}
                    {categories.isLoading &&
                        <>
                            <h2>Loading categories...</h2>
                            <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </>
                    }
                </div>
                {
                    categories.data.map(category => <Category key={category.id} category={category} />)
                }
            </div>
        </div>
    )
}
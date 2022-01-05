// Importing React components
import React, { useState } from 'react';

// Importing 3rd party components
import axios from 'axios';

export default function AddCategory({ token = {} }) {
    const { key, user } = token

    const [ispending, setIsPending] = useState(false)
    const [successForm, setSuccessForm] = useState(false)
    const [errorForm, setErrorForm] = useState(false)
    const [newCategoryName, setNewCategoryName] = useState()

    function handleSubmit(e) {
        e.preventDefault();
        setIsPending(true)
        const newCategory = {
            user: user,
            name: newCategoryName,
        }
        axios.post('https://www.csabakeller.com/api/mybudget/categories', newCategory, {
            headers: {
                "Content-type": "application/json",
                "Authorization": "Token " + key
            }
        })
            .then(result => {
                setIsPending(false)
                setSuccessForm(true)
                setTimeout(() => {
                    setSuccessForm(false)
                }, 2500)
            })
            .catch((error) => {
                console.log(error.response.data)
                setErrorForm(true)
            })
    }

    return (
        <>
            <button type="button" className="dashboard-filter-button" id='dashboard-filter-add-category-button' data-bs-toggle="modal" data-bs-target="#staticBackdrop-category">
                <i className="fas fa-plus"></i>
                Add Category
            </button>

            <div className="modal fade" id="staticBackdrop-category" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered add-payment-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Add New Category</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={((e) => handleSubmit(e))}>
                                <div className='form-floating mb-3'>
                                    <input className='form-control' type='text' id='form-title' placeholder="example.com" onChange={e => setNewCategoryName(e.target.value)} />
                                    <label htmlFor='form-title'>Add New Category</label>
                                </div>
                                <div className="modal-footer justify-content-center">
                                    <div>
                                        {!ispending && <button id='modal-add-payment-btn' type="submit">Add Category</button>}
                                        {ispending && <button className=' mt-4 mb-3 disabled' type="submit">Adding category...</button>}
                                    </div>
                                    <button type="button" id='modal-cancel-btn' data-bs-dismiss="modal">Cancel</button>
                                    <div className='mt-4 text-center'>
                                        {successForm && <p className='success lead'>Successfully added to database.</p>}
                                        {errorForm && <p className='lead'>Successfully added to database.</p>}
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
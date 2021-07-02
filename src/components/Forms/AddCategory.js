// Importing React components
import React, { useState } from 'react';

// Importing 3rd party components
import axios from 'axios';

export default function AddCategory({token = {}}) {
    const authkey = token['key']
    const user = token['user']
    // const username = token['user_username']

    const [name, setName] = useState('')
    const slug = user+"_"+name

    const [isExpanded, setExpanded] = useState(false)
    const [ispending, setIsPending] = useState(false)
    const [successForm, setSuccessForm] = useState(false)

    const newCategory = {
        user_id: user,
        name: name,
        slug: slug
    }

    function handleToggle(e) {
        e.preventDefault()
        const prev_state = isExpanded
        prev_state ? setExpanded(false) : setExpanded(true)
    }

    function handleSubmit(e) {
        e.preventDefault();

        setIsPending(true)

        axios.post('https://www.csabakeller.com/api/mybudget/categories', newCategory, {
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

    return (
<>
            {
                isExpanded ? (
                    <div className='login-wrapper'>
                                            <form onSubmit={((e) => handleSubmit(e))}>
                    <div className='mb-3'>
                        <input className='form-control' type='text' id='form-title' placeholder="Name" onChange={e => setName(e.target.value)} />
                    </div>
                    <div>
                        {!ispending && <button className='btn btn-lg btn-primary mt-4 mb-3' type="submit">Add Category</button>}
                        {ispending && <button className='btn btn-lg btn-primary mt-4 mb-3 disabled' type="submit">Adding category...</button>}
                    </div>
                </form>
                <div className='success mt-4 text-center'>
                    {successForm && <p className='lead'>Successfully added to database.</p>}
                </div>
                    </div>
                ) : (
                        <div className='d-grid gap-2 col-6 mx-auto mt-4'>
                            <button className="btn btn-primary btn-lg" type="button" onClick={((e) => handleToggle(e))}>
                                Add New Category
            </button>
                        </div>
                    )
            }
        </>
    )
}
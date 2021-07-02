// Importing React components
import React, { useEffect, useState } from 'react';

// Importing 3rd party components
import axios from 'axios';

// Importing Components
import Category from './Layout/Category';
import AddCategory from './Forms/AddCategory';

export default function Categories ({ token = {} }) {

    // Setting constants
    const authkey = token['key']
    const user = token['user']
    const username = token['user_first_name']

    // Setting React State variables
    const [isLoading, setisLoading] = useState(false)
    const [isError, setisError] = useState(false)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get(`https://www.csabakeller.com/api/mybudget/categories?user=${user}`, {
            headers: {
                "Content-type": "application/json",
                "Authorization": "Token " + authkey
            }
        })
        .then((response) => {
            const allCategories = response.data;
            setisLoading(false)
            setCategories(allCategories)
        })
        .catch((error) => {
            setisError(true)
            setisLoading(false)
        })
    }, [authkey, setCategories, user])

    return (
        <div className='main-section'>

            <div className='row text-center justify-content center'>
                <h4>Categories for {username}</h4>
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
            </div>

            <div className='categories-wrapper row mt-4'>
            <AddCategory token={token}/>
                {categories.length > 0 &&
                categories.map(category => <Category key={category.id} category={category} />)
                }
            </div>

        </div>
    )
}
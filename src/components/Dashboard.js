// Importing React components
import React, { useEffect, useState } from 'react';

// Importing 3rd party components
import axios from 'axios';

// Importing Components
import DashboardMonths from './Layout/DashboardMonths'


export default function Dashboard({ token = {} }) {

    // Setting constants
    const authkey = token['key']
    const username = token['user_username']

    // Setting React State variables
    const [isLoading, setisLoading] = useState(false)
    const [isError, setisError] = useState(false)
    const [dashboardData, setDashboardData] = useState([])


    useEffect(() => {
        setisLoading(true)
        axios.get(`https://www.csabakeller.com/api/mybudget/dashboard/?username=${username}`, {
            headers: {
                "Content-type": "application/json",
                "Authorization": "Token " + authkey
            }
        })
            .then((response) => {
                const allPayments = response.data.reverse();
                setisLoading(false)
                setDashboardData(allPayments)
            })
            .catch((error) => {
                setisError(true)
                setisLoading(false)
            })
    }, [setDashboardData, authkey, username])

    return (
        <div className='dashboard-main container'>

            <div className='row text-center justify-content center'>
                <h4>Dashboard</h4>
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

            <div className='months-wrapper row mt-4'>
                {
                    dashboardData.map((data, i) => <DashboardMonths key={i} data={data} />)
                }
            </div>

        </div>

    )
}
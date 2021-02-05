// Importing React components
import React, { useEffect, useState } from 'react';

// Importing 3rd party components
import axios from 'axios';


export default function Dashboard({ token = {} }) {
    return (
        <div className='dashboard-main container'>
            <div className='row text-center justify-content center'>
                <h4>Dashboard</h4>
            </div>
        </div>
    )
}
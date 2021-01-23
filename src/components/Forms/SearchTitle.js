// Importing React components
import React, { useState } from 'react';

export default function SearchTitle({ onSearch = f => f }) {
    const [searchTerm, setSearchTerm] = useState('')

    const query = searchTerm

    return (
        <div className='input-group'>
            <input
                className='form-control'
                placeholder='Search title...'
                type='text'
                onChange={e => setSearchTerm(e.target.value)}
                aria-describedby="button-search"
            />
            <span>
                <button className='btn btn-primary btn-lg' type="button" id="button-search" onClick={(e) => onSearch({ e, query })}>
                    <i className="fas fa-search"></i>
                </button>
            </span>
        </div>
    )
}
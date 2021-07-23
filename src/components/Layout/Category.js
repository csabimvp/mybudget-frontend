// Importing React components
import React, { useState } from 'react';

export default function Category({ category = {}, onEdit = f => f }) {
    const { id, name, } = category
    const [isExpanded, setExpanded] = useState(false)
    const [editedName, setEditedName] = useState()

    function handleToggle(e) {
        e.preventDefault()
        const prev_state = isExpanded
        prev_state ? setExpanded(false) : setExpanded(true)
    }

    return (
        <div className='category-list' id={id}>

            {
                isExpanded ? (
                    <form onSubmit={(e) => onEdit({ e, category, editedName })}>
                        <div className='col'>
                            <h4 className='mb-3'>{name}</h4>
                            <div className='form-floating mb-3'>
                                <input className='form-control' type='text' id='form-title' onChange={e => setEditedName(e.target.value)} />
                                <label htmlFor='form-title'>Edit Name</label>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between mt-4' style={{ letterSpacing: '3rem' }}>
                            <button type="button" className="btn btn-secondary" onClick={((e) => handleToggle(e))}>
                                Cancel
                            </button>
                            <button className="btn btn-success" type="submit">Update</button>
                        </div>
                    </form>
                ) : (
                    <div className='d-flex justify-content-between'>
                        <h3 className='mb-1'>{name}</h3>
                        <button className='btn btn-dark ml-4' onClick={((e) => handleToggle(e))}>
                            <i className="far fa-edit"></i>
                        </button>
                    </div>
                )
            }

        </div >
    )
}
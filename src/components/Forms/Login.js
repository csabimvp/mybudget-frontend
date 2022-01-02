// Importing React components
import React, { useEffect, useState, createRef } from 'react';

// Importing 3rd party components
import axios from 'axios';
import lottie from 'lottie-web';

// Importing Animation
import Piggy from '../Assets/PiggyBank.json';


async function loginUser(credentials) {
    return axios.post('https://www.csabakeller.com/api/dj-rest-auth/login/', credentials)
        .then(key => key.data)
}

export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const PiggyContainer = createRef()

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const token = await loginUser({
                username,
                password
            });
            setToken(token)
        } catch {
            return;
        }
    }

    useEffect(() => {
        lottie.loadAnimation({
            container: PiggyContainer.current,
            animationData: Piggy,
        })
    }, [])

    return (
        <div className='container justify-content-center login'>
            <div className='login-wrapper'>
                <h1 className='h3 mb-3 fw-normal'>Please Log In</h1>
                <form onSubmit={handleSubmit}>
                    <div className='form-floating mb-3'>
                        <input className='form-control' id='floatingInput' type="text" placeholder="name@example.com" onChange={e => setUserName(e.target.value)} />
                        <label htmlFor="floatingInput">Username</label>
                    </div>
                    <div className='form-floating'>
                        <input className='form-control' id="floatingPassword" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div>
                        <button className='btn btn-lg btn-primary mt-4' type="submit">Log In</button>
                    </div>
                </form>
                <p className="mt-3 mb-3 text-muted">&copy; csabakeller.com - 2022</p>
            </div>
            <div className="loading-wrapper text-center">
                <div className='animation animations' ref={PiggyContainer}></div>
            </div>
        </div>
    )
}
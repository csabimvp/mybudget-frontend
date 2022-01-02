// Importing React components
import React, { useEffect } from 'react';

// Importing Animation
import Piggy from './PiggyBank.json';

// Importing 3rd party components
import lottie from 'lottie-web';

export default function PiggyAnimation() {
    useEffect(() => {
        lottie.loadAnimation({
            container: document.querySelector("#piggybank-animation"),
            animationData: Piggy,
        })
    }, [])

    return (
        <div className="loading-wrapper text-center">
            <div className='animation animations' id='piggybank-animation'></div>
        </div>
    )
}
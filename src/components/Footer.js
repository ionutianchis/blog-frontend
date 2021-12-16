import React from 'react'
import '../styles/Footer.css'

const Footer = () => {

    const handleClick = () => {
        window.open('https://github.com/Jonthejon10')
    }

    return (
		<footer>
			<p>© Jonthejon10, 2021</p>
			<button className='github-button' onClick={handleClick}></button>
		</footer>
	)
}

export default Footer
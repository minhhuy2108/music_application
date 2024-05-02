import React from 'react'
import './login.css'
import { Link } from 'react-router-dom'

export default function Login() {
    return (
        <div className='login-container'>
            <div className='header'>
                <h3>SONA</h3>
            </div>
            <div className="form">
                <h1 className="form-title">
                    LOGIN
                </h1>
                <p>Enter your details below</p>
                <form className="login-details" id="form-login" action='/'>
                    <div className="username">
                        <input type="text" name="username" maxLength={20} id="username" required />
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className="password">
                        <input type="password" maxLength={25} name="password" id="password" required />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button type='submit'>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>Submit</button>
                </form>
                <div className="register-para">
                    <p>
                        Don't have an account?
                        <Link className='register' to='/signup'> Signup</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

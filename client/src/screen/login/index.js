import React, { useEffect } from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { app } from '../../config/firebase.config';
import { useNavigate } from 'react-router-dom'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useStateValue } from '../../context/StateProvider';
import { actionType } from '../../context/reducer';
import { validateUser } from '../../api';

const Login = ({ setAuth }) => {
    const firebaseAuth = getAuth(app)
    const provider = new GoogleAuthProvider()
    const navigate = useNavigate();
    const [{ user }, dispatch] = useStateValue()

    const loginWithGoogle = async () => {
        await signInWithPopup(firebaseAuth, provider).then((userCred) => {
            if (userCred) {
                setAuth(true);
                window.localStorage.setItem("auth", "true");

                firebaseAuth.onAuthStateChanged((userCred) => {
                    if (userCred) {
                        userCred.getIdToken().then((token) => {
                            // console.log(token);
                            validateUser(token).then((data) => {
                                dispatch({
                                    type: actionType.SET_USER,
                                    user: data,
                                })
                            })

                        })
                        navigate("/", { replace: true })
                    }
                    else {
                        setAuth(false);
                        dispatch({
                            type: actionType.SET_USER,
                            user: null,
                        })
                        navigate("/login")
                    }
                })
            }
        })
    }

    useEffect(() => {
        if (window.localStorage.getItem("auth") === "true") {
            navigate('/', { replace: true })
        }
    })

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
                <div className='signin-gg'>
                    <div className='signin-gg-btn' onClick={loginWithGoogle}>
                        <FcGoogle />
                        Sign in with Google
                    </div>
                </div>
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
export default Login
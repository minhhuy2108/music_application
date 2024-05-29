import React from 'react'
import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Home from './screen/home'
import Search from './screen/search'
import './App.css'
import MenuSide from './components/menuside'
import MasterPlay from './components/masterplay'
import Login from './screen/login'
import SignUp from './screen/signup'
import { getAuth } from 'firebase/auth'
import { app } from './config/firebase.config'
import { validateUser } from "./api";
import { useStateValue } from './context/StateProvider'
import { actionType } from './context/reducer'


const App = () => {
  const firebaseAuth = getAuth(app)
  const navigate = useNavigate()
  const [{ user }, dispatch] = useStateValue();

  const [auth, setAuth] = useState(false || window.localStorage.getItem('auth') === 'true')

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          // console.log(token);  
          validateUser(token).then((data) => {
            // console.log(data);
            dispatch({
              type: actionType.SET_USER,
              user: data,
            })
          });
        });
      } else {
        setAuth(false)
        window.localStorage.setItem('auth', 'false');
        dispatch({
          type: actionType.SET_USER,
          user: null,
        })
        navigate('/login')
      }
    })
  }, [])
  return (

    <Routes>
      <Route
        path='*'
        element={
          <MainPage >
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<Search />} />
          </MainPage>
        } >
      </Route>
      <Route path='/login' element={<Login setAuth={setAuth} />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>

  )
}

function MainPage({ children }) {
  return (
    <header>
      <MenuSide />
      <Routes>
        {children}
      </Routes>
      <MasterPlay />
    </header>
  )
}

export default App
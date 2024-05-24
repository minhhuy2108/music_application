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
import axios from 'axios'
import { getAuth } from 'firebase/auth'
import { app } from './config/firebase.config'


const App = () => {
  const firebaseAuth = getAuth(app)
  const navigate = useNavigate()
  const [auth, setAuth] = useState(false || window.localStorage.getItem('auth') === 'true')

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          console.log(token);
        })
      } else {
        setAuth(false)
        window.localStorage.setItem('auth', 'false');
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
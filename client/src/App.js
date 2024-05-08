import React from 'react'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './screen/home'
import Search from './screen/search'
import './App.css'
import MenuSide from './components/menuside'
import MasterPlay from './components/masterplay'
import Login from './screen/login'
import SignUp from './screen/signup'
import axios from 'axios'


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const token = localStorage.getItem('token')

      if (token) {

        axios.get('http://localhost:4000/api/verify', { headers: { Authorization: `Bearer ${token}` } })
          .then(() => {
            setIsLoggedIn(true)
          })
          .catch(error => {
            console.log(error)
            setIsLoggedIn(false)
          })
      }
    }, 900)

  }, [isLoggedIn])
  return (
    <Router>
      <Routes>
        <Route
          path='*'
          element={
            <MainPage setIsLoggedIn={setIsLoggedIn}>
              <Route path='/' element={isLoggedIn ? <Home /> : <Navigate to='/login' />} />
              <Route path='/search' element={isLoggedIn ? <Search /> : <Navigate to="/login" />} />
            </MainPage>
          } >
        </Route>
        <Route path='/login' element={isLoggedIn ? <Navigate to="/" /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </Router>
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
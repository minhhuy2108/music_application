import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './screen/home'
import Search from './screen/search'
import './App.css'
import MenuSide from './components/menuside'
import MasterPlay from './components/masterplay'
import Login from './screen/login'
import SignUp from './screen/signup'


export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path='*'
          element={
            <MainPage>
              <Route path='/' element={<Home />} />
              <Route path='/search' element={<Search />} />
            </MainPage>
          } >
        </Route>
        <Route path='/login' element={<Login />} />
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
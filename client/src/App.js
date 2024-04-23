import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './screen/home'
import Search from './screen/search'
import './App.css'
import MenuSide from './components/menuside'
import MasterPlay from './components/masterplay'


export default function App() {
  return (
    <Router>
      <header>
        <MenuSide />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
        </Routes>
        <MasterPlay />
      </header>
    </Router>
  )
}

import React from 'react'
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './screen/home'
import Search from './screen/search'
import './App.css'
import MenuSide from './components/menuside'
import MasterPlay from './components/masterplay'
import Login from './screen/login'
import SignUp from './screen/signup'
import { getAuth } from 'firebase/auth'
import { app } from './config/firebase.config'
import { validateUser } from "./api"
import { useStateValue } from './context/StateProvider'
import { actionType } from './context/reducer'
import { DashboardUser } from './components/dashboarduser'
import { DashboardSong } from './components/dashboardsong'
import { DashboardArtist } from './components/dashboardartist'
import { DashboardAlbum } from './components/dashboardalbum'
import { DashboardNewSong } from './components/dashboardnewsong'
import { motion } from 'framer-motion'
import { MusicPlayer } from './components/musicplayer'
import { DashBoardNewArtist } from './components/dashboardnewartist'
import { DashBoardNewAlbum } from './components/dashboardnewalbum'
import { SongByArtist } from './components/songbyartist'




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
            <Route path='/*' element={<Home />} />
            <Route path='/search' element={<Search />} />
            <Route path='/dashboard-users' element={<DashboardUser />} />
            <Route path='/dashboard-songs' element={<DashboardSong />} />
            <Route path='/dashboard-artists' element={<DashboardArtist />} />
            <Route path='/dashboard-albums' element={<DashboardAlbum />} />
            <Route path='/dashboard-newSong' element={<DashboardNewSong />} />
            <Route path='/dashboard-newArtist' element={<DashBoardNewArtist />} />
            <Route path='/dashboard-newAlbum' element={<DashBoardNewAlbum />} />
            {/* <Route path='/songByArtist' element={<SongByArtist />} /> */}
            <Route path="/songByArtist/:id" element={<SongByArtist />} />
          </MainPage>
        } >
      </Route>
      <Route path='/login' element={<Login setAuth={setAuth} />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>

  )
}

function MainPage({ children }) {
  const [{ isSongPlaying }, dispatch] = useStateValue();
  return (
    <header>
      <MenuSide />
      <Routes>
        {children}
      </Routes>
      {isSongPlaying && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className='music-player'
        >
          <MusicPlayer />
        </motion.div>
      )}
    </header>
  )
}


export default App
import React, { useState } from 'react'
import './songside.css'
import { useStateValue } from '../../context/StateProvider'
import { NavLink, useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { app } from '../../config/firebase.config'
import { motion } from "framer-motion";

export default function SongSide() {
    const [{ user }, dispatch] = useStateValue()
    const navigate = useNavigate();
    const [isMenu, setIsMenu] = useState(false);

    const logout = () => {
        const firebaseAuth = getAuth(app);
        firebaseAuth
            .signOut()
            .then(() => {
                window.localStorage.setItem("auth", "false");
            })
            .catch((e) => console.log(e));
        navigate("/login", { replace: true });
    };

    return (
        <div className='song-side'>
            <div className='song-side-header'>
                <img className='user-icon' src={user?.user?.imageURL} alt='user' referrerPolicy='no-referrer'
                    onClick={() => setIsMenu(isMenu === false ? true : false)}></img>
                {isMenu && (<motion.div initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="user-dropdown">
                    <NavLink to={"/userProfile"}>
                        <p className="dropdown-item">
                            Profile
                        </p>
                    </NavLink>
                    <p className="dropdown-item">
                        My Favourites
                    </p>

                    <hr />

                    <p className="dropdown-item" onClick={logout}>
                        Sign Out
                    </p>
                </motion.div>
                )}
            </div>
        </div>
    )
}

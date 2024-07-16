import React, { useEffect } from 'react'
import './menuside.css'
import MenuButton from '../menubutton';
import { GoHome } from "react-icons/go";
import { RiSearchLine } from "react-icons/ri";
import '../songitem/songitem.css'
import { GoHomeFill } from "react-icons/go";
import { RiSearchFill } from "react-icons/ri";
import { getAllArtists, getSongsByArtist } from '../../api';
import { actionType } from '../../context/reducer';
import { useStateValue } from '../../context/StateProvider';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GiHypersonicBolt } from "react-icons/gi";


export default function MenuSide() {
    const [{ artists }, dispatch] = useStateValue()
    useEffect(() => {
        if (!artists) {
            getAllArtists().then((data) => {
                dispatch({ type: actionType.SET_ARTISTS, artists: data.data });
            });
        }
    }, []);
    return (
        <div className='menu-side'>
            <div className='menu-button-container'>
                <MenuButton title='Home' to='/' icon={<GoHome size={30} />} iconActive={<GoHomeFill size={30} />} />
                <MenuButton title='Search' to='/search' icon={<RiSearchLine size={30} />} iconActive={<RiSearchFill size={30} />} />
            </div>
            <div className='library-container'>
                <div className='artist-icon-container'>
                    <GiHypersonicBolt className='artist-icon' style={{ color: '#3978d6' }} size={30} />
                    <p>Artist</p>
                </div>

                <div className='song-container'>
                    {artists &&
                        artists.map((artist, i) => (
                            <MenuArtist key={artist._id} data={artist} index={i} />
                        ))}
                </div>


            </div>

        </div>
    )
}

export const MenuArtist = ({ data, index }) => {
    // const [{ }, dispatch] = useStateValue()

    return (
        <motion.div
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0., delay: index * 0.1 }}
        >
            <Link className='song-by-artist' to={`/songByArtist/${data._id}`}>
                <span> {index + 1} </span>
                <img src={data?.imageURL} alt='music' />
                <h5>
                    {data.name}
                </h5>
            </Link>
        </motion.div>
    )
}

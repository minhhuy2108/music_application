import React, { useEffect } from 'react'
import './menuside.css'
import MenuButton from '../menubutton';
import { GoHome } from "react-icons/go";
import { RiSearchLine } from "react-icons/ri";
import '../songitem/songitem.css'
import { GoHomeFill } from "react-icons/go";
import { RiSearchFill } from "react-icons/ri";
import { getAllArtists } from '../../api';
import { actionType } from '../../context/reducer';
import { useStateValue } from '../../context/StateProvider';


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
    return (
        <li>
            <span> {index + 1} </span>
            <img src={data?.imageURL} alt='music' />
            <h5>
                {data.name}
            </h5>
        </li>
    )
}

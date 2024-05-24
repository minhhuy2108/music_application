import React from 'react'
import './menuside.css'
// import logo from '../../assets/logo.png'
import MenuButton from '../menubutton';
import { GoHome } from "react-icons/go";
import { RiSearchLine } from "react-icons/ri";
import SongItem from '../songitem';

export default function MenuSide() {
    return (
        <div className='menu-side'>
            <div className='menu-button-container'>
                <MenuButton title='Home' to='/' icon={<GoHome size={30} />} />
                <MenuButton title='Search' to='/search' icon={<RiSearchLine size={30} />} />
            </div>
            <div className='library-container'>
                <div className='song-container'>
                    <SongItem numb='01' />
                    <SongItem numb='02' />
                    <SongItem numb='03' />
                    <SongItem numb='04' />
                    <SongItem numb='05' />
                    <SongItem numb='06' />
                    <SongItem numb='07' />
                    <SongItem numb='08' />
                    <SongItem numb='09' />
                </div>


            </div>

        </div>
    )
}

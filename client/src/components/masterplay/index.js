import React from 'react'
import './masterplay.css'
import musicplayed from '../../assets/music.jpg'
import { BsFillSkipStartFill } from "react-icons/bs";
import { BsFillSkipEndFill } from "react-icons/bs";
import { BsPlayFill } from "react-icons/bs";
import { MdVolumeUp } from "react-icons/md";

export default function MasterPlay() {
    return (
        <div className='master-play'>
            <div className='wave'>
                <div className='wave1'></div>
                <div className='wave1'></div>
                <div className='wave1'></div>
            </div>
            <img src={musicplayed} alt='alan' />
            <h5>Under The Sea <br />
                <div className='sub-title'>Allan Walker</div>
            </h5>
            <div className='start-play-end'>
                <i className='icon'><BsFillSkipStartFill /></i>
                <i className='icon'><BsPlayFill /></i>
                <i className='icon'><BsFillSkipEndFill /></i>
            </div>
            <span id='cur-start'>0:00</span>
            <div className='bar'>
                <input type='range' id='seek' min='0' max='100' value='0'></input>
                <div className='bar2' id='bar2'></div>
                <div className='dot'></div>
            </div>
            <span id='cur-end'>0:00</span>

            <div className='vol'>
                <i className='icon'><MdVolumeUp /></i>
                <input type='range' id='seek' min='0' max='100' value='30'></input>
                <div className='vol-bar'></div>
                <div className='dot' id='vol-dot'></div>
            </div>
        </div>
    )
}

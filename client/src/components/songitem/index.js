import React from 'react'
import './songitem.css'
import music from '../../assets/music.jpg'

export default function SongItem(props) {
    return (
        <li>
            <span> {props.numb} </span>
            <img src={music} alt='music' />
            <h5>Under The Sea
                <div className='sub-title'>Allan Walker</div>
            </h5>
        </li>
    )
}

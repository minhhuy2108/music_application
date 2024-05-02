import React from 'react'
import './menubutton.css'
import { Link } from 'react-router-dom'

export default function MenuButton(props) {
    return (
        <Link className='btn-body' to={props.to}>
            <div className='btn-icon'>{props.icon}</div>
            <div className='btn-title'>{props.title}</div>
        </Link>
    )
}

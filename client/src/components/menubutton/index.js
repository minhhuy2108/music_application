import React from 'react'
import './menubutton.css'
import { Link, useLocation } from 'react-router-dom'


export default function MenuButton(props) {
    const location = useLocation();
    const isActive = location.pathname === props.to
    const btnClass = isActive ? 'btn-body-active' : 'btn-body'
    const btnIcon = isActive ? props.iconActive : props.icon
    return (
        <Link className={btnClass} to={props.to}>
            <div className='btn-icon'>{btnIcon}</div>
            <div className='btn-title'>{props.title}</div>
        </Link>
    )
}

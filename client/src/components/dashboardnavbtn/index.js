import React from 'react'
import './dashboardnavbtn.css'
import { Link, useLocation } from 'react-router-dom'

export const NavButton = (props) => {
    const location = useLocation();
    const isActive = location.pathname === props.to
    const btnClass = isActive ? 'navbtn-active' : 'navbtn'
    return (
        <Link className={btnClass} to={props.to}>{props.tittle}</Link>
    )
}

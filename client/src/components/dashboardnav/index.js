import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './dashboardnav.css'


export const DashboardNav = () => {
    const location = useLocation()
    const pathname = location.pathname
    return (
        <div className='dashboard-nav-container'>
            <div className="dashboard-nav">

                <NavLink to={"/dashboard-users"} className={`dashboardnav`}> Users </NavLink>


                <NavLink to={"/dashboard-songs"} className='dashboardnav'> Songs </NavLink>


                <NavLink to={"/dashboard-artists"} className='dashboardnav'> Artist </NavLink>


                <NavLink to={"/dashboard-albums"} className='dashboardnav'> Albums </NavLink>
            </div>
        </div>
    )
}

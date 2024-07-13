import React from 'react'
import './dashboardnav.css'
import { NavButton } from '../dashboardnavbtn'

export const DashboardNav = () => {

    return (
        <div className='dashboard-nav-container'>
            <div className="dashboard-nav">
                <NavButton tittle={"Users"} to={"/dashboard-users"} />

                <NavButton tittle={"Songs"} to={"/dashboard-songs"} />

                <NavButton tittle={"Artists"} to={"/dashboard-artists"} />

                <NavButton tittle={"Albums"} to={"/dashboard-albums"} />
            </div>
        </div>
    )
}

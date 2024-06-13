import React, { useEffect, useState } from 'react'
import { useStateValue } from '../../context/StateProvider';
import './dashboarduser.css'
import { UserCard } from '../usercard';
import { getAllUsers } from '../../api';
import { actionType } from '../../context/reducer';
import { Header } from '../header';
import { DashboardNav } from '../dashboardnav';


export const DashboardUser = () => {
    const [{ allUsers }, dispatch] = useStateValue();
    const [filtereUsers, setFiltereUsers] = useState(null);
    useEffect(() => {
        if (!allUsers) {
            getAllUsers().then((data) => {
                dispatch({
                    type: actionType.SET_ALL_USERS,
                    allUsers: data.data,
                });
            });
        }
    }, []);

    return (
        <div className='dashboard'>
            <Header></Header>
            <DashboardNav></DashboardNav>
            <div className="dashboard-container">
                <div className="count-box">
                    <div className="count-tag">
                        <p className="count-tag-span">
                            <span className="count">
                                Count :{" "}
                            </span>
                            {filtereUsers ? filtereUsers?.length : allUsers?.length}
                        </p>
                    </div>
                </div>
                <div className="user-features">

                    <p className="feature">Avatar</p>

                    <p className="feature">Name</p>

                    <p className="feature">Email</p>

                    <p className="feature">Verified</p>

                    <p className="feature">Created</p>

                    <p className="feature">Role</p>{" "}
                </div>
                {
                    allUsers && (allUsers?.map((data, i) => (
                        <UserCard data={data} key={data} index={i} />
                    ))
                    )
                }
            </div>
        </div>
    )
}

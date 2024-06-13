import React, { useState } from 'react'
import './usercard.css'
import { motion } from "framer-motion";
import moment from "moment";
import { useStateValue } from '../../context/StateProvider';
import { actionType } from '../../context/reducer';
import { MdDelete } from "react-icons/md";
import { changingUserRole, getAllUsers, removeUser } from '../../api';


export const UserCard = ({ data, index }) => {
    const [{ user }, dispatch] = useStateValue();
    const [isUpdateRole, setIsUpdateRole] = useState(false);
    const createdAt = moment(new Date(data.createdAt)).format("MMMM Do YYYY");
    const [isLoading, setIsLoading] = useState(false);

    const UpdateUserRole = (userId, role) => {
        setIsLoading(true);
        setIsUpdateRole(false);
        changingUserRole(userId, role).then((res) => {
            if (res) {
                getAllUsers().then((data) => {
                    dispatch({
                        type: actionType.SET_ALL_USERS,
                        allUsers: data.data,
                    });
                });
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);
            }
        });
    };

    const deleteuser = (userId) => {
        setIsLoading(true);
        removeUser(userId).then((res) => {
            if (res) {
                getAllUsers().then((data) => {
                    dispatch({
                        type: actionType.SET_ALL_USERS,
                        allUsers: data.data,
                    });
                });
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);
            }
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="user-card">
            {data._id !== user?.user._id && (
                <motion.div
                    whileTap={{ scale: 0.75 }}
                    className="user-bin"
                    onClick={() => deleteuser(data._id)}
                >
                    <MdDelete className="user-bin-ic" />
                </motion.div>
            )}
            <div className="ava-contain">
                <img src={data.imageURL} alt="" className="avatar"
                />
            </div>

            <p className="user-i4">{data.name}</p>

            <p className="user-i4">{data.email}</p>

            <p className="user-i4">{data.email_verfied ? "True" : "False"}</p>

            <p className="user-i4">{createdAt}</p>

            <div className="change-role">
                <p className="role"> {data.role}</p>
                {data._id !== user?.user._id && (
                    <motion.p
                        whileTap={{ scale: 0.75 }}
                        className="other-role"
                        onClick={() => setIsUpdateRole(true)}
                    >
                        {data.role === "admin" ? "Member" : "Admin"}
                    </motion.p>
                )}
                {isUpdateRole && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="change-role-box"
                    >
                        <p className="change-role-alert">
                            Are you sure,do u want to mark the user as{" "}
                            <span>{data.role === "admin" ? "Member" : "Admin"}</span> ?
                        </p>
                        <div className="change-role-confirm">
                            <motion.button
                                whileTap={{ scale: 0.75 }}
                                className="role-yes"
                                onClick={() =>
                                    UpdateUserRole(
                                        data._id,
                                        data.role === "admin" ? "member" : "admin"
                                    )
                                }
                            >
                                Yes
                            </motion.button>
                            <motion.button
                                whileTap={{ scale: 0.75 }}
                                className="role-no"
                                onClick={() => setIsUpdateRole(false)}
                            >
                                No
                            </motion.button>
                        </div>
                        {isLoading && (
                            <div className="load"></div>
                        )}
                    </motion.div>
                )}
            </div>

        </motion.div>


    )
}

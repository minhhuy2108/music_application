import React, { useEffect, useState } from 'react'
import { Header } from '../header'
import { DashboardNav } from '../dashboardnav'
import { deleteAlbumById, getAllAlbums } from '../../api'
import { useStateValue } from '../../context/StateProvider'
import { actionType } from '../../context/reducer'
import './dashboardalbum.css'
import { motion } from 'framer-motion'
import { MdDelete } from 'react-icons/md'
import AlertSuccess from "../alertsuccess";
import AlertError from "../alerterror";


export const DashboardAlbum = () => {
    const [{ allAlbums }, dispatch] = useStateValue();

    useEffect(() => {
        if (!allAlbums) {
            getAllAlbums().then((data) => {
                dispatch({ type: actionType.SET_ALL_ALBUMNS, allAlbums: data.data });
            });
        }
    }, []);
    return (
        <div className='dashboard'>
            <Header></Header>
            <DashboardNav></DashboardNav>
            <div className="album-01">
                <div className="album-02">
                    <AlbumContainer data={allAlbums} />
                </div>
            </div>
        </div >
    )
}

export const AlbumContainer = ({ data }) => {
    return (
        <div className="albums">
            {data &&
                data.map((album, i) => (
                    <AlbumCard key={album._id} data={album} index={i} />
                ))}
        </div>
    );
};

export const AlbumCard = ({ data, index }) => {
    const [isDelete, setIsDelete] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState(null);
    const [{ allAlbums }, dispatch] = useStateValue();

    const deleteObject = (id) => {
        console.log(id);
        deleteAlbumById(id).then((res) => {
            if (res.data.success) {
                setAlert("success");
                setAlertMsg(res.data.msg);
                getAllAlbums().then((data) => {
                    dispatch({
                        type: actionType.SET_ALL_ALBUMNS,
                        allAlbums: data.data,
                    });
                });
                setTimeout(() => {
                    setAlert(false);
                }, 4000);
            } else {
                setAlert("error");
                setAlertMsg(res.data.msg);
                setTimeout(() => {
                    setAlert(false);
                }, 4000);
            }
        });
    };
    return (
        <motion.div
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="album-card-01"
        >
            <img
                src={data?.imageURL}
                className="album-card-02"
                alt=""
            />

            <p className="album-card-03">{data.name}</p>

            <motion.i
                className="album-card-04"
                whileTap={{ scale: 0.75 }}
                onClick={() => setIsDelete(true)}
            >
                <MdDelete className=" album-card-05" />
            </motion.i>

            {isDelete && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="album-card-06"
                >
                    <p className="album-card-07">
                        Are you sure do you want to delete this?
                    </p>
                    <div className="album-card-08">
                        <div className="album-card-09"
                            onClick={() => deleteObject(data._id)}>
                            <p className="album-card-10">Yes</p>
                        </div>
                        <div
                            className="album-card-11"
                            onClick={() => setIsDelete(false)}
                        >
                            <p className="album-card-12">No</p>
                        </div>
                    </div>
                </motion.div>
            )}
            {alert && (
                <>
                    {alert === "success" ? (
                        <AlertSuccess msg={alertMsg} />
                    ) : (
                        <AlertError msg={alertMsg} />
                    )}
                </>
            )}
        </motion.div>
    );

}
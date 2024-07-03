import React, { useEffect, useState } from 'react'
import { Header } from '../header'
import { DashboardNav } from '../dashboardnav'
import { deleteArtistById, getAllArtists } from '../../api'
import { useStateValue } from '../../context/StateProvider'
import { actionType } from '../../context/reducer'
import './dashboardartist.css'
import { motion } from 'framer-motion'
import { MdDelete } from 'react-icons/md'
import AlertError from '../alerterror'
import AlertSuccess from '../alertsuccess'


export const DashboardArtist = () => {
    const [{ artists }, dispatch] = useStateValue();

    useEffect(() => {
        if (!artists) {
            getAllArtists().then((data) => {
                dispatch({ type: actionType.SET_ARTISTS, artists: data.data });
            });
        }
    }, []);

    return (
        <div className='dashboard'>
            <Header></Header>
            <DashboardNav></DashboardNav>
            <div className="artist-01">
                <div className="artist-02">
                    <ArtistContainer data={artists} />
                </div>
            </div>
        </div >
    )
}

export const ArtistContainer = ({ data }) => {
    return (
        <div className="albums">
            {data &&
                data.map((artist, i) => (
                    <ArtistCard key={artist._id} data={artist} index={i} />
                ))}
        </div>
    );
};

export const ArtistCard = ({ data, index }) => {
    const [isDelete, setIsDelete] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState(null);
    const [{ allAlbums }, dispatch] = useStateValue();

    const deleteObject = (id) => {
        console.log(id);
        deleteArtistById(id).then((res) => {
            if (res.data.success) {
                setAlert("success");
                setAlertMsg(res.data.msg);
                getAllArtists().then((data) => {
                    dispatch({
                        type: actionType.SET_ARTISTS,
                        artists: data.data,
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
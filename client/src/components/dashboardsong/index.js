import React, { useEffect, useState } from 'react'
import { Header } from '../header'
import { DashboardNav } from '../dashboardnav'
import { IoAdd, IoTrash } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { motion } from 'framer-motion'
import { actionType } from '../../context/reducer';
import { useStateValue } from '../../context/StateProvider';
import { getAllSongs, deleteSongById } from '../../api';
import AlertSuccess from "../alertsuccess";
import AlertError from "../alerterror";
import './dashboardsong.css'


export const DashboardSong = () => {
    const [songFilter, setSongFilter] = useState("");
    const [isFocus, setIsFocus] = useState(false);
    const [filteredSongs, setFilteredSongs] = useState(null);

    const [{ allSongs }, dispatch] = useStateValue();

    useEffect(() => {
        getAllSongs().then((data) => {
            dispatch({
                type: actionType.SET_ALL_SONGS,
                allSongs: data.data,
            });
        });
    }, []);

    // useEffect(() => {
    //     if (songFilter.length > 0) {
    //         const filtered = allSongs.filter(
    //             (data) =>
    //                 data.artist.toLowerCase().includes(songFilter) ||
    //                 data.artist.includes(songFilter) ||
    //                 data.language.toLowerCase().includes(songFilter) ||
    //                 data.name.toLowerCase().includes(songFilter) ||
    //                 data.name.includes(songFilter)
    //         );
    //         setFilteredSongs(filtered);
    //     } else {
    //         setFilteredSongs(null);
    //     }
    // }, [songFilter]);

    return (
        <div className='dashboard'>
            <Header></Header>
            <DashboardNav></DashboardNav>
            <div className="dashsong">
                <div className="add-search">
                    <NavLink
                        to={"/dashboard-newSong"}
                        className="ic-add"
                    >
                        <IoAdd size={25} />
                    </NavLink>


                </div>
                <div className="song-area">
                    <SongContainer data={filteredSongs ? filteredSongs : allSongs} />
                </div>
            </div>
        </div >
    )
}

export const SongContainer = ({ data }) => {
    return (
        <div className="songs">
            {data &&
                data.map((song, i) => (
                    <SongCard key={song._id} data={song} index={i} />
                ))}
        </div>
    );
};

export const SongCard = ({ data, index }) => {
    const [isDeleted, setIsDeleted] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState(null);

    const [{ song, isSongPlaying }, dispatch] = useStateValue();

    const addSongToContext = () => {
        if (!isSongPlaying) {
            dispatch({
                type: actionType.SET_SONG_PLAYING,
                isSongPlaying: true,
            });
        }
        if (song !== index) {
            dispatch({
                type: actionType.SET_SONG,
                song: index,
            });
        }
    };

    const deleteObject = (id) => {
        console.log(id);
        deleteSongById(id).then((res) => {
            if (res.data.success) {
                setAlert("success");
                setAlertMsg(res.data.msg);
                getAllSongs().then((data) => {
                    dispatch({
                        type: actionType.SET_ALL_SONGS,
                        allSongs: data.data,
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
            whileTap={{ scale: 1 }}
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="song-card"
        >
            {isDeleted && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    className="del-area"
                >
                    <p className="delete-song-alert">
                        Are you sure do you want to delete this song?
                    </p>

                    <div className="yes-no">
                        <button
                            className="yes-del"
                            onClick={() => deleteObject(data._id)}
                        >
                            Yes
                        </button>
                        <button
                            className="no-del"
                            onClick={() => setIsDeleted(false)}
                        >
                            No
                        </button>
                    </div>
                </motion.div>
            )}

            <div className="thumbnail-container">
                <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={data.imageURL}
                    alt=""
                    className="thumbnail"
                    onClick={addSongToContext}
                />
            </div>

            <p className="song-i4">
                {data.name.length > 25 ? `${data.name.slice(0, 25)}` : data.name}
                <span className="artist-song">{data.artist}</span>
            </p>

            <div className="bin-container">
                <motion.i whileTap={{ scale: 0.9 }} onClick={() => setIsDeleted(true)}>
                    <IoTrash className="bin" />
                </motion.i>
            </div>

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
};

export default DashboardSong;
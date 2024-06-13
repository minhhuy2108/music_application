import React, { useEffect, useState } from 'react'
import { Header } from '../header'
import { DashboardNav } from '../dashboardnav'
import { IoAdd, IoTrash } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { motion } from 'framer-motion'
import { AiOutlineClear } from "react-icons/ai";
import { actionType } from '../../context/reducer';
import { useStateValue } from '../../context/StateProvider';
import { getAllSongs, deleteSongById } from '../../api';
import AlertSuccess from "./AlertSuccess";
import AlertError from "./AlertError";
import './dashboardsong.css'


export const DashboardSong = () => {
    const [songFilter, setSongFilter] = useState("");
    const [isFocus, setIsFocus] = useState(false);
    const [filteredSongs, setFilteredSongs] = useState(null);

    const [{ allSongs }, dispatch] = useStateValue();

    useEffect(() => {
        if (!allSongs) {
            getAllSongs().then((data) => {
                dispatch({
                    type: actionType.SET_ALL_SONGS,
                    allSongs: data.data,
                });
            });
        }
    }, []);

    return (
        <div className='dashboard'>
            <Header></Header>
            <DashboardNav></DashboardNav>
            <div className="dashsong">
                <div className="add-search">
                    <NavLink
                        to={"/dashboard/newSong"}
                        className="ic-add"
                    >
                        <IoAdd />
                    </NavLink>
                    <input
                        type="text"
                        placeholder="Search here"
                        className={`w-52 px-4 py-2 border ${isFocus ? "border-gray-500 shadow-md" : "border-gray-300"
                            } rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold`}
                        value={songFilter}
                        onChange={(e) => setSongFilter(e.target.value)}
                        onBlur={() => setIsFocus(false)}
                        onFocus={() => setIsFocus(true)}
                    />
                    {songFilter && (
                        <motion.i
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            whileTap={{ scale: 0.75 }}
                            onClick={() => {
                                setSongFilter("");
                                setFilteredSongs(null);
                            }}
                        >
                            <AiOutlineClear className="ic-clean" />
                        </motion.i>
                    )}
                </div>
                <div className="song-area">
                    <div className="song-count-tag">
                        <p className="song-counter">
                            <span className="count-song">
                                Count :{" "}
                            </span>
                            {filteredSongs ? filteredSongs?.length : allSongs?.length}
                        </p>
                    </div>

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

    const [{ allSongs, song, isSongPlaying }, dispatch] = useStateValue();

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
            whileTap={{ scale: 0.8 }}
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="song-card"
            onClick={addSongToContext}
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
                />
            </div>

            <p className="song-i4">
                {data.name.length > 25 ? `${data.name.slice(0, 25)}` : data.name}
                <span className="artist-song">{data.artist}</span>
            </p>

            <div className="bin-container">
                <motion.i whileTap={{ scale: 0.75 }} onClick={() => setIsDeleted(true)}>
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
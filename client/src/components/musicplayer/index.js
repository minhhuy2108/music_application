import React, { useEffect, useState } from 'react'
import { useStateValue } from '../../context/StateProvider'
import { motion } from 'framer-motion';
import { RiPlayListFill } from 'react-icons/ri';
import './musicplayer.css';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css'
import { getAllSongs } from '../../api';
import { actionType } from '../../context/reducer'
import { IoMusicalNotes } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

export const MusicPlayer = () => {
    const [{ allSongs, song, isSongPlaying }, dispatch] =
        useStateValue();
    const nextTrack = () => {
        if (song >= (allSongs.length - 1)) {
            dispatch({
                type: actionType.SET_SONG,
                song: 0,
            });
        } else {
            dispatch({
                type: actionType.SET_SONG,
                song: song + 1,
            });
        }
    };

    const previousTrack = () => {
        if (song === 0) {
            dispatch({
                type: actionType.SET_SONG,
                song: 0,
            });
        } else {
            dispatch({
                type: actionType.SET_SONG,
                song: song - 1,
            });
        }
    };
    const closeMusicPlayer = () => {
        if (isSongPlaying) {
            dispatch({
                type: actionType.SET_SONG_PLAYING,
                isSongPlaying: false,
            });
        }
    };

    const [isPlayList, setIsPlayList] = useState(false)
    return (
        <div className="mp-01">
            <div className='mp-02'>
                <img
                    src={allSongs[song]?.imageURL}
                    className="mp-03"
                    alt=""
                />
                <div className="mp-04">
                    <p className="mp-05">
                        {`${allSongs[song]?.name.length > 20
                            ? allSongs[song]?.name.slice(0, 20)
                            : allSongs[song]?.name
                            }`}{" "}
                        <span className="mp-06">({allSongs[song]?.album})</span>
                    </p>
                    <p className="mp-07">
                        {allSongs[song]?.artist}{" "}
                        <span className="mp-08">
                            ({allSongs[song]?.category})
                        </span>
                    </p>
                    <motion.i
                        whileTap={{ scale: 0.8 }}
                        onClick={() => setIsPlayList(!isPlayList)}
                    >
                        <RiPlayListFill className="mp-09" />
                    </motion.i>
                </div>
                <div className="mp-10">
                    <AudioPlayer
                        src={allSongs[song]?.songUrl}
                        onPlay={() => console.log("is playing")}
                        autoPlay={true}
                        showSkipControls={true}
                        onClickNext={nextTrack}
                        onClickPrevious={previousTrack}
                    />
                </div>

                {isPlayList && (
                    <>
                        <PlayListCard />
                    </>
                )}
                <motion.i whileTap={{ scale: 0.8 }} onClick={closeMusicPlayer}>
                    <IoMdClose className="mp-11" />
                </motion.i>
                <div />

            </div>
        </div>
    )
}


export const PlayListCard = () => {
    const [{ allSongs, song, isSongPlaying }, dispatch] = useStateValue();

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

    const setCurrentPlaySong = (songindex) => {
        if (!isSongPlaying) {
            dispatch({
                type: actionType.SET_SONG_PLAYING,
                isSongPlaying: true,
            });
        }
        if (song !== songindex) {
            dispatch({
                type: actionType.SET_SONG,
                song: songindex,
            });
        }
    };

    return (
        <div className="pc-01">
            {allSongs.length > 0 ? (
                allSongs.map((music, index) => (
                    <motion.div
                        initial={{ opacity: 0, translateX: -50 }}
                        animate={{ opacity: 1, translateX: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="pc-09"
                        onClick={() => setCurrentPlaySong(index)}
                    >
                        <IoMusicalNotes className="pc-02" />

                        <div className="pc-03">
                            <p className="pc-04">
                                {`${music?.name.length > 20
                                    ? music?.name.slice(0, 20)
                                    : music?.name
                                    }`}{" "}
                                <span className="pc-05">({music?.album})</span>
                            </p>
                            <p className="pc-06">
                                {music?.artist}{" "}
                                <span className="pc-07">
                                    ({music?.category})
                                </span>
                            </p>
                        </div>
                    </motion.div>
                ))
            ) : (
                <></>
            )}
        </div>
    )
}
import React, { useEffect, useState } from 'react'
import './songside.css'
import { Header } from '../header'
import { useStateValue } from '../../context/StateProvider'
import { actionType } from '../../context/reducer'
import { getAllSongs } from '../../api'
import { motion } from 'framer-motion'
import { SearchBar } from '../searchbar'

export default function SongSide() {
    const [
        {
            searchTerm,
            allSongs,
            artistFilter,
        },
        dispatch,
    ] = useStateValue();

    const [filteredSongs, setFilteredSongs] = useState();
    const [musicState, setMusicState] = useState(true)

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


    useEffect(() => {
        if (searchTerm.length > 0) {
            const filtered = allSongs.filter(
                (data) =>
                    data.artist.toLowerCase().includes(searchTerm) ||
                    data.artist.includes(searchTerm) ||
                    data.name.toLowerCase().includes(searchTerm) ||
                    data.name.includes(searchTerm) ||
                    data.artist.includes(artistFilter)
            );
            setFilteredSongs(filtered);
        } else {
            setFilteredSongs(null);
        }
    }, [searchTerm]);

    return (

        <div className='song-side'>
            <Header></Header>
            <div className="ss-01">
                <SearchBar />

                {searchTerm.length > 0 && (
                    <p className="search-bar">
                        Searched for :
                        <span className="search-bar-001">
                            {searchTerm}
                        </span>
                    </p>
                )}


                <div className="ss-02">
                    <SearchSongContainer musics={filteredSongs ? filteredSongs : allSongs} />
                </div>

            </div>
        </div>
    )
}

export const SearchSongContainer = ({ musics }) => {
    const [{ isSongPlaying, song }, dispatch] = useStateValue();
    const addSongToContext = (index) => {
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
    return (
        <>
            {musics?.map((data, index) => (
                <motion.div
                    key={data._id}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, translateX: -50 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="search-song-card"
                    onClick={() => addSongToContext(index)}
                >
                    <div className="search-song-container">
                        <motion.img
                            whileHover={{ scale: 1.05 }}
                            src={data.imageURL}
                            alt=""
                            className=" search-song-image"
                        />
                    </div>

                    <p className="search-song-i4">
                        {data.name.length > 25 ? `${data.name.slice(0, 25)}` : data.name}
                        <span className="search-song-artist">
                            {data.artist}
                        </span>
                    </p>
                </motion.div>
            ))}
        </>
    );
};
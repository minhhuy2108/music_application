import React, { useEffect, useState } from 'react'
import { useStateValue } from '../../context/StateProvider';
import { actionType } from '../../context/reducer';
import { getAllSongs } from '../../api';
import { Header } from '../header';
import { SearchSongContainer } from '../songside';

export const HomeSide = () => {
    const [
        {
            searchTerm,
            allSongs,
            artistFilter,
        },
        dispatch,
    ] = useStateValue();

    const [filteredSongs, setFilteredSongs] = useState();

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

                {searchTerm.length > 0 && (
                    <p className="search-bar">
                        Searched for :
                        <span className="search-bar-01">
                            {searchTerm}
                        </span>
                    </p>
                )}


                <div className="ss-022">
                    <SearchSongContainer musics={filteredSongs ? filteredSongs : allSongs} />
                </div>

            </div>
        </div>
    )
}

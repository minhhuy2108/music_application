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
        } else {
            getAllSongs().then((data) => {
                dispatch({
                    type: actionType.SET_ALL_SONGS,
                    allSongs: data.data,
                });
            });
        }
    }, []);


    return (

        <div className='song-side'>
            <Header></Header>
            <div className="ss-01">

                <div className="ss-022">
                    <SearchSongContainer musics={filteredSongs ? filteredSongs : allSongs} />
                </div>

            </div>
        </div>
    )
}

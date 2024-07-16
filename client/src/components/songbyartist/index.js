import React, { useLayoutEffect, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Header } from '../header'
import { SearchBar } from '../searchbar'
import { SearchSongContainer } from '../songside'
import { useStateValue } from '../../context/StateProvider'
import { getOneArtist } from '../../api';
import axios from 'axios';
import { actionType } from '../../context/reducer';


export const SongByArtist = () => {
    const [filteredSongs, setFilteredSongs] = useState();
    const [name, setName] = useState()

    const [
        {
            searchTerm,
            songByArtist,
        },
        dispatch,
    ] = useStateValue();

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getOneArtist(id).then((data) => {
                setName(data.data.name)
            })
        }
    }, [id])

    useEffect(() => {
        axios.get('http://127.0.0.1:4000/api/songs/getSongByArtist', {
            params: {
                artist: name
            }
        })
            .then(res => {
                // console.log(res.data.data)
                dispatch({ type: actionType.SET_SONG_BY_ARTIST, songByArtist: res.data.data });
            })
            .catch(err => {
                console.log(err)
            })
    }, [name])


    return (
        <div className='song-side'>
            <Header></Header>
            <div className="ss-01">



                <div className="ss-02">
                    <SearchSongContainer musics={songByArtist && songByArtist} />
                </div>

            </div>
        </div>
    )
}

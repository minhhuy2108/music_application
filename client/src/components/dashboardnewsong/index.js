import React, { useEffect, useRef, useState } from 'react'
import "./dashboardnewsong.css"
import {
    getStorage,
    ref,
    getDownloadURL,
    uploadBytesResumable,
    deleteObject,
} from "firebase/storage";
import { storage } from "../../config/firebase.config";
import { Header } from '../header'
import { DashboardNav } from '../dashboardnav'
import FilterButton from '../filterbutton'
import { filterByLanguage, filters } from "../../support/supportfunctions";
import { actionType } from "../../context/reducer";
import { getAllAlbums, getAllArtists, saveNewSong, getAllSongs } from '../../api';
import { useStateValue } from '../../context/StateProvider'
import { progress, motion } from 'framer-motion'
import { BiCloudUpload } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

export const DashboardNewSong = () => {
    const [setAlert, setSetAlert] = useState(null);
    const [alertMsg, setAlertMsg] = useState("");
    const [songName, setSongName] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isImageLoading, setIsImageLoading] = useState(false);
    const [songImageUrl, setSongImageUrl] = useState(null);
    const [isAudioLoading, setIsAudioLoading] = useState(false);
    const [audioAsset, setAudioAsset] = useState(null);
    const audioRef = useRef();
    const [
        {
            artists,
            allAlbums,
            albumFilter,
            artistFilter,
            filterTerm,
            languageFilter,
        },
        dispatch,
    ] = useStateValue();
    useEffect(() => {
        if (!artists) {
            getAllArtists().then((data) => {
                dispatch({ type: actionType.SET_ARTISTS, artists: data.data });
            });
        }

        if (!allAlbums) {
            getAllAlbums().then((data) => {
                dispatch({ type: actionType.SET_ALL_ALBUMNS, allAlbums: data.data });
            });
        }
    }, []);

    const deleteImageObject = (songURL, action) => {
        if (action === "image") {
            setIsImageLoading(true);
            setSongImageUrl(null);
        } else {
            setIsAudioLoading(true);
            setAudioAsset(null);
        }
        const deleteRef = ref(storage, songURL);
        deleteObject(deleteRef).then(() => {
            setSetAlert("success");
            setAlertMsg("File removed successfully");
            setTimeout(() => {
                setSetAlert(null);
            }, 4000);
            setIsImageLoading(false);
            setIsAudioLoading(false);
        });
    };

    const saveSong = () => {
        if (!songImageUrl || !audioAsset || !songName) {
            setSetAlert("error");
            setAlertMsg("Required fields are missing");
            setTimeout(() => {
                setSetAlert(null);
            }, 4000);
        } else {
            setIsImageLoading(true);
            setIsAudioLoading(true);
            const data = {
                name: songName,
                imageURL: songImageUrl,
                songUrl: audioAsset,
                album: albumFilter,
                artist: artistFilter,
                language: languageFilter,
                category: filterTerm,
            };

            saveNewSong(data).then((res) => {
                getAllSongs().then((songs) => {
                    dispatch({ type: actionType.SET_ALL_SONGS, allSongs: songs.data });
                });
            });
            setSetAlert("success");
            setAlertMsg("Data saved successfully");
            setTimeout(() => {
                setSetAlert(null);
            }, 4000);
            setIsImageLoading(false);
            setIsAudioLoading(false);
            setSongName("");
            setSongImageUrl(null);
            setAudioAsset(null);
            dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: null });
            dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: null });
            dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: null });
            dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: null });
        }
    };
    return (
        <div className='dashboard'>
            <Header></Header>
            <DashboardNav></DashboardNav>
            <div className="new-song-1">
                <input
                    type="text"
                    placeholder="Type your song name"
                    className="new-song-2"
                    value={songName}
                    onChange={(e) => setSongName(e.target.value)}
                />

                <div className="new-song-3">
                    <FilterButton filterData={artists} flag={"Artist"} />
                    <FilterButton filterData={allAlbums} flag={"Albums"} />
                    <FilterButton filterData={filterByLanguage} flag={"Language"} />
                    <FilterButton filterData={filters} flag={"Category"} />
                </div>

                <div className='uploaders'>

                    <div className='img-00'>
                        {isImageLoading && <ImageLoader progress={uploadProgress} />}
                        {!isImageLoading && (
                            <>{!songImageUrl ? (<ImageUpLoader
                                setImageUrl={setSongImageUrl}
                                setProgress={setUploadProgress}
                                isLoading={setIsImageLoading}
                                isImage={true}
                                setAlert={setSetAlert}
                                alertMsg={setAlertMsg}
                            />) :
                                (<div className="img-01">
                                    <img
                                        src={songImageUrl}
                                        alt="uploaded image"
                                        className="img-02"
                                    />
                                    <button
                                        type="button"
                                        className="del-but"
                                        onClick={() => {
                                            deleteImageObject(songImageUrl, "image");
                                        }}
                                    >
                                        <MdDelete className="text-white" />
                                    </button>
                                </div>)}</>
                        )}
                    </div>
                    <div className="img-00">
                        {isAudioLoading && <ImageLoader progress={uploadProgress} />}
                        {!isAudioLoading && (
                            <>
                                {!audioAsset ? (
                                    <ImageUpLoader
                                        setImageUrl={setAudioAsset}
                                        setAlert={setSetAlert}
                                        alertMsg={setAlertMsg}
                                        isLoading={setIsAudioLoading}
                                        setProgress={setUploadProgress}
                                        isImage={false}
                                    />
                                ) : (
                                    <div className="img-01">
                                        <audio ref={audioRef} src={audioAsset} controls />
                                        <button
                                            type="button"
                                            className="del-but"
                                            onClick={() => {
                                                deleteImageObject(audioAsset, "audio");
                                            }}
                                        >
                                            <MdDelete className="text-white" />
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <div className="send-but-01">
                        {isImageLoading || isAudioLoading ? (
                            <DisabledButton />
                        ) : (
                            <motion.button
                                whileTap={{ scale: 0.75 }}
                                className="send-but"
                                onClick={saveSong}
                            >
                                Send
                            </motion.button>
                        )}
                    </div>
                </div>

            </div>
        </div >
    )
}

export const DisabledButton = () => {
    return (
        <button
            disabled
            type="button"
            className="dis-but-01"
        >
            <svg
                role="status"
                className="dis-but"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                />
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                />
            </svg>
            Loading...
        </button>
    );
};

export const ImageLoader = ({ progress }) => {
    return (
        <div className="il-01">
            <p className="il-02">
                {Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}
            </p>
            <div className="il-03">
                <div className="il-04 "></div>
            </div>
        </div>
    );
};

export const ImageUpLoader = ({ setImageUrl, setAlert, alertMsg, isLoading, isImage, setProgress }) => {

    const uploadImage = (e) => {
        isLoading(true);
        const imageFile = e.target.files[0];
        const storageRef = ref(storage, `${isImage ? "Images" : "Audio"}/${Date.now()}-${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile)

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            },

            (error) => {
                setAlert("error");
                alertMsg("File upload failed.");
                setTimeout(() => {
                    setAlert(null);
                }, 4000);
                isLoading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                    setImageUrl(downloadUrl);
                    setProgress(0);
                    isLoading(false);
                    setAlert("success");
                    alertMsg("File uploaded successfully");
                    setTimeout(() => {
                        setAlert(null);
                    }, 4000);
                });
            }
        )

    }
    return <label>
        <div className="iul-01">
            <div className="iul-02">
                <p className="iul-03">
                    <BiCloudUpload />
                </p>
                <p className="iul-05">
                    click to upload {isImage ? "image" : "audio"}
                </p>
            </div>
        </div>
        <input
            type="file"
            name="upload-image"
            accept={`${isImage ? "image/*" : "audio/*"}`}
            className="iul-04"
            onChange={uploadImage}
        />
    </label>
}

export default DashboardNewSong
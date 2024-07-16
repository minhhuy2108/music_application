import React, { useState } from 'react'
import { Header } from '../header'
import { DisabledButton, ImageLoader, ImageUpLoader } from '../dashboardnewsong'
import { motion } from 'framer-motion'
import { MdDelete } from 'react-icons/md'
import { getAllArtists, saveNewArtist } from '../../api'
import { actionType } from '../../context/reducer'
import { useStateValue } from '../../context/StateProvider'
import {
    getStorage,
    ref,
    getDownloadURL,
    uploadBytesResumable,
    deleteObject,
} from "firebase/storage";
import { storage } from "../../config/firebase.config";
import AlertSuccess from '../alertsuccess'
import AlertError from '../alerterror'
import { DashboardNav } from '../dashboardnav'




export const DashBoardNewArtist = () => {
    const [setAlert, setSetAlert] = useState(null);
    const [alertMsg, setAlertMsg] = useState("");
    const [artistImageCover, setArtistImageCover] = useState(null)
    const [artistUploadingProgress, setArtistUploadingProgress] = useState(0)
    const [isArtistUploading, setIsArtistUploading] = useState(false)
    const [artistName, setArtistName] = useState("")
    const [twitter, setTwitter] = useState("");
    const [instagram, setInstagram] = useState("");

    const [
        {
            artists,
            allAlbums,
            allSongs,
            albumFilter,
            artistFilter,
            filterTerm,
            languageFilter,
        },
        dispatch,
    ] = useStateValue();

    const deleteImageObject = (songURL, action) => {
        if (action === "image") {
            setIsArtistUploading(true)
        }
        const deleteRef = ref(storage, songURL);
        deleteObject(deleteRef).then(() => {
            setSetAlert("success");
            setAlertMsg("File removed successfully");
            setTimeout(() => {
                setSetAlert(null);
            }, 4000);
            setArtistImageCover(null)
        });
    };

    const saveArtist = () => {
        if (!artistImageCover || !artistName) {
            setSetAlert("error");
            setAlertMsg("Required fields are missing");
            setTimeout(() => {
                setSetAlert(null);
            }, 4000);
        } else {
            setIsArtistUploading(true)
            const data = {
                name: artistName,
                imageURL: artistImageCover,
                twitter: twitter,
                instagram: instagram,
            };

            saveNewArtist(data).then((res) => {
                getAllArtists().then((data) => {
                    dispatch({ type: actionType.SET_ARTISTS, artists: data.data });
                });
            });
            setSetAlert("success");
            setAlertMsg("Data saved successfully");
            setTimeout(() => {
                setSetAlert(null);
            }, 4000);

            setIsArtistUploading(false)
            setArtistImageCover(null)
            setArtistName("")
            setTwitter("")
            setInstagram("")

        }
    }
    return (
        <div className='dashboard'>
            <Header></Header>
            <DashboardNav></DashboardNav>
            <div className='artist-detail-container'>
                <input
                    type="text"
                    placeholder="Artist name"
                    className="new-song-2"
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                />
                <div className='artist-detail-container-2'>
                    <div className="img-00">
                        {isArtistUploading && <ImageLoader progress={artistUploadingProgress} />}
                        {!isArtistUploading && (
                            <>
                                {!artistImageCover ? (
                                    <ImageUpLoader
                                        setImageUrl={setArtistImageCover}
                                        setAlert={setSetAlert}
                                        alertMsg={setAlertMsg}
                                        isLoading={setIsArtistUploading}
                                        setProgress={setArtistUploadingProgress}
                                        isImage={true}
                                    />
                                ) : (
                                    <div className="img-01">
                                        <img
                                            src={artistImageCover}
                                            alt="uploaded image"
                                            className="img-02"
                                        />
                                        <button
                                            type="button"
                                            className="del-but"
                                            onClick={() => {
                                                deleteImageObject(artistImageCover, true);
                                            }}
                                        >
                                            <MdDelete className="text-white" />
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    <div className='social-detail'>
                        <div className="social-01">
                            <p className="social-02">
                                www.twitter.com/
                            </p>
                            <input
                                type="text"
                                placeholder=" artist id"
                                className="artist-input"
                                value={twitter}
                                onChange={(e) => setTwitter(e.target.value)}
                            />
                        </div>

                        <div className="social-01">
                            <p className="social-02">
                                www.instagram.com/
                            </p>
                            <input
                                type="text"
                                placeholder=" artist id"
                                className="artist-input"
                                value={instagram}
                                onChange={(e) => setInstagram(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="send-but-01">
                        {isArtistUploading ? (
                            <DisabledButton />
                        ) : (
                            <motion.button
                                whileTap={{ scale: 0.75 }}
                                className="send-but"
                                onClick={saveArtist}
                            >
                                Save Artist
                            </motion.button>
                        )}
                    </div>
                    {setAlert && (
                        <>
                            {setAlert === "success" ? (
                                <AlertSuccess msg={alertMsg} />
                            ) : (
                                <AlertError msg={alertMsg} />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

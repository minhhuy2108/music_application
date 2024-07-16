import React, { useState } from 'react'
import { Header } from '../header'
import { DisabledButton, ImageLoader, ImageUpLoader } from '../dashboardnewsong'
import { motion } from 'framer-motion'
import { MdDelete } from 'react-icons/md'
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
import { getAllAlbums, saveNewAlbum } from '../../api'
import { DashboardNav } from '../dashboardnav'
// import "../dashboardnewsong/dashboardnewsong.css"


export const DashBoardNewAlbum = () => {
    const [setAlert, setSetAlert] = useState(null);
    const [alertMsg, setAlertMsg] = useState("");
    const [albumImageCover, setAlbumImageCover] = useState(null)
    const [albumUploadingProgress, setAlbumUploadingProgress] = useState(0)
    const [isAlbumUploading, setIsAlbumUploading] = useState(false)
    const [albumName, setAlbumName] = useState("")

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
            setIsAlbumUploading(true)
        }
        const deleteRef = ref(storage, songURL);
        deleteObject(deleteRef).then(() => {
            setSetAlert("success");
            setAlertMsg("File removed successfully");
            setTimeout(() => {
                setSetAlert(null);
            }, 4000);
            setIsAlbumUploading(false)
            setAlbumImageCover(null)
        });
    };

    const saveAlbum = () => {
        if (!albumImageCover || !albumName) {
            setSetAlert("error");
            setAlertMsg("Required fields are missing");
            setTimeout(() => {
                setSetAlert(null);
            }, 4000);
        }
        else {
            setIsAlbumUploading(true)

            const data = {
                name: albumName,
                imageURL: albumImageCover,
            }
            saveNewAlbum(data).then(() => {
                getAllAlbums().then((data) => {
                    dispatch({ type: actionType.SET_ALL_ALBUMNS, allAlbums: data.data });
                });
            })

            setIsAlbumUploading(false)
            setAlbumImageCover(null)
            setAlbumName("")
        }
    }


    return (
        <div className='dashboard'>
            <Header></Header>
            <DashboardNav></DashboardNav>
            <div className='album-container'>
                <input
                    type="text"
                    placeholder="Album Name"
                    className="album-input"
                    value={albumName}
                    onChange={(e) => setAlbumName(e.target.value)}
                />
                <div className="img-00">
                    {isAlbumUploading && <ImageLoader progress={albumUploadingProgress} />}
                    {!isAlbumUploading && (
                        <>
                            {!albumImageCover ? (
                                <ImageUpLoader
                                    setImageUrl={setAlbumImageCover}
                                    setAlert={setSetAlert}
                                    alertMsg={setAlertMsg}
                                    isLoading={setIsAlbumUploading}
                                    setProgress={setAlbumUploadingProgress}
                                    isImage={true}
                                />
                            ) : (
                                <div className="img-01">
                                    <img
                                        src={albumImageCover}
                                        alt="uploaded image"
                                        className="img-02"
                                    />
                                    <button
                                        type="button"
                                        className="del-but"
                                        onClick={() => {
                                            deleteImageObject(albumImageCover, true);
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
                    {isAlbumUploading ? (
                        <DisabledButton />
                    ) : (
                        <motion.button
                            whileTap={{ scale: 0.75 }}
                            className="send-but"
                            onClick={saveAlbum}
                        >
                            Save Album
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
    )
}

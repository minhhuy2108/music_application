import React, { useEffect, useState, Component } from 'react'
import "./dashboardnewsong.css"
import {
    getStorage,
    ref,
    getDownloadURL,
    uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../../config/firebase.config";
import { Header } from '../header'
import { DashboardNav } from '../dashboardnav'
import FilterButton from '../filterbutton'
import { filterByLanguage, filters } from "../../support/supportfunctions";
import { actionType } from "../../context/reducer";
import { getAllAlbums, getAllArtists } from '../../api';
import { useStateValue } from '../../context/StateProvider'
import { progress } from 'framer-motion'
import { BiCloudUpload } from "react-icons/bi";

export const DashboardNewSong = () => {
    const [setAlert, setSetAlert] = useState(null);
    const [alertMsg, setAlertMsg] = useState("");
    const [songName, setSongName] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isImageLoading, setIsImageLoading] = useState(false);
    const [songImageUrl, setSongImageUrl] = useState(null);
    const [
        {
            artists,
            allAlbums,
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
                            </div>)}</>
                    )}
                </div>
            </div>
        </div >
    )
}

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
import { getApp, getApps, initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyC2yfoNSwc2jYIV5guzAnKhFo5a9Djpfh8",
    authDomain: "projectmusicapp-b17ff.firebaseapp.com",
    projectId: "projectmusicapp-b17ff",
    storageBucket: "projectmusicapp-b17ff.appspot.com",
    messagingSenderId: "197857098974",
    appId: "1:197857098974:web:bd3fbd4d664c2c7b15164f"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app)

export { app, storage }

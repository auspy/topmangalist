require('dotenv').config()
const firebase = require("firebase")
require("firebase/firestore")

const firebaseConfig={
    apiKey: process.env.FIRE_API_KEY,
    authDomain: process.env.FIRE_AUTH_DOMAIN,
    projectId: process.env.FIRE_PROJECT_ID,
    storageBucket: process.env.FIRE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIRE_MESSAGE_SENDER_ID,
    appId: process.env.FIRE_APP_ID,
    measurementId: process.env.FIRE_MEASUREMENT_ID,
}

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

module.exports=db
import firebase from 'firebase/app';
import 'firebase/auth'
const app = firebase.initializeApp({
    apiKey: 'AIzaSyBiUT_tLRfguBQYMjesSVBzA8dht6H5ba4',
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
});

export const auth = app.auth()
export default app
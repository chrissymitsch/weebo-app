import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/storage';

// The configuration below is not sensitive data.
const config = {
  apiKey: 'AIzaSyDFJnDUOQUIgR1tbpxU_gsnWS2F2vWN39c',
  authDomain: 'weebo-b37d8.firebaseapp.com',
  databaseURL: 'https://weebo-b37d8.firebaseio.com',
  projectId: 'weebo-b37d8',
  storageBucket: 'weebo-b37d8.appspot.com',
  messagingSenderId: '691998187476',
  appId: '1:691998187476:web:b4389079f0b2469b9ac041',
  measurementId: 'G-GCGZK5SJQ5'
};

firebase.initializeApp(config);

const fire = firebase.firestore();

const messaging = firebase.messaging();
messaging.usePublicVapidKey("BJUO7PUotO39x5pcAYho0dVruCSulk09F5k1LBNLqAG1CqJWF6l4QH3MFTGOv3DNMdgIikB3C9HZ6yf6IxT7-BU");

export { fire, messaging };
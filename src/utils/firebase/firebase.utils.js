import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDuTZmSXtsTx-hjxr_69XZpZ3CjSfw513c',
    authDomain: 'rwn-clothing-db.firebaseapp.com',
    projectId: 'rwn-clothing-db',
    storageBucket: 'rwn-clothing-db.appspot.com',
    messagingSenderId: '544011553486',
    appId: '1:544011553486:web:bde597214f281907555e9f',
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, { displayName, email, createdAt });
        } catch (error) {
            console.error('error creating the user', error);
        }
    } else {
    }

    return userDocRef;
};

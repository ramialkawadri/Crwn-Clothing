import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    NextOrObserver,
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
    DocumentSnapshot,
    QueryDocumentSnapshot,
} from 'firebase/firestore';
import { Category } from '../../store/categories/categories.types';

const firebaseConfig = {
    apiKey: 'AIzaSyDuTZmSXtsTx-hjxr_69XZpZ3CjSfw513c',
    authDomain: 'rwn-clothing-db.firebaseapp.com',
    projectId: 'rwn-clothing-db',
    storageBucket: 'rwn-clothing-db.appspot.com',
    messagingSenderId: '544011553486',
    appId: '1:544011553486:web:bde597214f281907555e9f',
};

export const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
    signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
    signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export type ObjectToAdd = {
    title: string;
};

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
    collectionKey: string,
    objectsToAdd: T[]
) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
        (docSnapshot) => docSnapshot.data() as Category
    );
};

export type AdditionalInformation = {
    displayName?: string;
};

export type UserData = {
    createdAt: Date;
    displayName: string;
    email: string;
};

export const createUserDocumentFromAuth = async (
    userAuth: User,
    additionalInformation: AdditionalInformation
): Promise<void | DocumentSnapshot<UserData>> => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.error('error creating the user', error);
        }
    }

    return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (
    email: string,
    password: string
) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
    email: string,
    password: string
) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
    onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        );
    });
};

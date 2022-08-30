import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

const Signin = () => {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        const { user } = response;
        const userDocRef = await createUserDocumentFromAuth(user);
        console.log(response);
    };

    return (
        <div>
            <h1>Sign in page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
        </div>
    );
};

export default Signin;

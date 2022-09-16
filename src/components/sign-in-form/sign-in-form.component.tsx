import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    emailSignInStart,
    googleSignInStart,
} from '../../store/user/user.action';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import { SignInContainer } from './sign-in-form.styles';

const defaultFormFields = {
    email: '',
    password: '',
};

const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => setFormFields(defaultFormFields);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            dispatch(emailSignInStart(email, password));
            resetFormFields();
        } catch (error) {
            console.log(error);
        }
    };

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <SignInContainer>
            <h2>Already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type="email"
                    name="email"
                    required
                    onChange={handleChange}
                    value={email}
                />

                <FormInput
                    label="Password"
                    type="password"
                    name="password"
                    required
                    onChange={handleChange}
                    value={password}
                />

                <div className="buttons-container">
                    <Button type="submit">Sign in</Button>
                    <Button
                        type="button"
                        onClick={signInWithGoogle}
                        buttonType={BUTTON_TYPE_CLASSES.google}
                    >
                        Google sign in
                    </Button>
                </div>
            </form>
        </SignInContainer>
    );
};

export default SignInForm;

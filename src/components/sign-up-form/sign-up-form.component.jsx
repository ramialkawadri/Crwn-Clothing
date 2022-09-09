import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUpStart } from '../../store/user/user.action';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmedPassword: '',
};

const SignUpForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmedPassword } = formFields;

    const resetFormFields = () => setFormFields(defaultFormFields);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmedPassword) {
            alert("Passwords don't match!");
            return;
        }

        try {
            dispatch(signUpStart(email, password, displayName));
            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Email already in use!');
            } else console.error(error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <div className="sign-up-container">
            <h2>Don't have an account</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    inputOptions={{
                        type: 'text',
                        name: 'displayName',
                        required: true,
                        onChange: handleChange,
                        value: displayName,
                    }}
                />

                <FormInput
                    label="Email"
                    inputOptions={{
                        type: 'email',
                        name: 'email',
                        required: true,
                        onChange: handleChange,
                        value: email,
                    }}
                />

                <FormInput
                    label="Password"
                    inputOptions={{
                        type: 'password',
                        name: 'password',
                        required: true,
                        onChange: handleChange,
                        value: password,
                    }}
                />

                <FormInput
                    label="Confirm Password"
                    inputOptions={{
                        type: 'password',
                        name: 'confirmedPassword',
                        required: true,
                        onChange: handleChange,
                        value: confirmedPassword,
                    }}
                />
                <Button type="submit">Sign up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;

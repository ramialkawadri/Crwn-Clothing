import { AnyAction } from '@reduxjs/toolkit';
import { UserData } from '../../utils/firebase/firebase.utils';
import {
    signInFailed,
    signInSuccess,
    signOutFailed,
    signOutSuccess,
    signUpFailed,
} from './user.action';

export type UserState = {
    readonly currentUser: UserData | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
};

const INITIAL_STATE: UserState = {
    currentUser: null,
    isLoading: false,
    error: null,
};

export const userReducer = (
    state = INITIAL_STATE,
    action = {} as AnyAction
) => {
    if (signInSuccess.match(action)) {
        return { ...state, currentUser: action.payload };
    } else if (signOutSuccess.match(action)) {
        return { ...state, currentUser: null };
    } else if (
        signOutFailed.match(action) ||
        signUpFailed.match(action) ||
        signInFailed.match(action)
    ) {
        return { ...state, error: action.payload };
    } else {
        return state;
    }
};

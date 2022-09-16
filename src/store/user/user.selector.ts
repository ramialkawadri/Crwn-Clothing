import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { UserState } from './user.reducer';

export const selectUserReducer = (state: RootState): UserState => state.user;

export const selectCurrentUser = createSelector(
    [selectUserReducer],
    (userReducer) => userReducer.currentUser
);

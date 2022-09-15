import { createSelector } from '@reduxjs/toolkit';
import { UserState } from './user.reducer';

export const selectUserReducer = (state: any): UserState => state.user;

export const selectCurrentUser = createSelector(
    [selectUserReducer],
    (userReducer) => userReducer.currentUser
);

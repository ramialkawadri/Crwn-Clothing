import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { CartState } from './cart.reducer';

const selectCartReducer = (state: RootState): CartState => state.cart;

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cart) => cart.cartItems
);

export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cart) => cart.isCartOpen
);

export const selectCartCount = createSelector([selectCartReducer], (cart) =>
    cart.cartItems.reduce((total, current) => total + current.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartReducer], (cart) =>
    cart.cartItems.reduce(
        (total, current) => total + current.price * current.quantity,
        0
    )
);

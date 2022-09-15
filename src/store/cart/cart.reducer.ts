import { AnyAction } from '@reduxjs/toolkit';
import { setCartItems, setIsCartOpen } from './cart.action';
import { CartItem } from './cart.types';

export type CartState = {
    readonly isCartOpen: boolean;
    readonly cartItems: CartItem[];
};

export const CART_INITIAL_STATE: CartState = {
    isCartOpen: false,
    cartItems: [],
};

export const cartReducer = (
    state: CartState = CART_INITIAL_STATE,
    action = {} as AnyAction
) => {
    if (setCartItems.match(action)) {
        return {
            ...state,
            cartItems: action.payload,
        };
    } else if (setIsCartOpen.match(action)) {
        return { ...state, isCartOpen: action.payload };
    } else {
        return state;
    }
};

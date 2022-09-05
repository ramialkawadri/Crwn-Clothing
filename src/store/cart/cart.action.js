import { CART_ACTIONS_TYPES } from './cart.types';
import { createAction } from '../../utils/reducers/reducer.utils';

// Helper functions
const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    } else {
        return [...cartItems, { ...productToAdd, quantity: 1 }];
    }
};

const clearCartItem = (cartItems, cartItemToRemove) =>
    cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);

const removeCartItem = (cartItems, productToDecrease) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToDecrease.id
    );

    if (existingCartItem.quantity === 1) {
        return clearCartItem(cartItems, productToDecrease);
    } else {
        return cartItems.map((cartItem) =>
            cartItem.id === productToDecrease.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
        );
    }
};

export const setCart = (cart) =>
    createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, cart);

export const setIsCartOpen = (bool) =>
    createAction(CART_ACTIONS_TYPES.SET_IS_CART_OPEN, bool);

export const addItemToCart = (cartItems, productToAdd) =>
    setCart(addCartItem(cartItems, productToAdd));

export const removeItemFromCart = (cartItems, product) =>
    setCart(removeCartItem(cartItems, product));

export const clearItemFromCart = (cartItems, cartItemToRemove) =>
    setCart(clearCartItem(cartItems, cartItemToRemove));

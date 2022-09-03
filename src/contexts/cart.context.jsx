import { createContext, useReducer } from 'react';
import { createAction } from '../utils/reducers/reducer.utils';

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

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTIONS_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            };
        default:
            throw new Error(`Invalid cart reducer type ${type}`);
    }
};

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
};

const CART_ACTIONS_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
};

export const CartContext = createContext({
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
    setIsCartOpen: () => null,
    addItemToCart: () => {},
    clearItemFromCart: () => {},
    removeItemFromCart: () => {},
});

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const { cartItems, isCartOpen, cartCount, cartTotal } = state;

    const updateCartItemsReducers = (newCartItems) => {
        const newCartCount = newCartItems.reduce(
            (total, current) => total + current.quantity,
            0
        );
        const newCartTotal = newCartItems.reduce(
            (total, current) => total + current.price * current.quantity,
            0
        );

        dispatch(
            createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, {
                cartCount: newCartCount,
                cartTotal: newCartTotal,
                cartItems: newCartItems,
            })
        );
    };

    const setIsCartOpen = (bool) => {
        dispatch(
            createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, {
                isCartOpen: bool,
            })
        );
    };

    const addItemToCart = (productToAdd) => {
        updateCartItemsReducers(addCartItem(cartItems, productToAdd));
    };

    const removeItemFromCart = (product) => {
        updateCartItemsReducers(removeCartItem(cartItems, product));
    };

    const clearItemFromCart = (cartItemToRemove) => {
        updateCartItemsReducers(clearCartItem(cartItems, cartItemToRemove));
    };

    const value = {
        isCartOpen,
        cartItems,
        cartCount,
        cartTotal,
        setIsCartOpen,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};

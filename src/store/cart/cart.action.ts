import { CartItem, CART_ACTIONS_TYPES } from './cart.types';
import {
    ActionWithPayload,
    createAction,
    withMatcher,
} from '../../utils/reducers/reducer.utils';
import { CategoryItem } from '../categories/categories.types';

// Helper functions
const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem) => {
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

const clearCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem) =>
    cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);

const removeCartItem = (cartItems: CartItem[], productToDecrease: CartItem) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToDecrease.id
    );

    if (existingCartItem && existingCartItem.quantity === 1) {
        return clearCartItem(cartItems, productToDecrease);
    } else {
        return cartItems.map((cartItem) =>
            cartItem.id === productToDecrease.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
        );
    }
};

export type SetIsCartOpen = ActionWithPayload<
    CART_ACTIONS_TYPES.SET_IS_CART_OPEN,
    boolean
>;

export type SetCartItems = ActionWithPayload<
    CART_ACTIONS_TYPES.SET_CART_ITEMS,
    CartItem[]
>;

export const setCartItems = withMatcher(
    (cartItems: CartItem[]): SetCartItems =>
        createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, cartItems)
);

export const setIsCartOpen = withMatcher(
    (bool: boolean): SetIsCartOpen =>
        createAction(CART_ACTIONS_TYPES.SET_IS_CART_OPEN, bool)
);

export const addItemToCart = (
    cartItems: CartItem[],
    productToAdd: CategoryItem
) => setCartItems(addCartItem(cartItems, productToAdd));

export const removeItemFromCart = (
    cartItems: CartItem[],
    cartItemToRemove: CartItem
) => setCartItems(removeCartItem(cartItems, cartItemToRemove));

export const clearItemFromCart = (
    cartItems: CartItem[],
    cartItemToClear: CartItem
) => setCartItems(clearCartItem(cartItems, cartItemToClear));

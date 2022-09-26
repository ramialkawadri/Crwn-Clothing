import { useDispatch, useSelector } from 'react-redux';
import {
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
} from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import { CheckoutItemContainer, RemoveButton } from './checkout-item.styles';
import { CartItem } from '../../store/cart/cart.types';
import React, { memo } from 'react';

type CheckoutItemProps = { cartItem: CartItem };

const CheckoutItem: React.FC<CheckoutItemProps> = memo(({ cartItem }) => {
    const { name, imageUrl, quantity, price } = cartItem;

    const cartItems = useSelector(selectCartItems);

    const dispatch = useDispatch();
    const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
    const removeItemHandler = () =>
        dispatch(removeItemFromCart(cartItems, cartItem));
    const clearItemHandler = () => {
        console.log('called');
        dispatch(clearItemFromCart(cartItems, cartItem));
    };

    return (
        <CheckoutItemContainer>
            <div className="image-container">
                <img src={imageUrl} alt={name} />
            </div>

            <span className="name">{name}</span>

            <div className="quantity">
                <div className="arrow" onClick={removeItemHandler}>
                    &#10094;
                </div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={addItemHandler}>
                    &#10095;
                </div>
            </div>

            <span className="price">{price}</span>

            <RemoveButton>
                <span onClick={clearItemHandler}>&#10005;</span>
            </RemoveButton>
        </CheckoutItemContainer>
    );
});

export default CheckoutItem;

import React from 'react';
import { CartItem as CartItemType } from '../../store/cart/cart.types';
import { CartItemContainer } from './cart-item.styles';

type CartItemProps = {
    cartItem: CartItemType;
};

const CartItem: React.FC<CartItemProps> = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;

    return (
        <CartItemContainer>
            <img src={imageUrl} alt={name} />
            <div className="item-details">
                <span className="name">{name}</span>
                <span className="price">{`${quantity} x $${price}`}</span>
            </div>
        </CartItemContainer>
    );
};

export default CartItem;

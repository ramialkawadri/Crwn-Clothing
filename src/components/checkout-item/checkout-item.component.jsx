import { useDispatch, useSelector } from 'react-redux';
import './checkout-item.styles.scss';
import {
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
} from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

const CheckoutItem = ({ cartItem }) => {
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
        <div className="checkout-item-container">
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

            <div className="remove-button">
                <span onClick={clearItemHandler}>&#10005;</span>
            </div>
        </div>
    );
};

export default CheckoutItem;

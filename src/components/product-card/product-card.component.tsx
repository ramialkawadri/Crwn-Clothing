import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { addItemToCart } from '../../store/cart/cart.action';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { ProductCardContainer } from './product-card.styles';
import { CategoryItem } from '../../store/categories/categories.types';
import React from 'react';

export type ProductCardProps = {
    product: CategoryItem;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { name, price, imageUrl } = product;

    const dispatch = useDispatch();

    const cartItems = useSelector(selectCartItems);
    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={name} />
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button
                buttonType={BUTTON_TYPE_CLASSES.inverted}
                onClick={addProductToCart}
            >
                Add to card
            </Button>
        </ProductCardContainer>
    );
};

export default ProductCard;

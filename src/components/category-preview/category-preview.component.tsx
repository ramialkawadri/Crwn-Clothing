import ProductCard from '../product-card/product-card.component';
import { Link } from 'react-router-dom';
import React from 'react';
import { CategoryItem } from '../../store/categories/categories.types';
import { CategoryPreviewContainer } from './category-preview.styles';

type CategoryPreviewProps = {
    title: string;
    products: CategoryItem[];
};

const CategoryPreview: React.FC<CategoryPreviewProps> = ({
    title,
    products,
}) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <Link to={`./${title}`} className="title">
                    {title.toUpperCase()}
                </Link>
            </h2>
            <div className="preview">
                {products
                    .filter((_, idx) => idx < 4)
                    .map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </div>
        </CategoryPreviewContainer>
    );
};

export default CategoryPreview;

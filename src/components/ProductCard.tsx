import React from 'react';
import { useProduct } from '../context/ProductContext';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { deleteProduct } = useProduct();

  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
      <p>Quantity: {product.quantity}</p>
      <button onClick={() => deleteProduct(product.id)}>Delete</button>
    </div>
  );
};

export default ProductCard;

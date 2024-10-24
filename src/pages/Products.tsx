import ProductForm from '../components/ProductForm';
import ProductCard from '../components/ProductCard';
import { useProduct } from '../context/ProductContext';

const Products = () => {
  const { products } = useProduct();

  return (
    <div>
      <h1>Manage Products</h1>
      <ProductForm />
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;

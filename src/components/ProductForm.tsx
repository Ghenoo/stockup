import { useState } from 'react';
import { useProduct } from '../context/ProductContext';

const ProductForm: React.FC = () => {
  const { addProduct, updateProduct } = useProduct();
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [editing, setEditing] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing && editId) {
      updateProduct(editId, { name, price, quantity });
      setEditing(false);
      setEditId(null);
    } else {
      addProduct({ name, price, quantity });
    }
    setName('');
    setPrice(0);
    setQuantity(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter product name"
          required
        />
      </div>
      <div>
        <label>Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Enter price"
          required
        />
      </div>
      <div>
        <label>Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          placeholder="Enter quantity"
          required
        />
      </div>
      <button type="submit">{editing ? 'Update Product' : 'Add Product'}</button>
    </form>
  );
};

export default ProductForm;

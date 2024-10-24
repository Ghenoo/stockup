import React, { createContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface ProductContextProps {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, product: Omit<Product, 'id'>) => void;
  deleteProduct: (id: number) => void;
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get('/api/products').then((res) => setProducts(res.data));
  }, []);

  const addProduct = async (product: Omit<Product, 'id'>) => {
    const response = await axios.post('/api/products', product);
    setProducts([...products, response.data]);
  };

  const updateProduct = async (id: number, product: Omit<Product, 'id'>) => {
    await axios.put(`/api/products/${id}`, product);
    setProducts(products.map(p => (p.id === id ? { id, ...product } : p)));
  };

  const deleteProduct = async (id: number) => {
    await axios.delete(`/api/products/${id}`);
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = React.useContext(ProductContext);
  if (!context) throw new Error('useProduct must be used within a ProductProvider');
  return context;
};

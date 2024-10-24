import { Request, Response } from 'express';
import { addProduct, getProducts } from '../models/productModel';

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, quantity } = req.body;
  await addProduct(name, price, quantity);
  res.json({ message: 'Product created' });
};

export const fetchProducts = async (req: Request, res: Response) => {
  const products = await getProducts();
  res.json(products);
};

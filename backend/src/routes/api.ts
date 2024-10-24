import { Router } from 'express';
import { createProduct, fetchProducts } from '../controllers/productController';

export const router = Router();

router.post('/products', createProduct);
router.get('/products', fetchProducts);

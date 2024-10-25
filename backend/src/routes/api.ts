import { Router } from 'express';
import { createProduct, fetchProducts } from '../controllers/productController';
import { register, login } from '../controllers/authController';

export const router = Router();

router.post('/products', createProduct);
router.get('/products', fetchProducts);
router.post('/register', register);
router.post('/login', login);


import { Router } from 'express';
import { getProducts, setProduct } from '../controllers/product';
import { validateProduct } from '../middlewares/validation';

const router = Router();

router.get('/', getProducts);

router.post('/', validateProduct, setProduct);

export default router;

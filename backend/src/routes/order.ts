import { Router } from 'express';
import setOrder from '../controllers/order';
import { validateOrder } from '../middlewares/validation';

const router = Router();

router.post('/', validateOrder, setOrder);

export default router;

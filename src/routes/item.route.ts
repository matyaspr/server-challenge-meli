import { Router } from 'express';
import { getProductDescription, getProducts } from '../controller/item.controller';

const router = Router()

router.get('/', getProducts)
router.get('/:id', getProductDescription)


export default router;
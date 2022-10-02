import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from '../controllers/products';

const productRouter = Router();

productRouter.get('/', getAllProducts);
productRouter.post('/', createProduct);
productRouter.delete('/', deleteProduct);
productRouter.put('/', updateProduct);

export default productRouter;

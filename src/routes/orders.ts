import { Router } from 'express';
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  updateOrder,
} from '../controllers/orders';

const orderRouter = Router();

orderRouter.get('/', getAllOrders);
orderRouter.post('/', createOrder);
orderRouter.delete('/', deleteOrder);
orderRouter.put('/', updateOrder);

export default orderRouter;

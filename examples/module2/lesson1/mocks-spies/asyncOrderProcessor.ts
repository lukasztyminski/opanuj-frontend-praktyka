import axios from 'axios';
import type { Order } from './types/Order';
import type { OrderProcessor } from './types/OrderProcessor';

export const asyncOrderProcessor: OrderProcessor = {
  async processOrder(order: Order): Promise<number> {
    try {
      await axios.post('/api/orders', order);
      return 200;
    } catch (err) {
      return 500;
    }
  },
};

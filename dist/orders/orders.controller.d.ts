import { OrdersService } from './orders.service';
import { Order } from '@prisma/client';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    createOrder(userId: number, status: string): Promise<Order>;
    getOrderById(orderId: number): Promise<Order>;
    updateOrderStatus(orderId: number, status: string): Promise<Order>;
}

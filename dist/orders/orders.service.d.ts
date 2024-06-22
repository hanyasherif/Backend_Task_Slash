import { PrismaService } from '../prisma/prisma.service';
import { Order } from '@prisma/client';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    getOrders(): Promise<{
        orderId: number;
        orderDate: Date;
        status: string;
        userId: number;
    }[]>;
    createOrder(userId: number, status: string): Promise<Order>;
    getOrderById(orderId: number): Promise<Order | null>;
    updateOrderStatus(orderId: number, status: string): Promise<Order>;
}

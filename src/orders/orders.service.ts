import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Order, OrderItem } from '@prisma/client';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  // async createOrder(data: Prisma.OrderCreateInput) {
  //   return this.prisma.order.create({ data });
  // }

  async getOrders() {
    return this.prisma.order.findMany();
  }

  // async getOrderById(orderId: number) {
  //   return this.prisma.order.findUnique({ where: { orderId } });
  // }

  async createOrder(userId: number, status: string): Promise<Order> {
    // Fetch the cart with its associated cart items and products
    const cart = await this.prisma.cart.findFirst({
      where: { userId },
      include: { CartItem: { include: { Product: true } } },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    // Prepare the order items data from cart items
    const orderItemsData: Prisma.OrderCreateInput = {
      status, // Add status field here
      User: { connect: { userId } }, // Connect the user to the order
      OrderItem: {
        createMany: {
          data: cart.CartItem.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
    };

    // Create the order along with its order items
    const createdOrder = await this.prisma.order.create({
      data: orderItemsData,
      include: { OrderItem: true }, // Ensure to include OrderItems in the response
    });

    // Clear the cart after successful order creation
    await this.prisma.cartItem.deleteMany({
      where: { cartId: cart.cartId },
    });
    return createdOrder;
  }

  async getOrderById(orderId: number): Promise<Order | null> {
    return this.prisma.order.findUnique({
      where: { orderId },
      include: { OrderItem: { include: { Product: true } } },
    });
  }

  async updateOrderStatus(orderId: number, status: string): Promise<Order> {
    return this.prisma.order.update({
      where: { orderId },
      data: { status },
    });
  }
}

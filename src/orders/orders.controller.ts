import { Controller, Post, Get, Put, Param, Body, NotFoundException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderDto } from './dto/order.dto'; // Import your OrderDto
import { Order } from '@prisma/client';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiBody({ type: CreateOrderDto }) // Specify the request body type (DTO)
  @ApiResponse({ status: 201, description: 'The order has been successfully created.', type: OrderDto })
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<OrderDto> {
    const { userId, status } = createOrderDto;
    const createdOrder = await this.ordersService.createOrder(userId, status);
    return this.mapOrderToDto(createdOrder); // Convert createdOrder to OrderDto
  }

  @Get(':orderId')
  @ApiOperation({ summary: 'Get order details by ID' })
  @ApiResponse({ status: 200, description: 'Returns the order details.', type: OrderDto })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  async getOrderById(@Param('orderId') orderId: number): Promise<OrderDto> {
    const order = await this.ordersService.getOrderById(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return this.mapOrderToDto(order); // Convert order to OrderDto
  }

  @Put(':orderId/status')
  @ApiOperation({ summary: 'Update order status by ID' })
  @ApiResponse({ status: 200, description: 'Order status updated successfully.', type: OrderDto })
  async updateOrderStatus(@Param('orderId') orderId: number, @Body('status') status: string): Promise<OrderDto> {
    const updatedOrder = await this.ordersService.updateOrderStatus(orderId, status);
    return this.mapOrderToDto(updatedOrder); // Convert updatedOrder to OrderDto
  }

  // Helper method to map Order to OrderDto
  private mapOrderToDto(order: Order): OrderDto {
    return {
      orderId: order.orderId,
      orderDate: order.orderDate,
      status: order.status,
      userId: order.userId,
    };
  }
}

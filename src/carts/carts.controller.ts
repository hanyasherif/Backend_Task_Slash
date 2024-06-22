// carts.controller.ts

import { Controller, Post, Body, Put, Delete, Get, Param } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartItem, Cart } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { CreateCartItemDto } from './dto/create-cart-item.dto'; // Import DTO
import { CartDto } from './dto/cart.dto'; // Import DTO


@ApiTags('cart') // Tag your controller with a specific category
@Controller('api/cart')
export class CartController {
  constructor(private readonly cartsService: CartsService) {}

  @Post('add')
  @ApiOperation({ summary: 'Add item to cart' })
  @ApiBody({ type: CreateCartItemDto }) // Use the DTO in ApiBody
  @ApiResponse({ status: 201, description: 'Item added to cart successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async addToCart(
    @Body() createCartItemDto: CreateCartItemDto, // Use DTO for request payload
  ): Promise<{ success: boolean; data?: CartItem; message?: string }> {
    try {
      const cartItem = await this.cartsService.addToCart(
        createCartItemDto.userId,
        createCartItemDto.productId,
        createCartItemDto.quantity,
      );
      return { success: true, data: cartItem };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get cart by userId' })
  @ApiParam({ name: 'userId', type: 'number', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Returns the user cart.', type: CartDto })
  @ApiResponse({ status: 404, description: 'Cart not found.' })
  async getCart(@Param('userId') userId: number): Promise<{ success: boolean; data?: Cart; message?: string }> {
    try {
      const cart = await this.cartsService.getCart(userId);
      return { success: true, data: cart };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Put('update/:cartItemId')
  @ApiOperation({ summary: 'Update cart item quantity' })
  @ApiParam({ name: 'cartItemId', type: 'number', description: 'Cart Item ID' })
  @ApiResponse({ status: 200, description: 'Cart item quantity updated successfully.', type: CreateCartItemDto })
  async updateCartItemQuantity(@Param('cartItemId') cartItemId: number, @Body() body: { quantity: number }): Promise<CartItem> {
    const { quantity } = body;
    return this.cartsService.updateCartItemQuantity(cartItemId, quantity);
  }

  @Delete('remove/:cartItemId')
  @ApiOperation({ summary: 'Remove item from cart' })
  @ApiParam({ name: 'cartItemId', type: 'number', description: 'Cart Item ID' })
  @ApiResponse({ status: 204, description: 'Item removed from cart successfully.' })
  async removeFromCart(@Param('cartItemId') cartItemId: number): Promise<void> {
    return this.cartsService.removeFromCart(cartItemId);
  }
}

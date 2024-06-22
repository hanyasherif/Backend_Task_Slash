import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, CartItem } from '@prisma/client';

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}

  async createCart(data: Prisma.CartCreateInput) {
    return this.prisma.cart.create({ data });
  }

  async getCarts() {
    return this.prisma.cart.findMany();
  }

  async getCartById(cartId: number) {
    return this.prisma.cart.findUnique({ where: { cartId } });
  }

  async addToCart(userId: number, productId: number, quantity: number): Promise<CartItem> {
    // Find the cart for the user or create a new cart if it doesn't exist
    let cart = await this.prisma.cart.findFirst({ where: { userId } });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: {
          userId,
          CartItem: { create: [] }, // Ensure there are no items created initially
        },
      });
    }

    // Check if the product is already in the cart
    const existingCartItem = await this.prisma.cartItem.findFirst({
      where: {
        cartId: cart.cartId,
        productId: productId,
      },
    });

    if (existingCartItem) {
      // Product already exists in the cart, update the quantity
      const updatedCartItem = await this.prisma.cartItem.update({
        where: { cartItemId: existingCartItem.cartItemId },
        data: {
          quantity: {
            increment: quantity,
          },
        },
      });
      return updatedCartItem;
    } else {
      // Product doesn't exist in the cart, create a new cart item
      const newCartItem = await this.prisma.cartItem.create({
        data: {
          cartId: cart.cartId,
          productId,
          quantity,
        },
      });
      return newCartItem;
    }
  }

  async getCart(userId: number) {
    const cart = await this.prisma.cart.findFirst({
      where: { userId },
      include: { CartItem: { include: { Product: true } } },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    return cart;
  }
  async updateCartItemQuantity(cartItemId: number, quantity: number): Promise<CartItem> {
    const cartItem = await this.prisma.cartItem.update({
      where: { cartItemId },
      data: {
        quantity: {
          set: quantity,
        },
      },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    return cartItem;
  }

  async removeFromCart(cartItemId: number): Promise<void> {
    const cartItem = await this.prisma.cartItem.delete({
      where: { cartItemId },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }
  }


}



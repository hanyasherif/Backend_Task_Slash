import { PrismaService } from '../prisma/prisma.service';
import { Prisma, CartItem } from '@prisma/client';
export declare class CartsService {
    private prisma;
    constructor(prisma: PrismaService);
    createCart(data: Prisma.CartCreateInput): Promise<{
        cartId: number;
        userId: number;
    }>;
    getCarts(): Promise<{
        cartId: number;
        userId: number;
    }[]>;
    getCartById(cartId: number): Promise<{
        cartId: number;
        userId: number;
    }>;
    addToCart(userId: number, productId: number, quantity: number): Promise<CartItem>;
    getCart(userId: number): Promise<{
        CartItem: ({
            Product: {
                productId: number;
                name: string;
                description: string;
                price: number;
                stock: number;
            };
        } & {
            cartItemId: number;
            cartId: number;
            productId: number;
            quantity: number;
        })[];
    } & {
        cartId: number;
        userId: number;
    }>;
    updateCartItemQuantity(cartItemId: number, quantity: number): Promise<CartItem>;
    removeFromCart(cartItemId: number): Promise<void>;
}

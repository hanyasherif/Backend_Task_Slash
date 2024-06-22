import { CartsService } from './carts.service';
import { CartItem, Cart } from '@prisma/client';
export declare class CartController {
    private readonly cartsService;
    constructor(cartsService: CartsService);
    addToCart(userId: number, productId: number, quantity: number): Promise<{
        success: boolean;
        data?: CartItem;
        message?: string;
    }>;
    getCart(userId: number): Promise<{
        success: boolean;
        data?: Cart;
        message?: string;
    }>;
    updateCartItemQuantity(cartItemId: number, body: {
        quantity: number;
    }): Promise<CartItem>;
    removeFromCart(cartItemId: number): Promise<void>;
}

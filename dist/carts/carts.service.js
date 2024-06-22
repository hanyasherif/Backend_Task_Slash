"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CartsService = class CartsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createCart(data) {
        return this.prisma.cart.create({ data });
    }
    async getCarts() {
        return this.prisma.cart.findMany();
    }
    async getCartById(cartId) {
        return this.prisma.cart.findUnique({ where: { cartId } });
    }
    async addToCart(userId, productId, quantity) {
        let cart = await this.prisma.cart.findFirst({ where: { userId } });
        if (!cart) {
            cart = await this.prisma.cart.create({
                data: {
                    userId,
                    CartItem: { create: [] },
                },
            });
        }
        const existingCartItem = await this.prisma.cartItem.findFirst({
            where: {
                cartId: cart.cartId,
                productId: productId,
            },
        });
        if (existingCartItem) {
            const updatedCartItem = await this.prisma.cartItem.update({
                where: { cartItemId: existingCartItem.cartItemId },
                data: {
                    quantity: {
                        increment: quantity,
                    },
                },
            });
            return updatedCartItem;
        }
        else {
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
    async getCart(userId) {
        const cart = await this.prisma.cart.findFirst({
            where: { userId },
            include: { CartItem: { include: { Product: true } } },
        });
        if (!cart) {
            throw new common_1.NotFoundException('Cart not found');
        }
        return cart;
    }
    async updateCartItemQuantity(cartItemId, quantity) {
        const cartItem = await this.prisma.cartItem.update({
            where: { cartItemId },
            data: {
                quantity: {
                    set: quantity,
                },
            },
        });
        if (!cartItem) {
            throw new common_1.NotFoundException('Cart item not found');
        }
        return cartItem;
    }
    async removeFromCart(cartItemId) {
        const cartItem = await this.prisma.cartItem.delete({
            where: { cartItemId },
        });
        if (!cartItem) {
            throw new common_1.NotFoundException('Cart item not found');
        }
    }
};
exports.CartsService = CartsService;
exports.CartsService = CartsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartsService);
//# sourceMappingURL=carts.service.js.map
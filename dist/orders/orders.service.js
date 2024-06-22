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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OrdersService = class OrdersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getOrders() {
        return this.prisma.order.findMany();
    }
    async createOrder(userId, status) {
        const cart = await this.prisma.cart.findFirst({
            where: { userId },
            include: { CartItem: { include: { Product: true } } },
        });
        if (!cart) {
            throw new common_1.NotFoundException('Cart not found');
        }
        const orderItemsData = {
            status,
            User: { connect: { userId } },
            OrderItem: {
                createMany: {
                    data: cart.CartItem.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                    })),
                },
            },
        };
        const createdOrder = await this.prisma.order.create({
            data: orderItemsData,
            include: { OrderItem: true },
        });
        await this.prisma.cartItem.deleteMany({
            where: { cartId: cart.cartId },
        });
        return createdOrder;
    }
    async getOrderById(orderId) {
        return this.prisma.order.findUnique({
            where: { orderId },
            include: { OrderItem: { include: { Product: true } } },
        });
    }
    async updateOrderStatus(orderId, status) {
        return this.prisma.order.update({
            where: { orderId },
            data: { status },
        });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map
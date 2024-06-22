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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const carts_service_1 = require("./carts.service");
let CartController = class CartController {
    constructor(cartsService) {
        this.cartsService = cartsService;
    }
    async addToCart(userId, productId, quantity) {
        try {
            const cartItem = await this.cartsService.addToCart(userId, productId, quantity);
            return { success: true, data: cartItem };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
    async getCart(userId) {
        try {
            const cart = await this.cartsService.getCart(userId);
            return { success: true, data: cart };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
    async updateCartItemQuantity(cartItemId, body) {
        const { quantity } = body;
        return this.cartsService.updateCartItemQuantity(cartItemId, quantity);
    }
    async removeFromCart(cartItemId) {
        return this.cartsService.removeFromCart(cartItemId);
    }
};
exports.CartController = CartController;
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)('userId')),
    __param(1, (0, common_1.Body)('productId')),
    __param(2, (0, common_1.Body)('quantity')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "addToCart", null);
__decorate([
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "getCart", null);
__decorate([
    (0, common_1.Put)('update/:cartItemId'),
    __param(0, (0, common_1.Param)('cartItemId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "updateCartItemQuantity", null);
__decorate([
    (0, common_1.Delete)('remove/:cartItemId'),
    __param(0, (0, common_1.Param)('cartItemId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "removeFromCart", null);
exports.CartController = CartController = __decorate([
    (0, common_1.Controller)('api/cart'),
    __metadata("design:paramtypes", [carts_service_1.CartsService])
], CartController);
//# sourceMappingURL=carts.controller.js.map
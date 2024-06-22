import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async createProduct(data: Prisma.ProductCreateInput) {
    return this.prisma.product.create({ data });
  }

  async getProducts() {
    return this.prisma.product.findMany();
  }

  async getProductById(productId: number) {
    return this.prisma.product.findUnique({ where: { productId } });
  }
}

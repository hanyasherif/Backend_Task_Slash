import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    createProduct(data: Prisma.ProductCreateInput): Promise<{
        productId: number;
        name: string;
        description: string;
        price: number;
        stock: number;
    }>;
    getProducts(): Promise<{
        productId: number;
        name: string;
        description: string;
        price: number;
        stock: number;
    }[]>;
    getProductById(productId: number): Promise<{
        productId: number;
        name: string;
        description: string;
        price: number;
        stock: number;
    }>;
}

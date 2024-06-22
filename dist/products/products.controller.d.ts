import { ProductsService } from './products.service';
import { Prisma } from '@prisma/client';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    createProduct(productData: Prisma.ProductCreateInput): Promise<{
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

import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(data: Prisma.UserCreateInput): Promise<{
        userId: number;
        name: string;
        email: string;
        password: string;
        address: string;
    }>;
    getUsers(): Promise<{
        userId: number;
        name: string;
        email: string;
        password: string;
        address: string;
    }[]>;
    getUserById(userId: number): Promise<{
        userId: number;
        name: string;
        email: string;
        password: string;
        address: string;
    }>;
}

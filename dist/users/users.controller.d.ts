import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(userData: Prisma.UserCreateInput): Promise<{
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

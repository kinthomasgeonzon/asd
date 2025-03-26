import { PrismaService } from "../../../prisma.service";
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAllUsers(): Promise<{
        id: number;
        name: string;
    }[]>;
}

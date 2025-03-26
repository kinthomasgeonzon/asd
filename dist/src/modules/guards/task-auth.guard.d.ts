import { Role } from '@prisma/client';
declare const TaskAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class TaskAuthGuard extends TaskAuthGuard_base {
    handleRequest(err: any, user: {
        role: Role;
    } | null): any;
}
export {};

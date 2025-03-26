import { Status } from '@prisma/client';
export declare class EditTaskDto {
    title: string;
    description?: string;
    status: Status;
    assignedTo?: number;
    taskOrder: number;
    dueDate?: Date;
}

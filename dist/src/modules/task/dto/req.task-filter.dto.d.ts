import { Status } from "@prisma/client";
export declare class TaskFilterDto {
    status?: Status;
    createdBy?: number;
    assignedTo?: number;
}

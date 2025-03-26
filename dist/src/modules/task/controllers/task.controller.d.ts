import { Request } from 'express';
import { CreateTaskDto } from '../dto/req.create-task.dto';
import { EditTaskDto } from '../dto/req.edittasks.dto';
import { TaskFilterDto } from '../dto/req.task-filter.dto';
import { TaskService } from '../services/task.service';
interface AuthenticatedRequest extends Request {
    user: {
        id: number;
    };
}
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    editTask(id: number, dto: EditTaskDto): Promise<import("../dto/res.edittask.dto").ResEditTaskDto>;
    create(req: AuthenticatedRequest, dto: CreateTaskDto): Promise<import("../dto/res.create-task.dto").ResCreateTaskDto>;
    getAllTasks(filterDto: TaskFilterDto): Promise<{
        message: string;
        tasks: {
            createdBy: string;
            assignedTo: string;
            creator: {
                id: number;
                name: string;
            };
            assignee: {
                id: number;
                name: string;
            } | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            title: string;
            description: string | null;
            status: import(".prisma/client").$Enums.Status;
            taskOrder: number;
            dueDate: Date | null;
        }[];
    }>;
    deleteTask(id: number): Promise<{
        message: string;
    }>;
}
export {};

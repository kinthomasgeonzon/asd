import { PrismaService } from "../../../prisma.service";
import { CreateTaskDto } from "../dto/req.create-task.dto";
import { EditTaskDto } from "../dto/req.edittasks.dto";
import { TaskFilterDto } from "../dto/req.task-filter.dto";
import { ResCreateTaskDto } from "../dto/res.create-task.dto";
import { ResEditTaskDto } from "../dto/res.edittask.dto";
export declare class TaskService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    editTask(id: number, dto: EditTaskDto): Promise<ResEditTaskDto>;
    createTask(dto: CreateTaskDto): Promise<ResCreateTaskDto>;
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
    private buildTaskFilter;
    deleteTask(id: number): Promise<{
        message: string;
    }>;
}

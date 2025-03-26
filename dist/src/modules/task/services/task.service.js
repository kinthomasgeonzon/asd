"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../../prisma.service");
let TaskService = class TaskService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async editTask(id, dto) {
        const task = await this.prisma.task.findUnique({
            where: { id, deletedAt: null },
        });
        if (!task) {
            throw new common_1.NotFoundException(`Task with ID ${id} not found or deleted`);
        }
        const updatedTask = await this.prisma.task.update({
            where: { id },
            data: {
                title: dto.title ?? task.title,
                description: dto.description ?? task.description,
                dueDate: dto.dueDate ?? task.dueDate,
                status: dto.status ?? task.status,
                assignedTo: dto.assignedTo ?? task.assignedTo,
                taskOrder: dto.taskOrder ?? task.taskOrder,
                updatedAt: new Date(),
            },
            include: {
                creator: { select: { id: true, name: true } },
                assignee: { select: { id: true, name: true } },
            },
        });
        return {
            message: "Task updated successfully",
            task: updatedTask,
        };
    }
    async createTask(dto) {
        const task = await this.prisma.task.create({
            data: {
                title: dto.title,
                description: dto.description ?? null,
                dueDate: dto.dueDate ?? null,
                status: client_1.Status.TODO,
                assignedTo: dto.assignedTo ?? undefined,
                taskOrder: dto.taskOrder ?? 0,
                createdBy: dto.createdBy,
                updatedAt: new Date(),
                deletedAt: null,
            },
            include: {
                creator: { select: { id: true, name: true } },
                assignee: { select: { id: true, name: true } },
            },
        });
        return {
            message: "Task created successfully",
            task,
        };
    }
    async getAllTasks(filterDto) {
        const where = this.buildTaskFilter(filterDto);
        const tasks = await this.prisma.task.findMany({
            where,
            orderBy: { taskOrder: "asc" },
            include: {
                creator: { select: { id: true, name: true } },
                assignee: { select: { id: true, name: true } },
            },
        });
        return {
            message: "Tasks retrieved successfully",
            tasks: tasks.map((task) => ({
                ...task,
                createdBy: task.creator ? task.creator.name : "Unknown",
                assignedTo: task.assignee ? task.assignee.name : "Unassigned",
            })),
        };
    }
    buildTaskFilter(filterDto) {
        const { status, createdBy, assignedTo } = filterDto;
        const where = { deletedAt: null };
        if (status && Object.values(client_1.Status).includes(status)) {
            where.status = status;
        }
        if (createdBy) {
            where.createdBy = createdBy;
        }
        if (assignedTo) {
            where.assignedTo = assignedTo;
        }
        return where;
    }
    async deleteTask(id) {
        const task = await this.prisma.task.findUnique({
            where: { id, deletedAt: null },
        });
        if (!task) {
            throw new common_1.NotFoundException(`Task with ID ${id} not found or already deleted`);
        }
        await this.prisma.task.update({
            where: { id },
            data: { deletedAt: new Date(), updatedAt: new Date() },
        });
        return { message: "Task soft deleted successfully" };
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TaskService);
//# sourceMappingURL=task.service.js.map
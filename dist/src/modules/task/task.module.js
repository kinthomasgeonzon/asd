"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
const task_auth_guard_1 = require("../guards/task-auth.guard");
const task_controller_1 = require("./controllers/task.controller");
const task_service_1 = require("./services/task.service");
let TaskModule = class TaskModule {
};
exports.TaskModule = TaskModule;
exports.TaskModule = TaskModule = __decorate([
    (0, common_1.Module)({
        controllers: [task_controller_1.TaskController],
        providers: [task_service_1.TaskService, prisma_service_1.PrismaService, task_auth_guard_1.TaskAuthGuard],
        exports: [task_service_1.TaskService, task_auth_guard_1.TaskAuthGuard],
    })
], TaskModule);
//# sourceMappingURL=task.module.js.map
import { UserService } from "../service/user.service";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(): Promise<{
        id: number;
        name: string;
    }[]>;
}

import { ReqLoginDto } from '../dtos/req.login.dto';
import { ReqResetPasswordDto } from '../dtos/req.reset-password.dto';
import { ReqSignupDto } from '../dtos/req.signup.dto';
import { ResSignupDto } from '../dtos/res.signup.dto';
import { AuthService } from '../services/auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(body: ReqSignupDto): Promise<ResSignupDto>;
    login(body: ReqLoginDto): Promise<{
        message: string;
        token: string;
        user: {
            id: number;
            email: string;
            name: string;
            role: import(".prisma/client").$Enums.Role;
        };
    }>;
    updatePassword(body: ReqResetPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(email: string): Promise<{
        message: string;
    }>;
}

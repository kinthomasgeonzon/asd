import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma.service';
import { ReqLoginDto } from '../dtos/req.login.dto';
import { ReqResetPasswordDto } from '../dtos/req.reset-password.dto';
import { ReqSignupDto } from '../dtos/req.signup.dto';
import { ResSignupDto } from '../dtos/res.signup.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    private readonly resend;
    constructor(prisma: PrismaService, jwtService: JwtService);
    signup({ email, password, name }: ReqSignupDto): Promise<ResSignupDto>;
    login({ email, password }: ReqLoginDto): Promise<{
        message: string;
        token: string;
        user: {
            id: number;
            email: string;
            name: string;
            role: import(".prisma/client").$Enums.Role;
        };
    }>;
    resetPassword(email: string): Promise<{
        message: string;
    }>;
    updatePassword({ token, newPassword }: ReqResetPasswordDto): Promise<{
        message: string;
    }>;
}

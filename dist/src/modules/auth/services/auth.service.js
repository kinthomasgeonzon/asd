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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const client_1 = require("@prisma/client");
const bcrypt = require("bcryptjs");
const resend_1 = require("resend");
const prisma_service_1 = require("../../../prisma.service");
let AuthService = class AuthService {
    prisma;
    jwtService;
    resend;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.resend = new resend_1.Resend(process.env.RESEND_API_KEY);
    }
    async signup({ email, password, name }) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Email is already registered');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name: name.trim(),
                role: client_1.Role.MEMBER,
            },
        });
        const payload = { sub: user.id, email: user.email, role: user.role };
        const token = await this.jwtService.signAsync(payload, { expiresIn: '7d' });
        return {
            message: 'Signup successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        };
    }
    async login({ email, password }) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { id: user.id, email: user.email, role: user.role };
        const token = await this.jwtService.signAsync(payload, { expiresIn: '7d' });
        return {
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        };
    }
    async resetPassword(email) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const passwordResetToken = await this.jwtService.signAsync({ userId: user.id }, { expiresIn: '1h' });
        await this.prisma.user.update({
            where: { email },
            data: { passwordResetToken },
        });
        console.log(`Generated password reset token for ${email}:`, passwordResetToken);
        const resetLink = `http://localhost:3000/update-password?token=${encodeURIComponent(passwordResetToken)}`;
        try {
            await this.resend.emails.send({
                from: 'taskman@resend.dev',
                to: email,
                subject: 'Password Reset Request',
                html: `<p>Hi ${user.name},</p><p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
            });
            return { message: 'Password reset link sent!' };
        }
        catch (error) {
            console.error('Failed to send email:', error instanceof Error ? error.message : error);
            throw new common_1.InternalServerErrorException('Failed to send email. Please try again later.');
        }
    }
    async updatePassword({ token, newPassword }) {
        try {
            if (!token) {
                throw new common_1.UnauthorizedException('No token provided');
            }
            const decoded = await this.jwtService
                .verifyAsync(token)
                .catch(() => null);
            if (!decoded || !decoded.userId) {
                throw new common_1.UnauthorizedException('Invalid or expired token');
            }
            const user = await this.prisma.user.findUnique({
                where: { id: Number(decoded.userId) },
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            if (!user.passwordResetToken || user.passwordResetToken !== token) {
                throw new common_1.UnauthorizedException('Invalid or expired token');
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await this.prisma.user.update({
                where: { id: user.id },
                data: { password: hashedPassword, passwordResetToken: null },
            });
            return { message: 'Password updated successfully' };
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
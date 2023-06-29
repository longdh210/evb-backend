import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    // @UseGuards(AuthGuard('local'))
    @Post('auth/user/login')
    async loginUser(@Body() req) {
        return this.authService.validateUser(req.username, req.password);
    }

    // @UseGuards(AuthGuard('local'))
    @Post('auth/admin/login')
    async loginAdmin(@Body() req) {
        return this.authService.validateAdmin(req.username, req.password);
    }
}
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { GetAccessTokenForm } from './dto/getAccessToken.dto';
import { ResponseAuthDto } from './dto/responseAuth.dto';
import { SignUpDto } from './dto/signUp.dto';
import { UserService } from '../user/user.service';
import { FacebookAuthGuard } from './guards/facebook-auth.guard';
import { Request } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Body() body: LoginUserDto): Promise<any> {
        return this.authService.login(body);
    }

    @Get('facebook/login')
    @UseGuards(FacebookAuthGuard)
    @HttpCode(HttpStatus.OK)
    async facebookLogin(): Promise<void> {}

    @Get('/facebook/redirect')
    @UseGuards(FacebookAuthGuard)
    @HttpCode(HttpStatus.OK)
    async facebookLoginRedirect(@Req() req: Request): Promise<any> {
        return this.authService.facebookLogin(req);
    }

    @Post('sign-up')
    @HttpCode(HttpStatus.CREATED)
    async signUp(@Body() signUpDto: SignUpDto): Promise<void> {
        return this.authService.signUp(signUpDto);
    }

    @Post('access-token')
    @ApiBody({
        type: GetAccessTokenForm,
    })
    async getAccessToken(@Body('refreshToken') refreshToken: string): Promise<Partial<ResponseAuthDto>> {
        try {
            return this.authService.getAccessToken(refreshToken);
        } catch (e) {
            throw new Error(e);
        }
    }

    @Post('change-password')
    @UseGuards(JWTAuthGuard)
    @HttpCode(HttpStatus.OK)
    async changePassword(@Body() changePasswordDto: ChangePasswordDto, @Req() req: Request): Promise<void> {
        return this.authService.changePassword(changePasswordDto, req);
    }
}

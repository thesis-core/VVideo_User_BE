import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { GetAccessTokenForm } from './dto/getAccessToken.dto';
import { ResponseAuthDto } from './dto/responseAuth.dto';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { SignUpDto } from './dto/signUp.dto';
import { UserService } from '../user/user.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

    @Post('login')
    async login(@Body() body: LoginUserDto): Promise<any> {
        return this.authService.login(body);
    }

    @Post('sign-up')
    async signUp(@Body() signUpDto: SignUpDto): Promise<any> {
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
}

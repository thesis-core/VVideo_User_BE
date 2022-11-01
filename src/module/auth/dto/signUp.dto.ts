import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    avatarUrl: string;

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    facebookId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    userTier: string;

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    stripeId: string;
}

import { Column } from 'typeorm';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserTier {
    constructor(name: string, pricing: number) {
        this.name = name;
        this.pricing = pricing;
    }

    @Column()
    @IsString()
    @IsNotEmpty()
    name: string;

    @Column()
    @IsNumber()
    @IsNotEmpty()
    pricing: number;
}

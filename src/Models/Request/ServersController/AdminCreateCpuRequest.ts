import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export default class AdminCreateCpuRequest {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumberString()
    price: number;

    @IsNotEmpty()
    @IsNumberString()
    cores: number;

    @IsNotEmpty()
    @IsNumberString()
    threads: number;

    @IsNotEmpty()
    @IsNumberString()
    mhz: number;
}
import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export default class AdminCreateServersRequest {
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
    cpu: number;

    @IsNotEmpty()
    @IsNumberString()
    ram: number;

    @IsNotEmpty()
    @IsNumberString()
    storage: number;

    @IsNotEmpty()
    @IsNumberString()
    powerConsumption: number;
}
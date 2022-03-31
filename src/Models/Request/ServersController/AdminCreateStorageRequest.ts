import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export default class AdminCreateStorageRequest {
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
    capacity: number;

}
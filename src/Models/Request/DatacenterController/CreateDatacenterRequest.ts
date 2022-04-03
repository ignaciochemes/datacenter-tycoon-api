import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export default class CreateDatacenterRequest {
    @IsNotEmpty()
    @IsString()
    public name: string;

    @IsNotEmpty()
    @IsString()
    public description: string;

    @IsNotEmpty()
    @IsNumberString()
    public type: number;

}
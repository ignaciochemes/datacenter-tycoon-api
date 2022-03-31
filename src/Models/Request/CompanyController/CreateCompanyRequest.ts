import { IsNotEmpty, IsString } from "class-validator";

export default class CreateCompanyRequest {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

}
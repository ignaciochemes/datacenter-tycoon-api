import { IsNotEmpty, IsString } from "class-validator";

export default class JwtCheckRequest {
    @IsNotEmpty()
    @IsString()
    token: string;
}
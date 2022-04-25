import { IsNotEmpty, IsString, Length } from "class-validator";

export default class ChangePasswordRequest {
    @IsString()
    @IsNotEmpty()
    @Length(6, 20)
    public newPassword: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 20)
    public oldPassword: string;
}
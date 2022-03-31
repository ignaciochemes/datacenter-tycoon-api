import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { HeaderRequired } from "src/Helpers/Decorators/HeaderRequiredDecorator";
import Response from "src/Helpers/Formatter/Response";
import CreateUserRequest from "src/Models/Request/UserController/CreateUserRequest";
import CreateUserResponse from "src/Models/Response/UserController/CreateUserResponse";
import LoginResponse from "src/Models/Response/UserController/LoginUserResponse";
import { UserService } from "src/Services/UserService";

@Controller('user')
export class UserController {
    constructor(private readonly _userService: UserService) { }

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    async login(
        @Body() body: CreateUserRequest
    ): Promise<Response<LoginResponse>> {
        const response = await this._userService.login(body);
        return Response.create<LoginResponse>(response);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() body: CreateUserRequest
    ): Promise<Response<CreateUserResponse>> {
        const response = await this._userService.create(body);
        return Response.create<CreateUserResponse>(response);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getUserByUuid(
        @HeaderRequired('access-token') token: string
    ): Promise<Response<any>> {
        const response = await this._userService.getUserByUuid(token);
        return Response.create<any>(response);
    }

}
import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import Response from "src/Helpers/Formatter/Response";
import JwtCheckRequest from "src/Models/Request/JwtController/JwtCheckRequest";
import { JwtSecurityService } from "src/Services/Security/JwtSecurityService";

@Controller('jwt')
export class JwtController {
    constructor(private readonly _jwtSecurityService: JwtSecurityService) { }

    @Post()
    @HttpCode(HttpStatus.OK)
    async checkJwt(@Body() body: JwtCheckRequest): Promise<Response<boolean>> {
        const response = await this._jwtSecurityService.verifyTokenBoolean(body.token);
        return Response.create<boolean>(response);
    }

}
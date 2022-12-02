import { Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { HeaderRequired } from "src/Helpers/Decorators/HeaderRequiredDecorator";
import Response from "src/Helpers/Formatter/Response";
import IdResponse from "src/Models/Response/IdResponse";
import { RackService } from "src/Services/RackService";

@Controller('rack')
export class RackController {
    constructor(private readonly _rackService: RackService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @HeaderRequired('access-token') token: string
    ): Promise<Response<IdResponse>> {
        const response = await this._rackService.create(token);
        return Response.create<IdResponse>(response);
    }
}
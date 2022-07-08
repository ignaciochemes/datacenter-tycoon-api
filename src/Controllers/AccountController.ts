import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { HeaderRequired } from "src/Helpers/Decorators/HeaderRequiredDecorator";
import Response from "src/Helpers/Formatter/Response";
import IdResponse from "src/Models/Response/IdResponse";
import { AccountService } from "src/Services/AccountService";

@Controller('account')
export class AccountController {
    constructor(private readonly _accountService: AccountService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAccountByUuid(
        @HeaderRequired('access-token') token: string
    ): Promise<Response<IdResponse>> {
        const response = await this._accountService.getFullAcountByUuid(token);
        return Response.create<IdResponse>(response);
    }
}
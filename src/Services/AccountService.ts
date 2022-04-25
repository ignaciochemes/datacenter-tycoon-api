import { Injectable } from "@nestjs/common";
import { StatusCodeEnums } from "src/Enums/StatusCodeEnums";
import { HttpCustomException } from "src/Exceptions/HttpCustomException";
import { User } from "src/Models/Entities/UserEntity";
import { JwtSecurityService } from "./Security/JwtSecurityService";
import { UserService } from "./UserService";

@Injectable()
export class AccountService {
    constructor(
        private readonly _userService: UserService,
        private readonly _jwtSecurityService: JwtSecurityService
    ) { }

    async getFullAcountByUuid(token: string): Promise<any> {
        const isValidToken = await this._jwtSecurityService.verifyToken(token);
        if (!isValidToken) throw new HttpCustomException('Invalid token', StatusCodeEnums.INVALID_TOKEN);
        const user: User = await this._userService.getUserByUuid(token);
        if (!user) throw new HttpCustomException('User not found', StatusCodeEnums.USER_NOT_FOUND);
        return user;
    }
}
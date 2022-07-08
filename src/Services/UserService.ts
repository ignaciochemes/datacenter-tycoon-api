import { BadRequestException, Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { RolDao } from "src/Daos/RolDao";
import { UserDao } from "src/Daos/UserDao";
import { HttpCustomException } from "src/Exceptions/HttpCustomException";
import { Rol } from "src/Models/Entities/RolEntity";
import { User } from "src/Models/Entities/UserEntity";
import CreateUserRequest from "src/Models/Request/UserController/CreateUserRequest";
import CreateUserResponse from "src/Models/Response/UserController/CreateUserResponse";
import UtilityFunctions from "src/Helpers/Utilities/UtilityFunctions";
import { StatusCodeEnums } from "src/Enums/StatusCodeEnums";
import { JwtSecurityService } from "./Security/JwtSecurityService";
import LoginResponse from "src/Models/Response/UserController/LoginUserResponse";
import ChangePasswordRequest from "src/Models/Request/UserController/ChangePasswordRequest";
import IdResponse from "src/Models/Response/IdResponse";

@Injectable()
export class UserService {

    constructor(
        private readonly _userDao: UserDao,
        private readonly _rolDao: RolDao,
        private readonly _jwtSecurityService: JwtSecurityService
    ) { }

    async login(data: CreateUserRequest): Promise<any> {
        const user = await this._userDao.getUserByEmail(data.email);
        if (!user) throw new HttpCustomException('User not found', StatusCodeEnums.USER_NOT_FOUND);
        const isValidPassword = await UtilityFunctions.getEncryptCompare(data.password, user.getPassword());
        if (!isValidPassword) throw new HttpCustomException('Invalid password', StatusCodeEnums.INVALID_PASSWORD);
        const accessToken: string = await this._jwtSecurityService.generateAccessToken(user.getId(), user.getRol().getId(), user.getUuid());
        return new LoginResponse(accessToken);
    }

    async create(data: CreateUserRequest): Promise<any> {
        const rol: Rol = await this._rolDao.getRolById(data.rol);
        if (!rol) throw new BadRequestException('Invalid rol id');
        const findUser = await this._userDao.getUserByEmail(data.email);
        if (findUser) throw new HttpCustomException('This email is already registered', StatusCodeEnums.EMAIL_DUPLICATED);
        let newUser: User = new User();
        newUser.setEmail(data.email);
        newUser.setPassword(await UtilityFunctions.getEncryptData(data.password));
        newUser.setRol(rol);
        newUser.setUuid(uuidv4());
        await this._userDao.save(newUser);
        return new CreateUserResponse(newUser.getUuid());
    }

    async getUserByUuid(token: string): Promise<any> {
        const isValidToken = await this._jwtSecurityService.verifyToken(token);
        if (!isValidToken) throw new HttpCustomException('Invalid token', StatusCodeEnums.INVALID_TOKEN);
        const user: User = await this._userDao.getUserByUuid(isValidToken.uuid);
        if (!user) throw new HttpCustomException('User not found', StatusCodeEnums.USER_NOT_FOUND);
        if (user.getUuid() !== isValidToken.uuid) throw new HttpCustomException('Invalid token', StatusCodeEnums.INVALID_TOKEN);
        if (isValidToken.rol !== user.getRol().getId()) throw new HttpCustomException('Invalid token', StatusCodeEnums.INVALID_TOKEN);
        return user;
    }

    async changePassword(token: string, data: ChangePasswordRequest): Promise<IdResponse> {
        const user: User = await this.getUserByUuid(token);
        if (!user) throw new HttpCustomException('User not found', StatusCodeEnums.USER_NOT_FOUND);
        const userPassword = await UtilityFunctions.getEncryptCompare(data.oldPassword, user.getPassword());
        if (userPassword === false) throw new HttpCustomException('The old password is invalid', StatusCodeEnums.INVALID_PASSWORD);
        user.setPassword(await UtilityFunctions.getEncryptData(data.newPassword));
        await this._userDao.save(user);
        return new IdResponse(user.getId());
    }
}
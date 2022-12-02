import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import RoleConstants from "src/Constants/RoleConstants";

@Injectable()
export class JwtSecurityService {
    constructor(private readonly _jwtService: JwtService) { }

    async generateAccessToken(id: number, rol: number, uuid: string): Promise<string> {
        try {
            const payload = { id: id, rol: rol, uuid: uuid };
            const tokenExpiration = rol == RoleConstants.ROL_ADMIN ? '24h' : '8h';
            return this._jwtService.sign(payload, {
                expiresIn: tokenExpiration,
                privateKey: process.env.JWT_PRIVATE_KEY,
            });
        } catch (error) {
            console.error('Error generating token');
            return null;
        }
    }

    async verifyToken(token: string): Promise<any> {
        try {
            return this._jwtService.verify(token.split(' ')[1], { secret: process.env.JWT_PRIVATE_KEY });
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async verifyTokenBoolean(token: string): Promise<boolean> {
        try {
            await this._jwtService.verify(token, { secret: process.env.JWT_PRIVATE_KEY });
            return true;
        } catch (e) {
            return false;
        }
    }

}
import { User } from '../../Entities/UserEntity';

interface IRolResponse {
    id: number;
    description: string;
}

export default class UserResponse {
    id: number;
    email: string;
    rol: IRolResponse;

    constructor(user: User) {
        this.id = user.id;
        this.email = user.email;
        this.rol = { id: user.rol.id, description: user.rol.description };
    }
}
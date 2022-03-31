export default class LoginResponse {
    public accessToken: string;

    constructor(token: string) {
        this.accessToken = token;
    }
}
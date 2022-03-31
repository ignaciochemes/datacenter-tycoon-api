export default class IdResponse {
    id: number;

    constructor(id?: number) {
        this.id = id ? id : null;
    }
}
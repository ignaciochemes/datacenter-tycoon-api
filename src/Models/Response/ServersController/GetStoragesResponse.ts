import { Storage } from "src/Models/Entities/StorageEntity";

export default class GetStoragesResponse {
    public id: number;
    public name: string;
    public description: string;
    public price: number;
    public capacity: number;

    constructor(storage: Storage) {
        this.id = storage.getId();
        this.name = storage.getName();
        this.description = storage.getDescription();
        this.price = storage.getPrice();
        this.capacity = storage.getCapacity();
    }

}
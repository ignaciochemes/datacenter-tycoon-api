import { Ram } from "src/Models/Entities/RamEntity";

export default class GetRamsResponse {
    public id: number;
    public name: string;
    public description: string;
    public price: number;
    public capacity: number;

    constructor(ram: Ram) {
        this.id = ram.getId();
        this.name = ram.getName();
        this.description = ram.getDescription();
        this.price = ram.getPrice();
        this.capacity = ram.getCapacity();
    }

}
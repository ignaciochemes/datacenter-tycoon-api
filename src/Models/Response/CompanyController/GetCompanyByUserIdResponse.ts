import { Company } from "src/Models/Entities/CompanyEntity";
import { User } from "src/Models/Entities/UserEntity";

export default class GetCompanyByUserIdResponse {
    public owner: string;
    public name: string;
    public description: string;
    public registrationDate: Date;
    public active: boolean;
    public balance: number;

    constructor(owner: User, company: Company) {
        this.owner = owner.getUuid();
        this.name = company.getName();
        this.description = company.getDescription();
        this.registrationDate = company.getRegistrationDate();
        this.active = company.isActive();
        this.balance = company.getBalance();
    }

}
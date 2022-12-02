import { Datacenter } from "src/Models/Entities/DatacenterEntity";
import { User } from "src/Models/Entities/UserEntity";

export default class GetDatacenterByUserIdResponse {
    public id: number;
    public name: string;
    public description: string;
    public datacenterType: string;
    public datacenterUbication: string;
    public datacenterMaxPower: number;
    public datacenterMaxBandwidth: number;
    public datacenterMaxRacks: number;
    public datacenterOwner: string;

    constructor(user: User, datacenter: Datacenter) {
        this.id = datacenter.getId();
        this.name = datacenter.getName();
        this.description = datacenter.getDescription();
        this.datacenterType = datacenter.getDatacenterType().getName();
        this.datacenterUbication = datacenter.getDatacenterType().getUbication();
        this.datacenterMaxPower = datacenter.getDatacenterType().getMaxPower();
        this.datacenterMaxBandwidth = datacenter.getDatacenterType().getMaxBandwidth();
        this.datacenterMaxRacks = datacenter.getDatacenterType().getMaxRacks();
        this.datacenterOwner = user.getUuid();
    }

}
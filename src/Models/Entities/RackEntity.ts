import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Datacenter } from "./DatacenterEntity";
import { GenericEntity } from "./GenericTable";
import { User } from "./UserEntity";

@Entity()
export class Rack extends GenericEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @OneToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
    public userId: User;

    @ManyToOne(() => Datacenter, datacenter => datacenter.id)
    @JoinColumn({ name: 'datacenter_id' })
    public datacenterId: Datacenter;

    @Column({ nullable: true })
    public uuid: string;

    @Column({ nullable: true, default: 15 })
    public maxServers: number;

    @Column({ nullable: true, default: 0 })
    public usedServers: number;

    @Column({ nullable: true, default: 0 })
    public bandwidthUsage: number;

    @Column({ nullable: true, default: 0 })
    public dedicatedBandwidth: number;

    @Column({ nullable: true, default: 0 })
    public sharedBandwidth: number;

    @Column({ nullable: true, default: 0 })
    public totalBandwidth: number;

    @Column({ nullable: true, default: 0 })
    public dedicatedBandwidthUsage: number;

    @Column({ nullable: true, default: 0 })
    public sharedBandwidthUsage: number;

    @Column({ nullable: true, default: 0 })
    public totalBandwidthUsage: number;

    @Column({ nullable: true, default: 0 })
    public freeSharedBandwidth: number;

    @Column({ nullable: true, default: 0 })
    public freeDedicatedBandwidth: number;

    @Column({ nullable: true, default: 0 })
    public freeTotalBandwidth: number;

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getUserId(): User {
        return this.userId;
    }

    public setUserId(userId: User): void {
        this.userId = userId;
    }

    public getDatacenterId(): Datacenter {
        return this.datacenterId;
    }

    public setDatacenterId(datacenterId: Datacenter): void {
        this.datacenterId = datacenterId;
    }

    public getUuid(): string {
        return this.uuid;
    }

    public setUuid(uuid: string): void {
        this.uuid = uuid;
    }

    public getMaxServers(): number {
        return this.maxServers;
    }

    public setMaxServers(maxServers: number): void {
        this.maxServers = maxServers;
    }

    public getUsedServers(): number {
        return this.usedServers;
    }

    public setUsedServers(usedServers: number): void {
        this.usedServers = usedServers;
    }

    public getBandwidthUsage(): number {
        return this.bandwidthUsage;
    }

    public setBandwidthUsage(bandwidthUsage: number): void {
        this.bandwidthUsage = bandwidthUsage;
    }

    public getDedicatedBandwidth(): number {
        return this.dedicatedBandwidth;
    }

    public setDedicatedBandwidth(dedicatedBandwidth: number): void {
        this.dedicatedBandwidth = dedicatedBandwidth;
    }

    public getSharedBandwidth(): number {
        return this.sharedBandwidth;
    }

    public setSharedBandwidth(sharedBandwidth: number): void {
        this.sharedBandwidth = sharedBandwidth;
    }

    public getTotalBandwidth(): number {
        return this.totalBandwidth;
    }

    public setTotalBandwidth(totalBandwidth: number): void {
        this.totalBandwidth = totalBandwidth;
    }

    public getDedicatedBandwidthUsage(): number {
        return this.dedicatedBandwidthUsage;
    }

    public setDedicatedBandwidthUsage(dedicatedBandwidthUsage: number): void {
        this.dedicatedBandwidthUsage = dedicatedBandwidthUsage;
    }

    public getSharedBandwidthUsage(): number {
        return this.sharedBandwidthUsage;
    }

    public setSharedBandwidthUsage(sharedBandwidthUsage: number): void {
        this.sharedBandwidthUsage = sharedBandwidthUsage;
    }

    public getTotalBandwidthUsage(): number {
        return this.totalBandwidthUsage;
    }

    public setTotalBandwidthUsage(totalBandwidthUsage: number): void {
        this.totalBandwidthUsage = totalBandwidthUsage;
    }

    public getFreeSharedBandwidth(): number {
        return this.freeSharedBandwidth;
    }

    public setFreeSharedBandwidth(freeSharedBandwidth: number): void {
        this.freeSharedBandwidth = freeSharedBandwidth;
    }

    public getFreeDedicatedBandwidth(): number {
        return this.freeDedicatedBandwidth;
    }

    public setFreeDedicatedBandwidth(freeDedicatedBandwidth: number): void {
        this.freeDedicatedBandwidth = freeDedicatedBandwidth;
    }

    public getFreeTotalBandwidth(): number {
        return this.freeTotalBandwidth;
    }

    public setFreeTotalBandwidth(freeTotalBandwidth: number): void {
        this.freeTotalBandwidth = freeTotalBandwidth;
    }

}
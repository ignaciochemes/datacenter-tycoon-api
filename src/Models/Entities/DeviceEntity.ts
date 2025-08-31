import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GenericEntity } from "./GenericTable";
import { User } from "./UserEntity";
import { Rack } from "./RackEntity";
import { DeviceType, DeviceStatus } from "../../Enums/DeviceTypeEnum";

/**
 * Entidad genérica para todos los dispositivos del datacenter
 * Reemplaza y extiende la funcionalidad de ServersEntity
 * Soporta servidores, switches, routers, firewalls, UPS, PDUs, etc.
 */
@Entity()
export class Device extends GenericEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
    public userId: User;

    @ManyToOne(() => Rack, rack => rack.id)
    @JoinColumn({ name: 'rack_id' })
    public rackId: Rack;

    @Column({ nullable: false })
    public uuid: string;

    @Column({ nullable: false, length: 255 })
    public name: string;

    @Column({ nullable: true, length: 500 })
    public description: string;

    @Column({ type: 'enum', enum: DeviceType, nullable: false })
    public deviceType: DeviceType;

    @Column({ type: 'enum', enum: DeviceStatus, default: DeviceStatus.INACTIVE })
    public status: DeviceStatus;

    // Especificaciones físicas
    @Column({ nullable: false, comment: 'Unidades de rack ocupadas' })
    public rackUnits: number;

    @Column({ nullable: false, comment: 'Consumo eléctrico en watts (TDP)' })
    public powerConsumption: number;

    @Column({ nullable: false, comment: 'Tiempo medio entre fallos en horas' })
    public mtbf: number;

    @Column({ nullable: false, comment: 'Precio de compra' })
    public purchasePrice: number;

    @Column({ nullable: true, comment: 'Precio de arriendo mensual' })
    public monthlyRentalPrice: number;

    // Especificaciones técnicas (JSON para flexibilidad)
    @Column({ type: 'json', nullable: true, comment: 'Especificaciones técnicas específicas del dispositivo' })
    public specifications: {
        // Para servidores
        cpu?: {
            cores: number;
            threads: number;
            frequency: number;
            model: string;
        };
        ram?: {
            capacity: number; // GB
            type: string; // DDR4, DDR5, etc.
        };
        storage?: {
            capacity: number; // GB
            type: string; // SSD, HDD, NVMe
            iops?: number;
        };
        // Para dispositivos de red
        ports?: {
            count: number;
            speed: string; // 1Gbps, 10Gbps, etc.
            type: string; // RJ45, SFP+, etc.
        };
        throughput?: {
            max: number; // Mbps
            pps: number; // packets per second
        };
        // Para UPS/PDU
        capacity?: {
            va: number; // Volt-Amperes
            watts: number;
            outlets: number;
        };
    };

    // Configuración operativa
    @Column({ default: false, comment: 'Si el dispositivo está en funcionamiento' })
    public isRunning: boolean;

    @Column({ type: 'timestamp', nullable: true, comment: 'Última vez que se encendió' })
    public lastStartTime: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Próximo mantenimiento programado' })
    public nextMaintenanceDate: Date;

    @Column({ nullable: true, comment: 'Número de serie del fabricante' })
    public serialNumber: string;

    @Column({ nullable: true, comment: 'Fabricante del dispositivo' })
    public manufacturer: string;

    @Column({ nullable: true, comment: 'Modelo del dispositivo' })
    public model: string;

    // Getters y Setters
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

    public getRackId(): Rack {
        return this.rackId;
    }

    public setRackId(rackId: Rack): void {
        this.rackId = rackId;
    }

    public getUuid(): string {
        return this.uuid;
    }

    public setUuid(uuid: string): void {
        this.uuid = uuid;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getDeviceType(): DeviceType {
        return this.deviceType;
    }

    public setDeviceType(deviceType: DeviceType): void {
        this.deviceType = deviceType;
    }

    public getStatus(): DeviceStatus {
        return this.status;
    }

    public setStatus(status: DeviceStatus): void {
        this.status = status;
    }

    public getRackUnits(): number {
        return this.rackUnits;
    }

    public setRackUnits(rackUnits: number): void {
        this.rackUnits = rackUnits;
    }

    public getPowerConsumption(): number {
        return this.powerConsumption;
    }

    public setPowerConsumption(powerConsumption: number): void {
        this.powerConsumption = powerConsumption;
    }

    public getMtbf(): number {
        return this.mtbf;
    }

    public setMtbf(mtbf: number): void {
        this.mtbf = mtbf;
    }

    public getPurchasePrice(): number {
        return this.purchasePrice;
    }

    public setPurchasePrice(purchasePrice: number): void {
        this.purchasePrice = purchasePrice;
    }

    public getMonthlyRentalPrice(): number {
        return this.monthlyRentalPrice;
    }

    public setMonthlyRentalPrice(monthlyRentalPrice: number): void {
        this.monthlyRentalPrice = monthlyRentalPrice;
    }

    public getSpecifications(): any {
        return this.specifications;
    }

    public setSpecifications(specifications: any): void {
        this.specifications = specifications;
    }

    public getIsRunning(): boolean {
        return this.isRunning;
    }

    public setIsRunning(isRunning: boolean): void {
        this.isRunning = isRunning;
    }

    public getLastStartTime(): Date {
        return this.lastStartTime;
    }

    public setLastStartTime(lastStartTime: Date): void {
        this.lastStartTime = lastStartTime;
    }

    public getNextMaintenanceDate(): Date {
        return this.nextMaintenanceDate;
    }

    public setNextMaintenanceDate(nextMaintenanceDate: Date): void {
        this.nextMaintenanceDate = nextMaintenanceDate;
    }

    public getSerialNumber(): string {
        return this.serialNumber;
    }

    public setSerialNumber(serialNumber: string): void {
        this.serialNumber = serialNumber;
    }

    public getManufacturer(): string {
        return this.manufacturer;
    }

    public setManufacturer(manufacturer: string): void {
        this.manufacturer = manufacturer;
    }

    public getModel(): string {
        return this.model;
    }

    public setModel(model: string): void {
        this.model = model;
    }
}
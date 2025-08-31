import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GenericEntity } from "./GenericTable";
import { User } from "./UserEntity";
import { ServiceTypeEntity } from "./ServiceTypeEntity";
import { Datacenter } from "./DatacenterEntity";
import { ServiceStatus } from "../../Enums/ServiceEnum";

/**
 * Entidad que representa un servicio específico ofrecido por un usuario
 * Basado en un tipo de servicio pero con configuración personalizada
 */
@Entity()
export class Service extends GenericEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
    public userId: User;

    @ManyToOne(() => ServiceTypeEntity, serviceType => serviceType.id)
    @JoinColumn({ name: 'service_type_id' })
    public serviceTypeId: ServiceTypeEntity;

    @ManyToOne(() => Datacenter, datacenter => datacenter.id)
    @JoinColumn({ name: 'datacenter_id' })
    public datacenterId: Datacenter;

    @Column({ nullable: false })
    public uuid: string;

    @Column({ nullable: false, length: 255 })
    public name: string;

    @Column({ nullable: true, length: 1000 })
    public description: string;

    @Column({ type: 'enum', enum: ServiceStatus, default: ServiceStatus.INACTIVE })
    public status: ServiceStatus;

    // Recursos asignados al servicio
    @Column({ nullable: false, comment: 'CPU cores asignados' })
    public allocatedCpuCores: number;

    @Column({ nullable: false, comment: 'RAM asignada en GB' })
    public allocatedRamGb: number;

    @Column({ nullable: false, comment: 'Almacenamiento asignado en GB' })
    public allocatedStorageGb: number;

    @Column({ nullable: false, comment: 'Ancho de banda asignado en Mbps' })
    public allocatedBandwidthMbps: number;

    // Precios del servicio
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false, comment: 'Precio mensual del servicio' })
    public monthlyPrice: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, comment: 'Precio de setup inicial' })
    public setupPrice: number;

    // SLAs específicos del servicio
    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false, comment: 'Uptime garantizado (%)' })
    public guaranteedUptimePercent: number;

    @Column({ nullable: false, comment: 'Latencia máxima garantizada (ms)' })
    public maxLatencyMs: number;

    @Column({ nullable: false, comment: 'Throughput mínimo garantizado (Mbps)' })
    public minThroughputMbps: number;

    // Configuración específica del servicio
    @Column({ type: 'json', nullable: true, comment: 'Configuración específica del servicio' })
    public serviceConfiguration: {
        // Configuración de red
        ipAddresses?: string[];
        ports?: number[];
        protocols?: string[];

        // Configuración de seguridad
        firewallRules?: string[];
        sslEnabled?: boolean;
        backupEnabled?: boolean;

        // Configuración de monitoreo
        monitoringEnabled?: boolean;
        alertsEnabled?: boolean;
        loggingLevel?: string;

        // Configuración específica por tipo
        webServerConfig?: {
            documentRoot?: string;
            maxConnections?: number;
            keepAliveTimeout?: number;
        };

        databaseConfig?: {
            engine?: string;
            version?: string;
            maxConnections?: number;
            cacheSize?: number;
        };

        kubernetesConfig?: {
            version?: string;
            maxPods?: number;
            maxNodes?: number;
            storageClass?: string;
        };
    };

    // Métricas de rendimiento
    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true, comment: 'Uptime actual (%)' })
    public currentUptimePercent: number;

    @Column({ nullable: true, comment: 'Latencia promedio actual (ms)' })
    public currentAvgLatencyMs: number;

    @Column({ nullable: true, comment: 'Throughput promedio actual (Mbps)' })
    public currentAvgThroughputMbps: number;

    @Column({ nullable: true, comment: 'Uso actual de CPU (%)' })
    public currentCpuUsagePercent: number;

    @Column({ nullable: true, comment: 'Uso actual de RAM (%)' })
    public currentRamUsagePercent: number;

    @Column({ nullable: true, comment: 'Uso actual de almacenamiento (%)' })
    public currentStorageUsagePercent: number;

    // Fechas importantes
    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de activación del servicio' })
    public activationDate: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de suspensión del servicio' })
    public suspensionDate: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Próximo mantenimiento programado' })
    public nextMaintenanceDate: Date;

    // Configuración de facturación
    @Column({ default: true, comment: 'Si el servicio está disponible para nuevos contratos' })
    public isAvailableForContracts: boolean;

    @Column({ nullable: true, comment: 'Número máximo de contratos simultáneos' })
    public maxConcurrentContracts: number;

    @Column({ nullable: true, comment: 'Número actual de contratos activos' })
    public currentActiveContracts: number;

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

    public getServiceTypeId(): ServiceTypeEntity {
        return this.serviceTypeId;
    }

    public setServiceTypeId(serviceTypeId: ServiceTypeEntity): void {
        this.serviceTypeId = serviceTypeId;
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

    public getStatus(): ServiceStatus {
        return this.status;
    }

    public setStatus(status: ServiceStatus): void {
        this.status = status;
    }

    public getAllocatedCpuCores(): number {
        return this.allocatedCpuCores;
    }

    public setAllocatedCpuCores(allocatedCpuCores: number): void {
        this.allocatedCpuCores = allocatedCpuCores;
    }

    public getAllocatedRamGb(): number {
        return this.allocatedRamGb;
    }

    public setAllocatedRamGb(allocatedRamGb: number): void {
        this.allocatedRamGb = allocatedRamGb;
    }

    public getAllocatedStorageGb(): number {
        return this.allocatedStorageGb;
    }

    public setAllocatedStorageGb(allocatedStorageGb: number): void {
        this.allocatedStorageGb = allocatedStorageGb;
    }

    public getAllocatedBandwidthMbps(): number {
        return this.allocatedBandwidthMbps;
    }

    public setAllocatedBandwidthMbps(allocatedBandwidthMbps: number): void {
        this.allocatedBandwidthMbps = allocatedBandwidthMbps;
    }

    public getMonthlyPrice(): number {
        return this.monthlyPrice;
    }

    public setMonthlyPrice(monthlyPrice: number): void {
        this.monthlyPrice = monthlyPrice;
    }

    public getSetupPrice(): number {
        return this.setupPrice;
    }

    public setSetupPrice(setupPrice: number): void {
        this.setupPrice = setupPrice;
    }

    public getGuaranteedUptimePercent(): number {
        return this.guaranteedUptimePercent;
    }

    public setGuaranteedUptimePercent(guaranteedUptimePercent: number): void {
        this.guaranteedUptimePercent = guaranteedUptimePercent;
    }

    public getMaxLatencyMs(): number {
        return this.maxLatencyMs;
    }

    public setMaxLatencyMs(maxLatencyMs: number): void {
        this.maxLatencyMs = maxLatencyMs;
    }

    public getMinThroughputMbps(): number {
        return this.minThroughputMbps;
    }

    public setMinThroughputMbps(minThroughputMbps: number): void {
        this.minThroughputMbps = minThroughputMbps;
    }

    public getServiceConfiguration(): any {
        return this.serviceConfiguration;
    }

    public setServiceConfiguration(serviceConfiguration: any): void {
        this.serviceConfiguration = serviceConfiguration;
    }

    public getCurrentUptimePercent(): number {
        return this.currentUptimePercent;
    }

    public setCurrentUptimePercent(currentUptimePercent: number): void {
        this.currentUptimePercent = currentUptimePercent;
    }

    public getCurrentAvgLatencyMs(): number {
        return this.currentAvgLatencyMs;
    }

    public setCurrentAvgLatencyMs(currentAvgLatencyMs: number): void {
        this.currentAvgLatencyMs = currentAvgLatencyMs;
    }

    public getCurrentAvgThroughputMbps(): number {
        return this.currentAvgThroughputMbps;
    }

    public setCurrentAvgThroughputMbps(currentAvgThroughputMbps: number): void {
        this.currentAvgThroughputMbps = currentAvgThroughputMbps;
    }

    public getCurrentCpuUsagePercent(): number {
        return this.currentCpuUsagePercent;
    }

    public setCurrentCpuUsagePercent(currentCpuUsagePercent: number): void {
        this.currentCpuUsagePercent = currentCpuUsagePercent;
    }

    public getCurrentRamUsagePercent(): number {
        return this.currentRamUsagePercent;
    }

    public setCurrentRamUsagePercent(currentRamUsagePercent: number): void {
        this.currentRamUsagePercent = currentRamUsagePercent;
    }

    public getCurrentStorageUsagePercent(): number {
        return this.currentStorageUsagePercent;
    }

    public setCurrentStorageUsagePercent(currentStorageUsagePercent: number): void {
        this.currentStorageUsagePercent = currentStorageUsagePercent;
    }

    public getActivationDate(): Date {
        return this.activationDate;
    }

    public setActivationDate(activationDate: Date): void {
        this.activationDate = activationDate;
    }

    public getSuspensionDate(): Date {
        return this.suspensionDate;
    }

    public setSuspensionDate(suspensionDate: Date): void {
        this.suspensionDate = suspensionDate;
    }

    public getNextMaintenanceDate(): Date {
        return this.nextMaintenanceDate;
    }

    public setNextMaintenanceDate(nextMaintenanceDate: Date): void {
        this.nextMaintenanceDate = nextMaintenanceDate;
    }

    public getIsAvailableForContracts(): boolean {
        return this.isAvailableForContracts;
    }

    public setIsAvailableForContracts(isAvailableForContracts: boolean): void {
        this.isAvailableForContracts = isAvailableForContracts;
    }

    public getMaxConcurrentContracts(): number {
        return this.maxConcurrentContracts;
    }

    public setMaxConcurrentContracts(maxConcurrentContracts: number): void {
        this.maxConcurrentContracts = maxConcurrentContracts;
    }

    public getCurrentActiveContracts(): number {
        return this.currentActiveContracts;
    }

    public setCurrentActiveContracts(currentActiveContracts: number): void {
        this.currentActiveContracts = currentActiveContracts;
    }
}
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { GenericEntity } from "./GenericTable";
import { ServiceType } from "../../Enums/ServiceEnum";

/**
 * Entidad que define los tipos de servicios disponibles en el simulador
 * Cada tipo de servicio tiene características específicas como recursos requeridos,
 * precios base, SLAs por defecto, etc.
 */
@Entity()
export class ServiceTypeEntity extends GenericEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'enum', enum: ServiceType, nullable: false, unique: true })
    public type: ServiceType;

    @Column({ nullable: false, length: 255 })
    public name: string;

    @Column({ nullable: true, length: 1000 })
    public description: string;

    @Column({ nullable: false, comment: 'Precio base por mes' })
    public basePrice: number;

    // Recursos mínimos requeridos
    @Column({ nullable: false, comment: 'CPU mínimo requerido (cores)' })
    public minCpuCores: number;

    @Column({ nullable: false, comment: 'RAM mínima requerida (GB)' })
    public minRamGb: number;

    @Column({ nullable: false, comment: 'Almacenamiento mínimo requerido (GB)' })
    public minStorageGb: number;

    @Column({ nullable: false, comment: 'Ancho de banda mínimo requerido (Mbps)' })
    public minBandwidthMbps: number;

    // SLAs por defecto
    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false, comment: 'Uptime garantizado (%)' })
    public defaultUptimeSla: number;

    @Column({ nullable: false, comment: 'Latencia máxima garantizada (ms)' })
    public defaultMaxLatencyMs: number;

    @Column({ nullable: false, comment: 'Throughput mínimo garantizado (Mbps)' })
    public defaultMinThroughputMbps: number;

    // Configuración de precios
    @Column({ type: 'decimal', precision: 10, scale: 4, nullable: false, comment: 'Precio por core adicional' })
    public pricePerAdditionalCore: number;

    @Column({ type: 'decimal', precision: 10, scale: 4, nullable: false, comment: 'Precio por GB de RAM adicional' })
    public pricePerAdditionalGbRam: number;

    @Column({ type: 'decimal', precision: 10, scale: 4, nullable: false, comment: 'Precio por GB de almacenamiento adicional' })
    public pricePerAdditionalGbStorage: number;

    @Column({ type: 'decimal', precision: 10, scale: 4, nullable: false, comment: 'Precio por Mbps de ancho de banda adicional' })
    public pricePerAdditionalMbpsBandwidth: number;

    // Configuración específica del servicio (JSON para flexibilidad)
    @Column({ type: 'json', nullable: true, comment: 'Configuración específica del tipo de servicio' })
    public serviceConfig: {
        // Para servicios web
        maxConcurrentConnections?: number;
        supportedProtocols?: string[];
        cachingEnabled?: boolean;
        
        // Para servicios de base de datos
        maxDatabaseSize?: number;
        backupFrequency?: string;
        replicationSupported?: boolean;
        
        // Para servicios de Kubernetes
        maxPods?: number;
        maxNodes?: number;
        supportedVersions?: string[];
        
        // Para servicios de CDN
        edgeLocations?: number;
        maxCacheSize?: number;
        
        // Para servicios de email
        maxMailboxes?: number;
        maxAttachmentSize?: number;
        spamFilterEnabled?: boolean;
        
        // Configuración general
        monitoringEnabled?: boolean;
        loggingRetentionDays?: number;
        backupRetentionDays?: number;
    };

    @Column({ default: true, comment: 'Si el tipo de servicio está disponible para nuevos contratos' })
    public isActive: boolean;

    @Column({ nullable: true, comment: 'Categoría del servicio para agrupación' })
    public category: string;

    @Column({ nullable: true, comment: 'Nivel de complejidad del servicio (1-10)' })
    public complexityLevel: number;

    // Getters y Setters
    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getType(): ServiceType {
        return this.type;
    }

    public setType(type: ServiceType): void {
        this.type = type;
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

    public getBasePrice(): number {
        return this.basePrice;
    }

    public setBasePrice(basePrice: number): void {
        this.basePrice = basePrice;
    }

    public getMinCpuCores(): number {
        return this.minCpuCores;
    }

    public setMinCpuCores(minCpuCores: number): void {
        this.minCpuCores = minCpuCores;
    }

    public getMinRamGb(): number {
        return this.minRamGb;
    }

    public setMinRamGb(minRamGb: number): void {
        this.minRamGb = minRamGb;
    }

    public getMinStorageGb(): number {
        return this.minStorageGb;
    }

    public setMinStorageGb(minStorageGb: number): void {
        this.minStorageGb = minStorageGb;
    }

    public getMinBandwidthMbps(): number {
        return this.minBandwidthMbps;
    }

    public setMinBandwidthMbps(minBandwidthMbps: number): void {
        this.minBandwidthMbps = minBandwidthMbps;
    }

    public getDefaultUptimeSla(): number {
        return this.defaultUptimeSla;
    }

    public setDefaultUptimeSla(defaultUptimeSla: number): void {
        this.defaultUptimeSla = defaultUptimeSla;
    }

    public getDefaultMaxLatencyMs(): number {
        return this.defaultMaxLatencyMs;
    }

    public setDefaultMaxLatencyMs(defaultMaxLatencyMs: number): void {
        this.defaultMaxLatencyMs = defaultMaxLatencyMs;
    }

    public getDefaultMinThroughputMbps(): number {
        return this.defaultMinThroughputMbps;
    }

    public setDefaultMinThroughputMbps(defaultMinThroughputMbps: number): void {
        this.defaultMinThroughputMbps = defaultMinThroughputMbps;
    }

    public getPricePerAdditionalCore(): number {
        return this.pricePerAdditionalCore;
    }

    public setPricePerAdditionalCore(pricePerAdditionalCore: number): void {
        this.pricePerAdditionalCore = pricePerAdditionalCore;
    }

    public getPricePerAdditionalGbRam(): number {
        return this.pricePerAdditionalGbRam;
    }

    public setPricePerAdditionalGbRam(pricePerAdditionalGbRam: number): void {
        this.pricePerAdditionalGbRam = pricePerAdditionalGbRam;
    }

    public getPricePerAdditionalGbStorage(): number {
        return this.pricePerAdditionalGbStorage;
    }

    public setPricePerAdditionalGbStorage(pricePerAdditionalGbStorage: number): void {
        this.pricePerAdditionalGbStorage = pricePerAdditionalGbStorage;
    }

    public getPricePerAdditionalMbpsBandwidth(): number {
        return this.pricePerAdditionalMbpsBandwidth;
    }

    public setPricePerAdditionalMbpsBandwidth(pricePerAdditionalMbpsBandwidth: number): void {
        this.pricePerAdditionalMbpsBandwidth = pricePerAdditionalMbpsBandwidth;
    }

    public getServiceConfig(): any {
        return this.serviceConfig;
    }

    public setServiceConfig(serviceConfig: any): void {
        this.serviceConfig = serviceConfig;
    }

    public getIsActive(): boolean {
        return this.isActive;
    }

    public setIsActive(isActive: boolean): void {
        this.isActive = isActive;
    }

    public getCategory(): string {
        return this.category;
    }

    public setCategory(category: string): void {
        this.category = category;
    }

    public getComplexityLevel(): number {
        return this.complexityLevel;
    }

    public setComplexityLevel(complexityLevel: number): void {
        this.complexityLevel = complexityLevel;
    }
}
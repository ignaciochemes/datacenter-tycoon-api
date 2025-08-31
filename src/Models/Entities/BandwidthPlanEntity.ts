import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GenericEntity } from "./GenericTable";
import { User } from "./UserEntity";

/**
 * Entidad que representa los planes de ancho de banda disponibles
 * Define los diferentes niveles de conectividad y precios
 */
@Entity()
export class BandwidthPlan extends GenericEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => User, user => user.id, { nullable: true })
    @JoinColumn({ name: 'provider_id' })
    public providerId: User;

    @Column({ nullable: false })
    public uuid: string;

    @Column({ nullable: false, length: 255 })
    public name: string;

    @Column({ nullable: true, length: 1000 })
    public description: string;

    // Especificaciones técnicas del plan
    @Column({ type: 'integer', nullable: false, comment: 'Ancho de banda en Mbps' })
    public bandwidthMbps: number;

    @Column({ type: 'integer', nullable: true, comment: 'Ancho de banda garantizado en Mbps' })
    public guaranteedBandwidthMbps: number;

    @Column({ type: 'integer', nullable: true, comment: 'Ancho de banda de ráfaga en Mbps' })
    public burstBandwidthMbps: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true, comment: 'Latencia promedio en ms' })
    public averageLatencyMs: number;

    @Column({ type: 'decimal', precision: 5, scale: 4, nullable: true, comment: 'Porcentaje de pérdida de paquetes' })
    public packetLossPercentage: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true, comment: 'Jitter promedio en ms' })
    public averageJitterMs: number;

    // Información de precios
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false, comment: 'Precio mensual base' })
    public monthlyPrice: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, comment: 'Costo de instalación/setup' })
    public setupCost: number;

    @Column({ type: 'decimal', precision: 8, scale: 4, nullable: true, comment: 'Precio por Mbps adicional' })
    public pricePerAdditionalMbps: number;

    @Column({ type: 'decimal', precision: 8, scale: 6, nullable: true, comment: 'Precio por GB de transferencia' })
    public pricePerGbTransfer: number;

    // Límites y restricciones
    @Column({ type: 'bigint', nullable: true, comment: 'Límite de transferencia mensual en GB' })
    public monthlyTransferLimitGb: number;

    @Column({ type: 'integer', nullable: true, comment: 'Número máximo de conexiones concurrentes' })
    public maxConcurrentConnections: number;

    @Column({ type: 'integer', nullable: true, comment: 'Límite de velocidad de subida en Mbps' })
    public uploadSpeedLimitMbps: number;

    @Column({ type: 'integer', nullable: true, comment: 'Límite de velocidad de descarga en Mbps' })
    public downloadSpeedLimitMbps: number;

    // Características del plan
    @Column({ default: false, comment: 'Si incluye protección DDoS' })
    public includesDdosProtection: boolean;

    @Column({ default: false, comment: 'Si incluye balanceador de carga' })
    public includesLoadBalancer: boolean;

    @Column({ default: false, comment: 'Si incluye CDN' })
    public includesCdn: boolean;

    @Column({ default: false, comment: 'Si incluye monitoreo 24/7' })
    public includes24x7Monitoring: boolean;

    @Column({ default: false, comment: 'Si permite tráfico ilimitado' })
    public unlimitedTraffic: boolean;

    @Column({ default: false, comment: 'Si es un plan dedicado' })
    public isDedicated: boolean;

    // SLAs del plan
    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true, comment: 'SLA de uptime (%)' })
    public uptimeSla: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true, comment: 'SLA de latencia máxima (ms)' })
    public maxLatencySla: number;

    @Column({ type: 'decimal', precision: 5, scale: 4, nullable: true, comment: 'SLA de pérdida de paquetes máxima (%)' })
    public maxPacketLossSla: number;

    @Column({ type: 'integer', nullable: true, comment: 'Tiempo de resolución de incidentes en minutos' })
    public incidentResolutionTimeMinutes: number;

    // Información de disponibilidad
    @Column({ default: true, comment: 'Si el plan está activo y disponible' })
    public isActive: boolean;

    @Column({ default: false, comment: 'Si es un plan promocional' })
    public isPromotional: boolean;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de inicio de disponibilidad' })
    public availableFrom: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de fin de disponibilidad' })
    public availableUntil: Date;

    @Column({ type: 'integer', nullable: true, comment: 'Duración mínima del contrato en meses' })
    public minimumContractMonths: number;

    // Información geográfica
    @Column({ type: 'json', nullable: true, comment: 'Regiones donde está disponible el plan' })
    public availableRegions: string[];

    @Column({ type: 'json', nullable: true, comment: 'Datacenters donde está disponible' })
    public availableDatacenters: number[];

    // Configuración técnica avanzada
    @Column({ type: 'json', nullable: true, comment: 'Configuración de QoS (Quality of Service)' })
    public qosConfiguration: {
        priorityLevels?: number;
        trafficShaping?: boolean;
        bandwidthAllocation?: {
            voice?: number; // % para tráfico de voz
            video?: number; // % para tráfico de video
            data?: number;  // % para tráfico de datos
            background?: number; // % para tráfico de fondo
        };
        congestionControl?: string;
    };

    // Información de redundancia
    @Column({ type: 'json', nullable: true, comment: 'Configuración de redundancia y failover' })
    public redundancyConfiguration: {
        redundancyLevel?: string; // N, N+1, N+2, 2N
        failoverTimeSeconds?: number;
        multipleProviders?: boolean;
        diversePaths?: boolean;
        automaticFailover?: boolean;
    };

    // Métricas y estadísticas
    @Column({ type: 'json', nullable: true, comment: 'Métricas históricas del plan' })
    public performanceMetrics: {
        averageUptimePercentage?: number;
        averageLatencyMs?: number;
        averagePacketLoss?: number;
        peakUsageMbps?: number;
        averageUsageMbps?: number;
        customerSatisfactionScore?: number;
    };

    // Información comercial
    @Column({ nullable: true, length: 100, comment: 'Categoría del plan (básico, profesional, empresarial)' })
    public category: string;

    @Column({ type: 'integer', nullable: true, comment: 'Orden de visualización' })
    public displayOrder: number;

    @Column({ default: false, comment: 'Si es el plan más popular' })
    public isFeatured: boolean;

    @Column({ default: false, comment: 'Si es recomendado para nuevos clientes' })
    public isRecommended: boolean;

    // Información de soporte
    @Column({ nullable: true, length: 100, comment: 'Nivel de soporte incluido' })
    public supportLevel: string; // basic, standard, premium, enterprise

    @Column({ type: 'json', nullable: true, comment: 'Canales de soporte disponibles' })
    public supportChannels: string[]; // email, phone, chat, ticket

    @Column({ type: 'integer', nullable: true, comment: 'Tiempo de respuesta de soporte en horas' })
    public supportResponseTimeHours: number;

    // Metadatos adicionales
    @Column({ type: 'json', nullable: true, comment: 'Metadatos adicionales del plan' })
    public metadata: {
        tags?: string[];
        targetAudience?: string;
        useCases?: string[];
        competitorComparison?: any;
        marketingNotes?: string;
    };

    // Getters y Setters
    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getProviderId(): User {
        return this.providerId;
    }

    public setProviderId(providerId: User): void {
        this.providerId = providerId;
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

    public getBandwidthMbps(): number {
        return this.bandwidthMbps;
    }

    public setBandwidthMbps(bandwidthMbps: number): void {
        this.bandwidthMbps = bandwidthMbps;
    }

    public getGuaranteedBandwidthMbps(): number {
        return this.guaranteedBandwidthMbps;
    }

    public setGuaranteedBandwidthMbps(guaranteedBandwidthMbps: number): void {
        this.guaranteedBandwidthMbps = guaranteedBandwidthMbps;
    }

    public getBurstBandwidthMbps(): number {
        return this.burstBandwidthMbps;
    }

    public setBurstBandwidthMbps(burstBandwidthMbps: number): void {
        this.burstBandwidthMbps = burstBandwidthMbps;
    }

    public getAverageLatencyMs(): number {
        return this.averageLatencyMs;
    }

    public setAverageLatencyMs(averageLatencyMs: number): void {
        this.averageLatencyMs = averageLatencyMs;
    }

    public getPacketLossPercentage(): number {
        return this.packetLossPercentage;
    }

    public setPacketLossPercentage(packetLossPercentage: number): void {
        this.packetLossPercentage = packetLossPercentage;
    }

    public getAverageJitterMs(): number {
        return this.averageJitterMs;
    }

    public setAverageJitterMs(averageJitterMs: number): void {
        this.averageJitterMs = averageJitterMs;
    }

    public getMonthlyPrice(): number {
        return this.monthlyPrice;
    }

    public setMonthlyPrice(monthlyPrice: number): void {
        this.monthlyPrice = monthlyPrice;
    }

    public getSetupCost(): number {
        return this.setupCost;
    }

    public setSetupCost(setupCost: number): void {
        this.setupCost = setupCost;
    }

    public getPricePerAdditionalMbps(): number {
        return this.pricePerAdditionalMbps;
    }

    public setPricePerAdditionalMbps(pricePerAdditionalMbps: number): void {
        this.pricePerAdditionalMbps = pricePerAdditionalMbps;
    }

    public getPricePerGbTransfer(): number {
        return this.pricePerGbTransfer;
    }

    public setPricePerGbTransfer(pricePerGbTransfer: number): void {
        this.pricePerGbTransfer = pricePerGbTransfer;
    }

    public getMonthlyTransferLimitGb(): number {
        return this.monthlyTransferLimitGb;
    }

    public setMonthlyTransferLimitGb(monthlyTransferLimitGb: number): void {
        this.monthlyTransferLimitGb = monthlyTransferLimitGb;
    }

    public getMaxConcurrentConnections(): number {
        return this.maxConcurrentConnections;
    }

    public setMaxConcurrentConnections(maxConcurrentConnections: number): void {
        this.maxConcurrentConnections = maxConcurrentConnections;
    }

    public getUploadSpeedLimitMbps(): number {
        return this.uploadSpeedLimitMbps;
    }

    public setUploadSpeedLimitMbps(uploadSpeedLimitMbps: number): void {
        this.uploadSpeedLimitMbps = uploadSpeedLimitMbps;
    }

    public getDownloadSpeedLimitMbps(): number {
        return this.downloadSpeedLimitMbps;
    }

    public setDownloadSpeedLimitMbps(downloadSpeedLimitMbps: number): void {
        this.downloadSpeedLimitMbps = downloadSpeedLimitMbps;
    }

    public getIncludesDdosProtection(): boolean {
        return this.includesDdosProtection;
    }

    public setIncludesDdosProtection(includesDdosProtection: boolean): void {
        this.includesDdosProtection = includesDdosProtection;
    }

    public getIncludesLoadBalancer(): boolean {
        return this.includesLoadBalancer;
    }

    public setIncludesLoadBalancer(includesLoadBalancer: boolean): void {
        this.includesLoadBalancer = includesLoadBalancer;
    }

    public getIncludesCdn(): boolean {
        return this.includesCdn;
    }

    public setIncludesCdn(includesCdn: boolean): void {
        this.includesCdn = includesCdn;
    }

    public getIncludes24x7Monitoring(): boolean {
        return this.includes24x7Monitoring;
    }

    public setIncludes24x7Monitoring(includes24x7Monitoring: boolean): void {
        this.includes24x7Monitoring = includes24x7Monitoring;
    }

    public getUnlimitedTraffic(): boolean {
        return this.unlimitedTraffic;
    }

    public setUnlimitedTraffic(unlimitedTraffic: boolean): void {
        this.unlimitedTraffic = unlimitedTraffic;
    }

    public getIsDedicated(): boolean {
        return this.isDedicated;
    }

    public setIsDedicated(isDedicated: boolean): void {
        this.isDedicated = isDedicated;
    }

    public getUptimeSla(): number {
        return this.uptimeSla;
    }

    public setUptimeSla(uptimeSla: number): void {
        this.uptimeSla = uptimeSla;
    }

    public getMaxLatencySla(): number {
        return this.maxLatencySla;
    }

    public setMaxLatencySla(maxLatencySla: number): void {
        this.maxLatencySla = maxLatencySla;
    }

    public getMaxPacketLossSla(): number {
        return this.maxPacketLossSla;
    }

    public setMaxPacketLossSla(maxPacketLossSla: number): void {
        this.maxPacketLossSla = maxPacketLossSla;
    }

    public getIncidentResolutionTimeMinutes(): number {
        return this.incidentResolutionTimeMinutes;
    }

    public setIncidentResolutionTimeMinutes(incidentResolutionTimeMinutes: number): void {
        this.incidentResolutionTimeMinutes = incidentResolutionTimeMinutes;
    }

    public getIsActive(): boolean {
        return this.isActive;
    }

    public setIsActive(isActive: boolean): void {
        this.isActive = isActive;
    }

    public getIsPromotional(): boolean {
        return this.isPromotional;
    }

    public setIsPromotional(isPromotional: boolean): void {
        this.isPromotional = isPromotional;
    }

    public getAvailableFrom(): Date {
        return this.availableFrom;
    }

    public setAvailableFrom(availableFrom: Date): void {
        this.availableFrom = availableFrom;
    }

    public getAvailableUntil(): Date {
        return this.availableUntil;
    }

    public setAvailableUntil(availableUntil: Date): void {
        this.availableUntil = availableUntil;
    }

    public getMinimumContractMonths(): number {
        return this.minimumContractMonths;
    }

    public setMinimumContractMonths(minimumContractMonths: number): void {
        this.minimumContractMonths = minimumContractMonths;
    }

    public getAvailableRegions(): string[] {
        return this.availableRegions;
    }

    public setAvailableRegions(availableRegions: string[]): void {
        this.availableRegions = availableRegions;
    }

    public getAvailableDatacenters(): number[] {
        return this.availableDatacenters;
    }

    public setAvailableDatacenters(availableDatacenters: number[]): void {
        this.availableDatacenters = availableDatacenters;
    }

    public getQosConfiguration(): any {
        return this.qosConfiguration;
    }

    public setQosConfiguration(qosConfiguration: any): void {
        this.qosConfiguration = qosConfiguration;
    }

    public getRedundancyConfiguration(): any {
        return this.redundancyConfiguration;
    }

    public setRedundancyConfiguration(redundancyConfiguration: any): void {
        this.redundancyConfiguration = redundancyConfiguration;
    }

    public getPerformanceMetrics(): any {
        return this.performanceMetrics;
    }

    public setPerformanceMetrics(performanceMetrics: any): void {
        this.performanceMetrics = performanceMetrics;
    }

    public getCategory(): string {
        return this.category;
    }

    public setCategory(category: string): void {
        this.category = category;
    }

    public getDisplayOrder(): number {
        return this.displayOrder;
    }

    public setDisplayOrder(displayOrder: number): void {
        this.displayOrder = displayOrder;
    }

    public getIsFeatured(): boolean {
        return this.isFeatured;
    }

    public setIsFeatured(isFeatured: boolean): void {
        this.isFeatured = isFeatured;
    }

    public getIsRecommended(): boolean {
        return this.isRecommended;
    }

    public setIsRecommended(isRecommended: boolean): void {
        this.isRecommended = isRecommended;
    }

    public getSupportLevel(): string {
        return this.supportLevel;
    }

    public setSupportLevel(supportLevel: string): void {
        this.supportLevel = supportLevel;
    }

    public getSupportChannels(): string[] {
        return this.supportChannels;
    }

    public setSupportChannels(supportChannels: string[]): void {
        this.supportChannels = supportChannels;
    }

    public getSupportResponseTimeHours(): number {
        return this.supportResponseTimeHours;
    }

    public setSupportResponseTimeHours(supportResponseTimeHours: number): void {
        this.supportResponseTimeHours = supportResponseTimeHours;
    }

    public getMetadata(): any {
        return this.metadata;
    }

    public setMetadata(metadata: any): void {
        this.metadata = metadata;
    }
}
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { DatacenterTypes } from "./DatacenterTypesEntity";
import { GenericEntity } from "./GenericTable";
import { User } from "./UserEntity";
import { DatacenterStatus, DatacenterTier, CoolingType, PowerRedundancy } from "../../Enums/DatacenterEnum";

@Entity()
export class Datacenter extends GenericEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @OneToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
    public userId: User;

    @ManyToOne(() => DatacenterTypes, (datacenterType) => datacenterType.id)
    @JoinColumn({ name: 'datacenter_type_id' })
    public datacenterType: DatacenterTypes;

    @Column({ nullable: false, length: 255 })
    public name: string;

    @Column({ nullable: false, length: 255 })
    public description: string;

    @Column({ nullable: false })
    public uuid: string;

    @Column({ type: 'enum', enum: DatacenterStatus, default: DatacenterStatus.ACTIVE, comment: 'Estado del datacenter' })
    public status: DatacenterStatus;

    @Column({ type: 'enum', enum: DatacenterTier, nullable: false, comment: 'Tier del datacenter (I, II, III, IV)' })
    public tier: DatacenterTier;

    // Información de ubicación
    @Column({ nullable: false, length: 100, comment: 'País donde se ubica el datacenter' })
    public country: string;

    @Column({ nullable: false, length: 100, comment: 'Ciudad donde se ubica el datacenter' })
    public city: string;

    @Column({ nullable: true, length: 200, comment: 'Dirección física del datacenter' })
    public address: string;

    @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true, comment: 'Latitud geográfica' })
    public latitude: number;

    @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true, comment: 'Longitud geográfica' })
    public longitude: number;

    @Column({ nullable: true, length: 50, comment: 'Zona horaria' })
    public timezone: string;

    // Capacidades y especificaciones
    @Column({ nullable: false, comment: 'Área total en metros cuadrados' })
    public totalAreaSqm: number;

    @Column({ nullable: false, comment: 'Área utilizable en metros cuadrados' })
    public usableAreaSqm: number;

    @Column({ nullable: false, comment: 'Altura del techo en metros' })
    public ceilingHeightM: number;

    @Column({ nullable: false, comment: 'Número máximo de racks' })
    public maxRacks: number;

    @Column({ nullable: false, default: 0, comment: 'Número de racks actualmente instalados' })
    public installedRacks: number;

    // Capacidad eléctrica
    @Column({ nullable: false, comment: 'Capacidad eléctrica total en kW' })
    public totalPowerCapacityKw: number;

    @Column({ nullable: false, default: 0, comment: 'Consumo eléctrico actual en kW' })
    public currentPowerUsageKw: number;

    @Column({ type: 'enum', enum: PowerRedundancy, nullable: false, comment: 'Nivel de redundancia eléctrica' })
    public powerRedundancy: PowerRedundancy;

    @Column({ nullable: false, comment: 'Número de UPS instaladas' })
    public upsCount: number;

    @Column({ nullable: false, comment: 'Capacidad total de UPS en kVA' })
    public upsTotalCapacityKva: number;

    @Column({ nullable: false, comment: 'Tiempo de autonomía de UPS en minutos' })
    public upsBackupTimeMinutes: number;

    @Column({ nullable: false, default: false, comment: 'Si tiene generador de emergencia' })
    public hasBackupGenerator: boolean;

    @Column({ nullable: true, comment: 'Capacidad del generador en kW' })
    public generatorCapacityKw: number;

    // Sistema de refrigeración
    @Column({ type: 'enum', enum: CoolingType, nullable: false, comment: 'Tipo de sistema de refrigeración' })
    public coolingType: CoolingType;

    @Column({ nullable: false, comment: 'Capacidad de refrigeración en toneladas' })
    public coolingCapacityTons: number;

    @Column({ nullable: false, comment: 'Temperatura objetivo en grados Celsius' })
    public targetTemperatureC: number;

    @Column({ nullable: false, comment: 'Humedad relativa objetivo en porcentaje' })
    public targetHumidityPercent: number;

    @Column({ nullable: false, default: 0, comment: 'Temperatura actual promedio en grados Celsius' })
    public currentTemperatureC: number;

    @Column({ nullable: false, default: 0, comment: 'Humedad relativa actual en porcentaje' })
    public currentHumidityPercent: number;

    // Conectividad y red
    @Column({ nullable: false, comment: 'Ancho de banda total disponible en Gbps' })
    public totalBandwidthGbps: number;

    @Column({ nullable: false, default: 0, comment: 'Ancho de banda utilizado en Gbps' })
    public usedBandwidthGbps: number;

    @Column({ nullable: false, comment: 'Número de proveedores de internet' })
    public ispCount: number;

    @Column({ type: 'json', nullable: true, comment: 'Lista de proveedores de internet' })
    public ispProviders: {
        name: string;
        bandwidthGbps: number;
        latencyMs: number;
        uptimePercent: number;
        monthlyCost: number;
    }[];

    // Seguridad física
    @Column({ nullable: false, default: false, comment: 'Si tiene control de acceso biométrico' })
    public hasBiometricAccess: boolean;

    @Column({ nullable: false, default: false, comment: 'Si tiene sistema de videovigilancia' })
    public hasCctv: boolean;

    @Column({ nullable: false, default: false, comment: 'Si tiene detección de intrusos' })
    public hasIntrusionDetection: boolean;

    @Column({ nullable: false, default: false, comment: 'Si tiene sistema contra incendios' })
    public hasFireSuppression: boolean;

    @Column({ nullable: false, default: 0, comment: 'Número de guardias de seguridad' })
    public securityGuardCount: number;

    // Certificaciones y cumplimiento
    @Column({ type: 'json', nullable: true, comment: 'Certificaciones del datacenter' })
    public certifications: {
        name: string; // ISO27001, SOC2, PCI-DSS, etc.
        issuer: string;
        issuedDate: Date;
        expirationDate: Date;
        isActive: boolean;
    }[];

    @Column({ nullable: false, default: false, comment: 'Si cumple con GDPR' })
    public gdprCompliant: boolean;

    @Column({ nullable: false, default: false, comment: 'Si cumple con HIPAA' })
    public hipaaCompliant: boolean;

    // Métricas de rendimiento
    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false, default: 99.9, comment: 'Uptime histórico en porcentaje' })
    public uptimePercent: number;

    @Column({ nullable: false, default: 0, comment: 'Tiempo total de downtime en minutos (último mes)' })
    public downtimeMinutesLastMonth: number;

    @Column({ nullable: false, default: 0, comment: 'Número de incidentes (último mes)' })
    public incidentsLastMonth: number;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: false, default: 1.4, comment: 'PUE (Power Usage Effectiveness)' })
    public pue: number;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: false, default: 0.0, comment: 'WUE (Water Usage Effectiveness)' })
    public wue: number;

    // Información financiera
    @Column({ type: 'decimal', precision: 12, scale: 2, nullable: false, comment: 'Costo de construcción inicial' })
    public constructionCost: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false, comment: 'Costos operativos mensuales' })
    public monthlyOperatingCost: number;

    @Column({ type: 'decimal', precision: 8, scale: 4, nullable: false, comment: 'Costo por kWh de electricidad' })
    public electricityCostPerKwh: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, comment: 'Ingresos mensuales generados' })
    public monthlyRevenue: number;

    // Información temporal
    @Column({ type: 'timestamp', nullable: false, comment: 'Fecha de construcción' })
    public constructionDate: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de inicio de operaciones' })
    public operationalDate: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de último mantenimiento' })
    public lastMaintenanceDate: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha del próximo mantenimiento programado' })
    public nextMaintenanceDate: Date;

    // Sostenibilidad y medio ambiente
    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false, default: 0, comment: 'Porcentaje de energía renovable utilizada' })
    public renewableEnergyPercent: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false, default: 0, comment: 'Emisiones de CO2 en toneladas por año' })
    public carbonEmissionsTonsPerYear: number;

    @Column({ nullable: false, default: false, comment: 'Si participa en programas de sostenibilidad' })
    public sustainabilityPrograms: boolean;

    // Metadatos adicionales
    @Column({ type: 'json', nullable: true, comment: 'Configuración de alertas y notificaciones' })
    public alertConfig: {
        temperatureThreshold: number;
        humidityThreshold: number;
        powerUsageThreshold: number;
        uptimeThreshold: number;
        emailNotifications: boolean;
        smsNotifications: boolean;
        webhookUrl?: string;
    };

    @Column({ type: 'json', nullable: true, comment: 'Metadatos adicionales' })
    public metadata: {
        tags?: string[];
        customFields?: { [key: string]: any };
        notes?: string;
        managementCompany?: string;
        emergencyContacts?: {
            name: string;
            role: string;
            phone: string;
            email: string;
        }[];
    };

    // Getters y Setters básicos
    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
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

    public getUuid(): string {
        return this.uuid;
    }

    public setUuid(uuid: string): void {
        this.uuid = uuid;
    }

    public getStatus(): DatacenterStatus {
        return this.status;
    }

    public setStatus(status: DatacenterStatus): void {
        this.status = status;
    }

    public getTier(): DatacenterTier {
        return this.tier;
    }

    public setTier(tier: DatacenterTier): void {
        this.tier = tier;
    }

    public getUserId(): User {
        return this.userId;
    }

    public setUserId(userId: User): void {
        this.userId = userId;
    }

    public getDatacenterType(): DatacenterTypes {
        return this.datacenterType;
    }

    public setDatacenterType(datacenterType: DatacenterTypes): void {
        this.datacenterType = datacenterType;
    }

    // Getters y Setters para ubicación
    public getCountry(): string {
        return this.country;
    }

    public setCountry(country: string): void {
        this.country = country;
    }

    public getCity(): string {
        return this.city;
    }

    public setCity(city: string): void {
        this.city = city;
    }

    public getAddress(): string {
        return this.address;
    }

    public setAddress(address: string): void {
        this.address = address;
    }

    public getCoordinates(): { latitude: number; longitude: number } {
        return {
            latitude: this.latitude,
            longitude: this.longitude
        };
    }

    public setCoordinates(latitude: number, longitude: number): void {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    // Métodos de cálculo y utilidad
    /**
     * Calcula el porcentaje de utilización de racks
     */
    public getRackUtilizationPercent(): number {
        if (this.maxRacks === 0) return 0;
        return (this.installedRacks / this.maxRacks) * 100;
    }

    /**
     * Calcula el porcentaje de utilización de energía
     */
    public getPowerUtilizationPercent(): number {
        if (this.totalPowerCapacityKw === 0) return 0;
        return (this.currentPowerUsageKw / this.totalPowerCapacityKw) * 100;
    }

    /**
     * Calcula el porcentaje de utilización de ancho de banda
     */
    public getBandwidthUtilizationPercent(): number {
        if (this.totalBandwidthGbps === 0) return 0;
        return (this.usedBandwidthGbps / this.totalBandwidthGbps) * 100;
    }

    /**
     * Calcula la eficiencia energética (PUE)
     */
    public getPowerEfficiency(): string {
        if (this.pue <= 1.2) return 'Excelente';
        if (this.pue <= 1.5) return 'Buena';
        if (this.pue <= 2.0) return 'Regular';
        return 'Deficiente';
    }

    /**
     * Calcula la puntuación de salud del datacenter (0-100)
     */
    public getHealthScore(): number {
        let score = 0;
        let factors = 0;

        // Factor de uptime (30%)
        score += this.uptimePercent * 0.3;
        factors += 30;

        // Factor de utilización de energía (20%)
        const powerUtil = this.getPowerUtilizationPercent();
        if (powerUtil < 80) {
            score += (100 - powerUtil) * 0.2;
        } else {
            score += (100 - powerUtil) * 0.1; // Penalización por sobreutilización
        }
        factors += 20;

        // Factor de temperatura (15%)
        const tempDiff = Math.abs(this.currentTemperatureC - this.targetTemperatureC);
        const tempScore = Math.max(0, 100 - (tempDiff * 10));
        score += tempScore * 0.15;
        factors += 15;

        // Factor de humedad (10%)
        const humidityDiff = Math.abs(this.currentHumidityPercent - this.targetHumidityPercent);
        const humidityScore = Math.max(0, 100 - (humidityDiff * 2));
        score += humidityScore * 0.1;
        factors += 10;

        // Factor de incidentes (15%)
        const incidentScore = Math.max(0, 100 - (this.incidentsLastMonth * 10));
        score += incidentScore * 0.15;
        factors += 15;

        // Factor de PUE (10%)
        const pueScore = Math.max(0, 100 - ((this.pue - 1) * 50));
        score += pueScore * 0.1;
        factors += 10;

        return Math.min(100, Math.max(0, score));
    }

    /**
     * Verifica si el datacenter necesita mantenimiento
     */
    public needsMaintenance(): boolean {
        if (!this.nextMaintenanceDate) return true;
        return new Date() >= this.nextMaintenanceDate;
    }

    /**
     * Verifica si el datacenter está operativo
     */
    public isOperational(): boolean {
        return this.status === DatacenterStatus.ACTIVE &&
            this.operationalDate !== null &&
            new Date() >= this.operationalDate;
    }

    /**
     * Calcula la capacidad disponible de racks
     */
    public getAvailableRacks(): number {
        return Math.max(0, this.maxRacks - this.installedRacks);
    }

    /**
     * Calcula la capacidad disponible de energía en kW
     */
    public getAvailablePowerKw(): number {
        return Math.max(0, this.totalPowerCapacityKw - this.currentPowerUsageKw);
    }

    /**
     * Calcula el ancho de banda disponible en Gbps
     */
    public getAvailableBandwidthGbps(): number {
        return Math.max(0, this.totalBandwidthGbps - this.usedBandwidthGbps);
    }

    /**
     * Calcula el ROI mensual (Return on Investment)
     */
    public getMonthlyROI(): number {
        if (!this.monthlyRevenue || this.monthlyOperatingCost === 0) return 0;
        return ((this.monthlyRevenue - this.monthlyOperatingCost) / this.monthlyOperatingCost) * 100;
    }

    /**
     * Calcula el margen de beneficio mensual
     */
    public getMonthlyProfitMargin(): number {
        if (!this.monthlyRevenue || this.monthlyRevenue === 0) return 0;
        return ((this.monthlyRevenue - this.monthlyOperatingCost) / this.monthlyRevenue) * 100;
    }

    /**
     * Verifica si el datacenter está cerca de su capacidad máxima
     */
    public isNearCapacity(threshold: number = 80): boolean {
        const rackUtil = this.getRackUtilizationPercent();
        const powerUtil = this.getPowerUtilizationPercent();
        const bandwidthUtil = this.getBandwidthUtilizationPercent();

        return rackUtil >= threshold || powerUtil >= threshold || bandwidthUtil >= threshold;
    }

    /**
     * Obtiene el nivel de criticidad basado en métricas
     */
    public getCriticalityLevel(): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
        const healthScore = this.getHealthScore();
        const isNearCap = this.isNearCapacity(85);
        const needsMaint = this.needsMaintenance();

        if (healthScore < 50 || this.incidentsLastMonth > 5) return 'CRITICAL';
        if (healthScore < 70 || isNearCap || needsMaint) return 'HIGH';
        if (healthScore < 85 || this.isNearCapacity(70)) return 'MEDIUM';
        return 'LOW';
    }

    /**
     * Calcula el costo total de propiedad mensual
     */
    public getTotalCostOfOwnership(): number {
        const electricityCost = this.currentPowerUsageKw * 24 * 30 * this.electricityCostPerKwh;
        return this.monthlyOperatingCost + electricityCost;
    }

    /**
     * Obtiene las certificaciones activas
     */
    public getActiveCertifications(): any[] {
        if (!this.certifications) return [];
        return this.certifications.filter(cert =>
            cert.isActive && new Date() < new Date(cert.expirationDate)
        );
    }

    /**
     * Verifica si el datacenter cumple con estándares de sostenibilidad
     */
    public isSustainable(): boolean {
        return this.renewableEnergyPercent >= 50 &&
            this.pue <= 1.5 &&
            this.sustainabilityPrograms;
    }

    /**
     * Clona la configuración del datacenter
     */
    public clone(): Partial<Datacenter> {
        return {
            name: `${this.name} - Copia`,
            description: this.description,
            tier: this.tier,
            country: this.country,
            city: this.city,
            totalAreaSqm: this.totalAreaSqm,
            usableAreaSqm: this.usableAreaSqm,
            ceilingHeightM: this.ceilingHeightM,
            maxRacks: this.maxRacks,
            totalPowerCapacityKw: this.totalPowerCapacityKw,
            powerRedundancy: this.powerRedundancy,
            coolingType: this.coolingType,
            coolingCapacityTons: this.coolingCapacityTons,
            targetTemperatureC: this.targetTemperatureC,
            targetHumidityPercent: this.targetHumidityPercent,
            totalBandwidthGbps: this.totalBandwidthGbps,
            electricityCostPerKwh: this.electricityCostPerKwh
        };
    }

}
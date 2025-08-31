import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Datacenter } from "./DatacenterEntity";
import { GenericEntity } from "./GenericTable";
import { User } from "./UserEntity";
import { RackStatus, RackType, CoolingType, PowerPhase } from "../../Enums/RackEnum";

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

    @Column({ nullable: false, length: 100, comment: 'Nombre del rack' })
    public name: string;

    @Column({ nullable: true, length: 255, comment: 'Descripción del rack' })
    public description: string;

    @Column({ type: 'enum', enum: RackStatus, default: RackStatus.ACTIVE, comment: 'Estado del rack' })
    public status: RackStatus;

    @Column({ type: 'enum', enum: RackType, nullable: false, comment: 'Tipo de rack' })
    public rackType: RackType;

    // Ubicación física
    @Column({ nullable: true, length: 50, comment: 'Fila donde se encuentra el rack' })
    public row: string;

    @Column({ nullable: true, length: 50, comment: 'Posición en la fila' })
    public position: string;

    @Column({ nullable: true, length: 50, comment: 'Zona del datacenter' })
    public zone: string;

    @Column({ nullable: true, comment: 'Coordenada X en el plano del datacenter' })
    public coordinateX: number;

    @Column({ nullable: true, comment: 'Coordenada Y en el plano del datacenter' })
    public coordinateY: number;

    // Especificaciones físicas
    @Column({ nullable: false, default: 42, comment: 'Altura del rack en unidades (U)' })
    public heightU: number;

    @Column({ nullable: false, default: 600, comment: 'Ancho del rack en mm' })
    public widthMm: number;

    @Column({ nullable: false, default: 1000, comment: 'Profundidad del rack en mm' })
    public depthMm: number;

    @Column({ nullable: false, default: 1000, comment: 'Peso máximo soportado en kg' })
    public maxWeightKg: number;

    @Column({ nullable: false, default: 0, comment: 'Peso actual en kg' })
    public currentWeightKg: number;

    // Capacidad de servidores
    @Column({ nullable: true, default: 15 })
    public maxServers: number;

    @Column({ nullable: true, default: 0 })
    public usedServers: number;

    @Column({ nullable: false, default: 0, comment: 'Unidades de rack utilizadas' })
    public usedUnitsU: number;

    @Column({ nullable: false, default: 0, comment: 'Unidades de rack disponibles' })
    public availableUnitsU: number;

    // Capacidad eléctrica
    @Column({ nullable: false, comment: 'Capacidad eléctrica máxima en kW' })
    public maxPowerKw: number;

    @Column({ nullable: false, default: 0, comment: 'Consumo eléctrico actual en kW' })
    public currentPowerKw: number;

    @Column({ nullable: false, default: 220, comment: 'Voltaje de entrada' })
    public inputVoltage: number;

    @Column({ type: 'enum', enum: PowerPhase, default: PowerPhase.SINGLE_PHASE, comment: 'Tipo de fase eléctrica' })
    public powerPhase: PowerPhase;

    @Column({ nullable: false, default: 0, comment: 'Número de PDUs instaladas' })
    public pduCount: number;

    @Column({ nullable: false, default: 0, comment: 'Número de outlets disponibles' })
    public availableOutlets: number;

    @Column({ nullable: false, default: 0, comment: 'Número de outlets utilizados' })
    public usedOutlets: number;

    // Sistema de refrigeración
    @Column({ type: 'enum', enum: CoolingType, nullable: false, comment: 'Tipo de refrigeración' })
    public coolingType: CoolingType;

    @Column({ nullable: false, default: 22, comment: 'Temperatura objetivo en grados Celsius' })
    public targetTemperatureC: number;

    @Column({ nullable: false, default: 0, comment: 'Temperatura actual en la entrada' })
    public currentTempInletC: number;

    @Column({ nullable: false, default: 0, comment: 'Temperatura actual en la salida' })
    public currentTempOutletC: number;

    @Column({ nullable: false, default: 50, comment: 'Humedad relativa objetivo en porcentaje' })
    public targetHumidityPercent: number;

    @Column({ nullable: false, default: 0, comment: 'Humedad relativa actual en porcentaje' })
    public currentHumidityPercent: number;

    @Column({ nullable: false, default: 0, comment: 'Flujo de aire en CFM' })
    public airflowCfm: number;

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

    // Conectividad de red adicional
    @Column({ nullable: false, default: 0, comment: 'Número de switches instalados' })
    public switchCount: number;

    @Column({ nullable: false, default: 0, comment: 'Puertos de red disponibles' })
    public availableNetworkPorts: number;

    @Column({ nullable: false, default: 0, comment: 'Puertos de red utilizados' })
    public usedNetworkPorts: number;

    @Column({ nullable: false, default: false, comment: 'Si tiene conectividad de fibra óptica' })
    public hasFiberConnectivity: boolean;

    // Seguridad y acceso
    @Column({ nullable: false, default: false, comment: 'Si tiene cerradura inteligente' })
    public hasSmartLock: boolean;

    @Column({ nullable: false, default: false, comment: 'Si tiene sensor de apertura de puerta' })
    public hasDoorSensor: boolean;

    @Column({ nullable: false, default: false, comment: 'Si tiene cámara de seguridad' })
    public hasSecurityCamera: boolean;

    @Column({ type: 'json', nullable: true, comment: 'Lista de usuarios con acceso' })
    public authorizedUsers: {
        userId: number;
        userName: string;
        accessLevel: 'READ' | 'WRITE' | 'ADMIN';
        lastAccess?: Date;
    }[];

    // Monitoreo y sensores
    @Column({ nullable: false, default: false, comment: 'Si tiene sensores de vibración' })
    public hasVibrationSensors: boolean;

    @Column({ nullable: false, default: false, comment: 'Si tiene sensores de humo' })
    public hasSmokeSensors: boolean;

    @Column({ nullable: false, default: false, comment: 'Si tiene sensores de agua' })
    public hasWaterSensors: boolean;

    @Column({ nullable: false, default: false, comment: 'Si tiene monitoreo de corriente' })
    public hasCurrentMonitoring: boolean;

    // Métricas de rendimiento
    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false, default: 99.9, comment: 'Uptime en porcentaje' })
    public uptimePercent: number;

    @Column({ nullable: false, default: 0, comment: 'Tiempo de downtime en minutos (último mes)' })
    public downtimeMinutesLastMonth: number;

    @Column({ nullable: false, default: 0, comment: 'Número de alertas generadas (último mes)' })
    public alertsLastMonth: number;

    @Column({ nullable: false, default: 0, comment: 'Número de incidentes (último mes)' })
    public incidentsLastMonth: number;

    // Información financiera
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false, comment: 'Costo de adquisición del rack' })
    public acquisitionCost: number;

    @Column({ type: 'decimal', precision: 8, scale: 2, nullable: false, comment: 'Costo de mantenimiento mensual' })
    public monthlyMaintenanceCost: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, comment: 'Ingresos mensuales generados' })
    public monthlyRevenue: number;

    // Información temporal
    @Column({ type: 'timestamp', nullable: false, comment: 'Fecha de instalación' })
    public installationDate: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de último mantenimiento' })
    public lastMaintenanceDate: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha del próximo mantenimiento' })
    public nextMaintenanceDate: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de última actualización de firmware' })
    public lastFirmwareUpdate: Date;

    // Configuración de alertas
    @Column({ type: 'json', nullable: true, comment: 'Configuración de alertas' })
    public alertConfig: {
        temperatureThreshold: number;
        humidityThreshold: number;
        powerThreshold: number;
        enableEmailAlerts: boolean;
        enableSmsAlerts: boolean;
        alertRecipients: string[];
    };

    // Metadatos adicionales
    @Column({ type: 'json', nullable: true, comment: 'Metadatos adicionales' })
    public metadata: {
        tags?: string[];
        customFields?: { [key: string]: any };
        notes?: string;
        vendor?: string;
        model?: string;
        serialNumber?: string;
        warrantyExpiration?: Date;
        supportContract?: {
            provider: string;
            contractNumber: string;
            expirationDate: Date;
            supportLevel: string;
        };
    };

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

    // Getters y Setters adicionales
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

    public getStatus(): RackStatus {
        return this.status;
    }

    public setStatus(status: RackStatus): void {
        this.status = status;
    }

    public getRackType(): RackType {
        return this.rackType;
    }

    public setRackType(rackType: RackType): void {
        this.rackType = rackType;
    }

    public getLocation(): { row: string; position: string; zone: string } {
        return {
            row: this.row,
            position: this.position,
            zone: this.zone
        };
    }

    public setLocation(row: string, position: string, zone: string): void {
        this.row = row;
        this.position = position;
        this.zone = zone;
    }

    public getCoordinates(): { x: number; y: number } {
        return {
            x: this.coordinateX,
            y: this.coordinateY
        };
    }

    public setCoordinates(x: number, y: number): void {
        this.coordinateX = x;
        this.coordinateY = y;
    }

    // Métodos de cálculo y utilidad
    /**
     * Calcula el porcentaje de utilización de servidores
     */
    public getServerUtilizationPercent(): number {
        if (this.maxServers === 0) return 0;
        return (this.usedServers / this.maxServers) * 100;
    }

    /**
     * Calcula el porcentaje de utilización de unidades de rack
     */
    public getUnitUtilizationPercent(): number {
        if (this.heightU === 0) return 0;
        return (this.usedUnitsU / this.heightU) * 100;
    }

    /**
     * Calcula el porcentaje de utilización de energía
     */
    public getPowerUtilizationPercent(): number {
        if (this.maxPowerKw === 0) return 0;
        return (this.currentPowerKw / this.maxPowerKw) * 100;
    }

    /**
     * Calcula el porcentaje de utilización de peso
     */
    public getWeightUtilizationPercent(): number {
        if (this.maxWeightKg === 0) return 0;
        return (this.currentWeightKg / this.maxWeightKg) * 100;
    }

    /**
     * Calcula el porcentaje de utilización de outlets eléctricos
     */
    public getOutletUtilizationPercent(): number {
        if (this.availableOutlets === 0) return 0;
        return (this.usedOutlets / this.availableOutlets) * 100;
    }

    /**
     * Calcula el porcentaje de utilización de puertos de red
     */
    public getNetworkPortUtilizationPercent(): number {
        if (this.availableNetworkPorts === 0) return 0;
        return (this.usedNetworkPorts / this.availableNetworkPorts) * 100;
    }

    /**
     * Calcula la diferencia de temperatura entre entrada y salida
     */
    public getTemperatureDelta(): number {
        return this.currentTempOutletC - this.currentTempInletC;
    }

    /**
     * Verifica si la temperatura está dentro del rango objetivo
     */
    public isTemperatureInRange(tolerance: number = 2): boolean {
        const avgTemp = (this.currentTempInletC + this.currentTempOutletC) / 2;
        return Math.abs(avgTemp - this.targetTemperatureC) <= tolerance;
    }

    /**
     * Verifica si la humedad está dentro del rango objetivo
     */
    public isHumidityInRange(tolerance: number = 5): boolean {
        return Math.abs(this.currentHumidityPercent - this.targetHumidityPercent) <= tolerance;
    }

    /**
     * Calcula la puntuación de salud del rack (0-100)
     */
    public getHealthScore(): number {
        let score = 0;
        let factors = 0;

        // Factor de uptime (25%)
        score += this.uptimePercent * 0.25;
        factors += 25;

        // Factor de temperatura (20%)
        const tempScore = this.isTemperatureInRange() ? 100 : Math.max(0, 100 - Math.abs((this.currentTempInletC + this.currentTempOutletC) / 2 - this.targetTemperatureC) * 5);
        score += tempScore * 0.2;
        factors += 20;

        // Factor de utilización de energía (15%)
        const powerUtil = this.getPowerUtilizationPercent();
        const powerScore = powerUtil < 80 ? 100 - powerUtil * 0.5 : 100 - powerUtil;
        score += powerScore * 0.15;
        factors += 15;

        // Factor de humedad (10%)
        const humidityScore = this.isHumidityInRange() ? 100 : Math.max(0, 100 - Math.abs(this.currentHumidityPercent - this.targetHumidityPercent) * 2);
        score += humidityScore * 0.1;
        factors += 10;

        // Factor de incidentes (15%)
        const incidentScore = Math.max(0, 100 - (this.incidentsLastMonth * 10));
        score += incidentScore * 0.15;
        factors += 15;

        // Factor de alertas (10%)
        const alertScore = Math.max(0, 100 - (this.alertsLastMonth * 5));
        score += alertScore * 0.1;
        factors += 10;

        // Factor de utilización general (5%)
        const avgUtilization = (this.getServerUtilizationPercent() + this.getUnitUtilizationPercent()) / 2;
        const utilizationScore = avgUtilization < 80 ? 100 - avgUtilization * 0.5 : 100 - avgUtilization;
        score += utilizationScore * 0.05;
        factors += 5;

        return Math.min(100, Math.max(0, score));
    }

    /**
     * Verifica si el rack necesita mantenimiento
     */
    public needsMaintenance(): boolean {
        if (!this.nextMaintenanceDate) return true;
        return new Date() >= this.nextMaintenanceDate;
    }

    /**
     * Verifica si el rack está operativo
     */
    public isOperational(): boolean {
        return this.status === RackStatus.ACTIVE;
    }

    /**
     * Calcula la capacidad disponible de servidores
     */
    public getAvailableServers(): number {
        return Math.max(0, this.maxServers - this.usedServers);
    }

    /**
     * Calcula las unidades de rack disponibles
     */
    public getAvailableUnits(): number {
        return Math.max(0, this.heightU - this.usedUnitsU);
    }

    /**
     * Calcula la capacidad eléctrica disponible en kW
     */
    public getAvailablePowerKw(): number {
        return Math.max(0, this.maxPowerKw - this.currentPowerKw);
    }

    /**
     * Calcula la capacidad de peso disponible en kg
     */
    public getAvailableWeightKg(): number {
        return Math.max(0, this.maxWeightKg - this.currentWeightKg);
    }

    /**
     * Calcula el ROI mensual del rack
     */
    public getMonthlyROI(): number {
        if (!this.monthlyRevenue || this.monthlyMaintenanceCost === 0) return 0;
        return ((this.monthlyRevenue - this.monthlyMaintenanceCost) / this.monthlyMaintenanceCost) * 100;
    }

    /**
     * Verifica si el rack está cerca de su capacidad máxima
     */
    public isNearCapacity(threshold: number = 80): boolean {
        const serverUtil = this.getServerUtilizationPercent();
        const powerUtil = this.getPowerUtilizationPercent();
        const unitUtil = this.getUnitUtilizationPercent();
        const weightUtil = this.getWeightUtilizationPercent();
        
        return serverUtil >= threshold || powerUtil >= threshold || 
               unitUtil >= threshold || weightUtil >= threshold;
    }

    /**
     * Obtiene el nivel de criticidad del rack
     */
    public getCriticalityLevel(): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
        const healthScore = this.getHealthScore();
        const isNearCap = this.isNearCapacity(85);
        const needsMaint = this.needsMaintenance();
        const tempOk = this.isTemperatureInRange();
        const humidityOk = this.isHumidityInRange();
        
        if (healthScore < 50 || this.incidentsLastMonth > 3 || !tempOk || !humidityOk) return 'CRITICAL';
        if (healthScore < 70 || isNearCap || needsMaint || this.alertsLastMonth > 10) return 'HIGH';
        if (healthScore < 85 || this.isNearCapacity(70) || this.alertsLastMonth > 5) return 'MEDIUM';
        return 'LOW';
    }

    /**
     * Verifica si el rack puede acomodar un servidor con especificaciones dadas
     */
    public canAccommodateServer(unitsRequired: number, powerRequired: number, weightKg: number): boolean {
        return this.getAvailableUnits() >= unitsRequired &&
               this.getAvailablePowerKw() >= powerRequired &&
               this.getAvailableWeightKg() >= weightKg &&
               this.getAvailableServers() > 0;
    }

    /**
     * Calcula la eficiencia energética del rack
     */
    public getPowerEfficiency(): number {
        if (this.currentPowerKw === 0) return 0;
        // Eficiencia basada en la utilización vs capacidad
        const utilization = this.getPowerUtilizationPercent();
        // Óptimo entre 60-80% de utilización
        if (utilization >= 60 && utilization <= 80) {
            return 100;
        } else if (utilization < 60) {
            return utilization / 60 * 100;
        } else {
            return Math.max(0, 100 - (utilization - 80) * 2);
        }
    }

    /**
     * Obtiene un resumen del estado del rack
     */
    public getStatusSummary(): {
        operational: boolean;
        healthScore: number;
        criticalityLevel: string;
        utilizationPercent: number;
        needsMaintenance: boolean;
        temperatureOk: boolean;
        humidityOk: boolean;
    } {
        return {
            operational: this.isOperational(),
            healthScore: this.getHealthScore(),
            criticalityLevel: this.getCriticalityLevel(),
            utilizationPercent: (this.getServerUtilizationPercent() + this.getPowerUtilizationPercent()) / 2,
            needsMaintenance: this.needsMaintenance(),
            temperatureOk: this.isTemperatureInRange(),
            humidityOk: this.isHumidityInRange()
        };
    }

    /**
     * Clona la configuración del rack
     */
    public clone(): Partial<Rack> {
        return {
            name: `${this.name} - Copia`,
            description: this.description,
            rackType: this.rackType,
            heightU: this.heightU,
            widthMm: this.widthMm,
            depthMm: this.depthMm,
            maxWeightKg: this.maxWeightKg,
            maxServers: this.maxServers,
            maxPowerKw: this.maxPowerKw,
            inputVoltage: this.inputVoltage,
            powerPhase: this.powerPhase,
            coolingType: this.coolingType,
            targetTemperatureC: this.targetTemperatureC,
            targetHumidityPercent: this.targetHumidityPercent
        };
    }

}
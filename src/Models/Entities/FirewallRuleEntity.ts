import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GenericEntity } from "./GenericTable";
import { User } from "./UserEntity";
import { Datacenter } from "./DatacenterEntity";
import { Device } from "./DeviceEntity";
import { FirewallAction, FirewallProtocol, FirewallDirection, FirewallRuleStatus } from "../../Enums/NetworkEnum";

/**
 * Entidad que representa una regla de firewall en el simulador
 * Incluye configuración de tráfico, políticas de seguridad y métricas
 */
@Entity()
export class FirewallRule extends GenericEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
    public userId: User;

    @ManyToOne(() => Datacenter, datacenter => datacenter.id, { nullable: true })
    @JoinColumn({ name: 'datacenter_id' })
    public datacenterId: Datacenter;

    @ManyToOne(() => Device, device => device.id, { nullable: true })
    @JoinColumn({ name: 'device_id' })
    public deviceId: Device;

    @Column({ nullable: false })
    public uuid: string;

    @Column({ nullable: false, length: 200, comment: 'Nombre de la regla' })
    public name: string;

    @Column({ nullable: true, type: 'text', comment: 'Descripción de la regla' })
    public description: string;

    @Column({ type: 'enum', enum: FirewallRuleStatus, nullable: false, default: FirewallRuleStatus.ACTIVE, comment: 'Estado de la regla' })
    public status: FirewallRuleStatus;

    // Configuración básica de la regla
    @Column({ type: 'integer', nullable: false, comment: 'Prioridad de la regla (menor número = mayor prioridad)' })
    public priority: number;

    @Column({ type: 'enum', enum: FirewallAction, nullable: false, comment: 'Acción a realizar' })
    public action: FirewallAction;

    @Column({ type: 'enum', enum: FirewallDirection, nullable: false, comment: 'Dirección del tráfico' })
    public direction: FirewallDirection;

    @Column({ type: 'enum', enum: FirewallProtocol, nullable: false, default: FirewallProtocol.ANY, comment: 'Protocolo de red' })
    public protocol: FirewallProtocol;

    @Column({ default: true, comment: 'Si la regla está habilitada' })
    public enabled: boolean;

    @Column({ default: false, comment: 'Si es una regla del sistema (no editable)' })
    public isSystemRule: boolean;

    // Configuración de origen
    @Column({ nullable: true, length: 100, comment: 'Dirección IP de origen' })
    public sourceIp: string;

    @Column({ nullable: true, length: 50, comment: 'Máscara de red de origen' })
    public sourceNetmask: string;

    @Column({ nullable: true, length: 100, comment: 'CIDR de origen' })
    public sourceCidr: string;

    @Column({ nullable: true, length: 20, comment: 'Puerto de origen (rango: 80-90 o puerto único: 80)' })
    public sourcePort: string;

    @Column({ type: 'json', nullable: true, comment: 'Lista de IPs de origen' })
    public sourceIpList: string[];

    @Column({ type: 'json', nullable: true, comment: 'Lista de puertos de origen' })
    public sourcePortList: string[];

    @Column({ nullable: true, length: 100, comment: 'Zona de origen' })
    public sourceZone: string;

    @Column({ nullable: true, length: 100, comment: 'Interfaz de origen' })
    public sourceInterface: string;

    @Column({ nullable: true, length: 100, comment: 'Grupo de origen' })
    public sourceGroup: string;

    // Configuración de destino
    @Column({ nullable: true, length: 100, comment: 'Dirección IP de destino' })
    public destinationIp: string;

    @Column({ nullable: true, length: 50, comment: 'Máscara de red de destino' })
    public destinationNetmask: string;

    @Column({ nullable: true, length: 100, comment: 'CIDR de destino' })
    public destinationCidr: string;

    @Column({ nullable: true, length: 20, comment: 'Puerto de destino (rango: 80-90 o puerto único: 80)' })
    public destinationPort: string;

    @Column({ type: 'json', nullable: true, comment: 'Lista de IPs de destino' })
    public destinationIpList: string[];

    @Column({ type: 'json', nullable: true, comment: 'Lista de puertos de destino' })
    public destinationPortList: string[];

    @Column({ nullable: true, length: 100, comment: 'Zona de destino' })
    public destinationZone: string;

    @Column({ nullable: true, length: 100, comment: 'Interfaz de destino' })
    public destinationInterface: string;

    @Column({ nullable: true, length: 100, comment: 'Grupo de destino' })
    public destinationGroup: string;

    // Configuración avanzada
    @Column({ type: 'json', nullable: true, comment: 'Configuración de NAT' })
    public natConfig: {
        enabled: boolean;
        type: string; // SNAT, DNAT, MASQUERADE
        translatedIp?: string;
        translatedPort?: string;
        poolStart?: string;
        poolEnd?: string;
    };

    @Column({ type: 'json', nullable: true, comment: 'Configuración de logging' })
    public loggingConfig: {
        enabled: boolean;
        level: string; // DEBUG, INFO, WARN, ERROR
        facility: string;
        prefix?: string;
        rateLimit?: number;
    };

    @Column({ type: 'json', nullable: true, comment: 'Configuración de rate limiting' })
    public rateLimitConfig: {
        enabled: boolean;
        packetsPerSecond?: number;
        bytesPerSecond?: number;
        burstSize?: number;
        windowSize?: number;
    };

    @Column({ type: 'json', nullable: true, comment: 'Configuración de tiempo' })
    public timeConfig: {
        enabled: boolean;
        startTime?: string; // HH:MM
        endTime?: string; // HH:MM
        daysOfWeek?: string[]; // ['monday', 'tuesday', ...]
        timezone?: string;
    };

    @Column({ type: 'json', nullable: true, comment: 'Configuración de geolocalización' })
    public geoConfig: {
        enabled: boolean;
        allowedCountries?: string[];
        blockedCountries?: string[];
        allowedRegions?: string[];
        blockedRegions?: string[];
    };

    // Configuración de inspección profunda de paquetes (DPI)
    @Column({ type: 'json', nullable: true, comment: 'Configuración de DPI' })
    public dpiConfig: {
        enabled: boolean;
        inspectPayload: boolean;
        maxPacketSize?: number;
        patterns?: {
            pattern: string;
            action: string; // ALLOW, BLOCK, LOG
            caseSensitive?: boolean;
        }[];
        applications?: string[]; // Lista de aplicaciones a inspeccionar
    };

    // Configuración de conexiones
    @Column({ type: 'json', nullable: true, comment: 'Configuración de estado de conexión' })
    public connectionConfig: {
        trackConnections: boolean;
        maxConnections?: number;
        connectionTimeout?: number;
        states?: string[]; // NEW, ESTABLISHED, RELATED, INVALID
    };

    // Métricas y estadísticas
    @Column({ type: 'bigint', nullable: true, default: 0, comment: 'Número de paquetes procesados' })
    public packetsProcessed: number;

    @Column({ type: 'bigint', nullable: true, default: 0, comment: 'Bytes procesados' })
    public bytesProcessed: number;

    @Column({ type: 'bigint', nullable: true, default: 0, comment: 'Número de conexiones permitidas' })
    public connectionsAllowed: number;

    @Column({ type: 'bigint', nullable: true, default: 0, comment: 'Número de conexiones bloqueadas' })
    public connectionsBlocked: number;

    @Column({ type: 'bigint', nullable: true, default: 0, comment: 'Número de veces que se activó la regla' })
    public hitCount: number;

    @Column({ type: 'timestamp', nullable: true, comment: 'Última vez que se activó la regla' })
    public lastHit: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de la primera activación' })
    public firstHit: Date;

    // Información de rendimiento
    @Column({ type: 'json', nullable: true, comment: 'Métricas de rendimiento' })
    public performanceMetrics: {
        averageProcessingTime?: number; // microsegundos
        maxProcessingTime?: number;
        minProcessingTime?: number;
        packetsPerSecond?: number;
        bytesPerSecond?: number;
        cpuUsage?: number; // porcentaje
        memoryUsage?: number; // bytes
    };

    // Configuración de alertas
    @Column({ type: 'json', nullable: true, comment: 'Configuración de alertas' })
    public alertConfig: {
        enabled: boolean;
        thresholds?: {
            packetsPerSecond?: number;
            bytesPerSecond?: number;
            connectionsPerSecond?: number;
            blockedAttemptsPerMinute?: number;
        };
        notifications?: {
            email?: boolean;
            sms?: boolean;
            webhook?: string;
        };
    };

    // Información temporal
    @Column({ type: 'timestamp', nullable: false, comment: 'Fecha de creación de la regla' })
    public createdAt: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de última modificación' })
    public lastModified: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de activación' })
    public activatedAt: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de desactivación' })
    public deactivatedAt: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de expiración' })
    public expiresAt: Date;

    // Información de auditoría
    @Column({ nullable: true, length: 100, comment: 'Usuario que creó la regla' })
    public createdBy: string;

    @Column({ nullable: true, length: 100, comment: 'Usuario que modificó la regla por última vez' })
    public lastModifiedBy: string;

    @Column({ nullable: true, type: 'text', comment: 'Razón del último cambio' })
    public changeReason: string;

    @Column({ type: 'json', nullable: true, comment: 'Historial de cambios' })
    public changeHistory: {
        timestamp: Date;
        user: string;
        action: string; // CREATED, MODIFIED, ENABLED, DISABLED, DELETED
        changes?: { [field: string]: { from: any; to: any } };
        reason?: string;
    }[];

    // Configuración de backup y restauración
    @Column({ type: 'json', nullable: true, comment: 'Configuración de backup' })
    public backupConfig: {
        autoBackup: boolean;
        backupFrequency?: string; // daily, weekly, monthly
        retentionDays?: number;
        backupLocation?: string;
    };

    // Metadatos adicionales
    @Column({ type: 'json', nullable: true, comment: 'Etiquetas de la regla' })
    public tags: string[];

    @Column({ nullable: true, length: 100, comment: 'Categoría de la regla' })
    public category: string;

    @Column({ nullable: true, length: 50, comment: 'Nivel de severidad' })
    public severity: string; // LOW, MEDIUM, HIGH, CRITICAL

    @Column({ type: 'json', nullable: true, comment: 'Metadatos adicionales' })
    public metadata: {
        vendor?: string;
        version?: string;
        ruleSet?: string;
        compliance?: string[]; // PCI-DSS, HIPAA, SOX, etc.
        references?: {
            cve?: string[];
            url?: string[];
            documentation?: string;
        };
        customFields?: { [key: string]: any };
    };

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

    public getDatacenterId(): Datacenter {
        return this.datacenterId;
    }

    public setDatacenterId(datacenterId: Datacenter): void {
        this.datacenterId = datacenterId;
    }

    public getDeviceId(): Device {
        return this.deviceId;
    }

    public setDeviceId(deviceId: Device): void {
        this.deviceId = deviceId;
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

    public getStatus(): FirewallRuleStatus {
        return this.status;
    }

    public setStatus(status: FirewallRuleStatus): void {
        this.status = status;
    }

    public getAction(): FirewallAction {
        return this.action;
    }

    public setAction(action: FirewallAction): void {
        this.action = action;
    }

    // Métodos adicionales para análisis y gestión
    public isActive(): boolean {
        return this.status === FirewallRuleStatus.ACTIVE && this.enabled;
    }

    public isExpired(): boolean {
        if (!this.expiresAt) return false;
        return new Date() > this.expiresAt;
    }

    public isInTimeWindow(): boolean {
        if (!this.timeConfig?.enabled) return true;
        
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();
        const currentDay = now.toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase() + 'day';
        
        // Verificar día de la semana
        if (this.timeConfig.daysOfWeek && !this.timeConfig.daysOfWeek.includes(currentDay)) {
            return false;
        }
        
        // Verificar ventana de tiempo
        if (this.timeConfig.startTime && this.timeConfig.endTime) {
            const [startHour, startMin] = this.timeConfig.startTime.split(':').map(Number);
            const [endHour, endMin] = this.timeConfig.endTime.split(':').map(Number);
            const startTime = startHour * 60 + startMin;
            const endTime = endHour * 60 + endMin;
            
            if (startTime <= endTime) {
                return currentTime >= startTime && currentTime <= endTime;
            } else {
                // Ventana que cruza medianoche
                return currentTime >= startTime || currentTime <= endTime;
            }
        }
        
        return true;
    }

    public shouldApply(): boolean {
        return this.isActive() && !this.isExpired() && this.isInTimeWindow();
    }

    public matchesSource(ip: string, port?: number): boolean {
        // Verificar IP de origen
        if (this.sourceIp && this.sourceIp !== 'any' && this.sourceIp !== ip) {
            return false;
        }
        
        if (this.sourceCidr && !this.isIpInCidr(ip, this.sourceCidr)) {
            return false;
        }
        
        if (this.sourceIpList && this.sourceIpList.length > 0 && !this.sourceIpList.includes(ip)) {
            return false;
        }
        
        // Verificar puerto de origen
        if (port && this.sourcePort && this.sourcePort !== 'any') {
            if (!this.isPortInRange(port, this.sourcePort)) {
                return false;
            }
        }
        
        if (port && this.sourcePortList && this.sourcePortList.length > 0) {
            const portMatches = this.sourcePortList.some(portRange => 
                this.isPortInRange(port, portRange)
            );
            if (!portMatches) {
                return false;
            }
        }
        
        return true;
    }

    public matchesDestination(ip: string, port?: number): boolean {
        // Verificar IP de destino
        if (this.destinationIp && this.destinationIp !== 'any' && this.destinationIp !== ip) {
            return false;
        }
        
        if (this.destinationCidr && !this.isIpInCidr(ip, this.destinationCidr)) {
            return false;
        }
        
        if (this.destinationIpList && this.destinationIpList.length > 0 && !this.destinationIpList.includes(ip)) {
            return false;
        }
        
        // Verificar puerto de destino
        if (port && this.destinationPort && this.destinationPort !== 'any') {
            if (!this.isPortInRange(port, this.destinationPort)) {
                return false;
            }
        }
        
        if (port && this.destinationPortList && this.destinationPortList.length > 0) {
            const portMatches = this.destinationPortList.some(portRange => 
                this.isPortInRange(port, portRange)
            );
            if (!portMatches) {
                return false;
            }
        }
        
        return true;
    }

    private isIpInCidr(ip: string, cidr: string): boolean {
        // Implementación simplificada - en producción usar una librería especializada
        const [network, prefixLength] = cidr.split('/');
        const ipParts = ip.split('.').map(Number);
        const networkParts = network.split('.').map(Number);
        const prefix = parseInt(prefixLength);
        
        const ipInt = (ipParts[0] << 24) + (ipParts[1] << 16) + (ipParts[2] << 8) + ipParts[3];
        const networkInt = (networkParts[0] << 24) + (networkParts[1] << 16) + (networkParts[2] << 8) + networkParts[3];
        const mask = (-1 << (32 - prefix)) >>> 0;
        
        return (ipInt & mask) === (networkInt & mask);
    }

    private isPortInRange(port: number, portRange: string): boolean {
        if (portRange === 'any') return true;
        
        if (portRange.includes('-')) {
            const [start, end] = portRange.split('-').map(Number);
            return port >= start && port <= end;
        }
        
        return port === parseInt(portRange);
    }

    public incrementHitCount(): void {
        this.hitCount++;
        this.lastHit = new Date();
        if (!this.firstHit) {
            this.firstHit = new Date();
        }
    }

    public updateMetrics(processingTime: number, allowed: boolean): void {
        if (allowed) {
            this.connectionsAllowed++;
        } else {
            this.connectionsBlocked++;
        }
        
        if (!this.performanceMetrics) {
            this.performanceMetrics = {};
        }
        
        // Actualizar métricas de tiempo de procesamiento
        if (!this.performanceMetrics.averageProcessingTime) {
            this.performanceMetrics.averageProcessingTime = processingTime;
        } else {
            this.performanceMetrics.averageProcessingTime = 
                (this.performanceMetrics.averageProcessingTime + processingTime) / 2;
        }
        
        if (!this.performanceMetrics.maxProcessingTime || processingTime > this.performanceMetrics.maxProcessingTime) {
            this.performanceMetrics.maxProcessingTime = processingTime;
        }
        
        if (!this.performanceMetrics.minProcessingTime || processingTime < this.performanceMetrics.minProcessingTime) {
            this.performanceMetrics.minProcessingTime = processingTime;
        }
    }

    public getEffectiveness(): number {
        const totalConnections = this.connectionsAllowed + this.connectionsBlocked;
        if (totalConnections === 0) return 0;
        
        if (this.action === FirewallAction.ALLOW) {
            return (this.connectionsAllowed / totalConnections) * 100;
        } else {
            return (this.connectionsBlocked / totalConnections) * 100;
        }
    }

    public needsAttention(): boolean {
        // Verificar si la regla necesita atención
        if (this.isExpired()) return true;
        if (!this.enabled && this.status === FirewallRuleStatus.ACTIVE) return true;
        
        // Verificar métricas de rendimiento
        if (this.performanceMetrics?.averageProcessingTime && 
            this.performanceMetrics.averageProcessingTime > 1000) { // > 1ms
            return true;
        }
        
        // Verificar alertas
        if (this.alertConfig?.enabled && this.alertConfig.thresholds) {
            const metrics = this.performanceMetrics;
            if (metrics?.packetsPerSecond && 
                this.alertConfig.thresholds.packetsPerSecond &&
                metrics.packetsPerSecond > this.alertConfig.thresholds.packetsPerSecond) {
                return true;
            }
        }
        
        return false;
    }

    public clone(): Partial<FirewallRule> {
        const cloned = { ...this };
        delete cloned.id;
        cloned.uuid = ''; // Se generará uno nuevo
        cloned.name = `${this.name} (Copy)`;
        cloned.createdAt = new Date();
        cloned.lastModified = new Date();
        cloned.hitCount = 0;
        cloned.packetsProcessed = 0;
        cloned.bytesProcessed = 0;
        cloned.connectionsAllowed = 0;
        cloned.connectionsBlocked = 0;
        cloned.firstHit = null;
        cloned.lastHit = null;
        
        return cloned;
    }

    public getAge(): number {
        const now = new Date();
        return Math.floor((now.getTime() - this.createdAt.getTime()) / (1000 * 60 * 60 * 24));
    }

    public getHitRate(): number {
        const ageInDays = this.getAge();
        if (ageInDays === 0) return this.hitCount;
        return this.hitCount / ageInDays;
    }
}
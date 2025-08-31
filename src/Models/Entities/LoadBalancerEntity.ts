import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GenericEntity } from "./GenericTable";
import { User } from "./UserEntity";
import { Datacenter } from "./DatacenterEntity";
import { Device } from "./DeviceEntity";
import { LoadBalancerType, LoadBalancerAlgorithm, LoadBalancerStatus, HealthCheckProtocol } from "../../Enums/NetworkEnum";

/**
 * Entidad que representa un balanceador de carga en el simulador
 * Incluye configuración de distribución de tráfico, health checks y métricas
 */
@Entity()
export class LoadBalancer extends GenericEntity {
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

    @Column({ nullable: false, length: 200, comment: 'Nombre del balanceador' })
    public name: string;

    @Column({ nullable: true, type: 'text', comment: 'Descripción del balanceador' })
    public description: string;

    @Column({ type: 'enum', enum: LoadBalancerStatus, nullable: false, default: LoadBalancerStatus.ACTIVE, comment: 'Estado del balanceador' })
    public status: LoadBalancerStatus;

    @Column({ type: 'enum', enum: LoadBalancerType, nullable: false, comment: 'Tipo de balanceador' })
    public type: LoadBalancerType;

    @Column({ type: 'enum', enum: LoadBalancerAlgorithm, nullable: false, default: LoadBalancerAlgorithm.ROUND_ROBIN, comment: 'Algoritmo de balanceo' })
    public algorithm: LoadBalancerAlgorithm;

    @Column({ default: true, comment: 'Si el balanceador está habilitado' })
    public enabled: boolean;

    @Column({ default: false, comment: 'Si es un balanceador del sistema' })
    public isSystemLoadBalancer: boolean;

    // Configuración de red
    @Column({ nullable: false, length: 100, comment: 'Dirección IP virtual (VIP)' })
    public virtualIp: string;

    @Column({ type: 'integer', nullable: false, comment: 'Puerto virtual' })
    public virtualPort: number;

    @Column({ nullable: true, length: 100, comment: 'Interfaz de red' })
    public networkInterface: string;

    @Column({ nullable: true, length: 50, comment: 'VLAN ID' })
    public vlanId: string;

    @Column({ type: 'json', nullable: true, comment: 'Configuración de SSL/TLS' })
    public sslConfig: {
        enabled: boolean;
        certificateId?: string;
        certificatePath?: string;
        privateKeyPath?: string;
        cipherSuites?: string[];
        protocols?: string[]; // TLSv1.2, TLSv1.3
        sslOffloading?: boolean;
        hsts?: boolean;
        hstsMaxAge?: number;
    };

    // Configuración de servidores backend
    @Column({ type: 'json', nullable: false, comment: 'Lista de servidores backend' })
    public backendServers: {
        id: string;
        ip: string;
        port: number;
        weight: number;
        priority?: number;
        enabled: boolean;
        healthStatus: string; // HEALTHY, UNHEALTHY, UNKNOWN, MAINTENANCE
        maxConnections?: number;
        currentConnections?: number;
        responseTime?: number; // ms
        lastHealthCheck?: Date;
        failureCount?: number;
        successCount?: number;
        totalRequests?: number;
        bytesTransferred?: number;
        metadata?: { [key: string]: any };
    }[];

    // Configuración de health checks
    @Column({ type: 'json', nullable: true, comment: 'Configuración de health checks' })
    public healthCheckConfig: {
        enabled: boolean;
        protocol: HealthCheckProtocol;
        port?: number;
        path?: string; // Para HTTP/HTTPS
        method?: string; // GET, POST, HEAD
        expectedStatus?: number[]; // [200, 201, 204]
        expectedResponse?: string;
        headers?: { [key: string]: string };
        timeout: number; // segundos
        interval: number; // segundos
        retries: number;
        failureThreshold: number;
        successThreshold: number;
        gracePeriod?: number; // segundos antes del primer check
    };

    // Configuración de sesiones
    @Column({ type: 'json', nullable: true, comment: 'Configuración de persistencia de sesión' })
    public sessionConfig: {
        enabled: boolean;
        type: string; // COOKIE, IP_HASH, SOURCE_IP, CUSTOM
        cookieName?: string;
        cookieExpiry?: number; // segundos
        cookiePath?: string;
        cookieDomain?: string;
        cookieSecure?: boolean;
        cookieHttpOnly?: boolean;
        hashKey?: string;
        timeout?: number; // segundos
    };

    // Configuración de timeouts
    @Column({ type: 'json', nullable: true, comment: 'Configuración de timeouts' })
    public timeoutConfig: {
        connect: number; // segundos
        server: number; // segundos
        client: number; // segundos
        check: number; // segundos
        queue?: number; // segundos
        tunnel?: number; // segundos
    };

    // Configuración de límites
    @Column({ type: 'json', nullable: true, comment: 'Configuración de límites' })
    public limitsConfig: {
        maxConnections?: number;
        maxConnectionsPerServer?: number;
        maxRequestsPerSecond?: number;
        maxBandwidth?: number; // Mbps
        connectionQueueSize?: number;
        requestQueueSize?: number;
        rateLimitWindow?: number; // segundos
    };

    // Configuración de logging y monitoreo
    @Column({ type: 'json', nullable: true, comment: 'Configuración de logging' })
    public loggingConfig: {
        enabled: boolean;
        level: string; // DEBUG, INFO, WARN, ERROR
        format: string; // COMBINED, COMMON, JSON, CUSTOM
        destination: string; // FILE, SYSLOG, STDOUT
        filePath?: string;
        maxFileSize?: number; // MB
        maxFiles?: number;
        logRequests?: boolean;
        logResponses?: boolean;
        logErrors?: boolean;
        logHealthChecks?: boolean;
    };

    // Configuración de compresión
    @Column({ type: 'json', nullable: true, comment: 'Configuración de compresión' })
    public compressionConfig: {
        enabled: boolean;
        algorithm: string; // GZIP, DEFLATE, BROTLI
        level?: number; // 1-9
        minSize?: number; // bytes
        types?: string[]; // MIME types
    };

    // Configuración de cache
    @Column({ type: 'json', nullable: true, comment: 'Configuración de cache' })
    public cacheConfig: {
        enabled: boolean;
        type: string; // MEMORY, REDIS, MEMCACHED
        ttl?: number; // segundos
        maxSize?: number; // MB
        keyPattern?: string;
        headers?: string[]; // Headers a incluir en la clave de cache
        excludePaths?: string[];
        includePaths?: string[];
    };

    // Métricas de rendimiento
    @Column({ type: 'bigint', nullable: true, default: 0, comment: 'Total de conexiones procesadas' })
    public totalConnections: number;

    @Column({ type: 'bigint', nullable: true, default: 0, comment: 'Conexiones activas actuales' })
    public activeConnections: number;

    @Column({ type: 'bigint', nullable: true, default: 0, comment: 'Total de requests procesados' })
    public totalRequests: number;

    @Column({ type: 'bigint', nullable: true, default: 0, comment: 'Requests por segundo actuales' })
    public currentRps: number;

    @Column({ type: 'bigint', nullable: true, default: 0, comment: 'Bytes transferidos' })
    public bytesTransferred: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, comment: 'Tiempo de respuesta promedio (ms)' })
    public averageResponseTime: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true, comment: 'Porcentaje de disponibilidad' })
    public availability: number;

    @Column({ type: 'integer', nullable: true, default: 0, comment: 'Número de errores' })
    public errorCount: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true, comment: 'Tasa de error (%)' })
    public errorRate: number;

    // Métricas detalladas
    @Column({ type: 'json', nullable: true, comment: 'Métricas detalladas de rendimiento' })
    public performanceMetrics: {
        cpu?: {
            usage: number; // porcentaje
            load1m?: number;
            load5m?: number;
            load15m?: number;
        };
        memory?: {
            usage: number; // porcentaje
            used: number; // MB
            available: number; // MB
            cached?: number; // MB
        };
        network?: {
            inbound: number; // Mbps
            outbound: number; // Mbps
            packetsIn?: number;
            packetsOut?: number;
            errorsIn?: number;
            errorsOut?: number;
        };
        connections?: {
            established: number;
            timeWait: number;
            closeWait: number;
            synReceived: number;
            finWait: number;
        };
        ssl?: {
            handshakes: number;
            handshakeErrors: number;
            sessionReuse: number;
            cipherDistribution?: { [cipher: string]: number };
        };
    };

    // Información de alta disponibilidad
    @Column({ type: 'json', nullable: true, comment: 'Configuración de alta disponibilidad' })
    public haConfig: {
        enabled: boolean;
        mode: string; // ACTIVE_PASSIVE, ACTIVE_ACTIVE
        partnerId?: string;
        priority?: number;
        vrrpId?: number;
        preempt?: boolean;
        syncState?: boolean;
        heartbeatInterval?: number; // segundos
        failoverTime?: number; // segundos
    };

    // Configuración de seguridad
    @Column({ type: 'json', nullable: true, comment: 'Configuración de seguridad' })
    public securityConfig: {
        ddosProtection?: {
            enabled: boolean;
            threshold?: number; // requests per second
            blockDuration?: number; // segundos
            whitelist?: string[]; // IPs
        };
        accessControl?: {
            allowedIps?: string[];
            blockedIps?: string[];
            allowedCountries?: string[];
            blockedCountries?: string[];
        };
        rateLimiting?: {
            enabled: boolean;
            requestsPerSecond?: number;
            burstSize?: number;
            windowSize?: number; // segundos
        };
        waf?: {
            enabled: boolean;
            ruleSet?: string;
            customRules?: string[];
            logOnly?: boolean;
        };
    };

    // Información temporal
    @Column({ type: 'timestamp', nullable: false, comment: 'Fecha de creación' })
    public createdAt: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de última modificación' })
    public lastModified: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de último reinicio' })
    public lastRestart: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de última verificación de salud' })
    public lastHealthCheck: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de último mantenimiento' })
    public lastMaintenance: Date;

    // Información de costos
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, comment: 'Costo mensual' })
    public monthlyCost: number;

    @Column({ type: 'decimal', precision: 10, scale: 4, nullable: true, comment: 'Costo por hora' })
    public hourlyCost: number;

    @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true, comment: 'Costo por request' })
    public costPerRequest: number;

    @Column({ type: 'decimal', precision: 10, scale: 4, nullable: true, comment: 'Costo por GB transferido' })
    public costPerGb: number;

    // Metadatos adicionales
    @Column({ type: 'json', nullable: true, comment: 'Etiquetas del balanceador' })
    public tags: string[];

    @Column({ nullable: true, length: 100, comment: 'Entorno (dev, staging, prod)' })
    public environment: string;

    @Column({ nullable: true, length: 100, comment: 'Región geográfica' })
    public region: string;

    @Column({ nullable: true, length: 100, comment: 'Zona de disponibilidad' })
    public availabilityZone: string;

    @Column({ type: 'json', nullable: true, comment: 'Metadatos adicionales' })
    public metadata: {
        vendor?: string;
        version?: string;
        model?: string;
        serialNumber?: string;
        firmwareVersion?: string;
        supportContract?: string;
        warrantyExpiry?: Date;
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

    public getVirtualIp(): string {
        return this.virtualIp;
    }

    public setVirtualIp(virtualIp: string): void {
        this.virtualIp = virtualIp;
    }

    public getAlgorithm(): LoadBalancerAlgorithm {
        return this.algorithm;
    }

    public setAlgorithm(algorithm: LoadBalancerAlgorithm): void {
        this.algorithm = algorithm;
    }

    public getStatus(): LoadBalancerStatus {
        return this.status;
    }

    public setStatus(status: LoadBalancerStatus): void {
        this.status = status;
    }

    // Métodos adicionales para gestión y análisis
    public isActive(): boolean {
        return this.status === LoadBalancerStatus.ACTIVE && this.enabled;
    }

    public getHealthyServers(): typeof this.backendServers {
        return this.backendServers.filter(server => 
            server.enabled && server.healthStatus === 'HEALTHY'
        );
    }

    public getUnhealthyServers(): typeof this.backendServers {
        return this.backendServers.filter(server => 
            server.enabled && server.healthStatus === 'UNHEALTHY'
        );
    }

    public getTotalWeight(): number {
        return this.getHealthyServers().reduce((total, server) => total + server.weight, 0);
    }

    public selectServer(algorithm?: LoadBalancerAlgorithm): typeof this.backendServers[0] | null {
        const healthyServers = this.getHealthyServers();
        if (healthyServers.length === 0) return null;

        const selectedAlgorithm = algorithm || this.algorithm;

        switch (selectedAlgorithm) {
            case LoadBalancerAlgorithm.ROUND_ROBIN:
                // Implementación simplificada - en producción mantener estado
                return healthyServers[Math.floor(Math.random() * healthyServers.length)];

            case LoadBalancerAlgorithm.WEIGHTED_ROUND_ROBIN:
                const totalWeight = this.getTotalWeight();
                const random = Math.random() * totalWeight;
                let currentWeight = 0;
                
                for (const server of healthyServers) {
                    currentWeight += server.weight;
                    if (random <= currentWeight) {
                        return server;
                    }
                }
                return healthyServers[0];

            case LoadBalancerAlgorithm.LEAST_CONNECTIONS:
                return healthyServers.reduce((min, server) => 
                    (server.currentConnections || 0) < (min.currentConnections || 0) ? server : min
                );

            case LoadBalancerAlgorithm.LEAST_RESPONSE_TIME:
                return healthyServers.reduce((min, server) => 
                    (server.responseTime || Infinity) < (min.responseTime || Infinity) ? server : min
                );

            case LoadBalancerAlgorithm.IP_HASH:
                // Requiere IP del cliente - implementación simplificada
                return healthyServers[0];

            default:
                return healthyServers[0];
        }
    }

    public updateServerHealth(serverId: string, isHealthy: boolean, responseTime?: number): void {
        const server = this.backendServers.find(s => s.id === serverId);
        if (!server) return;

        server.lastHealthCheck = new Date();
        
        if (isHealthy) {
            server.healthStatus = 'HEALTHY';
            server.successCount = (server.successCount || 0) + 1;
            server.failureCount = 0;
        } else {
            server.failureCount = (server.failureCount || 0) + 1;
            if (server.failureCount >= (this.healthCheckConfig?.failureThreshold || 3)) {
                server.healthStatus = 'UNHEALTHY';
            }
        }

        if (responseTime !== undefined) {
            server.responseTime = responseTime;
        }
    }

    public addBackendServer(server: Omit<typeof this.backendServers[0], 'id' | 'healthStatus' | 'lastHealthCheck'>): void {
        const newServer = {
            ...server,
            id: `server_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            healthStatus: 'UNKNOWN',
            lastHealthCheck: new Date(),
            failureCount: 0,
            successCount: 0,
            totalRequests: 0,
            bytesTransferred: 0
        };
        
        this.backendServers.push(newServer);
    }

    public removeBackendServer(serverId: string): boolean {
        const index = this.backendServers.findIndex(s => s.id === serverId);
        if (index === -1) return false;
        
        this.backendServers.splice(index, 1);
        return true;
    }

    public getLoadDistribution(): { [serverId: string]: number } {
        const totalRequests = this.backendServers.reduce((total, server) => 
            total + (server.totalRequests || 0), 0
        );
        
        if (totalRequests === 0) return {};
        
        const distribution: { [serverId: string]: number } = {};
        this.backendServers.forEach(server => {
            distribution[server.id] = ((server.totalRequests || 0) / totalRequests) * 100;
        });
        
        return distribution;
    }

    public calculateAvailability(): number {
        const healthyServers = this.getHealthyServers().length;
        const totalServers = this.backendServers.filter(s => s.enabled).length;
        
        if (totalServers === 0) return 0;
        return (healthyServers / totalServers) * 100;
    }

    public calculateErrorRate(): number {
        if (this.totalRequests === 0) return 0;
        return (this.errorCount / this.totalRequests) * 100;
    }

    public isOverloaded(): boolean {
        if (!this.limitsConfig) return false;
        
        // Verificar límites de conexiones
        if (this.limitsConfig.maxConnections && 
            this.activeConnections > this.limitsConfig.maxConnections) {
            return true;
        }
        
        // Verificar límites de RPS
        if (this.limitsConfig.maxRequestsPerSecond && 
            this.currentRps > this.limitsConfig.maxRequestsPerSecond) {
            return true;
        }
        
        // Verificar CPU
        if (this.performanceMetrics?.cpu?.usage && 
            this.performanceMetrics.cpu.usage > 90) {
            return true;
        }
        
        // Verificar memoria
        if (this.performanceMetrics?.memory?.usage && 
            this.performanceMetrics.memory.usage > 90) {
            return true;
        }
        
        return false;
    }

    public needsScaling(): boolean {
        // Verificar si necesita escalado basado en métricas
        if (this.isOverloaded()) return true;
        
        // Verificar tiempo de respuesta
        if (this.averageResponseTime && this.averageResponseTime > 1000) { // > 1 segundo
            return true;
        }
        
        // Verificar tasa de error
        if (this.calculateErrorRate() > 5) { // > 5%
            return true;
        }
        
        // Verificar disponibilidad
        if (this.calculateAvailability() < 80) { // < 80%
            return true;
        }
        
        return false;
    }

    public getHealthScore(): number {
        let score = 100;
        
        // Penalizar por servidores no saludables
        const availability = this.calculateAvailability();
        score -= (100 - availability) * 0.3;
        
        // Penalizar por alta tasa de error
        const errorRate = this.calculateErrorRate();
        score -= errorRate * 2;
        
        // Penalizar por alto tiempo de respuesta
        if (this.averageResponseTime) {
            if (this.averageResponseTime > 1000) {
                score -= Math.min(50, (this.averageResponseTime - 1000) / 100);
            }
        }
        
        // Penalizar por sobrecarga
        if (this.isOverloaded()) {
            score -= 20;
        }
        
        return Math.max(0, Math.min(100, score));
    }

    public getUptime(): number {
        if (!this.createdAt) return 0;
        
        const now = new Date();
        const totalTime = now.getTime() - this.createdAt.getTime();
        
        // Calcular downtime basado en el estado
        let downtime = 0;
        if (this.status !== LoadBalancerStatus.ACTIVE) {
            // Simplificado - en producción mantener historial de estados
            downtime = totalTime * 0.1; // Asumir 10% downtime si no está activo
        }
        
        const uptime = totalTime - downtime;
        return (uptime / totalTime) * 100;
    }

    public estimateMonthlyCost(): number {
        let cost = this.monthlyCost || 0;
        
        // Agregar costos por tráfico
        if (this.costPerGb && this.bytesTransferred) {
            const gbTransferred = this.bytesTransferred / (1024 * 1024 * 1024);
            cost += gbTransferred * this.costPerGb;
        }
        
        // Agregar costos por requests
        if (this.costPerRequest && this.totalRequests) {
            cost += this.totalRequests * this.costPerRequest;
        }
        
        return cost;
    }
}
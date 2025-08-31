import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GenericEntity } from "./GenericTable";
import { User } from "./UserEntity";
import { Service } from "./ServiceEntity";
import { ClusterStatus } from "../../Enums/KubernetesEnum";

/**
 * Entidad que representa un cluster de Kubernetes gestionado por un usuario
 * Incluye configuración, recursos, métricas y estado del cluster
 */
@Entity()
export class Cluster extends GenericEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
    public userId: User;

    @ManyToOne(() => Service, service => service.id, { nullable: true })
    @JoinColumn({ name: 'service_id' })
    public serviceId: Service;

    @Column({ nullable: false })
    public uuid: string;

    @Column({ nullable: false, length: 200, comment: 'Nombre del cluster' })
    public name: string;

    @Column({ nullable: true, type: 'text', comment: 'Descripción del cluster' })
    public description: string;

    @Column({ type: 'enum', enum: ClusterStatus, nullable: false, comment: 'Estado del cluster' })
    public status: ClusterStatus;

    // Información de versión y configuración
    @Column({ nullable: false, length: 50, comment: 'Versión de Kubernetes' })
    public kubernetesVersion: string;

    @Column({ nullable: true, length: 100, comment: 'Distribución de Kubernetes' })
    public distribution: string; // vanilla, EKS, GKE, AKS, OpenShift, Rancher, etc.

    @Column({ nullable: true, length: 100, comment: 'Proveedor de infraestructura' })
    public provider: string; // on-premise, AWS, GCP, Azure, DigitalOcean, etc.

    @Column({ nullable: true, length: 100, comment: 'Región del cluster' })
    public region: string;

    @Column({ nullable: true, length: 100, comment: 'Zona de disponibilidad' })
    public availabilityZone: string;

    // Configuración de red
    @Column({ nullable: true, length: 50, comment: 'CIDR del cluster' })
    public clusterCidr: string;

    @Column({ nullable: true, length: 50, comment: 'CIDR de servicios' })
    public serviceCidr: string;

    @Column({ nullable: true, length: 50, comment: 'CIDR de pods' })
    public podCidr: string;

    @Column({ nullable: true, length: 100, comment: 'Plugin de red (CNI)' })
    public networkPlugin: string; // Calico, Flannel, Weave, Cilium, etc.

    @Column({ nullable: true, length: 100, comment: 'Política de red' })
    public networkPolicy: string;

    // Configuración de seguridad
    @Column({ default: true, comment: 'Si RBAC está habilitado' })
    public rbacEnabled: boolean;

    @Column({ default: false, comment: 'Si Network Policies están habilitadas' })
    public networkPoliciesEnabled: boolean;

    @Column({ default: false, comment: 'Si Pod Security Policies están habilitadas' })
    public podSecurityPoliciesEnabled: boolean;

    @Column({ default: false, comment: 'Si el cifrado está habilitado' })
    public encryptionEnabled: boolean;

    @Column({ nullable: true, length: 100, comment: 'Proveedor de secretos' })
    public secretsProvider: string; // Vault, AWS Secrets Manager, etc.

    // Configuración de almacenamiento
    @Column({ nullable: true, length: 100, comment: 'Clase de almacenamiento por defecto' })
    public defaultStorageClass: string;

    @Column({ type: 'json', nullable: true, comment: 'Clases de almacenamiento disponibles' })
    public storageClasses: {
        name: string;
        provisioner: string;
        parameters: { [key: string]: string };
        reclaimPolicy: string; // Retain, Delete, Recycle
        volumeBindingMode: string; // Immediate, WaitForFirstConsumer
        allowVolumeExpansion: boolean;
    }[];

    // Recursos del cluster
    @Column({ type: 'integer', nullable: false, comment: 'Número total de nodos' })
    public totalNodes: number;

    @Column({ type: 'integer', nullable: false, comment: 'Número de nodos master' })
    public masterNodes: number;

    @Column({ type: 'integer', nullable: false, comment: 'Número de nodos worker' })
    public workerNodes: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false, comment: 'CPU total disponible (cores)' })
    public totalCpu: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false, comment: 'CPU total utilizada (cores)' })
    public usedCpu: number;

    @Column({ type: 'bigint', nullable: false, comment: 'Memoria total disponible (bytes)' })
    public totalMemory: number;

    @Column({ type: 'bigint', nullable: false, comment: 'Memoria total utilizada (bytes)' })
    public usedMemory: number;

    @Column({ type: 'bigint', nullable: false, comment: 'Almacenamiento total disponible (bytes)' })
    public totalStorage: number;

    @Column({ type: 'bigint', nullable: false, comment: 'Almacenamiento total utilizado (bytes)' })
    public usedStorage: number;

    // Métricas de pods y servicios
    @Column({ type: 'integer', nullable: false, default: 0, comment: 'Número total de pods' })
    public totalPods: number;

    @Column({ type: 'integer', nullable: false, default: 0, comment: 'Número de pods en ejecución' })
    public runningPods: number;

    @Column({ type: 'integer', nullable: false, default: 0, comment: 'Número de pods pendientes' })
    public pendingPods: number;

    @Column({ type: 'integer', nullable: false, default: 0, comment: 'Número de pods fallidos' })
    public failedPods: number;

    @Column({ type: 'integer', nullable: false, default: 0, comment: 'Número total de servicios' })
    public totalServices: number;

    @Column({ type: 'integer', nullable: false, default: 0, comment: 'Número total de deployments' })
    public totalDeployments: number;

    @Column({ type: 'integer', nullable: false, default: 0, comment: 'Número total de namespaces' })
    public totalNamespaces: number;

    // Configuración de autoescalado
    @Column({ default: false, comment: 'Si el autoescalado está habilitado' })
    public autoscalingEnabled: boolean;

    @Column({ type: 'integer', nullable: true, comment: 'Número mínimo de nodos' })
    public minNodes: number;

    @Column({ type: 'integer', nullable: true, comment: 'Número máximo de nodos' })
    public maxNodes: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true, comment: 'Umbral de CPU para autoescalado (%)' })
    public cpuThreshold: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true, comment: 'Umbral de memoria para autoescalado (%)' })
    public memoryThreshold: number;

    // Configuración de monitoreo y logging
    @Column({ default: false, comment: 'Si el monitoreo está habilitado' })
    public monitoringEnabled: boolean;

    @Column({ nullable: true, length: 100, comment: 'Sistema de monitoreo' })
    public monitoringSystem: string; // Prometheus, Grafana, DataDog, etc.

    @Column({ default: false, comment: 'Si el logging está habilitado' })
    public loggingEnabled: boolean;

    @Column({ nullable: true, length: 100, comment: 'Sistema de logging' })
    public loggingSystem: string; // ELK, Fluentd, Loki, etc.

    @Column({ default: false, comment: 'Si el tracing está habilitado' })
    public tracingEnabled: boolean;

    @Column({ nullable: true, length: 100, comment: 'Sistema de tracing' })
    public tracingSystem: string; // Jaeger, Zipkin, etc.

    // Información de costos
    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true, comment: 'Costo mensual estimado' })
    public monthlyCost: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true, comment: 'Costo por hora' })
    public hourlyCost: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true, comment: 'Costo de almacenamiento mensual' })
    public storageCost: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true, comment: 'Costo de red mensual' })
    public networkCost: number;

    // Información temporal
    @Column({ type: 'timestamp', nullable: false, comment: 'Fecha de creación del cluster' })
    public createdAt: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de última actualización' })
    public lastUpdated: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de último reinicio' })
    public lastRestart: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de próximo mantenimiento' })
    public nextMaintenanceDate: Date;

    // Configuración avanzada
    @Column({ type: 'json', nullable: true, comment: 'Configuración detallada del cluster' })
    public clusterConfig: {
        // Configuración del API Server
        apiServer?: {
            port: number;
            bindAddress: string;
            advertiseAddress: string;
            etcdServers: string[];
            serviceClusterIpRange: string;
            enableAdmissionPlugins: string[];
            auditLogEnabled: boolean;
        };

        // Configuración del Scheduler
        scheduler?: {
            algorithmProvider: string;
            policyConfigFile?: string;
            profilesConfigFile?: string;
        };

        // Configuración del Controller Manager
        controllerManager?: {
            clusterCidr: string;
            serviceCidr: string;
            nodeMonitorPeriod: string;
            nodeMonitorGracePeriod: string;
            podEvictionTimeout: string;
        };

        // Configuración de Kubelet
        kubelet?: {
            cgroupDriver: string;
            containerRuntime: string;
            maxPods: number;
            podPidsLimit: number;
            systemReserved: { [resource: string]: string };
            kubeReserved: { [resource: string]: string };
        };

        // Configuración de add-ons
        addons?: {
            name: string;
            version: string;
            enabled: boolean;
            config?: { [key: string]: any };
        }[];
    };

    // Métricas de rendimiento
    @Column({ type: 'json', nullable: true, comment: 'Métricas de rendimiento del cluster' })
    public performanceMetrics: {
        // Métricas de CPU
        cpu?: {
            utilizationPercentage: number;
            requestsPercentage: number;
            limitsPercentage: number;
            throttlingRate: number;
        };

        // Métricas de memoria
        memory?: {
            utilizationPercentage: number;
            requestsPercentage: number;
            limitsPercentage: number;
            oomKillsCount: number;
        };

        // Métricas de red
        network?: {
            ingressBytesPerSecond: number;
            egressBytesPerSecond: number;
            packetsPerSecond: number;
            errorsPerSecond: number;
        };

        // Métricas de almacenamiento
        storage?: {
            iopsRead: number;
            iopsWrite: number;
            throughputRead: number;
            throughputWrite: number;
            latencyMs: number;
        };

        // Métricas de API Server
        apiServer?: {
            requestsPerSecond: number;
            latencyP50: number;
            latencyP95: number;
            latencyP99: number;
            errorRate: number;
        };
    };

    // Información de salud y disponibilidad
    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true, comment: 'Porcentaje de uptime' })
    public uptimePercentage: number;

    @Column({ type: 'integer', nullable: true, comment: 'Tiempo de actividad en segundos' })
    public uptimeSeconds: number;

    @Column({ type: 'timestamp', nullable: true, comment: 'Última vez que estuvo inactivo' })
    public lastDowntime: Date;

    @Column({ type: 'integer', nullable: true, comment: 'Duración del último downtime en segundos' })
    public lastDowntimeDuration: number;

    // Información de backup y recuperación
    @Column({ default: false, comment: 'Si el backup está habilitado' })
    public backupEnabled: boolean;

    @Column({ nullable: true, length: 100, comment: 'Estrategia de backup' })
    public backupStrategy: string; // etcd, velero, custom

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha del último backup' })
    public lastBackupDate: Date;

    @Column({ nullable: true, length: 50, comment: 'Estado del último backup' })
    public lastBackupStatus: string; // SUCCESS, FAILED, IN_PROGRESS

    @Column({ type: 'integer', nullable: true, comment: 'Número de backups retenidos' })
    public backupRetentionCount: number;

    // Metadatos adicionales
    @Column({ type: 'json', nullable: true, comment: 'Etiquetas del cluster' })
    public labels: { [key: string]: string };

    @Column({ type: 'json', nullable: true, comment: 'Anotaciones del cluster' })
    public annotations: { [key: string]: string };

    @Column({ type: 'json', nullable: true, comment: 'Metadatos adicionales' })
    public metadata: {
        environment?: string; // development, staging, production
        team?: string;
        project?: string;
        costCenter?: string;
        owner?: string;
        tags?: string[];
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

    public getServiceId(): Service {
        return this.serviceId;
    }

    public setServiceId(serviceId: Service): void {
        this.serviceId = serviceId;
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

    public getStatus(): ClusterStatus {
        return this.status;
    }

    public setStatus(status: ClusterStatus): void {
        this.status = status;
    }

    // Métodos adicionales para cálculos
    public getCpuUtilizationPercentage(): number {
        if (this.totalCpu === 0) return 0;
        return (this.usedCpu / this.totalCpu) * 100;
    }

    public getMemoryUtilizationPercentage(): number {
        if (this.totalMemory === 0) return 0;
        return (this.usedMemory / this.totalMemory) * 100;
    }

    public getStorageUtilizationPercentage(): number {
        if (this.totalStorage === 0) return 0;
        return (this.usedStorage / this.totalStorage) * 100;
    }

    public getHealthScore(): number {
        let score = 100;

        // Penalizar por pods fallidos
        if (this.totalPods > 0) {
            const failedPercentage = (this.failedPods / this.totalPods) * 100;
            score -= failedPercentage * 2;
        }

        // Penalizar por alta utilización de recursos
        const cpuUtil = this.getCpuUtilizationPercentage();
        const memUtil = this.getMemoryUtilizationPercentage();

        if (cpuUtil > 90) score -= 20;
        else if (cpuUtil > 80) score -= 10;

        if (memUtil > 90) score -= 20;
        else if (memUtil > 80) score -= 10;

        // Considerar uptime
        if (this.uptimePercentage) {
            score = score * (this.uptimePercentage / 100);
        }

        return Math.max(0, Math.min(100, score));
    }

    public isHealthy(): boolean {
        return this.getHealthScore() >= 80;
    }

    public needsAttention(): boolean {
        return this.getHealthScore() < 60 ||
            this.getCpuUtilizationPercentage() > 85 ||
            this.getMemoryUtilizationPercentage() > 85 ||
            this.failedPods > 0;
    }

    public getResourceEfficiency(): number {
        const cpuEfficiency = this.usedCpu / this.totalCpu;
        const memoryEfficiency = this.usedMemory / this.totalMemory;
        return (cpuEfficiency + memoryEfficiency) / 2;
    }

    public canAutoScale(): boolean {
        return this.autoscalingEnabled &&
            this.minNodes !== null &&
            this.maxNodes !== null &&
            this.totalNodes < this.maxNodes;
    }

    public shouldScale(): boolean {
        if (!this.canAutoScale()) return false;

        const cpuUtil = this.getCpuUtilizationPercentage();
        const memUtil = this.getMemoryUtilizationPercentage();

        return (this.cpuThreshold && cpuUtil > this.cpuThreshold) ||
            (this.memoryThreshold && memUtil > this.memoryThreshold);
    }
}
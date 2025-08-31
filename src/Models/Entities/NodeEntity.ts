import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GenericEntity } from "./GenericTable";
import { User } from "./UserEntity";
import { Cluster } from "./ClusterEntity";
import { Device } from "./DeviceEntity";
import { NodeStatus } from "../../Enums/KubernetesEnum";

/**
 * Entidad que representa un nodo individual dentro de un cluster de Kubernetes
 * Incluye información de hardware, estado, recursos y métricas del nodo
 */
@Entity()
export class Node extends GenericEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
    public userId: User;

    @ManyToOne(() => Cluster, cluster => cluster.id)
    @JoinColumn({ name: 'cluster_id' })
    public clusterId: Cluster;

    @ManyToOne(() => Device, device => device.id, { nullable: true })
    @JoinColumn({ name: 'device_id' })
    public deviceId: Device;

    @Column({ nullable: false })
    public uuid: string;

    @Column({ nullable: false, length: 200, comment: 'Nombre del nodo' })
    public name: string;

    @Column({ nullable: true, type: 'text', comment: 'Descripción del nodo' })
    public description: string;

    @Column({ type: 'enum', enum: NodeStatus, nullable: false, comment: 'Estado del nodo' })
    public status: NodeStatus;

    // Información del nodo
    @Column({ nullable: false, length: 50, comment: 'Tipo de nodo' })
    public nodeType: string; // master, worker, etcd

    @Column({ nullable: false, length: 100, comment: 'Rol del nodo' })
    public role: string; // control-plane, worker, etcd

    @Column({ nullable: true, length: 100, comment: 'Hostname del nodo' })
    public hostname: string;

    @Column({ nullable: true, length: 50, comment: 'Dirección IP interna' })
    public internalIp: string;

    @Column({ nullable: true, length: 50, comment: 'Dirección IP externa' })
    public externalIp: string;

    @Column({ nullable: true, length: 100, comment: 'Zona de disponibilidad' })
    public availabilityZone: string;

    @Column({ nullable: true, length: 100, comment: 'Región' })
    public region: string;

    // Información del sistema operativo
    @Column({ nullable: true, length: 100, comment: 'Sistema operativo' })
    public operatingSystem: string;

    @Column({ nullable: true, length: 50, comment: 'Versión del OS' })
    public osVersion: string;

    @Column({ nullable: true, length: 100, comment: 'Imagen del OS' })
    public osImage: string;

    @Column({ nullable: true, length: 100, comment: 'Arquitectura del procesador' })
    public architecture: string; // amd64, arm64, etc.

    @Column({ nullable: true, length: 50, comment: 'Versión del kernel' })
    public kernelVersion: string;

    // Información de Kubernetes
    @Column({ nullable: false, length: 50, comment: 'Versión de kubelet' })
    public kubeletVersion: string;

    @Column({ nullable: true, length: 50, comment: 'Versión de kube-proxy' })
    public kubeProxyVersion: string;

    @Column({ nullable: true, length: 100, comment: 'Runtime de contenedores' })
    public containerRuntime: string; // docker, containerd, cri-o

    @Column({ nullable: true, length: 50, comment: 'Versión del runtime' })
    public containerRuntimeVersion: string;

    // Recursos de hardware
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false, comment: 'CPU total (cores)' })
    public totalCpu: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false, comment: 'CPU asignable (cores)' })
    public allocatableCpu: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false, comment: 'CPU utilizada (cores)' })
    public usedCpu: number;

    @Column({ type: 'bigint', nullable: false, comment: 'Memoria total (bytes)' })
    public totalMemory: number;

    @Column({ type: 'bigint', nullable: false, comment: 'Memoria asignable (bytes)' })
    public allocatableMemory: number;

    @Column({ type: 'bigint', nullable: false, comment: 'Memoria utilizada (bytes)' })
    public usedMemory: number;

    @Column({ type: 'bigint', nullable: false, comment: 'Almacenamiento total (bytes)' })
    public totalStorage: number;

    @Column({ type: 'bigint', nullable: false, comment: 'Almacenamiento asignable (bytes)' })
    public allocatableStorage: number;

    @Column({ type: 'bigint', nullable: false, comment: 'Almacenamiento utilizado (bytes)' })
    public usedStorage: number;

    @Column({ type: 'integer', nullable: false, comment: 'Número máximo de pods' })
    public maxPods: number;

    @Column({ type: 'integer', nullable: false, default: 0, comment: 'Número de pods actuales' })
    public currentPods: number;

    // Información de red
    @Column({ type: 'json', nullable: true, comment: 'Interfaces de red' })
    public networkInterfaces: {
        name: string;
        mac: string;
        ipAddress: string;
        netmask: string;
        mtu: number;
        speed: number; // Mbps
        duplex: string; // full, half
        state: string; // up, down
    }[];

    @Column({ nullable: true, length: 50, comment: 'CIDR de pods' })
    public podCidr: string;

    @Column({ type: 'json', nullable: true, comment: 'Configuración de red' })
    public networkConfig: {
        cniPlugin: string;
        cniVersion: string;
        bridgeName?: string;
        mtu?: number;
        ipMasq?: boolean;
        hairpinMode?: boolean;
    };

    // Condiciones del nodo
    @Column({ default: true, comment: 'Si el nodo está listo' })
    public ready: boolean;

    @Column({ default: false, comment: 'Si hay presión de memoria' })
    public memoryPressure: boolean;

    @Column({ default: false, comment: 'Si hay presión de disco' })
    public diskPressure: boolean;

    @Column({ default: false, comment: 'Si hay presión de PID' })
    public pidPressure: boolean;

    @Column({ default: false, comment: 'Si la red no está disponible' })
    public networkUnavailable: boolean;

    @Column({ type: 'timestamp', nullable: true, comment: 'Última vez que el nodo estuvo listo' })
    public lastReadyTime: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Última transición de estado' })
    public lastTransitionTime: Date;

    // Configuración de taints y tolerations
    @Column({ type: 'json', nullable: true, comment: 'Taints del nodo' })
    public taints: {
        key: string;
        value?: string;
        effect: string; // NoSchedule, PreferNoSchedule, NoExecute
        timeAdded?: Date;
    }[];

    @Column({ default: false, comment: 'Si el nodo está acordonado' })
    public cordoned: boolean;

    @Column({ default: false, comment: 'Si el nodo está siendo drenado' })
    public draining: boolean;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de acordonamiento' })
    public cordonedAt: Date;

    // Información de scheduling
    @Column({ default: true, comment: 'Si el nodo puede recibir pods' })
    public schedulable: boolean;

    @Column({ type: 'json', nullable: true, comment: 'Selectores de nodo' })
    public nodeSelectors: { [key: string]: string };

    @Column({ type: 'json', nullable: true, comment: 'Afinidad de nodo' })
    public nodeAffinity: {
        requiredDuringSchedulingIgnoredDuringExecution?: {
            nodeSelectorTerms: {
                matchExpressions?: {
                    key: string;
                    operator: string;
                    values?: string[];
                }[];
                matchFields?: {
                    key: string;
                    operator: string;
                    values?: string[];
                }[];
            }[];
        };
        preferredDuringSchedulingIgnoredDuringExecution?: {
            weight: number;
            preference: {
                matchExpressions?: {
                    key: string;
                    operator: string;
                    values?: string[];
                }[];
                matchFields?: {
                    key: string;
                    operator: string;
                    values?: string[];
                }[];
            };
        }[];
    };

    // Métricas de rendimiento
    @Column({ type: 'json', nullable: true, comment: 'Métricas de rendimiento del nodo' })
    public performanceMetrics: {
        // Métricas de CPU
        cpu?: {
            utilizationPercentage: number;
            loadAverage1m: number;
            loadAverage5m: number;
            loadAverage15m: number;
            contextSwitchesPerSecond: number;
            interruptsPerSecond: number;
        };
        
        // Métricas de memoria
        memory?: {
            utilizationPercentage: number;
            available: number;
            cached: number;
            buffers: number;
            swapUsed: number;
            swapTotal: number;
            pageFaultsPerSecond: number;
        };
        
        // Métricas de disco
        disk?: {
            utilizationPercentage: number;
            iopsRead: number;
            iopsWrite: number;
            throughputRead: number;
            throughputWrite: number;
            latencyMs: number;
            queueDepth: number;
        };
        
        // Métricas de red
        network?: {
            bytesReceivedPerSecond: number;
            bytesSentPerSecond: number;
            packetsReceivedPerSecond: number;
            packetsSentPerSecond: number;
            errorsPerSecond: number;
            droppedPacketsPerSecond: number;
        };
        
        // Métricas de contenedores
        containers?: {
            totalContainers: number;
            runningContainers: number;
            restartCount: number;
            imagesPulled: number;
            containerCreationRate: number;
        };
    };

    // Información de salud
    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true, comment: 'Porcentaje de uptime' })
    public uptimePercentage: number;

    @Column({ type: 'integer', nullable: true, comment: 'Tiempo de actividad en segundos' })
    public uptimeSeconds: number;

    @Column({ type: 'timestamp', nullable: true, comment: 'Última vez que estuvo inactivo' })
    public lastDowntime: Date;

    @Column({ type: 'integer', nullable: true, comment: 'Número de reinicios' })
    public restartCount: number;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha del último reinicio' })
    public lastRestartDate: Date;

    // Información temporal
    @Column({ type: 'timestamp', nullable: false, comment: 'Fecha de unión al cluster' })
    public joinedAt: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de última actualización' })
    public lastUpdated: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de último heartbeat' })
    public lastHeartbeat: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de próximo mantenimiento' })
    public nextMaintenanceDate: Date;

    // Información de costos
    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true, comment: 'Costo por hora del nodo' })
    public hourlyCost: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true, comment: 'Costo mensual estimado' })
    public monthlyCost: number;

    // Configuración de kubelet
    @Column({ type: 'json', nullable: true, comment: 'Configuración de kubelet' })
    public kubeletConfig: {
        maxPods?: number;
        podPidsLimit?: number;
        cgroupDriver?: string;
        cgroupRoot?: string;
        systemReserved?: { [resource: string]: string };
        kubeReserved?: { [resource: string]: string };
        evictionHard?: { [signal: string]: string };
        evictionSoft?: { [signal: string]: string };
        evictionSoftGracePeriod?: { [signal: string]: string };
        imageGcHighThreshold?: number;
        imageGcLowThreshold?: number;
        containerLogMaxSize?: string;
        containerLogMaxFiles?: number;
    };

    // Metadatos adicionales
    @Column({ type: 'json', nullable: true, comment: 'Etiquetas del nodo' })
    public labels: { [key: string]: string };

    @Column({ type: 'json', nullable: true, comment: 'Anotaciones del nodo' })
    public annotations: { [key: string]: string };

    @Column({ type: 'json', nullable: true, comment: 'Metadatos adicionales' })
    public metadata: {
        provider?: string;
        instanceType?: string;
        instanceId?: string;
        spot?: boolean;
        preemptible?: boolean;
        dedicatedHost?: boolean;
        placement?: {
            availabilityZone: string;
            region: string;
            hostId?: string;
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

    public getClusterId(): Cluster {
        return this.clusterId;
    }

    public setClusterId(clusterId: Cluster): void {
        this.clusterId = clusterId;
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

    public getStatus(): NodeStatus {
        return this.status;
    }

    public setStatus(status: NodeStatus): void {
        this.status = status;
    }

    // Métodos adicionales para cálculos
    public getCpuUtilizationPercentage(): number {
        if (this.allocatableCpu === 0) return 0;
        return (this.usedCpu / this.allocatableCpu) * 100;
    }

    public getMemoryUtilizationPercentage(): number {
        if (this.allocatableMemory === 0) return 0;
        return (this.usedMemory / this.allocatableMemory) * 100;
    }

    public getStorageUtilizationPercentage(): number {
        if (this.allocatableStorage === 0) return 0;
        return (this.usedStorage / this.allocatableStorage) * 100;
    }

    public getPodUtilizationPercentage(): number {
        if (this.maxPods === 0) return 0;
        return (this.currentPods / this.maxPods) * 100;
    }

    public getAvailableCpu(): number {
        return this.allocatableCpu - this.usedCpu;
    }

    public getAvailableMemory(): number {
        return this.allocatableMemory - this.usedMemory;
    }

    public getAvailableStorage(): number {
        return this.allocatableStorage - this.usedStorage;
    }

    public getAvailablePods(): number {
        return this.maxPods - this.currentPods;
    }

    public isHealthy(): boolean {
        return this.ready && 
               !this.memoryPressure && 
               !this.diskPressure && 
               !this.pidPressure && 
               !this.networkUnavailable;
    }

    public hasResourcePressure(): boolean {
        return this.memoryPressure || this.diskPressure || this.pidPressure;
    }

    public canSchedulePods(): boolean {
        return this.schedulable && 
               this.ready && 
               !this.cordoned && 
               !this.draining &&
               this.getAvailablePods() > 0;
    }

    public getHealthScore(): number {
        let score = 100;
        
        // Penalizar por condiciones problemáticas
        if (!this.ready) score -= 50;
        if (this.memoryPressure) score -= 20;
        if (this.diskPressure) score -= 20;
        if (this.pidPressure) score -= 15;
        if (this.networkUnavailable) score -= 25;
        
        // Penalizar por alta utilización
        const cpuUtil = this.getCpuUtilizationPercentage();
        const memUtil = this.getMemoryUtilizationPercentage();
        const podUtil = this.getPodUtilizationPercentage();
        
        if (cpuUtil > 90) score -= 15;
        else if (cpuUtil > 80) score -= 10;
        else if (cpuUtil > 70) score -= 5;
        
        if (memUtil > 90) score -= 15;
        else if (memUtil > 80) score -= 10;
        else if (memUtil > 70) score -= 5;
        
        if (podUtil > 95) score -= 10;
        else if (podUtil > 85) score -= 5;
        
        // Considerar uptime
        if (this.uptimePercentage) {
            score = score * (this.uptimePercentage / 100);
        }
        
        return Math.max(0, Math.min(100, score));
    }

    public needsAttention(): boolean {
        return !this.isHealthy() || 
               this.getCpuUtilizationPercentage() > 85 ||
               this.getMemoryUtilizationPercentage() > 85 ||
               this.getPodUtilizationPercentage() > 90;
    }

    public isMaster(): boolean {
        return this.nodeType === 'master' || this.role.includes('control-plane');
    }

    public isWorker(): boolean {
        return this.nodeType === 'worker' || this.role === 'worker';
    }

    public getResourceEfficiency(): number {
        const cpuEff = this.usedCpu / this.allocatableCpu;
        const memEff = this.usedMemory / this.allocatableMemory;
        const podEff = this.currentPods / this.maxPods;
        
        return (cpuEff + memEff + podEff) / 3;
    }

    public getAge(): number {
        const now = new Date();
        return Math.floor((now.getTime() - this.joinedAt.getTime()) / (1000 * 60 * 60 * 24));
    }

    public isStale(): boolean {
        if (!this.lastHeartbeat) return true;
        const now = new Date();
        const timeDiff = now.getTime() - this.lastHeartbeat.getTime();
        return timeDiff > 5 * 60 * 1000; // 5 minutos
    }
}
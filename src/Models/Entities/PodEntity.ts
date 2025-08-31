import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GenericEntity } from "./GenericTable";
import { User } from "./UserEntity";
import { Cluster } from "./ClusterEntity";
import { Node } from "./NodeEntity";
import { PodStatus, RestartPolicy, PullPolicy } from "../../Enums/KubernetesEnum";

/**
 * Entidad que representa un pod en Kubernetes
 * Incluye información de contenedores, recursos, estado y configuración
 */
@Entity()
export class Pod extends GenericEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
    public userId: User;

    @ManyToOne(() => Cluster, cluster => cluster.id)
    @JoinColumn({ name: 'cluster_id' })
    public clusterId: Cluster;

    @ManyToOne(() => Node, node => node.id, { nullable: true })
    @JoinColumn({ name: 'node_id' })
    public nodeId: Node;

    @Column({ nullable: false })
    public uuid: string;

    @Column({ nullable: false, length: 200, comment: 'Nombre del pod' })
    public name: string;

    @Column({ nullable: false, length: 100, comment: 'Namespace del pod' })
    public namespace: string;

    @Column({ nullable: true, type: 'text', comment: 'Descripción del pod' })
    public description: string;

    @Column({ type: 'enum', enum: PodStatus, nullable: false, comment: 'Estado del pod' })
    public status: PodStatus;

    @Column({ nullable: true, length: 200, comment: 'Razón del estado actual' })
    public statusReason: string;

    @Column({ nullable: true, type: 'text', comment: 'Mensaje del estado actual' })
    public statusMessage: string;

    // Información básica del pod
    @Column({ nullable: true, length: 50, comment: 'Dirección IP del pod' })
    public podIp: string;

    @Column({ nullable: true, length: 50, comment: 'IP del host' })
    public hostIp: string;

    @Column({ nullable: true, length: 100, comment: 'Red del pod' })
    public podNetwork: string;

    @Column({ type: 'enum', enum: RestartPolicy, nullable: false, default: RestartPolicy.ALWAYS, comment: 'Política de reinicio' })
    public restartPolicy: RestartPolicy;

    @Column({ type: 'integer', nullable: true, comment: 'Tiempo de gracia para terminación (segundos)' })
    public terminationGracePeriodSeconds: number;

    @Column({ type: 'integer', nullable: true, comment: 'Tiempo de gracia activo para terminación (segundos)' })
    public activeDeadlineSeconds: number;

    @Column({ nullable: true, length: 100, comment: 'Cuenta de servicio' })
    public serviceAccount: string;

    @Column({ default: false, comment: 'Si usa la cuenta de servicio por defecto' })
    public automountServiceAccountToken: boolean;

    // Información de scheduling
    @Column({ nullable: true, length: 100, comment: 'Nombre del nodo asignado' })
    public nodeName: string;

    @Column({ type: 'json', nullable: true, comment: 'Selectores de nodo' })
    public nodeSelector: { [key: string]: string };

    @Column({ type: 'json', nullable: true, comment: 'Tolerations del pod' })
    public tolerations: {
        key?: string;
        operator?: string; // Equal, Exists
        value?: string;
        effect?: string; // NoSchedule, PreferNoSchedule, NoExecute
        tolerationSeconds?: number;
    }[];

    @Column({ type: 'json', nullable: true, comment: 'Afinidad del pod' })
    public affinity: {
        nodeAffinity?: {
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
        podAffinity?: {
            requiredDuringSchedulingIgnoredDuringExecution?: {
                labelSelector?: {
                    matchExpressions?: {
                        key: string;
                        operator: string;
                        values?: string[];
                    }[];
                    matchLabels?: { [key: string]: string };
                };
                topologyKey: string;
                namespaces?: string[];
            }[];
            preferredDuringSchedulingIgnoredDuringExecution?: {
                weight: number;
                podAffinityTerm: {
                    labelSelector?: {
                        matchExpressions?: {
                            key: string;
                            operator: string;
                            values?: string[];
                        }[];
                        matchLabels?: { [key: string]: string };
                    };
                    topologyKey: string;
                    namespaces?: string[];
                };
            }[];
        };
        podAntiAffinity?: {
            requiredDuringSchedulingIgnoredDuringExecution?: {
                labelSelector?: {
                    matchExpressions?: {
                        key: string;
                        operator: string;
                        values?: string[];
                    }[];
                    matchLabels?: { [key: string]: string };
                };
                topologyKey: string;
                namespaces?: string[];
            }[];
            preferredDuringSchedulingIgnoredDuringExecution?: {
                weight: number;
                podAffinityTerm: {
                    labelSelector?: {
                        matchExpressions?: {
                            key: string;
                            operator: string;
                            values?: string[];
                        }[];
                        matchLabels?: { [key: string]: string };
                    };
                    topologyKey: string;
                    namespaces?: string[];
                };
            }[];
        };
    };

    @Column({ nullable: true, length: 100, comment: 'Clase de prioridad' })
    public priorityClassName: string;

    @Column({ type: 'integer', nullable: true, comment: 'Valor de prioridad' })
    public priority: number;

    @Column({ default: false, comment: 'Si puede ser desalojado' })
    public preemptionPolicy: boolean;

    // Información de contenedores
    @Column({ type: 'json', nullable: false, comment: 'Contenedores del pod' })
    public containers: {
        name: string;
        image: string;
        imageId?: string;
        imagePullPolicy: PullPolicy;
        command?: string[];
        args?: string[];
        workingDir?: string;
        ports?: {
            name?: string;
            containerPort: number;
            protocol?: string; // TCP, UDP, SCTP
            hostPort?: number;
            hostIP?: string;
        }[];
        env?: {
            name: string;
            value?: string;
            valueFrom?: {
                fieldRef?: {
                    fieldPath: string;
                    apiVersion?: string;
                };
                resourceFieldRef?: {
                    resource: string;
                    containerName?: string;
                    divisor?: string;
                };
                configMapKeyRef?: {
                    name: string;
                    key: string;
                    optional?: boolean;
                };
                secretKeyRef?: {
                    name: string;
                    key: string;
                    optional?: boolean;
                };
            };
        }[];
        resources?: {
            requests?: {
                cpu?: string;
                memory?: string;
                storage?: string;
                [key: string]: string;
            };
            limits?: {
                cpu?: string;
                memory?: string;
                storage?: string;
                [key: string]: string;
            };
        };
        volumeMounts?: {
            name: string;
            mountPath: string;
            subPath?: string;
            readOnly?: boolean;
            mountPropagation?: string;
        }[];
        livenessProbe?: {
            exec?: { command: string[] };
            httpGet?: {
                path?: string;
                port: number | string;
                host?: string;
                scheme?: string;
                httpHeaders?: { name: string; value: string }[];
            };
            tcpSocket?: { port: number | string; host?: string };
            initialDelaySeconds?: number;
            timeoutSeconds?: number;
            periodSeconds?: number;
            successThreshold?: number;
            failureThreshold?: number;
        };
        readinessProbe?: {
            exec?: { command: string[] };
            httpGet?: {
                path?: string;
                port: number | string;
                host?: string;
                scheme?: string;
                httpHeaders?: { name: string; value: string }[];
            };
            tcpSocket?: { port: number | string; host?: string };
            initialDelaySeconds?: number;
            timeoutSeconds?: number;
            periodSeconds?: number;
            successThreshold?: number;
            failureThreshold?: number;
        };
        startupProbe?: {
            exec?: { command: string[] };
            httpGet?: {
                path?: string;
                port: number | string;
                host?: string;
                scheme?: string;
                httpHeaders?: { name: string; value: string }[];
            };
            tcpSocket?: { port: number | string; host?: string };
            initialDelaySeconds?: number;
            timeoutSeconds?: number;
            periodSeconds?: number;
            successThreshold?: number;
            failureThreshold?: number;
        };
        lifecycle?: {
            postStart?: {
                exec?: { command: string[] };
                httpGet?: {
                    path?: string;
                    port: number | string;
                    host?: string;
                    scheme?: string;
                    httpHeaders?: { name: string; value: string }[];
                };
                tcpSocket?: { port: number | string; host?: string };
            };
            preStop?: {
                exec?: { command: string[] };
                httpGet?: {
                    path?: string;
                    port: number | string;
                    host?: string;
                    scheme?: string;
                    httpHeaders?: { name: string; value: string }[];
                };
                tcpSocket?: { port: number | string; host?: string };
            };
        };
        securityContext?: {
            runAsUser?: number;
            runAsGroup?: number;
            runAsNonRoot?: boolean;
            readOnlyRootFilesystem?: boolean;
            allowPrivilegeEscalation?: boolean;
            privileged?: boolean;
            capabilities?: {
                add?: string[];
                drop?: string[];
            };
            seLinuxOptions?: {
                level?: string;
                role?: string;
                type?: string;
                user?: string;
            };
        };
        stdin?: boolean;
        stdinOnce?: boolean;
        tty?: boolean;
        terminationMessagePath?: string;
        terminationMessagePolicy?: string;
    }[];

    @Column({ type: 'json', nullable: true, comment: 'Contenedores init' })
    public initContainers: {
        name: string;
        image: string;
        imageId?: string;
        imagePullPolicy: PullPolicy;
        command?: string[];
        args?: string[];
        workingDir?: string;
        env?: {
            name: string;
            value?: string;
            valueFrom?: any;
        }[];
        resources?: {
            requests?: { [key: string]: string };
            limits?: { [key: string]: string };
        };
        volumeMounts?: {
            name: string;
            mountPath: string;
            subPath?: string;
            readOnly?: boolean;
        }[];
        securityContext?: any;
    }[];

    @Column({ type: 'json', nullable: true, comment: 'Contenedores ephemeral' })
    public ephemeralContainers: {
        name: string;
        image: string;
        command?: string[];
        args?: string[];
        env?: {
            name: string;
            value?: string;
        }[];
        volumeMounts?: {
            name: string;
            mountPath: string;
            readOnly?: boolean;
        }[];
        targetContainerName?: string;
    }[];

    // Información de volúmenes
    @Column({ type: 'json', nullable: true, comment: 'Volúmenes del pod' })
    public volumes: {
        name: string;
        hostPath?: {
            path: string;
            type?: string;
        };
        emptyDir?: {
            medium?: string;
            sizeLimit?: string;
        };
        configMap?: {
            name: string;
            items?: {
                key: string;
                path: string;
                mode?: number;
            }[];
            defaultMode?: number;
            optional?: boolean;
        };
        secret?: {
            secretName: string;
            items?: {
                key: string;
                path: string;
                mode?: number;
            }[];
            defaultMode?: number;
            optional?: boolean;
        };
        persistentVolumeClaim?: {
            claimName: string;
            readOnly?: boolean;
        };
        nfs?: {
            server: string;
            path: string;
            readOnly?: boolean;
        };
        csi?: {
            driver: string;
            readOnly?: boolean;
            fsType?: string;
            volumeAttributes?: { [key: string]: string };
            nodePublishSecretRef?: {
                name: string;
            };
        };
    }[];

    // Información de seguridad
    @Column({ type: 'json', nullable: true, comment: 'Contexto de seguridad del pod' })
    public securityContext: {
        runAsUser?: number;
        runAsGroup?: number;
        runAsNonRoot?: boolean;
        fsGroup?: number;
        fsGroupChangePolicy?: string;
        supplementalGroups?: number[];
        seLinuxOptions?: {
            level?: string;
            role?: string;
            type?: string;
            user?: string;
        };
        sysctls?: {
            name: string;
            value: string;
        }[];
    };

    @Column({ type: 'json', nullable: true, comment: 'Secretos para pull de imágenes' })
    public imagePullSecrets: {
        name: string;
    }[];

    // Información de DNS
    @Column({ nullable: true, length: 100, comment: 'Política de DNS' })
    public dnsPolicy: string; // ClusterFirst, ClusterFirstWithHostNet, Default, None

    @Column({ type: 'json', nullable: true, comment: 'Configuración de DNS' })
    public dnsConfig: {
        nameservers?: string[];
        searches?: string[];
        options?: {
            name: string;
            value?: string;
        }[];
    };

    @Column({ nullable: true, length: 100, comment: 'Hostname del pod' })
    public hostname: string;

    @Column({ nullable: true, length: 100, comment: 'Subdomain del pod' })
    public subdomain: string;

    @Column({ default: false, comment: 'Si usa la red del host' })
    public hostNetwork: boolean;

    @Column({ default: false, comment: 'Si usa el PID del host' })
    public hostPID: boolean;

    @Column({ default: false, comment: 'Si usa el IPC del host' })
    public hostIPC: boolean;

    // Estado de los contenedores
    @Column({ type: 'json', nullable: true, comment: 'Estados de los contenedores' })
    public containerStatuses: {
        name: string;
        state: {
            waiting?: {
                reason?: string;
                message?: string;
            };
            running?: {
                startedAt?: Date;
            };
            terminated?: {
                exitCode: number;
                signal?: number;
                reason?: string;
                message?: string;
                startedAt?: Date;
                finishedAt?: Date;
                containerID?: string;
            };
        };
        lastState?: {
            waiting?: {
                reason?: string;
                message?: string;
            };
            running?: {
                startedAt?: Date;
            };
            terminated?: {
                exitCode: number;
                signal?: number;
                reason?: string;
                message?: string;
                startedAt?: Date;
                finishedAt?: Date;
                containerID?: string;
            };
        };
        ready: boolean;
        restartCount: number;
        image: string;
        imageID: string;
        containerID?: string;
        started?: boolean;
    }[];

    @Column({ type: 'json', nullable: true, comment: 'Estados de los contenedores init' })
    public initContainerStatuses: {
        name: string;
        state: any;
        lastState?: any;
        ready: boolean;
        restartCount: number;
        image: string;
        imageID: string;
        containerID?: string;
    }[];

    @Column({ type: 'json', nullable: true, comment: 'Estados de los contenedores ephemeral' })
    public ephemeralContainerStatuses: {
        name: string;
        state: any;
        lastState?: any;
        ready: boolean;
        restartCount: number;
        image: string;
        imageID: string;
        containerID?: string;
    }[];

    // Condiciones del pod
    @Column({ type: 'json', nullable: true, comment: 'Condiciones del pod' })
    public conditions: {
        type: string; // PodScheduled, Ready, Initialized, ContainersReady
        status: string; // True, False, Unknown
        lastProbeTime?: Date;
        lastTransitionTime?: Date;
        reason?: string;
        message?: string;
    }[];

    // Información temporal
    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de creación' })
    public createdAt: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de inicio' })
    public startedAt: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de finalización' })
    public finishedAt: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de eliminación' })
    public deletionTimestamp: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de última actualización' })
    public lastUpdated: Date;

    // Información de recursos
    @Column({ type: 'json', nullable: true, comment: 'Uso actual de recursos' })
    public resourceUsage: {
        cpu?: {
            usage: string;
            percentage: number;
        };
        memory?: {
            usage: string;
            percentage: number;
        };
        storage?: {
            usage: string;
            percentage: number;
        };
    };

    // Información de costos
    @Column({ type: 'decimal', precision: 15, scale: 6, nullable: true, comment: 'Costo por hora del pod' })
    public hourlyCost: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true, comment: 'Costo acumulado' })
    public accumulatedCost: number;

    // Metadatos
    @Column({ type: 'json', nullable: true, comment: 'Etiquetas del pod' })
    public labels: { [key: string]: string };

    @Column({ type: 'json', nullable: true, comment: 'Anotaciones del pod' })
    public annotations: { [key: string]: string };

    @Column({ type: 'json', nullable: true, comment: 'Metadatos adicionales' })
    public metadata: {
        ownerReferences?: {
            apiVersion: string;
            kind: string;
            name: string;
            uid: string;
            controller?: boolean;
            blockOwnerDeletion?: boolean;
        }[];
        finalizers?: string[];
        managedFields?: any[];
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

    public getNodeId(): Node {
        return this.nodeId;
    }

    public setNodeId(nodeId: Node): void {
        this.nodeId = nodeId;
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

    public getNamespace(): string {
        return this.namespace;
    }

    public setNamespace(namespace: string): void {
        this.namespace = namespace;
    }

    public getStatus(): PodStatus {
        return this.status;
    }

    public setStatus(status: PodStatus): void {
        this.status = status;
    }

    // Métodos adicionales para análisis
    public isRunning(): boolean {
        return this.status === PodStatus.RUNNING;
    }

    public isPending(): boolean {
        return this.status === PodStatus.PENDING;
    }

    public isSucceeded(): boolean {
        return this.status === PodStatus.SUCCEEDED;
    }

    public isFailed(): boolean {
        return this.status === PodStatus.FAILED;
    }

    public isReady(): boolean {
        if (!this.conditions) return false;
        const readyCondition = this.conditions.find(c => c.type === 'Ready');
        return readyCondition?.status === 'True';
    }

    public areContainersReady(): boolean {
        if (!this.conditions) return false;
        const containersReadyCondition = this.conditions.find(c => c.type === 'ContainersReady');
        return containersReadyCondition?.status === 'True';
    }

    public isScheduled(): boolean {
        if (!this.conditions) return false;
        const scheduledCondition = this.conditions.find(c => c.type === 'PodScheduled');
        return scheduledCondition?.status === 'True';
    }

    public isInitialized(): boolean {
        if (!this.conditions) return false;
        const initializedCondition = this.conditions.find(c => c.type === 'Initialized');
        return initializedCondition?.status === 'True';
    }

    public getRestartCount(): number {
        if (!this.containerStatuses) return 0;
        return this.containerStatuses.reduce((total, container) => total + container.restartCount, 0);
    }

    public getRunningContainers(): number {
        if (!this.containerStatuses) return 0;
        return this.containerStatuses.filter(container => container.state.running).length;
    }

    public getWaitingContainers(): number {
        if (!this.containerStatuses) return 0;
        return this.containerStatuses.filter(container => container.state.waiting).length;
    }

    public getTerminatedContainers(): number {
        if (!this.containerStatuses) return 0;
        return this.containerStatuses.filter(container => container.state.terminated).length;
    }

    public getTotalContainers(): number {
        return this.containers ? this.containers.length : 0;
    }

    public getAge(): number {
        if (!this.createdAt) return 0;
        const now = new Date();
        return Math.floor((now.getTime() - this.createdAt.getTime()) / (1000 * 60 * 60 * 24));
    }

    public getUptime(): number {
        if (!this.startedAt) return 0;
        const now = new Date();
        return Math.floor((now.getTime() - this.startedAt.getTime()) / 1000);
    }

    public isBeingDeleted(): boolean {
        return this.deletionTimestamp !== null && this.deletionTimestamp !== undefined;
    }

    public hasResourceRequests(): boolean {
        if (!this.containers) return false;
        return this.containers.some(container => 
            container.resources?.requests && 
            Object.keys(container.resources.requests).length > 0
        );
    }

    public hasResourceLimits(): boolean {
        if (!this.containers) return false;
        return this.containers.some(container => 
            container.resources?.limits && 
            Object.keys(container.resources.limits).length > 0
        );
    }

    public getTotalCpuRequests(): number {
        if (!this.containers) return 0;
        return this.containers.reduce((total, container) => {
            const cpuRequest = container.resources?.requests?.cpu;
            if (cpuRequest) {
                // Convertir diferentes unidades a cores
                if (cpuRequest.endsWith('m')) {
                    return total + (parseInt(cpuRequest.slice(0, -1)) / 1000);
                }
                return total + parseFloat(cpuRequest);
            }
            return total;
        }, 0);
    }

    public getTotalMemoryRequests(): number {
        if (!this.containers) return 0;
        return this.containers.reduce((total, container) => {
            const memoryRequest = container.resources?.requests?.memory;
            if (memoryRequest) {
                // Convertir diferentes unidades a bytes
                return total + this.parseMemoryToBytes(memoryRequest);
            }
            return total;
        }, 0);
    }

    public getTotalCpuLimits(): number {
        if (!this.containers) return 0;
        return this.containers.reduce((total, container) => {
            const cpuLimit = container.resources?.limits?.cpu;
            if (cpuLimit) {
                if (cpuLimit.endsWith('m')) {
                    return total + (parseInt(cpuLimit.slice(0, -1)) / 1000);
                }
                return total + parseFloat(cpuLimit);
            }
            return total;
        }, 0);
    }

    public getTotalMemoryLimits(): number {
        if (!this.containers) return 0;
        return this.containers.reduce((total, container) => {
            const memoryLimit = container.resources?.limits?.memory;
            if (memoryLimit) {
                return total + this.parseMemoryToBytes(memoryLimit);
            }
            return total;
        }, 0);
    }

    private parseMemoryToBytes(memory: string): number {
        const units = {
            'Ki': 1024,
            'Mi': 1024 * 1024,
            'Gi': 1024 * 1024 * 1024,
            'Ti': 1024 * 1024 * 1024 * 1024,
            'K': 1000,
            'M': 1000 * 1000,
            'G': 1000 * 1000 * 1000,
            'T': 1000 * 1000 * 1000 * 1000
        };

        for (const [suffix, multiplier] of Object.entries(units)) {
            if (memory.endsWith(suffix)) {
                return parseFloat(memory.slice(0, -suffix.length)) * multiplier;
            }
        }
        
        // Si no tiene unidad, asumir bytes
        return parseFloat(memory);
    }

    public getHealthScore(): number {
        let score = 100;
        
        // Penalizar por estado no saludable
        if (this.isFailed()) score -= 50;
        else if (this.isPending()) score -= 30;
        else if (!this.isRunning()) score -= 20;
        
        // Penalizar por contenedores no listos
        if (!this.isReady()) score -= 25;
        if (!this.areContainersReady()) score -= 20;
        
        // Penalizar por reinicios frecuentes
        const restartCount = this.getRestartCount();
        if (restartCount > 10) score -= 30;
        else if (restartCount > 5) score -= 20;
        else if (restartCount > 2) score -= 10;
        
        // Penalizar por contenedores en espera o terminados
        const waitingContainers = this.getWaitingContainers();
        const terminatedContainers = this.getTerminatedContainers();
        
        score -= (waitingContainers * 15);
        score -= (terminatedContainers * 10);
        
        return Math.max(0, Math.min(100, score));
    }

    public needsAttention(): boolean {
        return this.isFailed() || 
               !this.isReady() || 
               this.getRestartCount() > 5 ||
               this.getWaitingContainers() > 0;
    }

    public getQualityOfService(): string {
        const hasRequests = this.hasResourceRequests();
        const hasLimits = this.hasResourceLimits();
        
        if (!hasRequests && !hasLimits) {
            return 'BestEffort';
        }
        
        if (hasRequests && hasLimits) {
            // Verificar si requests == limits para todos los recursos
            const cpuRequests = this.getTotalCpuRequests();
            const cpuLimits = this.getTotalCpuLimits();
            const memoryRequests = this.getTotalMemoryRequests();
            const memoryLimits = this.getTotalMemoryLimits();
            
            if (cpuRequests === cpuLimits && memoryRequests === memoryLimits) {
                return 'Guaranteed';
            }
        }
        
        return 'Burstable';
    }
}
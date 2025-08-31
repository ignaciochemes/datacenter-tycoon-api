import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GenericEntity } from "./GenericTable";
import { User } from "./UserEntity";
import { Datacenter } from "./DatacenterEntity";
import { Device } from "./DeviceEntity";
import { Service } from "./ServiceEntity";
import { Contract } from "./ContractEntity";
import { IncidentType, IncidentSeverity, IncidentStatus } from "../../Enums/SystemEnum";

/**
 * Entidad que representa los incidentes que pueden ocurrir en el simulador
 * Incluye fallos de hardware, problemas de red, incidentes de seguridad, etc.
 */
@Entity()
export class Incident extends GenericEntity {
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

    @ManyToOne(() => Service, service => service.id, { nullable: true })
    @JoinColumn({ name: 'service_id' })
    public serviceId: Service;

    @ManyToOne(() => Contract, contract => contract.id, { nullable: true })
    @JoinColumn({ name: 'contract_id' })
    public contractId: Contract;

    @Column({ nullable: false })
    public uuid: string;

    @Column({ nullable: false, length: 255 })
    public incidentNumber: string;

    @Column({ nullable: false, length: 500 })
    public title: string;

    @Column({ nullable: true, type: 'text' })
    public description: string;

    @Column({ type: 'enum', enum: IncidentType, nullable: false })
    public type: IncidentType;

    @Column({ type: 'enum', enum: IncidentSeverity, nullable: false })
    public severity: IncidentSeverity;

    @Column({ type: 'enum', enum: IncidentStatus, nullable: false })
    public status: IncidentStatus;

    // Información temporal del incidente
    @Column({ type: 'timestamp', nullable: false, comment: 'Fecha y hora de detección del incidente' })
    public detectedAt: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha y hora de inicio del incidente' })
    public startedAt: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha y hora de asignación' })
    public assignedAt: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha y hora de inicio de trabajo' })
    public workStartedAt: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha y hora de resolución' })
    public resolvedAt: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha y hora de cierre' })
    public closedAt: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha y hora de escalamiento' })
    public escalatedAt: Date;

    // Información de asignación y responsabilidad
    @Column({ nullable: true, comment: 'Usuario asignado para resolver el incidente' })
    public assignedTo: string;

    @Column({ nullable: true, comment: 'Equipo responsable del incidente' })
    public assignedTeam: string;

    @Column({ nullable: true, comment: 'Usuario que reportó el incidente' })
    public reportedBy: string;

    @Column({ nullable: true, comment: 'Usuario que resolvió el incidente' })
    public resolvedBy: string;

    @Column({ nullable: true, comment: 'Usuario que cerró el incidente' })
    public closedBy: string;

    // Información de impacto
    @Column({ type: 'integer', nullable: true, comment: 'Número de usuarios afectados' })
    public affectedUsers: number;

    @Column({ type: 'integer', nullable: true, comment: 'Número de servicios afectados' })
    public affectedServices: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true, comment: 'Pérdida financiera estimada' })
    public estimatedFinancialLoss: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true, comment: 'Porcentaje de downtime' })
    public downtimePercentage: number;

    @Column({ type: 'integer', nullable: true, comment: 'Duración del downtime en minutos' })
    public downtimeMinutes: number;

    // SLA y métricas de tiempo
    @Column({ type: 'integer', nullable: true, comment: 'Tiempo objetivo de respuesta en minutos' })
    public slaResponseTimeMinutes: number;

    @Column({ type: 'integer', nullable: true, comment: 'Tiempo objetivo de resolución en minutos' })
    public slaResolutionTimeMinutes: number;

    @Column({ type: 'integer', nullable: true, comment: 'Tiempo real de respuesta en minutos' })
    public actualResponseTimeMinutes: number;

    @Column({ type: 'integer', nullable: true, comment: 'Tiempo real de resolución en minutos' })
    public actualResolutionTimeMinutes: number;

    @Column({ default: false, comment: 'Si se cumplió el SLA de respuesta' })
    public slaResponseMet: boolean;

    @Column({ default: false, comment: 'Si se cumplió el SLA de resolución' })
    public slaResolutionMet: boolean;

    // Información de la causa raíz
    @Column({ nullable: true, length: 500, comment: 'Causa raíz del incidente' })
    public rootCause: string;

    @Column({ nullable: true, type: 'text', comment: 'Análisis detallado de la causa raíz' })
    public rootCauseAnalysis: string;

    @Column({ nullable: true, length: 200, comment: 'Categoría de la causa raíz' })
    public rootCauseCategory: string;

    @Column({ default: false, comment: 'Si fue causado por error humano' })
    public humanError: boolean;

    @Column({ default: false, comment: 'Si fue causado por fallo de hardware' })
    public hardwareFailure: boolean;

    @Column({ default: false, comment: 'Si fue causado por fallo de software' })
    public softwareFailure: boolean;

    @Column({ default: false, comment: 'Si fue causado por factor externo' })
    public externalFactor: boolean;

    // Información de resolución
    @Column({ nullable: true, type: 'text', comment: 'Descripción de la solución aplicada' })
    public resolution: string;

    @Column({ nullable: true, type: 'text', comment: 'Pasos realizados para resolver el incidente' })
    public resolutionSteps: string;

    @Column({ nullable: true, type: 'text', comment: 'Acciones preventivas implementadas' })
    public preventiveActions: string;

    @Column({ default: false, comment: 'Si requiere seguimiento posterior' })
    public requiresFollowUp: boolean;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha programada para seguimiento' })
    public followUpDate: Date;

    // Información de comunicación
    @Column({ default: false, comment: 'Si se notificó a los clientes' })
    public customersNotified: boolean;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de notificación a clientes' })
    public customerNotificationDate: Date;

    @Column({ nullable: true, type: 'text', comment: 'Mensaje enviado a los clientes' })
    public customerNotificationMessage: string;

    @Column({ default: false, comment: 'Si se publicó en página de estado' })
    public publishedOnStatusPage: boolean;

    // Información de escalamiento
    @Column({ default: false, comment: 'Si el incidente fue escalado' })
    public wasEscalated: boolean;

    @Column({ nullable: true, comment: 'Razón del escalamiento' })
    public escalationReason: string;

    @Column({ nullable: true, comment: 'Nivel de escalamiento' })
    public escalationLevel: string;

    @Column({ nullable: true, comment: 'A quién se escaló' })
    public escalatedTo: string;

    // Información de recurrencia
    @Column({ default: false, comment: 'Si es un incidente recurrente' })
    public isRecurring: boolean;

    @Column({ type: 'integer', nullable: true, comment: 'Número de veces que ha ocurrido' })
    public occurrenceCount: number;

    @Column({ type: 'integer', nullable: true, comment: 'ID del incidente padre (si es recurrente)' })
    public parentIncidentId: number;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha del último incidente similar' })
    public lastOccurrenceDate: Date;

    // Información de monitoreo
    @Column({ nullable: true, comment: 'Sistema de monitoreo que detectó el incidente' })
    public detectedBySystem: string;

    @Column({ nullable: true, comment: 'Alerta o regla que disparó la detección' })
    public detectionRule: string;

    @Column({ default: false, comment: 'Si fue detectado automáticamente' })
    public autoDetected: boolean;

    @Column({ default: false, comment: 'Si se resolvió automáticamente' })
    public autoResolved: boolean;

    // Información de costos
    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true, comment: 'Costo de resolución' })
    public resolutionCost: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true, comment: 'Costo de tiempo de personal' })
    public laborCost: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true, comment: 'Costo de reemplazo de hardware' })
    public hardwareReplacementCost: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true, comment: 'Penalizaciones por SLA' })
    public slaPenalties: number;

    // Información de satisfacción del cliente
    @Column({ type: 'integer', nullable: true, comment: 'Calificación de satisfacción del cliente (1-10)' })
    public customerSatisfactionRating: number;

    @Column({ nullable: true, type: 'text', comment: 'Comentarios del cliente sobre la resolución' })
    public customerFeedback: string;

    // Información adicional y metadatos
    @Column({ type: 'json', nullable: true, comment: 'Logs y evidencia técnica del incidente' })
    public technicalEvidence: {
        logs?: string[];
        screenshots?: string[];
        errorMessages?: string[];
        systemMetrics?: any;
        networkTraces?: any;
        performanceData?: any;
    };

    @Column({ type: 'json', nullable: true, comment: 'Información de cambios relacionados' })
    public relatedChanges: {
        changeRequests?: number[];
        deployments?: string[];
        configurationChanges?: any[];
        maintenanceActivities?: any[];
    };

    @Column({ type: 'json', nullable: true, comment: 'Incidentes relacionados' })
    public relatedIncidents: {
        parentIncidents?: number[];
        childIncidents?: number[];
        similarIncidents?: number[];
        duplicateIncidents?: number[];
    };

    @Column({ type: 'json', nullable: true, comment: 'Metadatos adicionales del incidente' })
    public metadata: {
        tags?: string[];
        priority?: string;
        businessImpact?: string;
        affectedRegions?: string[];
        weatherConditions?: string;
        specialCircumstances?: string;
        lessonsLearned?: string[];
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

    public getServiceId(): Service {
        return this.serviceId;
    }

    public setServiceId(serviceId: Service): void {
        this.serviceId = serviceId;
    }

    public getContractId(): Contract {
        return this.contractId;
    }

    public setContractId(contractId: Contract): void {
        this.contractId = contractId;
    }

    public getUuid(): string {
        return this.uuid;
    }

    public setUuid(uuid: string): void {
        this.uuid = uuid;
    }

    public getIncidentNumber(): string {
        return this.incidentNumber;
    }

    public setIncidentNumber(incidentNumber: string): void {
        this.incidentNumber = incidentNumber;
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getType(): IncidentType {
        return this.type;
    }

    public setType(type: IncidentType): void {
        this.type = type;
    }

    public getSeverity(): IncidentSeverity {
        return this.severity;
    }

    public setSeverity(severity: IncidentSeverity): void {
        this.severity = severity;
    }

    public getStatus(): IncidentStatus {
        return this.status;
    }

    public setStatus(status: IncidentStatus): void {
        this.status = status;
    }

    public getDetectedAt(): Date {
        return this.detectedAt;
    }

    public setDetectedAt(detectedAt: Date): void {
        this.detectedAt = detectedAt;
    }

    public getStartedAt(): Date {
        return this.startedAt;
    }

    public setStartedAt(startedAt: Date): void {
        this.startedAt = startedAt;
    }

    public getAssignedAt(): Date {
        return this.assignedAt;
    }

    public setAssignedAt(assignedAt: Date): void {
        this.assignedAt = assignedAt;
    }

    public getWorkStartedAt(): Date {
        return this.workStartedAt;
    }

    public setWorkStartedAt(workStartedAt: Date): void {
        this.workStartedAt = workStartedAt;
    }

    public getResolvedAt(): Date {
        return this.resolvedAt;
    }

    public setResolvedAt(resolvedAt: Date): void {
        this.resolvedAt = resolvedAt;
    }

    public getClosedAt(): Date {
        return this.closedAt;
    }

    public setClosedAt(closedAt: Date): void {
        this.closedAt = closedAt;
    }

    public getEscalatedAt(): Date {
        return this.escalatedAt;
    }

    public setEscalatedAt(escalatedAt: Date): void {
        this.escalatedAt = escalatedAt;
    }

    public getAssignedTo(): string {
        return this.assignedTo;
    }

    public setAssignedTo(assignedTo: string): void {
        this.assignedTo = assignedTo;
    }

    public getAssignedTeam(): string {
        return this.assignedTeam;
    }

    public setAssignedTeam(assignedTeam: string): void {
        this.assignedTeam = assignedTeam;
    }

    public getReportedBy(): string {
        return this.reportedBy;
    }

    public setReportedBy(reportedBy: string): void {
        this.reportedBy = reportedBy;
    }

    public getResolvedBy(): string {
        return this.resolvedBy;
    }

    public setResolvedBy(resolvedBy: string): void {
        this.resolvedBy = resolvedBy;
    }

    public getClosedBy(): string {
        return this.closedBy;
    }

    public setClosedBy(closedBy: string): void {
        this.closedBy = closedBy;
    }

    // Métodos adicionales para cálculos
    public calculateResponseTime(): number {
        if (this.detectedAt && this.assignedAt) {
            return Math.floor((this.assignedAt.getTime() - this.detectedAt.getTime()) / (1000 * 60));
        }
        return null;
    }

    public calculateResolutionTime(): number {
        if (this.detectedAt && this.resolvedAt) {
            return Math.floor((this.resolvedAt.getTime() - this.detectedAt.getTime()) / (1000 * 60));
        }
        return null;
    }

    public isOverdue(): boolean {
        if (this.status === IncidentStatus.RESOLVED || this.status === IncidentStatus.CLOSED) {
            return false;
        }
        
        const now = new Date();
        const elapsedMinutes = Math.floor((now.getTime() - this.detectedAt.getTime()) / (1000 * 60));
        
        return elapsedMinutes > this.slaResolutionTimeMinutes;
    }

    public getTotalCost(): number {
        let total = 0;
        if (this.resolutionCost) total += this.resolutionCost;
        if (this.laborCost) total += this.laborCost;
        if (this.hardwareReplacementCost) total += this.hardwareReplacementCost;
        if (this.slaPenalties) total += this.slaPenalties;
        if (this.estimatedFinancialLoss) total += this.estimatedFinancialLoss;
        return total;
    }
}
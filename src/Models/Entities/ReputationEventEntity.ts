import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GenericEntity } from "./GenericTable";
import { User } from "./UserEntity";
import { Contract } from "./ContractEntity";
import { Service } from "./ServiceEntity";
import { Incident } from "./IncidentEntity";
import { ReputationEventType } from "../../Enums/SystemEnum";

/**
 * Entidad que representa los eventos que afectan la reputación de los usuarios
 * Incluye cumplimiento de SLAs, resolución de incidentes, satisfacción del cliente, etc.
 */
@Entity()
export class ReputationEvent extends GenericEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
    public userId: User;

    @ManyToOne(() => Contract, contract => contract.id, { nullable: true })
    @JoinColumn({ name: 'contract_id' })
    public contractId: Contract;

    @ManyToOne(() => Service, service => service.id, { nullable: true })
    @JoinColumn({ name: 'service_id' })
    public serviceId: Service;

    @ManyToOne(() => Incident, incident => incident.id, { nullable: true })
    @JoinColumn({ name: 'incident_id' })
    public incidentId: Incident;

    @Column({ nullable: false })
    public uuid: string;

    @Column({ type: 'enum', enum: ReputationEventType, nullable: false })
    public eventType: ReputationEventType;

    @Column({ nullable: false, length: 500 })
    public title: string;

    @Column({ nullable: true, type: 'text' })
    public description: string;

    // Información del impacto en la reputación
    @Column({ type: 'decimal', precision: 8, scale: 4, nullable: false, comment: 'Cambio en puntos de reputación' })
    public reputationChange: number;

    @Column({ type: 'decimal', precision: 8, scale: 4, nullable: true, comment: 'Reputación antes del evento' })
    public previousReputation: number;

    @Column({ type: 'decimal', precision: 8, scale: 4, nullable: true, comment: 'Reputación después del evento' })
    public newReputation: number;

    @Column({ nullable: true, length: 100, comment: 'Categoría del evento de reputación' })
    public category: string;

    @Column({ nullable: true, length: 100, comment: 'Subcategoría del evento' })
    public subcategory: string;

    // Información temporal
    @Column({ type: 'timestamp', nullable: false, comment: 'Fecha y hora del evento' })
    public eventDate: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de expiración del impacto' })
    public expirationDate: Date;

    @Column({ default: false, comment: 'Si el evento ha expirado' })
    public isExpired: boolean;

    @Column({ default: true, comment: 'Si el evento está activo' })
    public isActive: boolean;

    // Información de severidad e impacto
    @Column({ nullable: true, length: 50, comment: 'Nivel de severidad del evento' })
    public severity: string; // LOW, MEDIUM, HIGH, CRITICAL

    @Column({ type: 'integer', nullable: true, comment: 'Peso del evento (1-100)' })
    public weight: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true, comment: 'Multiplicador de impacto' })
    public impactMultiplier: number;

    // Información específica del evento
    @Column({ type: 'json', nullable: true, comment: 'Detalles específicos del evento de reputación' })
    public eventDetails: {
        // Para eventos de SLA
        slaEvent?: {
            slaType: string; // uptime, latency, throughput
            targetValue: number;
            actualValue: number;
            compliancePercentage: number;
            measurementPeriod: string;
            consecutiveBreaches?: number;
        };

        // Para eventos de incidentes
        incidentEvent?: {
            incidentSeverity: string;
            resolutionTimeMinutes: number;
            slaResolutionTimeMinutes: number;
            customerImpact: string;
            rootCause: string;
            preventable: boolean;
        };

        // Para eventos de satisfacción del cliente
        customerSatisfactionEvent?: {
            rating: number; // 1-10
            previousRating?: number;
            surveyType: string;
            responseCount: number;
            comments?: string[];
        };

        // Para eventos de calidad de servicio
        serviceQualityEvent?: {
            metricType: string; // performance, availability, reliability
            score: number;
            benchmark: number;
            improvementPercentage?: number;
            measurementPeriod: string;
        };

        // Para eventos de innovación
        innovationEvent?: {
            innovationType: string; // new_service, technology_upgrade, process_improvement
            investmentAmount?: number;
            expectedBenefit: string;
            adoptionRate?: number;
        };

        // Para eventos de cumplimiento
        complianceEvent?: {
            complianceType: string; // security, regulatory, industry_standard
            certificationName?: string;
            auditScore?: number;
            violationsCount?: number;
        };

        // Para eventos de mercado
        marketEvent?: {
            marketShare?: number;
            competitorComparison?: string;
            industryRanking?: number;
            marketTrend: string;
        };
    };

    // Información de validación y verificación
    @Column({ default: false, comment: 'Si el evento ha sido verificado' })
    public isVerified: boolean;

    @Column({ nullable: true, comment: 'Usuario que verificó el evento' })
    public verifiedBy: string;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de verificación' })
    public verifiedAt: Date;

    @Column({ default: false, comment: 'Si el evento fue generado automáticamente' })
    public isAutoGenerated: boolean;

    @Column({ nullable: true, comment: 'Sistema que generó el evento automáticamente' })
    public generatedBySystem: string;

    // Información de visibilidad
    @Column({ default: true, comment: 'Si el evento es visible públicamente' })
    public isPublic: boolean;

    @Column({ default: false, comment: 'Si el evento es destacado' })
    public isFeatured: boolean;

    @Column({ default: false, comment: 'Si el evento aparece en el perfil público' })
    public showInProfile: boolean;

    // Información de contexto
    @Column({ nullable: true, comment: 'Región geográfica del evento' })
    public region: string;

    @Column({ nullable: true, comment: 'Industria o sector relacionado' })
    public industry: string;

    @Column({ nullable: true, comment: 'Tamaño del cliente afectado' })
    public customerSize: string; // small, medium, large, enterprise

    // Información de tendencias
    @Column({ default: false, comment: 'Si es parte de una tendencia positiva' })
    public isPartOfPositiveTrend: boolean;

    @Column({ default: false, comment: 'Si es parte de una tendencia negativa' })
    public isPartOfNegativeTrend: boolean;

    @Column({ type: 'integer', nullable: true, comment: 'Número de eventos similares en el período' })
    public similarEventsCount: number;

    @Column({ type: 'integer', nullable: true, comment: 'Días desde el último evento similar' })
    public daysSinceLastSimilarEvent: number;

    // Información de recuperación
    @Column({ default: false, comment: 'Si es un evento de recuperación' })
    public isRecoveryEvent: boolean;

    @Column({ type: 'integer', nullable: true, comment: 'ID del evento negativo que se está recuperando' })
    public recoversFromEventId: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true, comment: 'Porcentaje de recuperación' })
    public recoveryPercentage: number;

    // Información de competencia
    @Column({ type: 'json', nullable: true, comment: 'Comparación con competidores' })
    public competitorComparison: {
        competitorName?: string;
        ourScore?: number;
        competitorScore?: number;
        industryAverage?: number;
        ranking?: number;
        totalCompetitors?: number;
    };

    // Información de impacto en el negocio
    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true, comment: 'Impacto financiero estimado' })
    public estimatedFinancialImpact: number;

    @Column({ type: 'integer', nullable: true, comment: 'Número de clientes afectados' })
    public affectedCustomers: number;

    @Column({ type: 'integer', nullable: true, comment: 'Número de contratos afectados' })
    public affectedContracts: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, comment: 'Ingresos afectados' })
    public affectedRevenue: number;

    // Información de comunicación
    @Column({ default: false, comment: 'Si se comunicó a los stakeholders' })
    public communicatedToStakeholders: boolean;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de comunicación' })
    public communicationDate: Date;

    @Column({ nullable: true, type: 'text', comment: 'Mensaje de comunicación' })
    public communicationMessage: string;

    @Column({ type: 'json', nullable: true, comment: 'Canales de comunicación utilizados' })
    public communicationChannels: string[];

    // Información de seguimiento
    @Column({ default: false, comment: 'Si requiere seguimiento' })
    public requiresFollowUp: boolean;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de seguimiento programada' })
    public followUpDate: Date;

    @Column({ nullable: true, type: 'text', comment: 'Notas de seguimiento' })
    public followUpNotes: string;

    // Metadatos adicionales
    @Column({ type: 'json', nullable: true, comment: 'Metadatos adicionales del evento' })
    public metadata: {
        tags?: string[];
        sourceSystem?: string;
        correlationId?: string;
        batchId?: string;
        processingNotes?: string;
        qualityScore?: number;
        confidenceLevel?: number;
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

    public getContractId(): Contract {
        return this.contractId;
    }

    public setContractId(contractId: Contract): void {
        this.contractId = contractId;
    }

    public getServiceId(): Service {
        return this.serviceId;
    }

    public setServiceId(serviceId: Service): void {
        this.serviceId = serviceId;
    }

    public getIncidentId(): Incident {
        return this.incidentId;
    }

    public setIncidentId(incidentId: Incident): void {
        this.incidentId = incidentId;
    }

    public getUuid(): string {
        return this.uuid;
    }

    public setUuid(uuid: string): void {
        this.uuid = uuid;
    }

    public getEventType(): ReputationEventType {
        return this.eventType;
    }

    public setEventType(eventType: ReputationEventType): void {
        this.eventType = eventType;
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

    public getReputationChange(): number {
        return this.reputationChange;
    }

    public setReputationChange(reputationChange: number): void {
        this.reputationChange = reputationChange;
    }

    public getPreviousReputation(): number {
        return this.previousReputation;
    }

    public setPreviousReputation(previousReputation: number): void {
        this.previousReputation = previousReputation;
    }

    public getNewReputation(): number {
        return this.newReputation;
    }

    public setNewReputation(newReputation: number): void {
        this.newReputation = newReputation;
    }

    public getCategory(): string {
        return this.category;
    }

    public setCategory(category: string): void {
        this.category = category;
    }

    public getSubcategory(): string {
        return this.subcategory;
    }

    public setSubcategory(subcategory: string): void {
        this.subcategory = subcategory;
    }

    public getEventDate(): Date {
        return this.eventDate;
    }

    public setEventDate(eventDate: Date): void {
        this.eventDate = eventDate;
    }

    public getExpirationDate(): Date {
        return this.expirationDate;
    }

    public setExpirationDate(expirationDate: Date): void {
        this.expirationDate = expirationDate;
    }

    public getIsExpired(): boolean {
        return this.isExpired;
    }

    public setIsExpired(isExpired: boolean): void {
        this.isExpired = isExpired;
    }

    public getIsActive(): boolean {
        return this.isActive;
    }

    public setIsActive(isActive: boolean): void {
        this.isActive = isActive;
    }

    // Métodos adicionales para cálculos
    public calculateAge(): number {
        const now = new Date();
        return Math.floor((now.getTime() - this.eventDate.getTime()) / (1000 * 60 * 60 * 24));
    }

    public isPositiveEvent(): boolean {
        return this.reputationChange > 0;
    }

    public isNegativeEvent(): boolean {
        return this.reputationChange < 0;
    }

    public getNormalizedImpact(): number {
        // Normaliza el impacto considerando el peso y multiplicador
        let impact = this.reputationChange;
        if (this.weight) {
            impact = impact * (this.weight / 100);
        }
        if (this.impactMultiplier) {
            impact = impact * this.impactMultiplier;
        }
        return impact;
    }

    public shouldExpire(): boolean {
        if (!this.expirationDate) {
            return false;
        }
        return new Date() > this.expirationDate && !this.isExpired;
    }

    public getImpactLevel(): string {
        const absChange = Math.abs(this.reputationChange);
        if (absChange >= 10) return 'CRITICAL';
        if (absChange >= 5) return 'HIGH';
        if (absChange >= 2) return 'MEDIUM';
        return 'LOW';
    }
}
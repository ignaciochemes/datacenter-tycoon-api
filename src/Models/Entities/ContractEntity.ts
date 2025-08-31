import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GenericEntity } from "./GenericTable";
import { User } from "./UserEntity";
import { Service } from "./ServiceEntity";
import { ContractStatus } from "../../Enums/ServiceEnum";

/**
 * Entidad que representa un contrato entre un proveedor de servicios y un cliente
 * Incluye términos, SLAs, precios y penalizaciones
 */
@Entity()
export class Contract extends GenericEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'provider_id' })
    public providerId: User;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'client_id' })
    public clientId: User;

    @ManyToOne(() => Service, service => service.id)
    @JoinColumn({ name: 'service_id' })
    public serviceId: Service;

    @Column({ nullable: false })
    public uuid: string;

    @Column({ nullable: false, length: 255 })
    public contractNumber: string;

    @Column({ nullable: true, length: 1000 })
    public description: string;

    @Column({ type: 'enum', enum: ContractStatus, default: ContractStatus.DRAFT })
    public status: ContractStatus;

    // Fechas del contrato
    @Column({ type: 'timestamp', nullable: false, comment: 'Fecha de inicio del contrato' })
    public startDate: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de fin del contrato (null = indefinido)' })
    public endDate: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de firma del contrato' })
    public signedDate: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de activación del servicio' })
    public activationDate: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de terminación del contrato' })
    public terminationDate: Date;

    // Términos financieros
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false, comment: 'Precio mensual acordado' })
    public monthlyPrice: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, comment: 'Precio de setup inicial' })
    public setupFee: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, comment: 'Depósito de garantía' })
    public securityDeposit: number;

    @Column({ nullable: false, comment: 'Día del mes para facturación (1-31)' })
    public billingDay: number;

    @Column({ default: false, comment: 'Si el pago es automático' })
    public autoPayment: boolean;

    // SLAs acordados
    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false, comment: 'Uptime garantizado (%)' })
    public guaranteedUptimePercent: number;

    @Column({ nullable: false, comment: 'Latencia máxima garantizada (ms)' })
    public maxLatencyMs: number;

    @Column({ nullable: false, comment: 'Throughput mínimo garantizado (Mbps)' })
    public minThroughputMbps: number;

    @Column({ nullable: true, comment: 'Tiempo máximo de resolución de incidentes (horas)' })
    public maxIncidentResolutionHours: number;

    // Penalizaciones por incumplimiento de SLA
    @Column({ type: 'json', nullable: true, comment: 'Configuración de penalizaciones por SLA' })
    public slaPenalties: {
        uptimePenalties?: {
            threshold: number; // % de uptime por debajo del cual aplica penalización
            penaltyPercent: number; // % de descuento en la factura
        }[];
        latencyPenalties?: {
            threshold: number; // ms de latencia por encima del cual aplica penalización
            penaltyPercent: number;
        }[];
        throughputPenalties?: {
            threshold: number; // Mbps por debajo del cual aplica penalización
            penaltyPercent: number;
        }[];
        incidentResolutionPenalties?: {
            threshold: number; // horas por encima del cual aplica penalización
            penaltyPercent: number;
        }[];
    };

    // Términos y condiciones específicos
    @Column({ type: 'json', nullable: true, comment: 'Términos específicos del contrato' })
    public contractTerms: {
        // Términos de cancelación
        cancellationNoticedays?: number;
        earlyTerminationFee?: number;

        // Términos de uso
        maxBandwidthBurst?: number;
        dataTransferLimit?: number;
        storageLimit?: number;

        // Términos de soporte
        supportLevel?: string; // basic, standard, premium
        supportHours?: string; // 24x7, business_hours, etc.
        supportChannels?: string[]; // email, phone, chat, etc.

        // Términos de backup y recuperación
        backupFrequency?: string;
        backupRetention?: number;
        disasterRecoveryRto?: number; // Recovery Time Objective (hours)
        disasterRecoveryRpo?: number; // Recovery Point Objective (hours)

        // Términos de escalabilidad
        autoScalingEnabled?: boolean;
        maxScaleUpPercent?: number;
        scaleUpNotificationRequired?: boolean;
    };

    // Métricas de cumplimiento
    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true, comment: 'Uptime actual del período (%)' })
    public currentPeriodUptimePercent: number;

    @Column({ nullable: true, comment: 'Latencia promedio del período (ms)' })
    public currentPeriodAvgLatencyMs: number;

    @Column({ nullable: true, comment: 'Throughput promedio del período (Mbps)' })
    public currentPeriodAvgThroughputMbps: number;

    @Column({ nullable: true, comment: 'Número de incidentes en el período actual' })
    public currentPeriodIncidentCount: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, comment: 'Total de penalizaciones aplicadas en el período' })
    public currentPeriodPenalties: number;

    // Información de facturación
    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de la última factura' })
    public lastBillingDate: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de la próxima factura' })
    public nextBillingDate: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, comment: 'Monto pendiente de pago' })
    public outstandingBalance: number;

    @Column({ nullable: true, comment: 'Días de retraso en el pago' })
    public daysPastDue: number;

    // Configuración de notificaciones
    @Column({ default: true, comment: 'Notificar incidentes al cliente' })
    public notifyIncidents: boolean;

    @Column({ default: true, comment: 'Notificar mantenimientos programados' })
    public notifyMaintenance: boolean;

    @Column({ default: true, comment: 'Notificar facturas' })
    public notifyBilling: boolean;

    @Column({ default: false, comment: 'Notificar cambios en el servicio' })
    public notifyServiceChanges: boolean;

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

    public getClientId(): User {
        return this.clientId;
    }

    public setClientId(clientId: User): void {
        this.clientId = clientId;
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

    public getContractNumber(): string {
        return this.contractNumber;
    }

    public setContractNumber(contractNumber: string): void {
        this.contractNumber = contractNumber;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getStatus(): ContractStatus {
        return this.status;
    }

    public setStatus(status: ContractStatus): void {
        this.status = status;
    }

    public getStartDate(): Date {
        return this.startDate;
    }

    public setStartDate(startDate: Date): void {
        this.startDate = startDate;
    }

    public getEndDate(): Date {
        return this.endDate;
    }

    public setEndDate(endDate: Date): void {
        this.endDate = endDate;
    }

    public getSignedDate(): Date {
        return this.signedDate;
    }

    public setSignedDate(signedDate: Date): void {
        this.signedDate = signedDate;
    }

    public getActivationDate(): Date {
        return this.activationDate;
    }

    public setActivationDate(activationDate: Date): void {
        this.activationDate = activationDate;
    }

    public getTerminationDate(): Date {
        return this.terminationDate;
    }

    public setTerminationDate(terminationDate: Date): void {
        this.terminationDate = terminationDate;
    }

    public getMonthlyPrice(): number {
        return this.monthlyPrice;
    }

    public setMonthlyPrice(monthlyPrice: number): void {
        this.monthlyPrice = monthlyPrice;
    }

    public getSetupFee(): number {
        return this.setupFee;
    }

    public setSetupFee(setupFee: number): void {
        this.setupFee = setupFee;
    }

    public getSecurityDeposit(): number {
        return this.securityDeposit;
    }

    public setSecurityDeposit(securityDeposit: number): void {
        this.securityDeposit = securityDeposit;
    }

    public getBillingDay(): number {
        return this.billingDay;
    }

    public setBillingDay(billingDay: number): void {
        this.billingDay = billingDay;
    }

    public getAutoPayment(): boolean {
        return this.autoPayment;
    }

    public setAutoPayment(autoPayment: boolean): void {
        this.autoPayment = autoPayment;
    }

    public getGuaranteedUptimePercent(): number {
        return this.guaranteedUptimePercent;
    }

    public setGuaranteedUptimePercent(guaranteedUptimePercent: number): void {
        this.guaranteedUptimePercent = guaranteedUptimePercent;
    }

    public getMaxLatencyMs(): number {
        return this.maxLatencyMs;
    }

    public setMaxLatencyMs(maxLatencyMs: number): void {
        this.maxLatencyMs = maxLatencyMs;
    }

    public getMinThroughputMbps(): number {
        return this.minThroughputMbps;
    }

    public setMinThroughputMbps(minThroughputMbps: number): void {
        this.minThroughputMbps = minThroughputMbps;
    }

    public getMaxIncidentResolutionHours(): number {
        return this.maxIncidentResolutionHours;
    }

    public setMaxIncidentResolutionHours(maxIncidentResolutionHours: number): void {
        this.maxIncidentResolutionHours = maxIncidentResolutionHours;
    }

    public getSlaPenalties(): any {
        return this.slaPenalties;
    }

    public setSlaPenalties(slaPenalties: any): void {
        this.slaPenalties = slaPenalties;
    }

    public getContractTerms(): any {
        return this.contractTerms;
    }

    public setContractTerms(contractTerms: any): void {
        this.contractTerms = contractTerms;
    }

    public getCurrentPeriodUptimePercent(): number {
        return this.currentPeriodUptimePercent;
    }

    public setCurrentPeriodUptimePercent(currentPeriodUptimePercent: number): void {
        this.currentPeriodUptimePercent = currentPeriodUptimePercent;
    }

    public getCurrentPeriodAvgLatencyMs(): number {
        return this.currentPeriodAvgLatencyMs;
    }

    public setCurrentPeriodAvgLatencyMs(currentPeriodAvgLatencyMs: number): void {
        this.currentPeriodAvgLatencyMs = currentPeriodAvgLatencyMs;
    }

    public getCurrentPeriodAvgThroughputMbps(): number {
        return this.currentPeriodAvgThroughputMbps;
    }

    public setCurrentPeriodAvgThroughputMbps(currentPeriodAvgThroughputMbps: number): void {
        this.currentPeriodAvgThroughputMbps = currentPeriodAvgThroughputMbps;
    }

    public getCurrentPeriodIncidentCount(): number {
        return this.currentPeriodIncidentCount;
    }

    public setCurrentPeriodIncidentCount(currentPeriodIncidentCount: number): void {
        this.currentPeriodIncidentCount = currentPeriodIncidentCount;
    }

    public getCurrentPeriodPenalties(): number {
        return this.currentPeriodPenalties;
    }

    public setCurrentPeriodPenalties(currentPeriodPenalties: number): void {
        this.currentPeriodPenalties = currentPeriodPenalties;
    }

    public getLastBillingDate(): Date {
        return this.lastBillingDate;
    }

    public setLastBillingDate(lastBillingDate: Date): void {
        this.lastBillingDate = lastBillingDate;
    }

    public getNextBillingDate(): Date {
        return this.nextBillingDate;
    }

    public setNextBillingDate(nextBillingDate: Date): void {
        this.nextBillingDate = nextBillingDate;
    }

    public getOutstandingBalance(): number {
        return this.outstandingBalance;
    }

    public setOutstandingBalance(outstandingBalance: number): void {
        this.outstandingBalance = outstandingBalance;
    }

    public getDaysPastDue(): number {
        return this.daysPastDue;
    }

    public setDaysPastDue(daysPastDue: number): void {
        this.daysPastDue = daysPastDue;
    }

    public getNotifyIncidents(): boolean {
        return this.notifyIncidents;
    }

    public setNotifyIncidents(notifyIncidents: boolean): void {
        this.notifyIncidents = notifyIncidents;
    }

    public getNotifyMaintenance(): boolean {
        return this.notifyMaintenance;
    }

    public setNotifyMaintenance(notifyMaintenance: boolean): void {
        this.notifyMaintenance = notifyMaintenance;
    }

    public getNotifyBilling(): boolean {
        return this.notifyBilling;
    }

    public setNotifyBilling(notifyBilling: boolean): void {
        this.notifyBilling = notifyBilling;
    }

    public getNotifyServiceChanges(): boolean {
        return this.notifyServiceChanges;
    }

    public setNotifyServiceChanges(notifyServiceChanges: boolean): void {
        this.notifyServiceChanges = notifyServiceChanges;
    }
}
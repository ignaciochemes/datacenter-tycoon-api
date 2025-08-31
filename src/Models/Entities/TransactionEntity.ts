import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GenericEntity } from "./GenericTable";
import { User } from "./UserEntity";
import { Contract } from "./ContractEntity";
import { TransactionType, TransactionCategory } from "../../Enums/SystemEnum";

/**
 * Entidad que representa todas las transacciones financieras del simulador
 * Incluye ingresos, gastos, inversiones, penalizaciones, etc.
 */
@Entity()
export class Transaction extends GenericEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
    public userId: User;

    @ManyToOne(() => Contract, contract => contract.id, { nullable: true })
    @JoinColumn({ name: 'contract_id' })
    public contractId: Contract;

    @Column({ nullable: false })
    public uuid: string;

    @Column({ nullable: false, length: 255 })
    public transactionNumber: string;

    @Column({ type: 'enum', enum: TransactionType, nullable: false })
    public type: TransactionType;

    @Column({ type: 'enum', enum: TransactionCategory, nullable: false })
    public category: TransactionCategory;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: false, comment: 'Monto de la transacción' })
    public amount: number;

    @Column({ nullable: false, length: 3, default: 'USD', comment: 'Código de moneda ISO' })
    public currency: string;

    @Column({ nullable: true, length: 1000 })
    public description: string;

    @Column({ nullable: true, length: 500, comment: 'Referencia externa (número de factura, orden de compra, etc.)' })
    public externalReference: string;

    // Información de la transacción
    @Column({ type: 'timestamp', nullable: false, comment: 'Fecha de la transacción' })
    public transactionDate: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de vencimiento (para facturas)' })
    public dueDate: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de pago efectivo' })
    public paidDate: Date;

    @Column({ default: false, comment: 'Si la transacción ha sido pagada/procesada' })
    public isPaid: boolean;

    @Column({ default: false, comment: 'Si la transacción está pendiente de aprobación' })
    public isPending: boolean;

    @Column({ default: false, comment: 'Si la transacción ha sido cancelada' })
    public isCancelled: boolean;

    // Información adicional específica por categoría
    @Column({ type: 'json', nullable: true, comment: 'Detalles específicos de la transacción' })
    public transactionDetails: {
        // Para pagos de contratos
        contractPayment?: {
            billingPeriodStart: Date;
            billingPeriodEnd: Date;
            baseAmount: number;
            penalties: number;
            discounts: number;
            taxes: number;
        };
        
        // Para compras de hardware
        hardwarePurchase?: {
            deviceIds: number[];
            supplierId?: number;
            warrantyMonths?: number;
            deliveryDate?: Date;
            installationRequired?: boolean;
        };
        
        // Para gastos operativos
        operationalExpense?: {
            expenseType: string; // electricity, cooling, maintenance, etc.
            period: string;
            unitCost?: number;
            quantity?: number;
            unit?: string; // kWh, hours, etc.
        };
        
        // Para inversiones
        investment?: {
            investmentType: string; // datacenter_expansion, equipment_upgrade, etc.
            expectedRoi?: number;
            paybackPeriodMonths?: number;
            riskLevel?: string;
        };
        
        // Para penalizaciones
        penalty?: {
            penaltyType: string; // sla_breach, late_payment, etc.
            originalAmount?: number;
            penaltyRate?: number;
            incidentId?: number;
        };
        
        // Para reembolsos
        refund?: {
            originalTransactionId: number;
            refundReason: string;
            refundRate: number; // % del monto original
        };
    };

    // Información de facturación
    @Column({ nullable: true, comment: 'Número de factura generada' })
    public invoiceNumber: string;

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true, comment: 'Porcentaje de impuestos aplicados' })
    public taxRate: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true, comment: 'Monto de impuestos' })
    public taxAmount: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true, comment: 'Monto neto (sin impuestos)' })
    public netAmount: number;

    // Información de pago
    @Column({ nullable: true, comment: 'Método de pago utilizado' })
    public paymentMethod: string;

    @Column({ nullable: true, comment: 'Referencia del pago (ID de transacción del procesador)' })
    public paymentReference: string;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true, comment: 'Comisión por procesamiento de pago' })
    public processingFee: number;

    // Información contable
    @Column({ nullable: true, comment: 'Cuenta contable de débito' })
    public debitAccount: string;

    @Column({ nullable: true, comment: 'Cuenta contable de crédito' })
    public creditAccount: string;

    @Column({ nullable: true, comment: 'Centro de costo' })
    public costCenter: string;

    // Información de reconciliación
    @Column({ default: false, comment: 'Si la transacción ha sido reconciliada' })
    public isReconciled: boolean;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de reconciliación' })
    public reconciledDate: Date;

    @Column({ nullable: true, comment: 'Usuario que reconcilió la transacción' })
    public reconciledBy: string;

    // Información de auditoría adicional
    @Column({ nullable: true, comment: 'Dirección IP desde donde se originó la transacción' })
    public originIpAddress: string;

    @Column({ nullable: true, comment: 'User agent del cliente' })
    public userAgent: string;

    @Column({ type: 'json', nullable: true, comment: 'Metadatos adicionales de la transacción' })
    public metadata: {
        automaticTransaction?: boolean;
        recurringTransaction?: boolean;
        parentTransactionId?: number;
        batchId?: string;
        approvedBy?: string;
        notes?: string;
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

    public getUuid(): string {
        return this.uuid;
    }

    public setUuid(uuid: string): void {
        this.uuid = uuid;
    }

    public getTransactionNumber(): string {
        return this.transactionNumber;
    }

    public setTransactionNumber(transactionNumber: string): void {
        this.transactionNumber = transactionNumber;
    }

    public getType(): TransactionType {
        return this.type;
    }

    public setType(type: TransactionType): void {
        this.type = type;
    }

    public getCategory(): TransactionCategory {
        return this.category;
    }

    public setCategory(category: TransactionCategory): void {
        this.category = category;
    }

    public getAmount(): number {
        return this.amount;
    }

    public setAmount(amount: number): void {
        this.amount = amount;
    }

    public getCurrency(): string {
        return this.currency;
    }

    public setCurrency(currency: string): void {
        this.currency = currency;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getExternalReference(): string {
        return this.externalReference;
    }

    public setExternalReference(externalReference: string): void {
        this.externalReference = externalReference;
    }

    public getTransactionDate(): Date {
        return this.transactionDate;
    }

    public setTransactionDate(transactionDate: Date): void {
        this.transactionDate = transactionDate;
    }

    public getDueDate(): Date {
        return this.dueDate;
    }

    public setDueDate(dueDate: Date): void {
        this.dueDate = dueDate;
    }

    public getPaidDate(): Date {
        return this.paidDate;
    }

    public setPaidDate(paidDate: Date): void {
        this.paidDate = paidDate;
    }

    public getIsPaid(): boolean {
        return this.isPaid;
    }

    public setIsPaid(isPaid: boolean): void {
        this.isPaid = isPaid;
    }

    public getIsPending(): boolean {
        return this.isPending;
    }

    public setIsPending(isPending: boolean): void {
        this.isPending = isPending;
    }

    public getIsCancelled(): boolean {
        return this.isCancelled;
    }

    public setIsCancelled(isCancelled: boolean): void {
        this.isCancelled = isCancelled;
    }

    public getTransactionDetails(): any {
        return this.transactionDetails;
    }

    public setTransactionDetails(transactionDetails: any): void {
        this.transactionDetails = transactionDetails;
    }

    public getInvoiceNumber(): string {
        return this.invoiceNumber;
    }

    public setInvoiceNumber(invoiceNumber: string): void {
        this.invoiceNumber = invoiceNumber;
    }

    public getTaxRate(): number {
        return this.taxRate;
    }

    public setTaxRate(taxRate: number): void {
        this.taxRate = taxRate;
    }

    public getTaxAmount(): number {
        return this.taxAmount;
    }

    public setTaxAmount(taxAmount: number): void {
        this.taxAmount = taxAmount;
    }

    public getNetAmount(): number {
        return this.netAmount;
    }

    public setNetAmount(netAmount: number): void {
        this.netAmount = netAmount;
    }

    public getPaymentMethod(): string {
        return this.paymentMethod;
    }

    public setPaymentMethod(paymentMethod: string): void {
        this.paymentMethod = paymentMethod;
    }

    public getPaymentReference(): string {
        return this.paymentReference;
    }

    public setPaymentReference(paymentReference: string): void {
        this.paymentReference = paymentReference;
    }

    public getProcessingFee(): number {
        return this.processingFee;
    }

    public setProcessingFee(processingFee: number): void {
        this.processingFee = processingFee;
    }

    public getDebitAccount(): string {
        return this.debitAccount;
    }

    public setDebitAccount(debitAccount: string): void {
        this.debitAccount = debitAccount;
    }

    public getCreditAccount(): string {
        return this.creditAccount;
    }

    public setCreditAccount(creditAccount: string): void {
        this.creditAccount = creditAccount;
    }

    public getCostCenter(): string {
        return this.costCenter;
    }

    public setCostCenter(costCenter: string): void {
        this.costCenter = costCenter;
    }

    public getIsReconciled(): boolean {
        return this.isReconciled;
    }

    public setIsReconciled(isReconciled: boolean): void {
        this.isReconciled = isReconciled;
    }

    public getReconciledDate(): Date {
        return this.reconciledDate;
    }

    public setReconciledDate(reconciledDate: Date): void {
        this.reconciledDate = reconciledDate;
    }

    public getReconciledBy(): string {
        return this.reconciledBy;
    }

    public setReconciledBy(reconciledBy: string): void {
        this.reconciledBy = reconciledBy;
    }

    public getOriginIpAddress(): string {
        return this.originIpAddress;
    }

    public setOriginIpAddress(originIpAddress: string): void {
        this.originIpAddress = originIpAddress;
    }

    public getUserAgent(): string {
        return this.userAgent;
    }

    public setUserAgent(userAgent: string): void {
        this.userAgent = userAgent;
    }

    public getMetadata(): any {
        return this.metadata;
    }

    public setMetadata(metadata: any): void {
        this.metadata = metadata;
    }
}
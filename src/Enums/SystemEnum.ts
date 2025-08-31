/**
 * Enum para los tipos de incidentes
 * Basado en los requerimientos del documento de diseño
 */
export enum IncidentType {
    HARDWARE_FAILURE = 'hardware_failure',
    POWER_OUTAGE = 'power_outage',
    NETWORK_ISSUE = 'network_issue',
    SECURITY_BREACH = 'security_breach',
    DDOS_ATTACK = 'ddos_attack',
    MAINTENANCE = 'maintenance',
    COOLING_FAILURE = 'cooling_failure',
    COMPLIANCE_INSPECTION = 'compliance_inspection'
}

/**
 * Enum para la severidad de los incidentes
 */
export enum IncidentSeverity {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
    CRITICAL = 'critical'
}

/**
 * Enum para los estados de los incidentes
 */
export enum IncidentStatus {
    OPEN = 'open',
    IN_PROGRESS = 'in_progress',
    RESOLVED = 'resolved',
    CLOSED = 'closed'
}

/**
 * Enum para los tipos de transacciones
 */
export enum TransactionType {
    INCOME = 'income',
    EXPENSE = 'expense',
    INVESTMENT = 'investment',
    PENALTY = 'penalty',
    REFUND = 'refund'
}

/**
 * Enum para las categorías de transacciones
 */
export enum TransactionCategory {
    CONTRACT_PAYMENT = 'contract_payment',
    HARDWARE_PURCHASE = 'hardware_purchase',
    ELECTRICITY = 'electricity',
    BANDWIDTH = 'bandwidth',
    MAINTENANCE = 'maintenance',
    LICENSE = 'license',
    STAFF = 'staff',
    SLA_PENALTY = 'sla_penalty',
    DDOS_MITIGATION = 'ddos_mitigation'
}

/**
 * Enum para los eventos de reputación
 */
export enum ReputationEventType {
    SLA_COMPLIANCE = 'sla_compliance',
    SLA_BREACH = 'sla_breach',
    INCIDENT_RESOLVED = 'incident_resolved',
    INCIDENT_PROLONGED = 'incident_prolonged',
    CUSTOMER_SATISFACTION = 'customer_satisfaction',
    SECURITY_INCIDENT = 'security_incident',
    COMPLIANCE_PASSED = 'compliance_passed',
    COMPLIANCE_FAILED = 'compliance_failed'
}
/**
 * Enum para los tipos de servicios ofrecidos
 * Basado en los requerimientos del documento de diseño
 */
export enum ServiceType {
    WEB_HOSTING = 'web_hosting',
    API_HOSTING = 'api_hosting',
    DATABASE_MANAGED = 'database_managed',
    COLOCATION = 'colocation',
    HOUSING = 'housing',
    CDN = 'cdn',
    BACKUP = 'backup',
    KUBERNETES = 'kubernetes',
    FIREWALL_AS_SERVICE = 'firewall_as_service',
    LOAD_BALANCER_AS_SERVICE = 'load_balancer_as_service',
    BANDWIDTH = 'bandwidth',
    DDOS_MITIGATION = 'ddos_mitigation'
}

/**
 * Enum para los estados de los servicios
 */
export enum ServiceStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    SUSPENDED = 'suspended',
    MAINTENANCE = 'maintenance',
    TERMINATED = 'terminated'
}

/**
 * Enum para los estados de los contratos
 */
export enum ContractStatus {
    DRAFT = 'draft',
    PENDING = 'pending',
    ACTIVE = 'active',
    SUSPENDED = 'suspended',
    TERMINATED = 'terminated',
    EXPIRED = 'expired',
    BREACHED = 'breached'
}

/**
 * Enum para los tipos de SLA
 */
export enum SLAType {
    UPTIME = 'uptime',
    LATENCY = 'latency',
    THROUGHPUT = 'throughput',
    RESPONSE_TIME = 'response_time'
}
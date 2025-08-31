/**
 * Enum para los tipos de dispositivos disponibles en el datacenter
 * Basado en los requerimientos del documento de diseño
 */
export enum DeviceType {
    SERVER = 'server',
    SWITCH = 'switch',
    ROUTER = 'router',
    FIREWALL = 'firewall',
    UPS = 'ups',
    PDU = 'pdu',
    LOAD_BALANCER = 'load_balancer',
    STORAGE = 'storage'
}

/**
 * Enum para los estados de los dispositivos
 */
export enum DeviceStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    MAINTENANCE = 'maintenance',
    FAILED = 'failed',
    INSTALLING = 'installing'
}

/**
 * Enum para los niveles de redundancia
 */
export enum RedundancyLevel {
    N = 'N',
    N_PLUS_1 = 'N+1',
    N_PLUS_2 = 'N+2',
    TWO_N = '2N'
}
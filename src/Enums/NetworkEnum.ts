/**
 * Enum para los tipos de reglas de firewall
 * Basado en los requerimientos del documento de diseño
 */
export enum FirewallRuleType {
    ALLOW = 'allow',
    DENY = 'deny',
    DROP = 'drop'
}

/**
 * Enum para los protocolos de red
 */
export enum NetworkProtocol {
    TCP = 'tcp',
    UDP = 'udp',
    ICMP = 'icmp',
    HTTP = 'http',
    HTTPS = 'https',
    SSH = 'ssh',
    FTP = 'ftp',
    SMTP = 'smtp'
}

/**
 * Enum para los tipos de load balancer
 */
export enum LoadBalancerType {
    LAYER_4 = 'layer_4',
    LAYER_7 = 'layer_7',
    APPLICATION = 'application',
    NETWORK = 'network'
}

/**
 * Enum para los algoritmos de balanceo
 */
export enum LoadBalancingAlgorithm {
    ROUND_ROBIN = 'round_robin',
    LEAST_CONNECTIONS = 'least_connections',
    WEIGHTED_ROUND_ROBIN = 'weighted_round_robin',
    IP_HASH = 'ip_hash',
    LEAST_RESPONSE_TIME = 'least_response_time'
}

/**
 * Enum para los tipos de ataques DDoS simulados
 */
export enum DDoSAttackType {
    VOLUMETRIC = 'volumetric',
    PROTOCOL = 'protocol',
    APPLICATION = 'application',
    MIXED = 'mixed'
}

/**
 * Enum para los estados de mitigación DDoS
 */
export enum DDoSMitigationStatus {
    INACTIVE = 'inactive',
    ACTIVE = 'active',
    LEARNING = 'learning',
    BLOCKING = 'blocking'
}

/**
 * Enum para tipos de red
 */
export enum NetworkType {
    LAN = 'lan',
    WAN = 'wan',
    VLAN = 'vlan',
    VPN = 'vpn',
    INTERNET = 'internet',
    PRIVATE = 'private'
}

/**
 * Enum para estados de red
 */
export enum NetworkStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    MAINTENANCE = 'maintenance',
    ERROR = 'error',
    CONGESTED = 'congested'
}

/**
 * Enum para tipos de VLAN
 */
export enum VlanType {
    DATA = 'data',
    VOICE = 'voice',
    MANAGEMENT = 'management',
    STORAGE = 'storage',
    GUEST = 'guest',
    DMZ = 'dmz'
}

/**
 * Enum para acciones de firewall
 */
export enum FirewallAction {
    ALLOW = 'allow',
    DENY = 'deny',
    DROP = 'drop',
    REJECT = 'reject'
}

/**
 * Enum para protocolos de firewall
 */
export enum FirewallProtocol {
    TCP = 'tcp',
    UDP = 'udp',
    ICMP = 'icmp',
    ANY = 'any'
}

/**
 * Enum para dirección de firewall
 */
export enum FirewallDirection {
    INBOUND = 'inbound',
    OUTBOUND = 'outbound',
    BIDIRECTIONAL = 'bidirectional'
}

/**
 * Enum para estado de reglas de firewall
 */
export enum FirewallRuleStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    DISABLED = 'disabled'
}

/**
 * Enum para algoritmos de load balancer
 */
export enum LoadBalancerAlgorithm {
    ROUND_ROBIN = 'round_robin',
    LEAST_CONNECTIONS = 'least_connections',
    WEIGHTED_ROUND_ROBIN = 'weighted_round_robin',
    IP_HASH = 'ip_hash',
    LEAST_RESPONSE_TIME = 'least_response_time'
}

/**
 * Enum para estado de load balancer
 */
export enum LoadBalancerStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    MAINTENANCE = 'maintenance',
    ERROR = 'error'
}

/**
 * Enum para protocolos de health check
 */
export enum HealthCheckProtocol {
    HTTP = 'http',
    HTTPS = 'https',
    TCP = 'tcp',
    UDP = 'udp',
    ICMP = 'icmp'
}
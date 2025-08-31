export enum DatacenterStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    MAINTENANCE = 'maintenance',
    CONSTRUCTION = 'construction',
    DECOMMISSIONED = 'decommissioned',
    EMERGENCY = 'emergency'
}

export enum DatacenterTier {
    TIER_1 = 'tier_1',
    TIER_2 = 'tier_2',
    TIER_3 = 'tier_3',
    TIER_4 = 'tier_4'
}

export enum CoolingType {
    AIR = 'air',
    LIQUID = 'liquid',
    IMMERSION = 'immersion',
    HYBRID = 'hybrid',
    FREE_COOLING = 'free_cooling',
    EVAPORATIVE = 'evaporative'
}

export enum PowerRedundancy {
    N = 'n',
    N_PLUS_1 = 'n_plus_1',
    TWO_N = '2n',
    TWO_N_PLUS_1 = '2n_plus_1'
}

export enum CertificationType {
    GDPR = 'gdpr',
    HIPAA = 'hipaa',
    SOC2 = 'soc2',
    ISO27001 = 'iso27001',
    PCI_DSS = 'pci_dss',
    FISMA = 'fisma'
}

export enum AlertType {
    TEMPERATURE = 'temperature',
    POWER = 'power',
    NETWORK = 'network',
    SECURITY = 'security',
    MAINTENANCE = 'maintenance',
    CAPACITY = 'capacity'
}

export enum AlertSeverity {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
    CRITICAL = 'critical'
}
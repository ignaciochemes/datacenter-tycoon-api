export enum RackStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    MAINTENANCE = 'maintenance',
    FULL = 'full',
    RESERVED = 'reserved',
    DECOMMISSIONED = 'decommissioned'
}

export enum RackType {
    STANDARD_19_INCH = 'standard_19_inch',
    OPEN_FRAME = 'open_frame',
    ENCLOSED = 'enclosed',
    WALL_MOUNT = 'wall_mount',
    BLADE = 'blade',
    CUSTOM = 'custom'
}

export enum CoolingType {
    AIR = 'air',
    LIQUID = 'liquid',
    IMMERSION = 'immersion',
    HYBRID = 'hybrid',
    PASSIVE = 'passive'
}

export enum PowerPhase {
    SINGLE_PHASE = 'single_phase',
    THREE_PHASE = 'three_phase'
}

export enum LockType {
    MECHANICAL = 'mechanical',
    ELECTRONIC = 'electronic',
    BIOMETRIC = 'biometric',
    RFID = 'rfid',
    NONE = 'none'
}

export enum SensorType {
    TEMPERATURE = 'temperature',
    HUMIDITY = 'humidity',
    VIBRATION = 'vibration',
    SMOKE = 'smoke',
    WATER = 'water',
    CURRENT = 'current',
    DOOR = 'door',
    CAMERA = 'camera'
}

export enum AlertSeverity {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
    CRITICAL = 'critical'
}
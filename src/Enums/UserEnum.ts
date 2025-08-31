export enum UserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    SUSPENDED = 'suspended',
    PENDING_VERIFICATION = 'pending_verification',
    BANNED = 'banned'
}

export enum UserTier {
    FREE = 'free',
    BASIC = 'basic',
    PREMIUM = 'premium',
    ENTERPRISE = 'enterprise',
    ADMIN = 'admin'
}

export enum NotificationPreference {
    EMAIL = 'email',
    SMS = 'sms',
    PUSH = 'push',
    NONE = 'none'
}

export enum Language {
    EN = 'en',
    ES = 'es',
    FR = 'fr',
    DE = 'de',
    IT = 'it',
    PT = 'pt',
    RU = 'ru',
    ZH = 'zh',
    JA = 'ja',
    KO = 'ko'
}

export enum Currency {
    USD = 'usd',
    EUR = 'eur',
    GBP = 'gbp',
    JPY = 'jpy',
    CAD = 'cad',
    AUD = 'aud',
    CHF = 'chf',
    CNY = 'cny',
    SEK = 'sek',
    NZD = 'nzd'
}

export enum CompanySize {
    STARTUP = 'startup',
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large',
    ENTERPRISE = 'enterprise'
}

export enum Industry {
    TECHNOLOGY = 'technology',
    FINANCE = 'finance',
    HEALTHCARE = 'healthcare',
    EDUCATION = 'education',
    RETAIL = 'retail',
    MANUFACTURING = 'manufacturing',
    GOVERNMENT = 'government',
    MEDIA = 'media',
    GAMING = 'gaming',
    OTHER = 'other'
}

export enum PaymentMethod {
    CREDIT_CARD = 'credit_card',
    DEBIT_CARD = 'debit_card',
    PAYPAL = 'paypal',
    BANK_TRANSFER = 'bank_transfer',
    CRYPTOCURRENCY = 'cryptocurrency'
}
type EnumDictionary<T extends string | symbol | number, U> = {
    [K in T]: U;
};

enum StatusCodeEnums {
    EMAIL_DUPLICATED = 10001,
    USER_VERIFIED,
    USER_NOT_FOUND,
    INVALID_PASSWORD,

    INVALID_TOKEN = 10020,

    COMPANY_DUPLICATED = 20001,

    INVALID_CPU = 30001,
    INVALID_RAM,
    INVALID_STORAGE,

    DATACENTER_TYPE_NOT_FOUND = 40001,
    USER_HAS_DATACENTER,
    USER_HAS_NO_DATACENTER,
}

const StatusCodeExceptionText: EnumDictionary<StatusCodeEnums, string> = {
    [StatusCodeEnums.EMAIL_DUPLICATED]: 'EMAIL_DUPLICATED',
    [StatusCodeEnums.USER_VERIFIED]: 'USER_VERIFIED',
    [StatusCodeEnums.USER_NOT_FOUND]: 'USER_NOT_FOUND',
    [StatusCodeEnums.INVALID_PASSWORD]: 'INVALID_PASSWORD',
    [StatusCodeEnums.INVALID_TOKEN]: 'INVALID_TOKEN',
    [StatusCodeEnums.COMPANY_DUPLICATED]: 'COMPANY_DUPLICATED',
    [StatusCodeEnums.INVALID_CPU]: 'INVALID_CPU',
    [StatusCodeEnums.INVALID_RAM]: 'INVALID_RAM',
    [StatusCodeEnums.INVALID_STORAGE]: 'INVALID_STORAGE',
    [StatusCodeEnums.DATACENTER_TYPE_NOT_FOUND]: 'DATACENTER_TYPE_NOT_FOUND',
    [StatusCodeEnums.USER_HAS_DATACENTER]: 'USER_HAS_DATACENTER',
    [StatusCodeEnums.USER_HAS_NO_DATACENTER]: 'USER_HAS_NO_DATACENTER',
};

export { StatusCodeEnums, StatusCodeExceptionText };
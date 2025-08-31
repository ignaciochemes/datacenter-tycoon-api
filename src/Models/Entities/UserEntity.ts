import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GenericEntity } from "./GenericTable";
import { Rol } from "./RolEntity";
import { UserStatus, UserTier, NotificationPreference, Language, Currency } from "../../Enums/UserEnum";

@Entity()
export class User extends GenericEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ nullable: true, length: 255 })
    public email: string;

    @Column({ nullable: false, length: 255 })
    public password: string;

    @ManyToOne(() => Rol, (rol) => rol.id)
    @JoinColumn({ name: 'rol_id' })
    public rol: Rol;

    @Column({ nullable: false, length: 255 })
    public uuid: string;

    // Información personal
    @Column({ nullable: true, length: 100 })
    public firstName: string;

    @Column({ nullable: true, length: 100 })
    public lastName: string;

    @Column({ nullable: true, length: 20 })
    public phoneNumber: string;

    @Column({ nullable: true, type: 'date' })
    public dateOfBirth: Date;

    @Column({ nullable: true, length: 500 })
    public profilePicture: string;

    @Column({ nullable: true, type: 'text' })
    public bio: string;

    // Estado y configuración del usuario
    @Column({ type: 'enum', enum: UserStatus, default: UserStatus.PENDING_VERIFICATION })
    public status: UserStatus;

    @Column({ type: 'enum', enum: UserTier, default: UserTier.FREE })
    public tier: UserTier;

    @Column({ type: 'enum', enum: Language, default: Language.EN })
    public preferredLanguage: Language;

    @Column({ type: 'enum', enum: Currency, default: Currency.USD })
    public preferredCurrency: Currency;

    @Column({ nullable: true, length: 50 })
    public timezone: string;

    // Ubicación geográfica
    @Column({ nullable: true, length: 100 })
    public country: string;

    @Column({ nullable: true, length: 100 })
    public state: string;

    @Column({ nullable: true, length: 100 })
    public city: string;

    @Column({ nullable: true, length: 255 })
    public address: string;

    @Column({ nullable: true, length: 20 })
    public postalCode: string;

    @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
    public latitude: number;

    @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
    public longitude: number;

    // Información de la empresa
    @Column({ nullable: true, length: 200 })
    public companyName: string;

    @Column({ nullable: true, length: 100 })
    public jobTitle: string;

    @Column({ nullable: true, length: 100 })
    public department: string;

    @Column({ nullable: true, length: 50 })
    public companySize: string;

    @Column({ nullable: true, length: 100 })
    public industry: string;

    @Column({ nullable: true, length: 500 })
    public companyWebsite: string;

    @Column({ nullable: true, length: 50 })
    public taxId: string;

    // Preferencias de notificación
    @Column({ type: 'enum', enum: NotificationPreference, default: NotificationPreference.EMAIL })
    public emailNotifications: NotificationPreference;

    @Column({ type: 'enum', enum: NotificationPreference, default: NotificationPreference.NONE })
    public smsNotifications: NotificationPreference;

    @Column({ type: 'enum', enum: NotificationPreference, default: NotificationPreference.PUSH })
    public pushNotifications: NotificationPreference;

    @Column({ type: 'boolean', default: true })
    public marketingEmails: boolean;

    @Column({ type: 'boolean', default: true })
    public securityAlerts: boolean;

    @Column({ type: 'boolean', default: true })
    public systemUpdates: boolean;

    // Configuración de seguridad
    @Column({ type: 'boolean', default: false })
    public twoFactorEnabled: boolean;

    @Column({ nullable: true, length: 32 })
    public twoFactorSecret: string;

    @Column({ type: 'json', nullable: true })
    public backupCodes: string[];

    @Column({ nullable: true, type: 'timestamp' })
    public lastPasswordChange: Date;

    @Column({ type: 'integer', default: 0 })
    public failedLoginAttempts: number;

    @Column({ nullable: true, type: 'timestamp' })
    public accountLockedUntil: Date;

    // Actividad y métricas
    @Column({ nullable: true, type: 'timestamp' })
    public lastLoginAt: Date;

    @Column({ nullable: true, length: 45 })
    public lastLoginIp: string;

    @Column({ nullable: true, length: 500 })
    public lastUserAgent: string;

    @Column({ type: 'integer', default: 0 })
    public totalLogins: number;

    @Column({ type: 'integer', default: 0 })
    public totalDatacentersCreated: number;

    @Column({ type: 'integer', default: 0 })
    public totalServersDeployed: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
    public totalRevenue: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
    public totalExpenses: number;

    @Column({ type: 'integer', default: 0 })
    public totalIncidents: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
    public averageUptime: number;

    // Configuración de facturación
    @Column({ nullable: true, length: 100 })
    public billingName: string;

    @Column({ nullable: true, length: 255 })
    public billingAddress: string;

    @Column({ nullable: true, length: 100 })
    public billingCity: string;

    @Column({ nullable: true, length: 100 })
    public billingState: string;

    @Column({ nullable: true, length: 20 })
    public billingPostalCode: string;

    @Column({ nullable: true, length: 100 })
    public billingCountry: string;

    @Column({ nullable: true, length: 50 })
    public paymentMethod: string;

    @Column({ nullable: true, type: 'timestamp' })
    public subscriptionStartDate: Date;

    @Column({ nullable: true, type: 'timestamp' })
    public subscriptionEndDate: Date;

    @Column({ type: 'boolean', default: true })
    public autoRenewSubscription: boolean;

    // Configuración de API
    @Column({ nullable: true, length: 64 })
    public apiKey: string;

    @Column({ type: 'integer', default: 1000 })
    public apiRateLimit: number;

    @Column({ type: 'integer', default: 0 })
    public apiCallsThisMonth: number;

    @Column({ nullable: true, type: 'timestamp' })
    public apiKeyLastUsed: Date;

    // Configuración de alertas
    @Column({ type: 'json', nullable: true })
    public alertThresholds: {
        cpuUsage?: number;
        memoryUsage?: number;
        diskUsage?: number;
        networkLatency?: number;
        uptimeThreshold?: number;
        costThreshold?: number;
    };

    @Column({ type: 'json', nullable: true })
    public alertContacts: {
        email?: string[];
        sms?: string[];
        webhook?: string[];
    };

    // Información temporal
    @Column({ nullable: true, type: 'timestamp' })
    public emailVerifiedAt: Date;

    @Column({ nullable: true, type: 'timestamp' })
    public phoneVerifiedAt: Date;

    @Column({ nullable: true, type: 'timestamp' })
    public profileCompletedAt: Date;

    @Column({ nullable: true, type: 'timestamp' })
    public termsAcceptedAt: Date;

    @Column({ nullable: true, type: 'timestamp' })
    public privacyPolicyAcceptedAt: Date;

    // Metadatos adicionales
    @Column({ type: 'json', nullable: true })
    public preferences: {
        dashboardLayout?: string;
        defaultView?: string;
        autoRefreshInterval?: number;
        theme?: 'light' | 'dark' | 'auto';
        compactMode?: boolean;
        showTutorials?: boolean;
    };

    @Column({ type: 'json', nullable: true })
    public integrations: {
        slack?: { webhookUrl: string; enabled: boolean };
        discord?: { webhookUrl: string; enabled: boolean };
        teams?: { webhookUrl: string; enabled: boolean };
        pagerduty?: { apiKey: string; enabled: boolean };
    };

    @Column({ type: 'text', nullable: true })
    public notes: string;

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public getRol(): Rol {
        return this.rol;
    }

    public setRol(rol: Rol): void {
        this.rol = rol;
    }

    public getUuid(): string {
        return this.uuid;
    }

    public setUuid(uuid: string): void {
        this.uuid = uuid;
    }

    // Getters y Setters adicionales
    public getFirstName(): string {
        return this.firstName;
    }

    public setFirstName(firstName: string): void {
        this.firstName = firstName;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public setLastName(lastName: string): void {
        this.lastName = lastName;
    }

    public getFullName(): string {
        if (this.firstName && this.lastName) {
            return `${this.firstName} ${this.lastName}`;
        }
        return this.firstName || this.lastName || this.email || 'Usuario';
    }

    public getPhoneNumber(): string {
        return this.phoneNumber;
    }

    public setPhoneNumber(phoneNumber: string): void {
        this.phoneNumber = phoneNumber;
    }

    public getStatus(): UserStatus {
        return this.status;
    }

    public setStatus(status: UserStatus): void {
        this.status = status;
    }

    public getTier(): UserTier {
        return this.tier;
    }

    public setTier(tier: UserTier): void {
        this.tier = tier;
    }

    public getLocation(): { country: string; state: string; city: string; address: string } {
        return {
            country: this.country,
            state: this.state,
            city: this.city,
            address: this.address
        };
    }

    public setLocation(country: string, state: string, city: string, address: string): void {
        this.country = country;
        this.state = state;
        this.city = city;
        this.address = address;
    }

    public getCoordinates(): { latitude: number; longitude: number } {
        return {
            latitude: this.latitude,
            longitude: this.longitude
        };
    }

    public setCoordinates(latitude: number, longitude: number): void {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public getCompanyInfo(): { name: string; jobTitle: string; department: string; size: string; industry: string } {
        return {
            name: this.companyName,
            jobTitle: this.jobTitle,
            department: this.department,
            size: this.companySize,
            industry: this.industry
        };
    }

    // Métodos de utilidad
    /**
     * Verifica si el usuario está activo
     */
    public isActive(): boolean {
        return this.status === UserStatus.ACTIVE;
    }

    /**
     * Verifica si el usuario está suspendido o baneado
     */
    public isSuspended(): boolean {
        return this.status === UserStatus.SUSPENDED || this.status === UserStatus.BANNED;
    }

    /**
     * Verifica si el email está verificado
     */
    public isEmailVerified(): boolean {
        return this.emailVerifiedAt !== null;
    }

    /**
     * Verifica si el teléfono está verificado
     */
    public isPhoneVerified(): boolean {
        return this.phoneVerifiedAt !== null;
    }

    /**
     * Verifica si el perfil está completo
     */
    public isProfileComplete(): boolean {
        return this.profileCompletedAt !== null &&
               !!this.firstName && !!this.lastName &&
               !!this.phoneNumber && !!this.country;
    }

    /**
     * Verifica si la cuenta está bloqueada
     */
    public isAccountLocked(): boolean {
        return this.accountLockedUntil && new Date() < this.accountLockedUntil;
    }

    /**
     * Verifica si tiene 2FA habilitado
     */
    public hasTwoFactorEnabled(): boolean {
        return this.twoFactorEnabled && this.twoFactorSecret !== null;
    }

    /**
     * Calcula la edad del usuario
     */
    public getAge(): number | null {
        if (!this.dateOfBirth) return null;
        const today = new Date();
        const birthDate = new Date(this.dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    /**
     * Calcula los días desde el último login
     */
    public getDaysSinceLastLogin(): number | null {
        if (!this.lastLoginAt) return null;
        const now = new Date();
        const lastLogin = new Date(this.lastLoginAt);
        const diffTime = Math.abs(now.getTime() - lastLogin.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    /**
     * Verifica si la suscripción está activa
     */
    public hasActiveSubscription(): boolean {
        if (!this.subscriptionEndDate) return false;
        return new Date() < this.subscriptionEndDate;
    }

    /**
     * Calcula los días restantes de suscripción
     */
    public getSubscriptionDaysRemaining(): number | null {
        if (!this.subscriptionEndDate) return null;
        const now = new Date();
        const endDate = new Date(this.subscriptionEndDate);
        if (now >= endDate) return 0;
        const diffTime = endDate.getTime() - now.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    /**
     * Calcula el ROI del usuario
     */
    public getROI(): number {
        if (this.totalExpenses === 0) return 0;
        return ((this.totalRevenue - this.totalExpenses) / this.totalExpenses) * 100;
    }

    /**
     * Calcula el margen de beneficio
     */
    public getProfitMargin(): number {
        if (this.totalRevenue === 0) return 0;
        return ((this.totalRevenue - this.totalExpenses) / this.totalRevenue) * 100;
    }

    /**
     * Obtiene el nivel de experiencia basado en métricas
     */
    public getExperienceLevel(): 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT' {
        const score = this.totalDatacentersCreated * 10 +
                     this.totalServersDeployed * 2 +
                     (this.totalRevenue / 1000) +
                     (this.averageUptime * 10);
        
        if (score < 100) return 'BEGINNER';
        if (score < 500) return 'INTERMEDIATE';
        if (score < 1500) return 'ADVANCED';
        return 'EXPERT';
    }

    /**
     * Verifica si puede usar la API
     */
    public canUseAPI(): boolean {
        return this.apiKey !== null && this.apiCallsThisMonth < this.apiRateLimit;
    }

    /**
     * Calcula el porcentaje de uso de la API
     */
    public getAPIUsagePercent(): number {
        if (this.apiRateLimit === 0) return 0;
        return (this.apiCallsThisMonth / this.apiRateLimit) * 100;
    }

    /**
     * Verifica si necesita renovar la suscripción pronto
     */
    public needsSubscriptionRenewal(daysThreshold: number = 7): boolean {
        const daysRemaining = this.getSubscriptionDaysRemaining();
        return daysRemaining !== null && daysRemaining <= daysThreshold;
    }

    /**
     * Obtiene una puntuación de completitud del perfil (0-100)
     */
    public getProfileCompletenessScore(): number {
        let score = 0;
        const fields = [
            this.firstName, this.lastName, this.phoneNumber, this.dateOfBirth,
            this.country, this.city, this.companyName, this.jobTitle,
            this.profilePicture, this.bio
        ];
        
        fields.forEach(field => {
            if (field) score += 10;
        });
        
        return Math.min(100, score);
    }

    /**
     * Verifica si el usuario es premium o superior
     */
    public isPremiumUser(): boolean {
        return this.tier === UserTier.PREMIUM || this.tier === UserTier.ENTERPRISE;
    }

    /**
     * Obtiene el límite de datacenters según el tier
     */
    public getDatacenterLimit(): number {
        switch (this.tier) {
            case UserTier.FREE: return 1;
            case UserTier.BASIC: return 5;
            case UserTier.PREMIUM: return 25;
            case UserTier.ENTERPRISE: return -1; // Ilimitado
            default: return 1;
        }
    }

    /**
     * Obtiene el límite de servidores según el tier
     */
    public getServerLimit(): number {
        switch (this.tier) {
            case UserTier.FREE: return 10;
            case UserTier.BASIC: return 100;
            case UserTier.PREMIUM: return 1000;
            case UserTier.ENTERPRISE: return -1; // Ilimitado
            default: return 10;
        }
    }

    /**
     * Verifica si puede crear más datacenters
     */
    public canCreateMoreDatacenters(): boolean {
        const limit = this.getDatacenterLimit();
        return limit === -1 || this.totalDatacentersCreated < limit;
    }

    /**
     * Verifica si puede desplegar más servidores
     */
    public canDeployMoreServers(): boolean {
        const limit = this.getServerLimit();
        return limit === -1 || this.totalServersDeployed < limit;
    }

    /**
     * Obtiene un resumen del estado del usuario
     */
    public getUserSummary(): {
        id: number;
        name: string;
        email: string;
        status: UserStatus;
        tier: UserTier;
        isActive: boolean;
        profileComplete: boolean;
        experienceLevel: string;
        subscriptionActive: boolean;
        daysRemaining: number | null;
    } {
        return {
            id: this.id,
            name: this.getFullName(),
            email: this.email,
            status: this.status,
            tier: this.tier,
            isActive: this.isActive(),
            profileComplete: this.isProfileComplete(),
            experienceLevel: this.getExperienceLevel(),
            subscriptionActive: this.hasActiveSubscription(),
            daysRemaining: this.getSubscriptionDaysRemaining()
        };
    }

    /**
     * Clona la configuración básica del usuario
     */
    public clone(): Partial<User> {
        return {
            email: `copy_${this.email}`,
            firstName: this.firstName,
            lastName: this.lastName,
            preferredLanguage: this.preferredLanguage,
            preferredCurrency: this.preferredCurrency,
            timezone: this.timezone,
            country: this.country,
            state: this.state,
            city: this.city
        };
    }

}
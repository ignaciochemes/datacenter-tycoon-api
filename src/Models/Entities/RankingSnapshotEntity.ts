import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GenericEntity } from "./GenericTable";
import { User } from "./UserEntity";

/**
 * Entidad que representa instantáneas del ranking de usuarios en diferentes momentos
 * Permite hacer seguimiento histórico de posiciones y métricas de rendimiento
 */
@Entity()
export class RankingSnapshot extends GenericEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
    public userId: User;

    @Column({ nullable: false })
    public uuid: string;

    // Información temporal de la instantánea
    @Column({ type: 'timestamp', nullable: false, comment: 'Fecha y hora de la instantánea' })
    public snapshotDate: Date;

    @Column({ nullable: false, length: 50, comment: 'Período de la instantánea' })
    public period: string; // daily, weekly, monthly, quarterly, yearly

    @Column({ type: 'date', nullable: false, comment: 'Fecha de inicio del período' })
    public periodStart: Date;

    @Column({ type: 'date', nullable: false, comment: 'Fecha de fin del período' })
    public periodEnd: Date;

    // Información de ranking general
    @Column({ type: 'integer', nullable: false, comment: 'Posición en el ranking general' })
    public overallRank: number;

    @Column({ type: 'integer', nullable: false, comment: 'Total de participantes en el ranking' })
    public totalParticipants: number;

    @Column({ type: 'decimal', precision: 8, scale: 4, nullable: false, comment: 'Puntuación total del usuario' })
    public totalScore: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false, comment: 'Percentil del usuario (0-100)' })
    public percentile: number;

    // Rankings por categoría
    @Column({ type: 'integer', nullable: true, comment: 'Ranking por reputación' })
    public reputationRank: number;

    @Column({ type: 'decimal', precision: 8, scale: 4, nullable: true, comment: 'Puntuación de reputación' })
    public reputationScore: number;

    @Column({ type: 'integer', nullable: true, comment: 'Ranking por ingresos' })
    public revenueRank: number;

    @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true, comment: 'Ingresos totales' })
    public totalRevenue: number;

    @Column({ type: 'integer', nullable: true, comment: 'Ranking por número de clientes' })
    public customerRank: number;

    @Column({ type: 'integer', nullable: true, comment: 'Número total de clientes' })
    public totalCustomers: number;

    @Column({ type: 'integer', nullable: true, comment: 'Ranking por uptime' })
    public uptimeRank: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true, comment: 'Porcentaje de uptime promedio' })
    public averageUptime: number;

    @Column({ type: 'integer', nullable: true, comment: 'Ranking por innovación' })
    public innovationRank: number;

    @Column({ type: 'decimal', precision: 8, scale: 4, nullable: true, comment: 'Puntuación de innovación' })
    public innovationScore: number;

    @Column({ type: 'integer', nullable: true, comment: 'Ranking por eficiencia' })
    public efficiencyRank: number;

    @Column({ type: 'decimal', precision: 8, scale: 4, nullable: true, comment: 'Puntuación de eficiencia' })
    public efficiencyScore: number;

    @Column({ type: 'integer', nullable: true, comment: 'Ranking por crecimiento' })
    public growthRank: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true, comment: 'Porcentaje de crecimiento' })
    public growthPercentage: number;

    // Métricas de rendimiento
    @Column({ type: 'json', nullable: true, comment: 'Métricas detalladas de rendimiento' })
    public performanceMetrics: {
        // Métricas financieras
        financial?: {
            totalRevenue: number;
            monthlyRecurringRevenue: number;
            profitMargin: number;
            customerAcquisitionCost: number;
            customerLifetimeValue: number;
            churnRate: number;
            revenueGrowthRate: number;
        };
        
        // Métricas operacionales
        operational?: {
            totalServers: number;
            totalServices: number;
            activeContracts: number;
            averageUptime: number;
            incidentCount: number;
            meanTimeToResolution: number;
            customerSatisfactionScore: number;
            slaComplianceRate: number;
        };
        
        // Métricas de mercado
        market?: {
            marketShare: number;
            competitivePosition: number;
            brandRecognition: number;
            customerRetentionRate: number;
            netPromoterScore: number;
            industryRanking: number;
        };
        
        // Métricas de innovación
        innovation?: {
            newServicesLaunched: number;
            technologyAdoptionRate: number;
            researchAndDevelopmentSpend: number;
            patentsOrCertifications: number;
            innovationIndex: number;
        };
        
        // Métricas de sostenibilidad
        sustainability?: {
            energyEfficiency: number;
            carbonFootprint: number;
            renewableEnergyUsage: number;
            wasteReduction: number;
            sustainabilityScore: number;
        };
    };

    // Información de cambios respecto al período anterior
    @Column({ type: 'integer', nullable: true, comment: 'Cambio en la posición general' })
    public rankChange: number;

    @Column({ type: 'decimal', precision: 8, scale: 4, nullable: true, comment: 'Cambio en la puntuación total' })
    public scoreChange: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true, comment: 'Cambio en el percentil' })
    public percentileChange: number;

    @Column({ type: 'json', nullable: true, comment: 'Cambios detallados por categoría' })
    public categoryChanges: {
        reputation?: { rankChange: number; scoreChange: number };
        revenue?: { rankChange: number; valueChange: number };
        customers?: { rankChange: number; countChange: number };
        uptime?: { rankChange: number; percentageChange: number };
        innovation?: { rankChange: number; scoreChange: number };
        efficiency?: { rankChange: number; scoreChange: number };
        growth?: { rankChange: number; percentageChange: number };
    };

    // Información de tendencias
    @Column({ nullable: true, length: 50, comment: 'Tendencia general' })
    public overallTrend: string; // RISING, FALLING, STABLE, VOLATILE

    @Column({ type: 'integer', nullable: true, comment: 'Número de períodos consecutivos con la misma tendencia' })
    public trendConsistency: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true, comment: 'Velocidad de cambio' })
    public changeVelocity: number;

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true, comment: 'Volatilidad del ranking' })
    public volatility: number;

    // Información de logros y hitos
    @Column({ type: 'json', nullable: true, comment: 'Logros alcanzados en este período' })
    public achievements: {
        achievementId: string;
        achievementName: string;
        achievementType: string; // milestone, ranking, performance, special
        achievedAt: Date;
        description: string;
        points: number;
    }[];

    @Column({ type: 'json', nullable: true, comment: 'Hitos importantes alcanzados' })
    public milestones: {
        milestoneType: string; // revenue, customers, uptime, ranking
        milestoneValue: number;
        previousBest?: number;
        isNewRecord: boolean;
        achievedAt: Date;
    }[];

    // Información de competencia
    @Column({ type: 'json', nullable: true, comment: 'Comparación con competidores principales' })
    public competitorComparison: {
        competitorId: string;
        competitorName: string;
        ourRank: number;
        competitorRank: number;
        rankDifference: number;
        ourScore: number;
        competitorScore: number;
        scoreDifference: number;
        categories: {
            category: string;
            ourRank: number;
            competitorRank: number;
            advantage: boolean;
        }[];
    }[];

    // Información de segmentación
    @Column({ nullable: true, length: 100, comment: 'Región geográfica' })
    public region: string;

    @Column({ nullable: true, length: 100, comment: 'Segmento de mercado' })
    public marketSegment: string;

    @Column({ nullable: true, length: 100, comment: 'Categoría de empresa' })
    public companyCategory: string; // startup, small, medium, large, enterprise

    @Column({ type: 'integer', nullable: true, comment: 'Ranking dentro del segmento' })
    public segmentRank: number;

    @Column({ type: 'integer', nullable: true, comment: 'Total de participantes en el segmento' })
    public segmentParticipants: number;

    // Información de predicciones
    @Column({ type: 'json', nullable: true, comment: 'Predicciones para el próximo período' })
    public predictions: {
        predictedRank: number;
        predictedScore: number;
        confidenceLevel: number;
        predictionFactors: string[];
        riskFactors: string[];
        opportunities: string[];
    };

    // Información de calidad de datos
    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true, comment: 'Puntuación de calidad de datos' })
    public dataQualityScore: number;

    @Column({ type: 'integer', nullable: true, comment: 'Número de métricas incluidas' })
    public metricsIncluded: number;

    @Column({ type: 'integer', nullable: true, comment: 'Número de métricas faltantes' })
    public metricsMissing: number;

    @Column({ default: false, comment: 'Si la instantánea está completa' })
    public isComplete: boolean;

    @Column({ default: false, comment: 'Si la instantánea ha sido verificada' })
    public isVerified: boolean;

    // Información de procesamiento
    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de procesamiento' })
    public processedAt: Date;

    @Column({ nullable: true, comment: 'Versión del algoritmo de ranking' })
    public algorithmVersion: string;

    @Column({ type: 'json', nullable: true, comment: 'Parámetros del algoritmo utilizados' })
    public algorithmParameters: {
        weights?: { [category: string]: number };
        adjustments?: { [factor: string]: number };
        filters?: string[];
        normalizationMethod?: string;
    };

    // Metadatos adicionales
    @Column({ type: 'json', nullable: true, comment: 'Metadatos adicionales' })
    public metadata: {
        calculationTimeMs?: number;
        dataSourcesUsed?: string[];
        excludedMetrics?: string[];
        specialAdjustments?: string[];
        notes?: string;
        tags?: string[];
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

    public getUuid(): string {
        return this.uuid;
    }

    public setUuid(uuid: string): void {
        this.uuid = uuid;
    }

    public getSnapshotDate(): Date {
        return this.snapshotDate;
    }

    public setSnapshotDate(snapshotDate: Date): void {
        this.snapshotDate = snapshotDate;
    }

    public getPeriod(): string {
        return this.period;
    }

    public setPeriod(period: string): void {
        this.period = period;
    }

    public getPeriodStart(): Date {
        return this.periodStart;
    }

    public setPeriodStart(periodStart: Date): void {
        this.periodStart = periodStart;
    }

    public getPeriodEnd(): Date {
        return this.periodEnd;
    }

    public setPeriodEnd(periodEnd: Date): void {
        this.periodEnd = periodEnd;
    }

    public getOverallRank(): number {
        return this.overallRank;
    }

    public setOverallRank(overallRank: number): void {
        this.overallRank = overallRank;
    }

    public getTotalParticipants(): number {
        return this.totalParticipants;
    }

    public setTotalParticipants(totalParticipants: number): void {
        this.totalParticipants = totalParticipants;
    }

    public getTotalScore(): number {
        return this.totalScore;
    }

    public setTotalScore(totalScore: number): void {
        this.totalScore = totalScore;
    }

    public getPercentile(): number {
        return this.percentile;
    }

    public setPercentile(percentile: number): void {
        this.percentile = percentile;
    }

    // Métodos adicionales para cálculos
    public isTopPerformer(): boolean {
        return this.percentile >= 90;
    }

    public isBottomPerformer(): boolean {
        return this.percentile <= 10;
    }

    public getRankingTier(): string {
        if (this.percentile >= 95) return 'ELITE';
        if (this.percentile >= 80) return 'EXCELLENT';
        if (this.percentile >= 60) return 'GOOD';
        if (this.percentile >= 40) return 'AVERAGE';
        if (this.percentile >= 20) return 'BELOW_AVERAGE';
        return 'POOR';
    }

    public getImprovementDirection(): string {
        if (!this.rankChange) return 'STABLE';
        return this.rankChange > 0 ? 'IMPROVING' : 'DECLINING';
    }

    public getPerformanceGrade(): string {
        const percentile = this.percentile;
        if (percentile >= 97) return 'A+';
        if (percentile >= 93) return 'A';
        if (percentile >= 90) return 'A-';
        if (percentile >= 87) return 'B+';
        if (percentile >= 83) return 'B';
        if (percentile >= 80) return 'B-';
        if (percentile >= 77) return 'C+';
        if (percentile >= 73) return 'C';
        if (percentile >= 70) return 'C-';
        if (percentile >= 67) return 'D+';
        if (percentile >= 63) return 'D';
        if (percentile >= 60) return 'D-';
        return 'F';
    }

    public calculatePeriodDuration(): number {
        return Math.floor((this.periodEnd.getTime() - this.periodStart.getTime()) / (1000 * 60 * 60 * 24));
    }

    public isCurrentPeriod(): boolean {
        const now = new Date();
        return now >= this.periodStart && now <= this.periodEnd;
    }

    public getCompetitiveAdvantages(): string[] {
        const advantages: string[] = [];
        
        if (this.competitorComparison) {
            this.competitorComparison.forEach(comp => {
                comp.categories.forEach(cat => {
                    if (cat.advantage) {
                        advantages.push(`${cat.category} vs ${comp.competitorName}`);
                    }
                });
            });
        }
        
        return advantages;
    }

    public getWeaknesses(): string[] {
        const weaknesses: string[] = [];
        
        if (this.competitorComparison) {
            this.competitorComparison.forEach(comp => {
                comp.categories.forEach(cat => {
                    if (!cat.advantage) {
                        weaknesses.push(`${cat.category} vs ${comp.competitorName}`);
                    }
                });
            });
        }
        
        return weaknesses;
    }
}
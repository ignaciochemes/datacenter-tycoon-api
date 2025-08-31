import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GenericEntity } from "./GenericTable";
import { User } from "./UserEntity";
import { Datacenter } from "./DatacenterEntity";
import { Device } from "./DeviceEntity";
import { NetworkType, NetworkStatus, VlanType } from "../../Enums/NetworkEnum";

/**
 * Entidad que representa la configuración de red en el simulador
 * Incluye VLANs, subredes, routing, DNS y configuraciones avanzadas
 */
@Entity()
export class NetworkConfig extends GenericEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
    public userId: User;

    @ManyToOne(() => Datacenter, datacenter => datacenter.id, { nullable: true })
    @JoinColumn({ name: 'datacenter_id' })
    public datacenterId: Datacenter;

    @ManyToOne(() => Device, device => device.id, { nullable: true })
    @JoinColumn({ name: 'device_id' })
    public deviceId: Device;

    @Column({ nullable: false })
    public uuid: string;

    @Column({ nullable: false, length: 200, comment: 'Nombre de la configuración de red' })
    public name: string;

    @Column({ nullable: true, type: 'text', comment: 'Descripción de la configuración' })
    public description: string;

    @Column({ type: 'enum', enum: NetworkStatus, nullable: false, default: NetworkStatus.ACTIVE, comment: 'Estado de la configuración' })
    public status: NetworkStatus;

    @Column({ type: 'enum', enum: NetworkType, nullable: false, comment: 'Tipo de red' })
    public networkType: NetworkType;

    @Column({ default: true, comment: 'Si la configuración está habilitada' })
    public enabled: boolean;

    @Column({ default: false, comment: 'Si es una configuración del sistema' })
    public isSystemConfig: boolean;

    // Configuración básica de red
    @Column({ nullable: true, length: 100, comment: 'Dirección de red principal' })
    public networkAddress: string;

    @Column({ nullable: true, length: 50, comment: 'Máscara de subred' })
    public subnetMask: string;

    @Column({ nullable: true, length: 100, comment: 'CIDR de la red' })
    public cidr: string;

    @Column({ nullable: true, length: 100, comment: 'Gateway por defecto' })
    public defaultGateway: string;

    @Column({ type: 'integer', nullable: true, comment: 'MTU de la red' })
    public mtu: number;

    @Column({ type: 'json', nullable: true, comment: 'Configuración de VLANs' })
    public vlans: {
        id: number;
        name: string;
        description?: string;
        type: VlanType;
        enabled: boolean;
        networkAddress: string;
        subnetMask: string;
        gateway?: string;
        dhcpEnabled?: boolean;
        dhcpRange?: {
            start: string;
            end: string;
        };
        dnsServers?: string[];
        domainName?: string;
        leaseTime?: number; // segundos
        reservations?: {
            mac: string;
            ip: string;
            hostname?: string;
        }[];
        accessPorts?: string[]; // Lista de puertos de acceso
        trunkPorts?: string[]; // Lista de puertos trunk
        qosPolicy?: string;
        securityPolicy?: string;
        isolationEnabled?: boolean;
        metadata?: { [key: string]: any };
    }[];

    // Configuración de subredes
    @Column({ type: 'json', nullable: true, comment: 'Configuración de subredes' })
    public subnets: {
        id: string;
        name: string;
        networkAddress: string;
        subnetMask: string;
        cidr: string;
        gateway: string;
        vlanId?: number;
        purpose: string; // SERVERS, STORAGE, MANAGEMENT, DMZ, etc.
        enabled: boolean;
        dhcpEnabled: boolean;
        dhcpRange?: {
            start: string;
            end: string;
        };
        dnsServers: string[];
        ntpServers?: string[];
        domainName?: string;
        searchDomains?: string[];
        staticRoutes?: {
            destination: string;
            gateway: string;
            metric?: number;
        }[];
        accessControlList?: {
            source: string;
            destination: string;
            action: string; // ALLOW, DENY
            protocol?: string;
            port?: string;
        }[];
        qosConfig?: {
            enabled: boolean;
            bandwidth?: number; // Mbps
            priority?: number; // 0-7
            dscp?: number;
        };
        monitoringEnabled?: boolean;
        metadata?: { [key: string]: any };
    }[];

    // Configuración de routing
    @Column({ type: 'json', nullable: true, comment: 'Configuración de routing' })
    public routingConfig: {
        enabled: boolean;
        protocol: string; // STATIC, RIP, OSPF, BGP
        staticRoutes: {
            destination: string;
            gateway: string;
            interface?: string;
            metric: number;
            enabled: boolean;
            description?: string;
        }[];
        dynamicRouting?: {
            ospf?: {
                enabled: boolean;
                routerId: string;
                areas: {
                    id: string;
                    type: string; // NORMAL, STUB, NSSA
                    networks: string[];
                    authentication?: {
                        type: string; // NONE, SIMPLE, MD5
                        key?: string;
                    };
                }[];
                redistributeConnected?: boolean;
                redistributeStatic?: boolean;
            };
            bgp?: {
                enabled: boolean;
                asn: number;
                routerId: string;
                neighbors: {
                    ip: string;
                    asn: number;
                    description?: string;
                    authentication?: string;
                }[];
                networks: string[];
                redistributeOspf?: boolean;
                redistributeStatic?: boolean;
            };
        };
        loadBalancing?: {
            enabled: boolean;
            algorithm: string; // ROUND_ROBIN, WEIGHTED, HASH
            maxPaths?: number;
        };
    };

    // Configuración de DNS
    @Column({ type: 'json', nullable: true, comment: 'Configuración de DNS' })
    public dnsConfig: {
        enabled: boolean;
        primaryServer: string;
        secondaryServers: string[];
        forwarders: string[];
        domainName: string;
        searchDomains: string[];
        recursionEnabled: boolean;
        cacheSize?: number; // MB
        cacheTtl?: number; // segundos
        zones: {
            name: string;
            type: string; // FORWARD, REVERSE
            file?: string;
            records: {
                name: string;
                type: string; // A, AAAA, CNAME, MX, PTR, TXT, SRV
                value: string;
                ttl?: number;
                priority?: number; // Para MX y SRV
                weight?: number; // Para SRV
                port?: number; // Para SRV
            }[];
        }[];
        logging?: {
            enabled: boolean;
            level: string;
            queries?: boolean;
            responses?: boolean;
        };
        security?: {
            dnssec?: boolean;
            filterMalicious?: boolean;
            blockLists?: string[];
            allowLists?: string[];
        };
    };

    // Configuración de DHCP
    @Column({ type: 'json', nullable: true, comment: 'Configuración de DHCP' })
    public dhcpConfig: {
        enabled: boolean;
        globalSettings: {
            defaultLeaseTime: number; // segundos
            maxLeaseTime: number; // segundos
            domainName: string;
            domainNameServers: string[];
            ntpServers?: string[];
            timeOffset?: number;
            routers: string[];
            broadcastAddress?: string;
            subnetMask: string;
        };
        scopes: {
            id: string;
            name: string;
            network: string;
            subnetMask: string;
            rangeStart: string;
            rangeEnd: string;
            gateway: string;
            enabled: boolean;
            leaseTime?: number;
            reservations: {
                mac: string;
                ip: string;
                hostname?: string;
                description?: string;
            }[];
            options?: {
                code: number;
                name: string;
                value: string;
            }[];
            exclusions?: {
                start: string;
                end: string;
                reason?: string;
            }[];
        }[];
        logging?: {
            enabled: boolean;
            level: string;
            logLeases?: boolean;
            logConflicts?: boolean;
        };
        failover?: {
            enabled: boolean;
            partnerId: string;
            partnerAddress: string;
            role: string; // PRIMARY, SECONDARY
            splitIndex?: number;
        };
    };

    // Configuración de seguridad de red
    @Column({ type: 'json', nullable: true, comment: 'Configuración de seguridad' })
    public securityConfig: {
        firewallEnabled: boolean;
        ipsEnabled?: boolean;
        idsEnabled?: boolean;
        accessControlLists: {
            id: string;
            name: string;
            rules: {
                sequence: number;
                action: string; // PERMIT, DENY
                protocol: string; // IP, TCP, UDP, ICMP
                source: string;
                sourceWildcard?: string;
                destination: string;
                destinationWildcard?: string;
                sourcePort?: string;
                destinationPort?: string;
                established?: boolean;
                log?: boolean;
                description?: string;
            }[];
        }[];
        portSecurity?: {
            enabled: boolean;
            maxMacAddresses?: number;
            violationAction?: string; // SHUTDOWN, RESTRICT, PROTECT
            agingTime?: number; // minutos
            stickyMac?: boolean;
        };
        stormControl?: {
            enabled: boolean;
            broadcastThreshold?: number; // pps
            multicastThreshold?: number; // pps
            unicastThreshold?: number; // pps
            action?: string; // SHUTDOWN, TRAP
        };
        macAddressFiltering?: {
            enabled: boolean;
            mode: string; // ALLOW, DENY
            addresses: {
                mac: string;
                description?: string;
            }[];
        };
    };

    // Configuración de QoS
    @Column({ type: 'json', nullable: true, comment: 'Configuración de QoS' })
    public qosConfig: {
        enabled: boolean;
        model: string; // DIFFSERV, INTSERV
        classes: {
            id: string;
            name: string;
            priority: number; // 0-7
            dscp?: number; // 0-63
            bandwidth?: {
                guaranteed?: number; // Mbps
                maximum?: number; // Mbps
                percentage?: number; // % del ancho de banda total
            };
            queueing?: {
                algorithm: string; // FIFO, WFQ, PQ, CBQ
                weight?: number;
                bufferSize?: number; // bytes
            };
            shaping?: {
                enabled: boolean;
                rate?: number; // Mbps
                burstSize?: number; // bytes
            };
            policing?: {
                enabled: boolean;
                rate?: number; // Mbps
                burstSize?: number; // bytes
                action?: string; // DROP, MARK
            };
            matching?: {
                protocols?: string[];
                sourceIps?: string[];
                destinationIps?: string[];
                sourcePorts?: string[];
                destinationPorts?: string[];
                dscp?: number[];
                applications?: string[];
            };
        }[];
        congestionAvoidance?: {
            enabled: boolean;
            algorithm: string; // RED, WRED
            thresholds?: {
                min: number; // % buffer
                max: number; // % buffer
                dropProbability?: number; // %
            };
        };
    };

    // Configuración de monitoreo
    @Column({ type: 'json', nullable: true, comment: 'Configuración de monitoreo de red' })
    public monitoringConfig: {
        enabled: boolean;
        snmp?: {
            enabled: boolean;
            version: string; // v1, v2c, v3
            community?: string;
            users?: {
                username: string;
                authProtocol?: string; // MD5, SHA
                authPassword?: string;
                privProtocol?: string; // DES, AES
                privPassword?: string;
            }[];
            traps?: {
                enabled: boolean;
                destinations: {
                    ip: string;
                    port: number;
                    community?: string;
                }[];
            };
        };
        netflow?: {
            enabled: boolean;
            version: number; // 5, 9, 10 (IPFIX)
            collectors: {
                ip: string;
                port: number;
            }[];
            samplingRate?: number;
            activeTimeout?: number; // segundos
            inactiveTimeout?: number; // segundos
        };
        syslog?: {
            enabled: boolean;
            server: string;
            port?: number;
            facility?: string;
            severity?: string;
        };
        portMirroring?: {
            enabled: boolean;
            sessions: {
                id: string;
                sourcePorts: string[];
                destinationPort: string;
                direction: string; // RX, TX, BOTH
                enabled: boolean;
            }[];
        };
    };

    // Métricas de rendimiento
    @Column({ type: 'json', nullable: true, comment: 'Métricas de rendimiento de red' })
    public performanceMetrics: {
        bandwidth?: {
            total: number; // Mbps
            used: number; // Mbps
            utilization: number; // %
            peak: number; // Mbps
            average: number; // Mbps
        };
        latency?: {
            average: number; // ms
            minimum: number; // ms
            maximum: number; // ms
            jitter: number; // ms
        };
        packetLoss?: {
            percentage: number; // %
            packetsLost: number;
            totalPackets: number;
        };
        throughput?: {
            packetsPerSecond: number;
            bytesPerSecond: number;
            connectionsPerSecond: number;
        };
        errors?: {
            crcErrors: number;
            frameErrors: number;
            collisions: number;
            drops: number;
        };
        interfaces?: {
            [interfaceName: string]: {
                status: string; // UP, DOWN, ADMIN_DOWN
                speed: number; // Mbps
                duplex: string; // FULL, HALF
                mtu: number;
                inOctets: number;
                outOctets: number;
                inPackets: number;
                outPackets: number;
                inErrors: number;
                outErrors: number;
                inDiscards: number;
                outDiscards: number;
                utilization: number; // %
            };
        };
    };

    // Información temporal
    @Column({ type: 'timestamp', nullable: false, comment: 'Fecha de creación' })
    public createdAt: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de última modificación' })
    public lastModified: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de última aplicación' })
    public lastApplied: Date;

    @Column({ type: 'timestamp', nullable: true, comment: 'Fecha de último backup' })
    public lastBackup: Date;

    // Información de costos
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, comment: 'Costo mensual de la configuración' })
    public monthlyCost: number;

    @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true, comment: 'Costo por GB transferido' })
    public costPerGb: number;

    // Metadatos adicionales
    @Column({ type: 'json', nullable: true, comment: 'Etiquetas de la configuración' })
    public tags: string[];

    @Column({ nullable: true, length: 100, comment: 'Entorno (dev, staging, prod)' })
    public environment: string;

    @Column({ nullable: true, length: 100, comment: 'Región geográfica' })
    public region: string;

    @Column({ type: 'json', nullable: true, comment: 'Metadatos adicionales' })
    public metadata: {
        vendor?: string;
        version?: string;
        configVersion?: string;
        lastConfigHash?: string;
        complianceStandards?: string[]; // ISO27001, PCI-DSS, etc.
        changeApprovalRequired?: boolean;
        backupRetentionDays?: number;
        customFields?: { [key: string]: any };
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

    public getDatacenterId(): Datacenter {
        return this.datacenterId;
    }

    public setDatacenterId(datacenterId: Datacenter): void {
        this.datacenterId = datacenterId;
    }

    public getNetworkType(): NetworkType {
        return this.networkType;
    }

    public setNetworkType(networkType: NetworkType): void {
        this.networkType = networkType;
    }

    public getStatus(): NetworkStatus {
        return this.status;
    }

    public setStatus(status: NetworkStatus): void {
        this.status = status;
    }

    // Métodos adicionales para gestión y análisis
    public isActive(): boolean {
        return this.status === NetworkStatus.ACTIVE && this.enabled;
    }

    public getActiveVlans(): typeof this.vlans {
        return this.vlans?.filter(vlan => vlan.enabled) || [];
    }

    public getActiveSubnets(): typeof this.subnets {
        return this.subnets?.filter(subnet => subnet.enabled) || [];
    }

    public getVlanById(vlanId: number): typeof this.vlans[0] | undefined {
        return this.vlans?.find(vlan => vlan.id === vlanId);
    }

    public getSubnetById(subnetId: string): typeof this.subnets[0] | undefined {
        return this.subnets?.find(subnet => subnet.id === subnetId);
    }

    public addVlan(vlan: Omit<typeof this.vlans[0], 'id'>): number {
        if (!this.vlans) this.vlans = [];

        const newId = Math.max(0, ...this.vlans.map(v => v.id)) + 1;
        const newVlan = { ...vlan, id: newId };

        this.vlans.push(newVlan);
        return newId;
    }

    public removeVlan(vlanId: number): boolean {
        if (!this.vlans) return false;

        const index = this.vlans.findIndex(vlan => vlan.id === vlanId);
        if (index === -1) return false;

        this.vlans.splice(index, 1);
        return true;
    }

    public addSubnet(subnet: typeof this.subnets[0]): void {
        if (!this.subnets) this.subnets = [];
        this.subnets.push(subnet);
    }

    public removeSubnet(subnetId: string): boolean {
        if (!this.subnets) return false;

        const index = this.subnets.findIndex(subnet => subnet.id === subnetId);
        if (index === -1) return false;

        this.subnets.splice(index, 1);
        return true;
    }

    public calculateNetworkUtilization(): number {
        if (!this.performanceMetrics?.bandwidth) return 0;

        const { total, used } = this.performanceMetrics.bandwidth;
        if (total === 0) return 0;

        return (used / total) * 100;
    }

    public getAvailableIpAddresses(): number {
        let totalAvailable = 0;

        this.getActiveSubnets().forEach(subnet => {
            const cidrParts = subnet.cidr.split('/');
            const prefixLength = parseInt(cidrParts[1]);
            const hostBits = 32 - prefixLength;
            const totalHosts = Math.pow(2, hostBits) - 2; // -2 para network y broadcast

            // Restar IPs reservadas
            const reservedIps = subnet.dhcpRange ?
                this.calculateIpRange(subnet.dhcpRange.start, subnet.dhcpRange.end) : 0;

            totalAvailable += Math.max(0, totalHosts - reservedIps);
        });

        return totalAvailable;
    }

    private calculateIpRange(startIp: string, endIp: string): number {
        const start = this.ipToNumber(startIp);
        const end = this.ipToNumber(endIp);
        return Math.max(0, end - start + 1);
    }

    private ipToNumber(ip: string): number {
        return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet), 0) >>> 0;
    }

    public isIpInSubnet(ip: string, subnetId: string): boolean {
        const subnet = this.getSubnetById(subnetId);
        if (!subnet) return false;

        const [network, prefixLength] = subnet.cidr.split('/');
        const mask = (-1 << (32 - parseInt(prefixLength))) >>> 0;

        const ipNum = this.ipToNumber(ip);
        const networkNum = this.ipToNumber(network);

        return (ipNum & mask) === (networkNum & mask);
    }

    public getNetworkHealth(): number {
        let score = 100;

        // Penalizar por alta utilización
        const utilization = this.calculateNetworkUtilization();
        if (utilization > 80) {
            score -= (utilization - 80) * 2;
        }

        // Penalizar por pérdida de paquetes
        if (this.performanceMetrics?.packetLoss?.percentage) {
            score -= this.performanceMetrics.packetLoss.percentage * 10;
        }

        // Penalizar por alta latencia
        if (this.performanceMetrics?.latency?.average) {
            if (this.performanceMetrics.latency.average > 100) { // > 100ms
                score -= Math.min(30, (this.performanceMetrics.latency.average - 100) / 10);
            }
        }

        // Penalizar por errores
        if (this.performanceMetrics?.errors) {
            const totalErrors = Object.values(this.performanceMetrics.errors).reduce((sum, count) => sum + count, 0);
            if (totalErrors > 0) {
                score -= Math.min(20, totalErrors / 100);
            }
        }

        return Math.max(0, Math.min(100, score));
    }

    public needsOptimization(): boolean {
        // Verificar utilización alta
        if (this.calculateNetworkUtilization() > 85) return true;

        // Verificar pérdida de paquetes
        if (this.performanceMetrics?.packetLoss?.percentage &&
            this.performanceMetrics.packetLoss.percentage > 1) return true;

        // Verificar latencia alta
        if (this.performanceMetrics?.latency?.average &&
            this.performanceMetrics.latency.average > 200) return true;

        // Verificar salud general
        if (this.getNetworkHealth() < 70) return true;

        return false;
    }

    public getSecurityScore(): number {
        let score = 0;

        // Verificar firewall habilitado
        if (this.securityConfig?.firewallEnabled) score += 20;

        // Verificar IPS/IDS
        if (this.securityConfig?.ipsEnabled) score += 15;
        if (this.securityConfig?.idsEnabled) score += 15;

        // Verificar ACLs configuradas
        if (this.securityConfig?.accessControlLists?.length > 0) score += 15;

        // Verificar seguridad de puertos
        if (this.securityConfig?.portSecurity?.enabled) score += 10;

        // Verificar control de tormentas
        if (this.securityConfig?.stormControl?.enabled) score += 10;

        // Verificar filtrado de MAC
        if (this.securityConfig?.macAddressFiltering?.enabled) score += 5;

        // Verificar VLANs configuradas (segmentación)
        if (this.getActiveVlans().length > 1) score += 10;

        return Math.min(100, score);
    }

    public validateConfiguration(): { isValid: boolean; errors: string[] } {
        const errors: string[] = [];

        // Validar configuración básica
        if (!this.networkAddress || !this.subnetMask) {
            errors.push('Dirección de red y máscara de subred son requeridas');
        }

        // Validar VLANs
        if (this.vlans) {
            const vlanIds = this.vlans.map(v => v.id);
            const duplicateVlans = vlanIds.filter((id, index) => vlanIds.indexOf(id) !== index);
            if (duplicateVlans.length > 0) {
                errors.push(`VLANs duplicadas encontradas: ${duplicateVlans.join(', ')}`);
            }
        }

        // Validar subredes
        if (this.subnets) {
            const subnetIds = this.subnets.map(s => s.id);
            const duplicateSubnets = subnetIds.filter((id, index) => subnetIds.indexOf(id) !== index);
            if (duplicateSubnets.length > 0) {
                errors.push(`Subredes duplicadas encontradas: ${duplicateSubnets.join(', ')}`);
            }
        }

        // Validar DNS
        if (this.dnsConfig?.enabled && !this.dnsConfig.primaryServer) {
            errors.push('Servidor DNS primario es requerido cuando DNS está habilitado');
        }

        // Validar DHCP
        if (this.dhcpConfig?.enabled && this.dhcpConfig.scopes?.length === 0) {
            errors.push('Al menos un scope DHCP es requerido cuando DHCP está habilitado');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    public clone(): Partial<NetworkConfig> {
        const cloned = { ...this };
        delete cloned.id;
        cloned.uuid = ''; // Se generará uno nuevo
        cloned.name = `${this.name} (Copy)`;
        cloned.createdAt = new Date();
        cloned.lastModified = new Date();
        cloned.lastApplied = null;
        cloned.lastBackup = null;

        return cloned;
    }

    public exportConfiguration(): string {
        // Exportar configuración en formato JSON
        const config = {
            name: this.name,
            networkType: this.networkType,
            networkAddress: this.networkAddress,
            subnetMask: this.subnetMask,
            vlans: this.vlans,
            subnets: this.subnets,
            routingConfig: this.routingConfig,
            dnsConfig: this.dnsConfig,
            dhcpConfig: this.dhcpConfig,
            securityConfig: this.securityConfig,
            qosConfig: this.qosConfig,
            monitoringConfig: this.monitoringConfig
        };

        return JSON.stringify(config, null, 2);
    }
}
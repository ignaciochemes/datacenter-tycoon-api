import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1669995853984 implements MigrationInterface {
    name = 'FirstMigration1669995853984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`rol\` (\`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`delete_at\` datetime NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`description\` varchar(100) NOT NULL, \`enable\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`delete_at\` datetime NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NULL, \`password\` varchar(255) NOT NULL, \`uuid\` varchar(255) NOT NULL, \`rol_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`company\` (\`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`delete_at\` datetime NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NULL, \`description\` varchar(255) NULL, \`registration_date\` datetime NULL, \`balance\` int NULL DEFAULT '1500', \`active\` tinyint NOT NULL DEFAULT 0, \`user_id\` int NULL, UNIQUE INDEX \`REL_879141ebc259b4c0544b3f1ea4\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`datacenter_types\` (\`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`delete_at\` datetime NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`ubication\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`max_power\` int NOT NULL, \`max_bandwidth\` int NOT NULL, \`max_racks\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`datacenter\` (\`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`delete_at\` datetime NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`user_id\` int NULL, \`datacenter_type_id\` int NULL, UNIQUE INDEX \`REL_4a7b85c328ae789791ff97d4db\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cpu\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`cores\` int NOT NULL, \`threads\` int NOT NULL, \`mhz\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`rack\` (\`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`delete_at\` datetime NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NULL, \`maxServers\` int NULL DEFAULT '15', \`usedServers\` int NULL DEFAULT '0', \`bandwidthUsage\` int NULL DEFAULT '0', \`dedicatedBandwidth\` int NULL DEFAULT '0', \`sharedBandwidth\` int NULL DEFAULT '0', \`totalBandwidth\` int NULL DEFAULT '0', \`dedicatedBandwidthUsage\` int NULL DEFAULT '0', \`sharedBandwidthUsage\` int NULL DEFAULT '0', \`totalBandwidthUsage\` int NULL DEFAULT '0', \`freeSharedBandwidth\` int NULL DEFAULT '0', \`freeDedicatedBandwidth\` int NULL DEFAULT '0', \`freeTotalBandwidth\` int NULL DEFAULT '0', \`user_id\` int NULL, \`datacenter_id\` int NULL, UNIQUE INDEX \`REL_5c8ec2dd2961d44dcfbc05e9b4\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ram\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`capacity\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`storage\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`capacity\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`servers\` (\`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`delete_at\` datetime NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NULL, \`dedicated\` tinyint NULL, \`vps\` tinyint NULL, \`vms\` int NULL, \`power_consumption\` int NOT NULL, \`run\` tinyint NULL, \`user_id\` int NULL, \`rack_id\` int NULL, \`cpu_id\` int NULL, \`ram_id\` int NULL, \`storage_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_3bea99cfa674e8767c7fbb51f8e\` FOREIGN KEY (\`rol_id\`) REFERENCES \`rol\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company\` ADD CONSTRAINT \`FK_879141ebc259b4c0544b3f1ea4c\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`datacenter\` ADD CONSTRAINT \`FK_4a7b85c328ae789791ff97d4dbd\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`datacenter\` ADD CONSTRAINT \`FK_74e57ca19a1a873763aa92bce3d\` FOREIGN KEY (\`datacenter_type_id\`) REFERENCES \`datacenter_types\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rack\` ADD CONSTRAINT \`FK_5c8ec2dd2961d44dcfbc05e9b49\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rack\` ADD CONSTRAINT \`FK_a2bdeab4f63eb280ce0f09e2c78\` FOREIGN KEY (\`datacenter_id\`) REFERENCES \`datacenter\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`servers\` ADD CONSTRAINT \`FK_5d8f69970c0d50f8bf237bd0ab7\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`servers\` ADD CONSTRAINT \`FK_555a61fbfc54319ac7cac86a80d\` FOREIGN KEY (\`rack_id\`) REFERENCES \`rack\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`servers\` ADD CONSTRAINT \`FK_a00b9ddbc5d85d5ea19975be06e\` FOREIGN KEY (\`cpu_id\`) REFERENCES \`cpu\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`servers\` ADD CONSTRAINT \`FK_a3e0769b80a3fbd68b07a9d5c99\` FOREIGN KEY (\`ram_id\`) REFERENCES \`ram\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`servers\` ADD CONSTRAINT \`FK_49e9057ffff199273b5022249e6\` FOREIGN KEY (\`storage_id\`) REFERENCES \`storage\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query("INSERT INTO `rol` (description, enable) VALUES ('ADMIN', true), ('USER', true)");
        await queryRunner.query("INSERT INTO `datacenter_types` (name, ubication, price, max_power, max_bandwidth, max_racks) VALUES ('Garage', 'Home (Canada)', 0, 10000, 1000, 1), ('Office', 'Office (Canada)', 150000, 100000, 100000, 10), ('Datacenter', 'Datacenter (Canada)', 5000000, 990000, 1250000, 99)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`servers\` DROP FOREIGN KEY \`FK_49e9057ffff199273b5022249e6\``);
        await queryRunner.query(`ALTER TABLE \`servers\` DROP FOREIGN KEY \`FK_a3e0769b80a3fbd68b07a9d5c99\``);
        await queryRunner.query(`ALTER TABLE \`servers\` DROP FOREIGN KEY \`FK_a00b9ddbc5d85d5ea19975be06e\``);
        await queryRunner.query(`ALTER TABLE \`servers\` DROP FOREIGN KEY \`FK_555a61fbfc54319ac7cac86a80d\``);
        await queryRunner.query(`ALTER TABLE \`servers\` DROP FOREIGN KEY \`FK_5d8f69970c0d50f8bf237bd0ab7\``);
        await queryRunner.query(`ALTER TABLE \`rack\` DROP FOREIGN KEY \`FK_a2bdeab4f63eb280ce0f09e2c78\``);
        await queryRunner.query(`ALTER TABLE \`rack\` DROP FOREIGN KEY \`FK_5c8ec2dd2961d44dcfbc05e9b49\``);
        await queryRunner.query(`ALTER TABLE \`datacenter\` DROP FOREIGN KEY \`FK_74e57ca19a1a873763aa92bce3d\``);
        await queryRunner.query(`ALTER TABLE \`datacenter\` DROP FOREIGN KEY \`FK_4a7b85c328ae789791ff97d4dbd\``);
        await queryRunner.query(`ALTER TABLE \`company\` DROP FOREIGN KEY \`FK_879141ebc259b4c0544b3f1ea4c\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_3bea99cfa674e8767c7fbb51f8e\``);
        await queryRunner.query(`DROP TABLE \`servers\``);
        await queryRunner.query(`DROP TABLE \`storage\``);
        await queryRunner.query(`DROP TABLE \`ram\``);
        await queryRunner.query(`DROP INDEX \`REL_5c8ec2dd2961d44dcfbc05e9b4\` ON \`rack\``);
        await queryRunner.query(`DROP TABLE \`rack\``);
        await queryRunner.query(`DROP TABLE \`cpu\``);
        await queryRunner.query(`DROP INDEX \`REL_4a7b85c328ae789791ff97d4db\` ON \`datacenter\``);
        await queryRunner.query(`DROP TABLE \`datacenter\``);
        await queryRunner.query(`DROP TABLE \`datacenter_types\``);
        await queryRunner.query(`DROP INDEX \`REL_879141ebc259b4c0544b3f1ea4\` ON \`company\``);
        await queryRunner.query(`DROP TABLE \`company\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`rol\``);
    }

}

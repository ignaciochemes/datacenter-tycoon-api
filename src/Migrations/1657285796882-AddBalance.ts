import {MigrationInterface, QueryRunner} from "typeorm";

export class AddBalance1657285796882 implements MigrationInterface {
    name = 'AddBalance1657285796882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`rack\` (\`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`delete_at\` datetime NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` varchar(255) NULL, \`maxServers\` int NULL DEFAULT '15', \`usedServers\` int NULL DEFAULT '0', \`bandwidthUsage\` int NULL DEFAULT '0', \`dedicatedBandwidth\` int NULL DEFAULT '0', \`sharedBandwidth\` int NULL DEFAULT '0', \`totalBandwidth\` int NULL DEFAULT '0', \`dedicatedBandwidthUsage\` int NULL DEFAULT '0', \`sharedBandwidthUsage\` int NULL DEFAULT '0', \`totalBandwidthUsage\` int NULL DEFAULT '0', \`freeSharedBandwidth\` int NULL DEFAULT '0', \`freeDedicatedBandwidth\` int NULL DEFAULT '0', \`freeTotalBandwidth\` int NULL DEFAULT '0', \`user_id\` int NULL, \`datacenter_id\` int NULL, UNIQUE INDEX \`REL_5c8ec2dd2961d44dcfbc05e9b4\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`servers\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`servers\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`servers\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`company\` ADD \`balance\` int NULL DEFAULT '1500'`);
        await queryRunner.query(`ALTER TABLE \`servers\` ADD \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`servers\` ADD \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`servers\` ADD \`delete_at\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`servers\` ADD \`uuid\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`servers\` ADD \`dedicated\` tinyint NULL`);
        await queryRunner.query(`ALTER TABLE \`servers\` ADD \`vps\` tinyint NULL`);
        await queryRunner.query(`ALTER TABLE \`servers\` ADD \`vms\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`servers\` ADD \`run\` tinyint NULL`);
        await queryRunner.query(`ALTER TABLE \`servers\` ADD \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`servers\` ADD \`rack_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`rack\` ADD CONSTRAINT \`FK_5c8ec2dd2961d44dcfbc05e9b49\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rack\` ADD CONSTRAINT \`FK_a2bdeab4f63eb280ce0f09e2c78\` FOREIGN KEY (\`datacenter_id\`) REFERENCES \`datacenter\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`servers\` ADD CONSTRAINT \`FK_5d8f69970c0d50f8bf237bd0ab7\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`servers\` ADD CONSTRAINT \`FK_555a61fbfc54319ac7cac86a80d\` FOREIGN KEY (\`rack_id\`) REFERENCES \`rack\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`servers\` DROP FOREIGN KEY \`FK_555a61fbfc54319ac7cac86a80d\``);
        await queryRunner.query(`ALTER TABLE \`servers\` DROP FOREIGN KEY \`FK_5d8f69970c0d50f8bf237bd0ab7\``);
        await queryRunner.query(`ALTER TABLE \`rack\` DROP FOREIGN KEY \`FK_a2bdeab4f63eb280ce0f09e2c78\``);
        await queryRunner.query(`ALTER TABLE \`rack\` DROP FOREIGN KEY \`FK_5c8ec2dd2961d44dcfbc05e9b49\``);
        await queryRunner.query(`ALTER TABLE \`servers\` DROP COLUMN \`rack_id\``);
        await queryRunner.query(`ALTER TABLE \`servers\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`servers\` DROP COLUMN \`run\``);
        await queryRunner.query(`ALTER TABLE \`servers\` DROP COLUMN \`vms\``);
        await queryRunner.query(`ALTER TABLE \`servers\` DROP COLUMN \`vps\``);
        await queryRunner.query(`ALTER TABLE \`servers\` DROP COLUMN \`dedicated\``);
        await queryRunner.query(`ALTER TABLE \`servers\` DROP COLUMN \`uuid\``);
        await queryRunner.query(`ALTER TABLE \`servers\` DROP COLUMN \`delete_at\``);
        await queryRunner.query(`ALTER TABLE \`servers\` DROP COLUMN \`update_at\``);
        await queryRunner.query(`ALTER TABLE \`servers\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`company\` DROP COLUMN \`balance\``);
        await queryRunner.query(`ALTER TABLE \`servers\` ADD \`price\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`servers\` ADD \`description\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`servers\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP INDEX \`REL_5c8ec2dd2961d44dcfbc05e9b4\` ON \`rack\``);
        await queryRunner.query(`DROP TABLE \`rack\``);
    }

}

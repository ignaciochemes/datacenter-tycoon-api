import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1648740353088 implements MigrationInterface {
    name = 'FirstMigration1648740353088'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`rol\` (\`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`delete_at\` datetime NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`description\` varchar(100) NOT NULL, \`enable\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`delete_at\` datetime NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NULL, \`password\` varchar(255) NOT NULL, \`uuid\` varchar(255) NOT NULL, \`rol_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`company\` (\`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`delete_at\` datetime NULL, \`name\` varchar(255) NULL, \`description\` varchar(255) NULL, \`registration_date\` datetime NULL, \`active\` tinyint NOT NULL DEFAULT 0, \`user_id\` int NOT NULL, UNIQUE INDEX \`REL_879141ebc259b4c0544b3f1ea4\` (\`user_id\`), PRIMARY KEY (\`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cpu\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`cores\` int NOT NULL, \`threads\` int NOT NULL, \`mhz\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ram\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`capacity\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`storage\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`capacity\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`servers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`power_consumption\` int NOT NULL, \`cpu_id\` int NULL, \`ram_id\` int NULL, \`storage_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_3bea99cfa674e8767c7fbb51f8e\` FOREIGN KEY (\`rol_id\`) REFERENCES \`rol\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company\` ADD CONSTRAINT \`FK_879141ebc259b4c0544b3f1ea4c\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`servers\` ADD CONSTRAINT \`FK_a00b9ddbc5d85d5ea19975be06e\` FOREIGN KEY (\`cpu_id\`) REFERENCES \`cpu\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`servers\` ADD CONSTRAINT \`FK_a3e0769b80a3fbd68b07a9d5c99\` FOREIGN KEY (\`ram_id\`) REFERENCES \`ram\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`servers\` ADD CONSTRAINT \`FK_49e9057ffff199273b5022249e6\` FOREIGN KEY (\`storage_id\`) REFERENCES \`storage\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query("INSERT INTO `rol` (description, enable) VALUES ('ADMIN', true), ('USER', true)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`servers\` DROP FOREIGN KEY \`FK_49e9057ffff199273b5022249e6\``);
        await queryRunner.query(`ALTER TABLE \`servers\` DROP FOREIGN KEY \`FK_a3e0769b80a3fbd68b07a9d5c99\``);
        await queryRunner.query(`ALTER TABLE \`servers\` DROP FOREIGN KEY \`FK_a00b9ddbc5d85d5ea19975be06e\``);
        await queryRunner.query(`ALTER TABLE \`company\` DROP FOREIGN KEY \`FK_879141ebc259b4c0544b3f1ea4c\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_3bea99cfa674e8767c7fbb51f8e\``);
        await queryRunner.query(`DROP TABLE \`servers\``);
        await queryRunner.query(`DROP TABLE \`storage\``);
        await queryRunner.query(`DROP TABLE \`ram\``);
        await queryRunner.query(`DROP TABLE \`cpu\``);
        await queryRunner.query(`DROP INDEX \`REL_879141ebc259b4c0544b3f1ea4\` ON \`company\``);
        await queryRunner.query(`DROP TABLE \`company\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`rol\``);
    }

}

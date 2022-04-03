import { MigrationInterface, QueryRunner } from "typeorm";

export class DatacenterMigration1648942521257 implements MigrationInterface {
    name = 'DatacenterMigration1648942521257'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`datacenter_types\` (\`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`delete_at\` datetime NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`ubication\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`max_power\` int NOT NULL, \`max_bandwidth\` int NOT NULL, \`max_racks\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`datacenter\` (\`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP(), \`update_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`delete_at\` datetime NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`user_id\` int NULL, \`datacenter_type_id\` int NULL, UNIQUE INDEX \`REL_4a7b85c328ae789791ff97d4db\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`datacenter\` ADD CONSTRAINT \`FK_4a7b85c328ae789791ff97d4dbd\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`datacenter\` ADD CONSTRAINT \`FK_74e57ca19a1a873763aa92bce3d\` FOREIGN KEY (\`datacenter_type_id\`) REFERENCES \`datacenter_types\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query("INSERT INTO `datacenter_types` (name, ubication, price, max_power, max_bandwidth, max_racks) VALUES ('Garage', 'Home (Canada)', 0, 10000, 1000, 1), ('Office', 'Office (Canada)', 150000, 100000, 100000, 10), ('Datacenter', 'Datacenter (Canada)', 5000000, 990000, 1250000, 99)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`datacenter\` DROP FOREIGN KEY \`FK_74e57ca19a1a873763aa92bce3d\``);
        await queryRunner.query(`ALTER TABLE \`datacenter\` DROP FOREIGN KEY \`FK_4a7b85c328ae789791ff97d4dbd\``);
        await queryRunner.query(`DROP INDEX \`REL_4a7b85c328ae789791ff97d4db\` ON \`datacenter\``);
        await queryRunner.query(`DROP TABLE \`datacenter\``);
        await queryRunner.query(`DROP TABLE \`datacenter_types\``);
    }

}

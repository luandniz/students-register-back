import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1717259472876 implements MigrationInterface {
    name = 'InitialMigration1717259472876'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "students" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "email" character varying(254) NOT NULL, "cpf" character varying(11) NOT NULL, CONSTRAINT "UQ_25985d58c714a4a427ced57507b" UNIQUE ("email"), CONSTRAINT "UQ_f6fb3427bdbd16321776573d176" UNIQUE ("cpf"), CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "students"`);
    }

}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenderFieldSlip1700620314505 implements MigrationInterface {
  name = 'RenderFieldSlip1700620314505';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order-detail" ADD "title" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "order-detail" ADD "gameSet" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "betting-slip" ADD "title" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "betting-slip" ADD "gameSet" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "betting-slip" DROP COLUMN "gameSet"`);
    await queryRunner.query(`ALTER TABLE "betting-slip" DROP COLUMN "title"`);
    await queryRunner.query(`ALTER TABLE "order-detail" DROP COLUMN "gameSet"`);
    await queryRunner.query(`ALTER TABLE "order-detail" DROP COLUMN "title"`);
  }
}

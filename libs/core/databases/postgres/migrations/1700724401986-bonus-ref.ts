import { MigrationInterface, QueryRunner } from 'typeorm';

export class BonusRef1700724401986 implements MigrationInterface {
  name = 'BonusRef1700724401986';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "betting-slip" ADD "bonusId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "betting-slip" ADD "quantity" integer`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "betting-slip" DROP COLUMN "quantity"`,
    );
    await queryRunner.query(`ALTER TABLE "betting-slip" DROP COLUMN "bonusId"`);
  }
}

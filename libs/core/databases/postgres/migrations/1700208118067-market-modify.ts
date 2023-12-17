import { MigrationInterface, QueryRunner } from 'typeorm';

export class MarketModify1700208118067 implements MigrationInterface {
  name = 'MarketModify1700208118067';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "market" ADD "isUserCustom" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "market" DROP COLUMN "isUserCustom"`);
  }
}

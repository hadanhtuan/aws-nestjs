import { MigrationInterface, QueryRunner } from 'typeorm';

export class DetailBonusQuantity1700806289600 implements MigrationInterface {
  name = 'DetailBonusQuantity1700806289600';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order-detail" ADD "bonusQuantity" numeric`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order-detail" DROP COLUMN "bonusQuantity"`,
    );
  }
}

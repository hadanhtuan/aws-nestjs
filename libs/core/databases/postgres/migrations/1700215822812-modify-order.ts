import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifyOrder1700215822812 implements MigrationInterface {
  name = 'ModifyOrder1700215822812';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order-detail" DROP CONSTRAINT "FK_b9e7e3f57df3d00c902ca8c8513"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order-detail" DROP COLUMN "gameCategoryId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order-detail" ADD "gameTypeName" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "order-detail" ADD "gameTypeId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "betting-slip" ADD "gameTypeName" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "order-detail" ADD CONSTRAINT "FK_833e807485814f1fe7eb196a6e4" FOREIGN KEY ("gameTypeId") REFERENCES "game-type"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order-detail" DROP CONSTRAINT "FK_833e807485814f1fe7eb196a6e4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "betting-slip" DROP COLUMN "gameTypeName"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order-detail" DROP COLUMN "gameTypeId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order-detail" DROP COLUMN "gameTypeName"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order-detail" ADD "gameCategoryId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "order-detail" ADD CONSTRAINT "FK_b9e7e3f57df3d00c902ca8c8513" FOREIGN KEY ("gameCategoryId") REFERENCES "game-category"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }
}

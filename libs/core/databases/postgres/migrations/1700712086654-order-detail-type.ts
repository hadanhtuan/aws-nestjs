import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrderDetailType1700712086654 implements MigrationInterface {
  name = 'OrderDetailType1700712086654';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."order-detail_type_enum" AS ENUM('BONUS', 'GAME')`,
    );
    await queryRunner.query(
      `ALTER TABLE "order-detail" ADD "type" "public"."order-detail_type_enum" NOT NULL DEFAULT 'GAME'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order-detail" DROP COLUMN "type"`);
    await queryRunner.query(`DROP TYPE "public"."order-detail_type_enum"`);
  }
}

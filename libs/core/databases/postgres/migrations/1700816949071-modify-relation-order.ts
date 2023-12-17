import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifyRelationOrder1700816949071 implements MigrationInterface {
  name = 'ModifyRelationOrder1700816949071';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "communicate" DROP CONSTRAINT "FK_6d8ee1687e2fd17ea3d59b57a17"`,
    );
    await queryRunner.query(
      `CREATE TABLE "communicate_orders_order" ("communicateId" uuid NOT NULL, "orderId" uuid NOT NULL, CONSTRAINT "PK_7d44ec832167c8666bcf885a627" PRIMARY KEY ("communicateId", "orderId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9a8026285ac8cf3ca42fbf07a2" ON "communicate_orders_order" ("communicateId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f63c1d7c9f921e71ff2d10dd38" ON "communicate_orders_order" ("orderId") `,
    );
    await queryRunner.query(`ALTER TABLE "communicate" DROP COLUMN "orderId"`);
    await queryRunner.query(
      `ALTER TABLE "communicate_orders_order" ADD CONSTRAINT "FK_9a8026285ac8cf3ca42fbf07a2c" FOREIGN KEY ("communicateId") REFERENCES "communicate"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "communicate_orders_order" ADD CONSTRAINT "FK_f63c1d7c9f921e71ff2d10dd38f" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "communicate_orders_order" DROP CONSTRAINT "FK_f63c1d7c9f921e71ff2d10dd38f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "communicate_orders_order" DROP CONSTRAINT "FK_9a8026285ac8cf3ca42fbf07a2c"`,
    );
    await queryRunner.query(`ALTER TABLE "communicate" ADD "orderId" uuid`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f63c1d7c9f921e71ff2d10dd38"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9a8026285ac8cf3ca42fbf07a2"`,
    );
    await queryRunner.query(`DROP TABLE "communicate_orders_order"`);
    await queryRunner.query(
      `ALTER TABLE "communicate" ADD CONSTRAINT "FK_6d8ee1687e2fd17ea3d59b57a17" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }
}

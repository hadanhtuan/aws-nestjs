import { MigrationInterface, QueryRunner } from 'typeorm';

export class CustomerServiceOrder1700552668496 implements MigrationInterface {
  name = 'CustomerServiceOrder1700552668496';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "communicate" ADD "orderId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "communicate" ADD CONSTRAINT "FK_6d8ee1687e2fd17ea3d59b57a17" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "communicate" DROP CONSTRAINT "FK_6d8ee1687e2fd17ea3d59b57a17"`,
    );
    await queryRunner.query(`ALTER TABLE "communicate" DROP COLUMN "orderId"`);
  }
}

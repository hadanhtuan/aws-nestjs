import { MigrationInterface, QueryRunner } from 'typeorm';

export class WithdrawByAdmin1700706265489 implements MigrationInterface {
  name = 'WithdrawByAdmin1700706265489';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "withdrawal" ADD "isWithdrawByAdmin" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "withdrawal" DROP COLUMN "isWithdrawByAdmin"`,
    );
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class Transaction1700538418490 implements MigrationInterface {
  name = 'Transaction1700538418490';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "deposit" ALTER COLUMN "confirmDate" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "withdrawal" ALTER COLUMN "confirmDate" DROP DEFAULT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "withdrawal" ALTER COLUMN "confirmDate" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "deposit" ALTER COLUMN "confirmDate" SET DEFAULT now()`,
    );
  }
}

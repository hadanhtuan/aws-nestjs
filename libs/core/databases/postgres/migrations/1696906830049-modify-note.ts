import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifyNote1696906830049 implements MigrationInterface {
  name = 'ModifyNote1696906830049';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "memo-note" ADD "isViewed" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "memo-note" DROP COLUMN "isViewed"`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostMessageReceiveDate1699857411720 implements MigrationInterface {
  name = 'PostMessageReceiveDate1699857411720';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post-message" RENAME COLUMN "confirmDate" TO "receiveDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "member_post_message" ADD "confirmDate" TIMESTAMP WITH TIME ZONE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "member_post_message" DROP COLUMN "confirmDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post-message" RENAME COLUMN "receiveDate" TO "confirmDate"`,
    );
  }
}

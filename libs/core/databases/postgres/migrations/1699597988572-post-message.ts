import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostMessage1699597988572 implements MigrationInterface {
  name = 'PostMessage1699597988572';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post-message" DROP CONSTRAINT "FK_75accf2ea41a79d7de0d7b5b234"`,
    );
    await queryRunner.query(
      `CREATE TABLE "member_post_message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "receiverId" uuid, "postMessageId" uuid, CONSTRAINT "PK_6755d6918543e669286fbf18cf7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "post-message" DROP COLUMN "receiverId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "member_post_message" ADD CONSTRAINT "FK_5689c2f62d4a88f3ebc882c8718" FOREIGN KEY ("receiverId") REFERENCES "member"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "member_post_message" ADD CONSTRAINT "FK_d1239860f967f09917eca0b9ddc" FOREIGN KEY ("postMessageId") REFERENCES "post-message"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "member_post_message" DROP CONSTRAINT "FK_d1239860f967f09917eca0b9ddc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "member_post_message" DROP CONSTRAINT "FK_5689c2f62d4a88f3ebc882c8718"`,
    );
    await queryRunner.query(`ALTER TABLE "post-message" ADD "receiverId" uuid`);
    await queryRunner.query(`DROP TABLE "member_post_message"`);
    await queryRunner.query(
      `ALTER TABLE "post-message" ADD CONSTRAINT "FK_75accf2ea41a79d7de0d7b5b234" FOREIGN KEY ("receiverId") REFERENCES "member"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }
}

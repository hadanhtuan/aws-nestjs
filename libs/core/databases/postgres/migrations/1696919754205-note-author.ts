import { MigrationInterface, QueryRunner } from 'typeorm';

export class NoteAuthor1696919754205 implements MigrationInterface {
  name = 'NoteAuthor1696919754205';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "memo-note" ADD "authorId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "memo-note" ADD CONSTRAINT "FK_49ac8fbfde1fef655a562f838f3" FOREIGN KEY ("authorId") REFERENCES "member"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "memo-note" DROP CONSTRAINT "FK_49ac8fbfde1fef655a562f838f3"`,
    );
    await queryRunner.query(`ALTER TABLE "memo-note" DROP COLUMN "authorId"`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class Minigame1700808028246 implements MigrationInterface {
  name = 'Minigame1700808028246';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "betting-slip" RENAME COLUMN "betType" TO "betTypeId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "game-type" ADD "key" character varying`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_89f413487d98c0ff78ddab43d3" ON "betting-slip" ("memberId", "gameTypeId", "gameTypeName", "gameSet") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_89f413487d98c0ff78ddab43d3"`,
    );
    await queryRunner.query(`ALTER TABLE "game-type" DROP COLUMN "key"`);
    await queryRunner.query(
      `ALTER TABLE "betting-slip" RENAME COLUMN "betTypeId" TO "betType"`,
    );
  }
}

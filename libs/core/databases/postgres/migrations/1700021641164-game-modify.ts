import { MigrationInterface, QueryRunner } from 'typeorm';

export class GameModify1700021641164 implements MigrationInterface {
  name = 'GameModify1700021641164';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7a9a0acce57a56c00716f7d4a1"`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_93da97c8ecc7128c117ac2700e" ON "game-detail" ("marketId", "gameFeedId", "name", "handicap") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_93da97c8ecc7128c117ac2700e"`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_7a9a0acce57a56c00716f7d4a1" ON "game-detail" ("gameFeedId", "marketId", "name") `,
    );
  }
}

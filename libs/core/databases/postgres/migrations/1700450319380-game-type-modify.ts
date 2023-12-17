import { MigrationInterface, QueryRunner } from 'typeorm';

export class GameTypeModify1700450319380 implements MigrationInterface {
  name = 'GameTypeModify1700450319380';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "game-type" ADD "publisherId" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "game-type" DROP COLUMN "publisherId"`,
    );
  }
}

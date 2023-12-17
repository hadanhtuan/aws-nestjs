import { MigrationInterface, QueryRunner } from 'typeorm';

export class GameTypeModify1700467664573 implements MigrationInterface {
  name = 'GameTypeModify1700467664573';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "game-type" ADD "route" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "game-type" DROP COLUMN "route"`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class BettingSlip1700126615116 implements MigrationInterface {
  name = 'BettingSlip1700126615116';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."betting-slip_sliptype_enum" AS ENUM('BONUS', 'GAME')`,
    );
    await queryRunner.query(
      `CREATE TABLE "betting-slip" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "odds" numeric NOT NULL, "handicap" numeric, "betType" character varying, "slipType" "public"."betting-slip_sliptype_enum" NOT NULL DEFAULT 'GAME', "marketId" uuid, "gameTypeId" uuid, "gameFeedId" uuid, "gameDetailId" uuid, "memberId" uuid, CONSTRAINT "PK_d5e473b0f640b1c43b76273e308" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "betting-slip" ADD CONSTRAINT "FK_1542ca961041c8651e2101fddfb" FOREIGN KEY ("marketId") REFERENCES "market"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "betting-slip" ADD CONSTRAINT "FK_f9ae1a14197b4a4ff10aeeae55d" FOREIGN KEY ("gameTypeId") REFERENCES "game-type"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "betting-slip" ADD CONSTRAINT "FK_443fd9f1bcbdd4bb4f2ce281b6e" FOREIGN KEY ("gameFeedId") REFERENCES "game-feed"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "betting-slip" ADD CONSTRAINT "FK_96b794bb8de82b9010e072275f1" FOREIGN KEY ("gameDetailId") REFERENCES "game-detail"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "betting-slip" ADD CONSTRAINT "FK_21f59b387f1b5f1e5b07e34373d" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "betting-slip" DROP CONSTRAINT "FK_21f59b387f1b5f1e5b07e34373d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "betting-slip" DROP CONSTRAINT "FK_96b794bb8de82b9010e072275f1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "betting-slip" DROP CONSTRAINT "FK_443fd9f1bcbdd4bb4f2ce281b6e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "betting-slip" DROP CONSTRAINT "FK_f9ae1a14197b4a4ff10aeeae55d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "betting-slip" DROP CONSTRAINT "FK_1542ca961041c8651e2101fddfb"`,
    );
    await queryRunner.query(`DROP TABLE "betting-slip"`);
    await queryRunner.query(`DROP TYPE "public"."betting-slip_sliptype_enum"`);
  }
}

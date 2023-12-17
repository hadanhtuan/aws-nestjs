import { MigrationInterface, QueryRunner } from 'typeorm';

export class UniqueDomainRegisterCode1699850362457
  implements MigrationInterface
{
  name = 'UniqueDomainRegisterCode1699850362457';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "register-code" ADD CONSTRAINT "UQ_612c5c867fe4f33915ab938c568" UNIQUE ("registeredDomain")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "register-code" DROP CONSTRAINT "UQ_612c5c867fe4f33915ab938c568"`,
    );
  }
}

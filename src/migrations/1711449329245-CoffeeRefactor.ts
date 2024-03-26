import { MigrationInterface, QueryRunner } from 'typeorm';

export class CoffeeRefactor1711449329245 implements MigrationInterface {
  // executed changes
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" RENAME COLUMN "name" TO "title"`,
    );
  }

  // rollback changes
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" RENAME COLUMN "title" TO "NAME"`,
    );
  }
}

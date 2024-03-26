import { Coffee } from 'src/coffees/entities/flavor.entity.ts/coffee.entity';
import { Flavor } from 'src/coffees/entities/flavor.entity.ts/flavor.entity.ts';
import { SchemaSync1711450893163 } from 'src/migrations/1711450893163-SchemaSync';
import { DataSource } from 'typeorm';

/**
 * Allows to incrementally upgrade the database schema, while preserving existing data
 * TypeORM gives us a dedicated cli to manage this migrations, allowing to revert them and do other stuff
 * Making changes will syncronize our local database but not our production schema
 * Migrations help us to mantain our previous data
 * We need to build to make the cli find the migrations npm run build and then run the command: npx typeorm migration:run -d dist/typeorm-cli.config
 * Revert a migration: npx typeorm migration:revert -d dist/typeorm-cli.config
 *
 *
 */

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: [Flavor, Coffee],
  migrations: [SchemaSync1711450893163],
});

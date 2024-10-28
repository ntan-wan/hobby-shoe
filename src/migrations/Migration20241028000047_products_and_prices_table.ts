import { Migration } from '@mikro-orm/migrations';

export class Migration20241028000047_products_and_prices_table extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "prices" alter column "end_date" type varchar(255) using ("end_date"::varchar(255));`);
    this.addSql(`alter table "prices" alter column "end_date" drop not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "prices" alter column "end_date" type timestamptz using ("end_date"::timestamptz);`);
    this.addSql(`alter table "prices" alter column "end_date" set not null;`);
  }

}

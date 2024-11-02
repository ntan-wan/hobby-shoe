import { Migration } from '@mikro-orm/migrations';

export class Migration20241102001601_table_product_prop_rating extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "products" add column "rating" int not null default 0;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "products" drop column "rating";`);
  }

}

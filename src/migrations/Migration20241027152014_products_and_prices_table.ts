import { Migration } from '@mikro-orm/migrations';

export class Migration20241027152014_products_and_prices_table extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "products" ("id" serial primary key, "name" varchar(255) not null, "brand" varchar(255) not null, "thumbnail" varchar(255) not null, "images" text[] not null, "description" varchar(255) not null, "color" varchar(255) not null, "created_at" timestamptz not null default 'now()', "updated_at" timestamptz not null default 'now()');`);

    this.addSql(`create table "prices" ("id" serial primary key, "start_date" timestamptz not null default 'now()', "end_date" timestamptz not null, "value" int not null, "product_id" int not null);`);

    this.addSql(`alter table "prices" add constraint "prices_product_id_foreign" foreign key ("product_id") references "products" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "prices" drop constraint "prices_product_id_foreign";`);

    this.addSql(`drop table if exists "products" cascade;`);

    this.addSql(`drop table if exists "prices" cascade;`);
  }

}

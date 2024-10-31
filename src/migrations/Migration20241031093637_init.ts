import { Migration } from '@mikro-orm/migrations';

export class Migration20241031093637_init extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "categories" ("id" serial primary key, "name" varchar(255) not null);`);

    this.addSql(`create table "currencies" ("id" serial primary key, "name" varchar(255) not null, "symbol" varchar(255) not null, "code" varchar(255) not null, "exchange_rate" int not null default 0);`);

    this.addSql(`create table "products" ("id" serial primary key, "name" varchar(255) not null, "brand" varchar(255) not null, "thumbnail" varchar(255) not null, "images" text[] not null, "description" varchar(255) not null, "color" varchar(255) not null, "created_at" timestamptz not null default 'now()', "updated_at" timestamptz not null default 'now()');`);

    this.addSql(`create table "prices" ("id" serial primary key, "start_date" timestamptz not null default 'now()', "value" int not null, "product_id" int not null, "currency_id" int not null);`);

    this.addSql(`create table "products_categories" ("product_id" int not null, "category_id" int not null, constraint "products_categories_pkey" primary key ("product_id", "category_id"));`);

    this.addSql(`alter table "prices" add constraint "prices_product_id_foreign" foreign key ("product_id") references "products" ("id") on update cascade;`);
    this.addSql(`alter table "prices" add constraint "prices_currency_id_foreign" foreign key ("currency_id") references "currencies" ("id") on update cascade;`);

    this.addSql(`alter table "products_categories" add constraint "products_categories_product_id_foreign" foreign key ("product_id") references "products" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "products_categories" add constraint "products_categories_category_id_foreign" foreign key ("category_id") references "categories" ("id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "products_categories" drop constraint "products_categories_category_id_foreign";`);

    this.addSql(`alter table "prices" drop constraint "prices_currency_id_foreign";`);

    this.addSql(`alter table "prices" drop constraint "prices_product_id_foreign";`);

    this.addSql(`alter table "products_categories" drop constraint "products_categories_product_id_foreign";`);

    this.addSql(`drop table if exists "categories" cascade;`);

    this.addSql(`drop table if exists "currencies" cascade;`);

    this.addSql(`drop table if exists "products" cascade;`);

    this.addSql(`drop table if exists "prices" cascade;`);

    this.addSql(`drop table if exists "products_categories" cascade;`);
  }

}

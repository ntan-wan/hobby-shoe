import { Migration } from '@mikro-orm/migrations';

export class Migration20241026032909_products extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "products" ("id" serial primary key, "name" varchar(255) not null, "brand" varchar(255) not null, "thumbnail" varchar(255) not null, "images" text[] not null, "description" varchar(255) not null, "color" varchar(255) not null);`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "products" cascade;`);
  }

}

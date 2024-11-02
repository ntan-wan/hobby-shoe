import { Migration } from '@mikro-orm/migrations';

export class Migration20241101233923_reviews_table extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "users" ("id" serial primary key, "username" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "role" varchar(255) not null, "created_at" timestamptz not null default 'now()', "updated_at" timestamptz not null default 'now()');`);

    this.addSql(`create table "reviews" ("id" serial primary key, "comment" varchar(255) not null, "rating" int not null, "created_at" timestamptz not null default 'now()', "updated_at" timestamptz not null default 'now()', "product_id" int not null, "user_id" int not null);`);

    this.addSql(`alter table "reviews" add constraint "reviews_product_id_foreign" foreign key ("product_id") references "products" ("id") on update cascade;`);
    this.addSql(`alter table "reviews" add constraint "reviews_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "reviews" drop constraint "reviews_user_id_foreign";`);

    this.addSql(`drop table if exists "users" cascade;`);

    this.addSql(`drop table if exists "reviews" cascade;`);
  }

}

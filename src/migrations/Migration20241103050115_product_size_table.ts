import { Migration } from '@mikro-orm/migrations';

export class Migration20241103050115_product_size_table extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "sizes" ("id" serial primary key, "standard" varchar(255) not null, "value" int not null);`);

    this.addSql(`create table "product_sizes" ("id" serial primary key, "product_id" int not null, "size_id" int not null, "quantity" int not null default 0);`);

    this.addSql(`alter table "product_sizes" add constraint "product_sizes_product_id_foreign" foreign key ("product_id") references "products" ("id") on update cascade;`);
    this.addSql(`alter table "product_sizes" add constraint "product_sizes_size_id_foreign" foreign key ("size_id") references "sizes" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "product_sizes" drop constraint "product_sizes_size_id_foreign";`);

    this.addSql(`drop table if exists "sizes" cascade;`);

    this.addSql(`drop table if exists "product_sizes" cascade;`);
  }

}

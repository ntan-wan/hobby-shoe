import { Migration } from '@mikro-orm/migrations';

export class Migration20241104002116_img_nullable extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "products" alter column "images" type text[] using ("images"::text[]);`);
    this.addSql(`alter table "products" alter column "images" drop not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "products" alter column "images" type text[] using ("images"::text[]);`);
    this.addSql(`alter table "products" alter column "images" set not null;`);
  }

}

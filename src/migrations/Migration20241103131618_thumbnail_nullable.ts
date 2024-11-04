import { Migration } from '@mikro-orm/migrations';

export class Migration20241103131618_thumbnail_nullable extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "products" alter column "thumbnail" type varchar(255) using ("thumbnail"::varchar(255));`);
    this.addSql(`alter table "products" alter column "thumbnail" drop not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "products" alter column "thumbnail" type varchar(255) using ("thumbnail"::varchar(255));`);
    this.addSql(`alter table "products" alter column "thumbnail" set not null;`);
  }

}

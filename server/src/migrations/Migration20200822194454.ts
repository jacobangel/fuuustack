import { Migration } from '@mikro-orm/migrations';

export class Migration20200822194454 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "post" ("id" serial primary key, "updated_at" timestamptz(0) not null, "created_at" timestamptz(0) not null, "title" text not null, "content" text not null);');
  }

}

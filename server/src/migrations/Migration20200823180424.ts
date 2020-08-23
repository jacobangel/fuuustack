import { Migration } from '@mikro-orm/migrations';

export class Migration20200823180424 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" add column "creator" int4 null;');

    this.addSql('create table "user" ("id" serial primary key, "username" varchar(255) not null, "email" varchar(255) not null, "updated_at" timestamptz(0) not null, "created_at" timestamptz(0) not null);');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
  }

}

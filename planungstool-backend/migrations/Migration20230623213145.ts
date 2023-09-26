import { Migration } from '@mikro-orm/migrations';

export class Migration20230623213145 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "ebkph-category" drop constraint "ebkph-category_name_unique";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "ebkph-category" add constraint "ebkph-category_name_unique" unique ("name");');
  }

}

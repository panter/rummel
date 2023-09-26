import { Migration } from '@mikro-orm/migrations';

export class Migration20230830100102 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "search_request_interest" drop constraint if exists "search_request_interest_state_check";',
    );

    this.addSql(
      'alter table "search_request_interest" alter column "state" type text using ("state"::text);',
    );
    this.addSql(
      "update \"search_request_interest\" set state = 'open' where state = 'OPEN';",
    );
    this.addSql(
      "update \"search_request_interest\" set state = 'rejected' where state = 'REJECTED';",
    );
    this.addSql(
      "update \"search_request_interest\" set state = 'accepted' where state = 'ACCEPTED';",
    );
    this.addSql(
      'alter table "search_request_interest" add constraint "search_request_interest_state_check" check ("state" in (\'open\', \'rejected\', \'accepted\'));',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "search_request_interest" drop constraint if exists "search_request_interest_state_check";',
    );

    this.addSql(
      'alter table "search_request_interest" alter column "state" type text using ("state"::text);',
    );
    this.addSql(
      'alter table "search_request_interest" add constraint "search_request_interest_state_check" check ("state" in (\'OPEN\', \'REJECTED\', \'ACCEPTED\'));',
    );
  }
}

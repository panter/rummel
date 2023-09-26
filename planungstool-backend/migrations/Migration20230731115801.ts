import { Migration } from '@mikro-orm/migrations';

export class Migration20230731115801 extends Migration {
  async up(): Promise<void> {
    //this SQL was created manually
    this.addSql(
      `
ALTER TABLE materials_depot ADD COLUMN "next_component_sn" BIGINT NOT NULL DEFAULT 100;
ALTER TABLE building_component ADD COLUMN "component_sn" BIGINT DEFAULT -1;

do
$$
    declare
        t record;
    begin
        for t in select id, materials_depot_id from building_component where building_component.component_sn = -1 order by id
            loop
                update building_component
                set component_sn = (select next_component_sn from materials_depot where id = t.materials_depot_id)
                where id = t.id;
                update materials_depot
                set next_component_sn =
                            (select materials_depot.next_component_sn from materials_depot where id = t.materials_depot_id) + 1
                where id = t.materials_depot_id;
            end loop;
    end;
$$;

ALTER TABLE building_component ALTER COLUMN component_sn DROP DEFAULT;

CREATE OR REPLACE FUNCTION set_component_sn() RETURNS trigger
LANGUAGE 'plpgsql'
AS
$$
BEGIN
    IF NEW.component_sn IS NULL THEN
        SELECT next_component_sn
        INTO NEW.component_sn
        FROM public.materials_depot
        WHERE id = NEW.materials_depot_id;
        UPDATE public.materials_depot
        SET next_component_sn = next_component_sn + 1
        WHERE id = NEW.materials_depot_id;
    END IF;
    RETURN NEW;
END;
$$;


CREATE TRIGGER on_insert_building_component
    BEFORE INSERT
    ON public.building_component
    FOR EACH ROW
EXECUTE FUNCTION set_component_sn();
`,
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "building_component" drop column "component_sn";');

    this.addSql(
      'alter table "materials_depot" drop column "next_component_sn";',
    );
    this.addSql(`DROP FUNCTION IF EXISTS set_component_sn;`);
    this.addSql(
      `DROP TRIGGER IF EXISTS on_insert_building_component ON public.building_component;`,
    );
  }
}

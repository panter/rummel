import { Entity, Formula, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { AuditableEntity, CrudField } from '@panter/nestjs-utils';

@ObjectType()
@Entity({ tableName: 'contact' })
export class Contact extends AuditableEntity {
  @Field({ nullable: true })
  @Property({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  firstLine?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  lastName?: string;

  @Field({ defaultValue: 'CH', nullable: true })
  @Property({ default: 'CH', type: 'char(2)' })
  country: string = 'CH';

  @Field({ nullable: true })
  @Property({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  postalCode?: string;

  @CrudField({ hideCreate: true, hideUpdate: true })
  @Field({ nullable: true })
  @Formula(
    (alias) =>
      `(SELECT CONCAT(pc.canton, ', ', pc.description) from postal_code pc where pc.postal_code = ${alias}.postal_code LIMIT 1)`,
  )
  canton?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  street?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  contact1?: string;

  @Field({ nullable: true })
  @Property({ nullable: true })
  contact2?: string;

  @Field({ nullable: true })
  @Property({ nullable: true, type: 'text' })
  notes?: string;

  constructor(props?: Partial<Contact>) {
    super();
    Object.assign(this, props);
  }

  toString(): string {
    const components = [];

    // Assuming full name is a combination of firstName and lastName
    if (this.firstName || this.lastName) {
      components.push(
        `${this.firstName ? this.firstName : ''} ${
          this.lastName ? this.lastName : ''
        }`.trim(),
      );
    }

    // Using firstLine as a potential additional line before the street address (for example, company name)
    if (this.firstLine) {
      components.push(this.firstLine);
    }

    if (this.street) {
      components.push(this.street);
    }

    if (this.postalCode || this.city) {
      components.push(
        `${this.postalCode ? this.postalCode : ''} ${
          this.city ? this.city : ''
        }`.trim(),
      );
    }

    if (this.canton) {
      components.push(this.canton);
    }

    components.push(this.country);

    return components.join('\n');
  }
}

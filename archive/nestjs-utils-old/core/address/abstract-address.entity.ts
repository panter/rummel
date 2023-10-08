import { Entity, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { AuditableEntity } from '../../common/entities/auditable.entity';
import { AbstractAddressData } from './abstract-address.data';

@ObjectType({ isAbstract: true })
@Entity({ abstract: true })
export abstract class AbstractAddress extends AuditableEntity {
  @Field()
  @Property()
  firstName!: string;

  @Field()
  @Property()
  lastName!: string;

  @Field({ defaultValue: 'CH' })
  @Property({ default: 'CH', type: 'char(2)' })
  country: string = 'CH';

  @Field()
  @Property()
  city!: string;

  @Field()
  @Property()
  postalCode!: string;

  @Field()
  @Property()
  street!: string;

  protected constructor(data?: AbstractAddressData | null) {
    super();
    if (data) {
      this.update(data);
    }
  }

  update({
    firstName,
    lastName,
    country,
    city,
    postalCode,
    street,
  }: AbstractAddressData) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.city = city;
    this.country = country;
    this.postalCode = postalCode;
    this.street = street;
  }

  formatted() {
    return `${this.firstName} ${this.lastName}, ${this.street}, ${this.city} ${this.postalCode}`;
  }
}

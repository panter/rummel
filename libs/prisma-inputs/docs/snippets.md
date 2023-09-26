#Snippets

## Types for testing

``` ts
@ObjectType()
class Simple {
  @Field({ nullable: true })
  name?: string;
}

@ObjectType()
class Organisation {
  @Field({ nullable: true })
  description?: string;

  @Field(() => [Person])
  person!: Person[];

  @CrudField({ relation: { showCreate: true, showUpdate: true } })
  @Field(() => Simple, { nullable: true })
  simple?: Simple;

  @CrudField({ relation: { showCreate: true, showUpdate: true } })
  @Field(() => [Simple], { nullable: true })
  simples?: Simple[];
}

@ObjectType()
export class Person {
  @Field()
  name!: string;

  @CrudField({ relation: { showCreate: true, showUpdate: true } })
  @Field(() => [Address], { nullable: true })
  addresses?: Address[];

  @Field(() => Organisation, { nullable: true })
  organisation?: Organisation;
}

@ObjectType()
class Address {
  @Field()
  address!: string;
}

@Resolver(() => Simple)
export class SimpleCreateOneResolver extends CreateOneResolver(Simple) {}

@Resolver(() => Simple)
export class SimpleUpdateOneResolver extends UpdateOneResolver(Simple) {}

@Resolver(() => Person)
export class PersonCreateOneResolver extends CreateOneResolver(Person) {}

@Resolver(() => Person)
export class PersonUpdateOneResolver extends UpdateOneResolver(Person) {}

@Resolver(() => Organisation)
export class OrganisationCreateOneResolver extends CreateOneResolver(
  Organisation,
) {}

@Resolver(() => Organisation)
export class OrganisationUpdateOneResolver extends UpdateOneResolver(
  Organisation,
) {}
```

import { Contact } from './contact.entity';
import { ContactService } from './contact.service';
import { EntityManager } from '@mikro-orm/postgresql';
import { FindManyResolver, Public } from '@panter/nestjs-utils';
import { Resolver } from '@nestjs/graphql';

@Public()
@Resolver(() => Contact)
export class ContactResolver {
  constructor(
    private readonly em: EntityManager,
    private readonly contactService: ContactService,
  ) {}
}

@Resolver(() => Contact)
export class ContactFindManyResolver extends FindManyResolver(Contact) {}

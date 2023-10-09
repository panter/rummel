import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Autocomplete } from './autocomplete.entity';

@Injectable()
export class AutocompleteRepository extends EntityRepository<Autocomplete> {}

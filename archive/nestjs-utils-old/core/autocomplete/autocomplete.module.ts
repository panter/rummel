import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Autocomplete } from './autocomplete.entity';
import { AutocompleteRepository } from './autocomplete.repository';
import {
  AutocompleteCreateOneResolver,
  AutocompleteDeleteOneResolver,
  AutocompleteFindManyResolver,
  AutocompleteFindOneResolver,
  AutocompleteUpdateOneResolver,
} from './autocomplete.resolver';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Autocomplete] })],
  providers: [
    AutocompleteRepository,
    AutocompleteFindOneResolver,
    AutocompleteFindManyResolver,
    AutocompleteCreateOneResolver,
    AutocompleteUpdateOneResolver,
    AutocompleteDeleteOneResolver,
    // ...forCrudImports([Autocomplete]),
  ],
  exports: [AutocompleteRepository],
})
export class AutocompleteModule {}

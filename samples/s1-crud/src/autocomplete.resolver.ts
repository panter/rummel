import { Resolver } from '@nestjs/graphql';
import {
  CreateOneResolver,
  DeleteOneResolver,
  FindManyResolver,
  FindOneResolver,
  UpdateOneResolver,
} from '@panter/crud';
import { Autocomplete } from './entities/autocomplete.entity';

@Resolver(() => Autocomplete)
export class AutocompleteFindOneResolver extends FindOneResolver(
  Autocomplete,
) {}

@Resolver(() => Autocomplete)
export class AutocompleteFindManyResolver extends FindManyResolver(
  Autocomplete,
) {}

@Resolver(() => Autocomplete)
export class AutocompleteCreateOneResolver extends CreateOneResolver(
  Autocomplete,
) {}

@Resolver(() => Autocomplete)
export class AutocompleteUpdateOneResolver extends UpdateOneResolver(
  Autocomplete,
) {}

@Resolver(() => Autocomplete)
export class AutocompleteDeleteOneResolver extends DeleteOneResolver(
  Autocomplete,
) {}

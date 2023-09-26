import { Resolver } from '@nestjs/graphql';
import {
  CreateOneResolver,
  DeleteOneResolver,
  FindManyResolver,
  FindOneResolver,
  UpdateOneResolver,
} from '../../crud';
import { Autocomplete } from './autocomplete.entity';

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

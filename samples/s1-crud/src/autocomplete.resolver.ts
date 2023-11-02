import { Resolver } from '@nestjs/graphql';
import {
  CreateOneResolver,
  DeleteOneResolver,
  FindManyResolver,
  FindOneResolver,
  UpdateOneResolver,
} from '@panter/crud';
import { Autocomplete } from './entities/autocomplete.entity';
import { Public } from '@panter/nestjs-utils';

@Public()
@Resolver(() => Autocomplete)
export class AutocompleteFindOneResolver extends FindOneResolver(
  Autocomplete,
) {}

@Public()
@Resolver(() => Autocomplete)
export class AutocompleteFindManyResolver extends FindManyResolver(
  Autocomplete,
) {}

@Public()
@Resolver(() => Autocomplete)
export class AutocompleteCreateOneResolver extends CreateOneResolver(
  Autocomplete,
) {}

@Public()
@Resolver(() => Autocomplete)
export class AutocompleteUpdateOneResolver extends UpdateOneResolver(
  Autocomplete,
) {}

@Public()
@Resolver(() => Autocomplete)
export class AutocompleteDeleteOneResolver extends DeleteOneResolver(
  Autocomplete,
) {}

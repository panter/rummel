# @rummel/nestjs-autocomplete-lib

NestJS Library exposing  `@panter/crud` enpoints for a simple key value store.

- FindOneResolver
- FindManyResolver
- CreateOneResolver
- UpdateOneResolver
- DeleteOneResolver

[Check out the entity](src/autocomplete.entity.ts) for more information.

## Usage
```ts
import { AutocompleteModule } from '@rummel/nestjs-autocomplete-lib';

@Module({
  imports: [
    AutocompleteModule
  ]
})
export class SomeModule {}
```


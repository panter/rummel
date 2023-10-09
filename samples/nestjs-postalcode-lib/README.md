# @rummel/nestjs-postalcode-lib

NestJS Library exposing `@panter/crud` enpoints for a simple postalcode graphql service.

- FindOneResolver
- FindManyResolver
- CreateOneResolver
- UpdateOneResolver
- DeleteOneResolver

[Check out the entity](src/postal-code.entity.ts) for more information.

## Usage
```ts
import { PostalCodeModule } from '@rummel/nestjs-postalcode-lib';

@Module({
  imports: [
    PostalCodeModule
  ]
})
export class SomeModule {}
```

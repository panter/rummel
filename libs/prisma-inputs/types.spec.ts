import { PrismaInputSchema } from '.';
import { object, property } from './mappers';

describe('types: property()', () => {
  it('should respect null', () => {
    const schema: PrismaInputSchema<
      {
        name: string | null;
      },
      { name: string }
    > = {
      mapper: object(),
      properties: {
        name: property((m) => m?.name),
      },
    };

    console.log(schema);
  });
});

import SchemaBuilder from '@pothos/core';

import AddGraphQLPlugin from '@pothos/plugin-add-graphql';
import * as FileType from 'file-type';
import { GraphQLError } from 'graphql';
import { DateResolver } from 'graphql-scalars';

export const builder = new SchemaBuilder<{
  Scalars: {
    DateTime: {
      Input: Date;
      Output: Date;
    };
    Upload: {
      Input: unknown;
      Output: unknown;
    };
  };
}>({
  notStrict:
    'Pothos may not work correctly when strict mode is not enabled in tsconfig.json',
  plugins: [AddGraphQLPlugin],
});

builder.addScalarType('DateTime', DateResolver, {});

builder.scalarType('Upload', {
  description: 'Upload scalar',
  serialize: () => {
    throw new GraphQLError('Upload serialization unsupported.');
  },
  parseValue: async (value) => {
    const upload = (await value) as any;
    const stream = upload.createReadStream();
    const fileType = await (FileType as any).fromStream(stream);

    if (fileType?.mime !== upload.mimetype)
      throw new GraphQLError('Mime type does not match file content.');

    return upload;
  },
  parseLiteral: (ast) => {
    throw new Error(`Upload literal unsupported. ${ast}`);
  },
});

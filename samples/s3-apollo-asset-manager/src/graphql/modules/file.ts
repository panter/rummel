import { builder } from '../builder.js';

type FileConfig = {
  filename: string;
  mimetype: string;
  encoding: string;
  path: string;
};
class File {
  filename: string;
  mimetype: string;
  encoding: string;
  path: string;
  constructor(config: FileConfig) {
    this.encoding = config.encoding;
    this.filename = config.filename;
    this.mimetype = config.mimetype;
    this.path = config.path;
  }
}
export const getFile = (fileConfig: FileConfig) => new File(fileConfig);

const Object = builder.objectType(File, {
  name: 'File',
  fields: (t) => ({
    filename: t.exposeString('filename'),
    mimetype: t.exposeString('mimetype'),
    encoding: t.exposeString('encoding'),
    path: t.exposeString('path'),
  }),
});

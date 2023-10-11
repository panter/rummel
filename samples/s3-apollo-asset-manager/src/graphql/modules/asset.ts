import { builder } from '../builder.js';

export class Asset {
  id: string;
  publicUrl: string;
  name: string;

  constructor(config: { id: string; publicUrl: string; name: string }) {
    this.name = config.name;
    this.id = config.id;
    this.publicUrl = config.publicUrl;
  }
}

const AssetObject = builder.objectType(Asset, {
  name: 'Asset',
  fields: (t) => ({
    id: t.exposeString('id'),
    publicUrl: t.exposeString('publicUrl'),
    name: t.exposeString('name'),
  }),
});

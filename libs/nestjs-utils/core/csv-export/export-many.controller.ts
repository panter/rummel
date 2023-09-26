import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import {
  Get,
  Injectable,
  Param,
  Query,
  Res,
  StreamableFile,
  Type,
} from '@nestjs/common';
import { Response } from 'express';
import * as Papa from 'papaparse';
import { Readable } from 'stream';
import { AppEntity, Public } from '../../common';
import { CsvSchema, CsvSchemaColumn } from './types';
import { serialize } from './serializer';

type EntityProvider<T extends AppEntity> = (
  repository: EntityRepository<T>,
  params?: string[],
  query?: any,
) => Promise<T[]>;

export interface ExportManyControllerProps<T extends AppEntity> {
  /**
   * Defines columns to be exported
   */
  schema: CsvSchema<T>;
  /**
   * Fetches entities to be exported
   *
   * @param repository: MikroORM repository to fetch entities
   */
  entitiesProvider: EntityProvider<T>;

  /**
   * Defines the filename of the exported file (without extension).
   * If not set, the name of the entity will be used
   */
  filename?: string;
}

export function ExportManyController<T extends AppEntity>(
  classRef: Type<T>,
  { entitiesProvider, schema, filename }: ExportManyControllerProps<T>,
) {
  @Injectable()
  class ExportManyController {
    public repository: EntityRepository<T>;

    constructor(public readonly em: EntityManager) {
      this.repository = em.getRepository(classRef);
    }

    @Public()
    @Get('export/csv')
    async export(
      @Res({ passthrough: true }) res: Response,
      @Param() params?: string[],
      @Query() query?: any,
    ): Promise<StreamableFile> {
      const entities = await entitiesProvider(this.repository, params, query);
      const serialized = serialize(entities, schema);
      const exportCsv = Papa.unparse({
        fields: (Object.values(schema) as CsvSchemaColumn<T>[])
          .filter((v) => !v.hidden)
          .map((v) => v.label),
        data: serialized,
      });
      const file = Readable.from(exportCsv);
      res.set({
        'Content-Type': 'application/csv',
        'Content-Disposition': `attachment; filename="${
          filename || classRef.name
        }".csv"`,
      });
      return new StreamableFile(file);
    }
  }

  return ExportManyController;
}

import {
  Controller,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { buildingComponentsCsvSchema } from './building-componet.csv-schema';
import {
  CsvImportReport,
  ExportManyController,
  parseCsv,
} from '@panter/nestjs-utils';
import { BuildingComponent } from './entities/building-component.entity';
import { FilterQuery } from '@mikro-orm/core';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { BuildingComponentImportService } from './building-component-import.service';

@Controller('/building-component')
export class BuildingComponentController extends ExportManyController<BuildingComponent>(
  BuildingComponent,
  {
    schema: buildingComponentsCsvSchema,
    entitiesProvider: async (
      repository: EntityRepository<BuildingComponent>,
      _?: string[],
      query?: any,
    ) => {
      const where: FilterQuery<BuildingComponent> = query?.materialsDepotId
        ? { materialsDepot: query?.materialsDepotId }
        : query?.storageLocationId
        ? { storageLocation: query?.storageLocationId }
        : query.projectId
        ? {
            assignedTo: {
              searchRequest: {
                project: query.projectId ? query.projectId : undefined,
              },
            },
          }
        : query.searchRequestId
        ? {
            assignedTo: {
              searchRequest: {
                id: query.searchRequestId ? query.searchRequestId : undefined,
              },
            },
          }
        : {};
      return await repository.find(where, {
        populate: [
          'category',
          'ebkphCategory',
          'dimensions',
          'materialsDepot',
          'contacts',
        ],
      });
    },
  },
) {
  @Post('/import/csv')
  @UseInterceptors(
    FileInterceptor('file', {
      // limits: {
      //   files: 1,
      //   fileSize: 1024 * 1024,
      // },
    }),
  )
  async import(
    @UploadedFile() file: Express.Multer.File,
    @Res({ passthrough: true }) res: Response,
    @Query() query?: any,
  ) {
    const materialDepotId = query?.materialsDepotId;
    if (!materialDepotId) {
      throw new Error('Unable to import without materialsDepotId');
    }
    const type = query?.type;

    const rows = await parseCsv<any>(file);
    let report: CsvImportReport | undefined = undefined;
    switch (type) {
      case '1':
        report = await this.importService.import1(materialDepotId, rows.data);
        break;
      case '2':
        report = await this.importService.import2(materialDepotId, rows.data);
        break;
      case '3':
        // report = await this.importService.import3(materialDepotId, rows.data);
        break;
    }

    res.json(report);
  }

  constructor(
    em: EntityManager,
    private importService: BuildingComponentImportService,
  ) {
    super(em);
  }
}

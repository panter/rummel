import {
  Controller,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import {
  CsvImportReport,
  ExportManyController,
  parseCsv,
} from '@panter/nestjs-utils';
import { SearchRequest } from './search-request.entity';
import { searchRequestCsvSchema } from './search-request.csv-schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { SearchRequestImportService } from './search-request-import.service';
import { FilterQuery } from '@mikro-orm/core';

@Controller('/search-request')
export class SearchRequestController extends ExportManyController<SearchRequest>(
  SearchRequest,
  {
    schema: searchRequestCsvSchema,
    entitiesProvider: async (
      repository: EntityRepository<SearchRequest>,
      _?: string[],
      query?: any,
    ) => {
      const where: FilterQuery<SearchRequest> = {
        project: query?.projectId ? query.projectId : undefined,
      };

      return await repository.find(where, {
        populate: [
          'project',
          'ebkphCategory',
          'dimensionRanges',
          'assignedBuildingComponents',
        ],
      });
    },
  },
) {
  constructor(
    private importService: SearchRequestImportService,
    em: EntityManager,
  ) {
    super(em);
  }

  @Post('/import/csv')
  @UseInterceptors(FileInterceptor('file'))
  async import(
    @UploadedFile() file: Express.Multer.File,
    @Res({ passthrough: true }) res: Response,
    @Query() query?: any,
  ) {
    const projectId = query?.projectId;
    if (!projectId) {
      throw new Error('Unable to import without projectId specified');
    }

    const rows = await parseCsv<any>(file);
    const report: CsvImportReport | undefined = await this.importService.import(
      projectId,
      rows.data,
    );

    res.json(report);
  }
}

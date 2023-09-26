import { EntityManager } from '@mikro-orm/postgresql';
import { SearchRequestCsvRow } from './search-request-csv-row';
import { CsvImportReport } from '@panter/nestjs-utils';
import { Project } from '../project/entities/project.entity';
import { SearchRequest } from './search-request.entity';
import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SearchRequestImportService {
  private logger: Logger = new Logger(SearchRequestImportService.name);

  constructor(private readonly em: EntityManager) {}

  async import(projectId: string, rows: SearchRequestCsvRow[]) {
    const report = new CsvImportReport();

    const project = await this.em.findOneOrFail(Project, { id: projectId });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [index, rawRow] of rows.entries()) {
      const searchRequest = new SearchRequest({ project });

      try {
        await this.em.persistAndFlush(searchRequest);
        report.rowsImported++;
      } catch (e) {
        this.logger.error(e);
        if (e instanceof UniqueConstraintViolationException) {
          report.errors.push({
            index,
            message: `Duplicate entry: ${(<any>e).detail}`,
          });
        }
        report.errors.push({
          index,
          message: `Error while importing row: ${index}`,
        });
      }
    }

    return report;
  }
}

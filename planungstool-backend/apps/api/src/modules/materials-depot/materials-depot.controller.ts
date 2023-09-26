import {
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { CurrentUser, parseCsv } from '@panter/nestjs-utils';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { MaterialDepotCsvImportRow } from './material-depot-csv-import-row';
import { MaterialsDepotImportService } from './materials-depot-import.service';
import { User } from '../user-identity';

@Controller('/materials-depot')
export class MaterialsDepotController {
  constructor(
    private em: EntityManager,
    private importService: MaterialsDepotImportService,
  ) {}

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
    @CurrentUser() currentUser: User,
  ) {
    const rows = await parseCsv<MaterialDepotCsvImportRow>(file);
    const report = await this.importService.import(rows.data, currentUser);
    res.json(report);
  }
}

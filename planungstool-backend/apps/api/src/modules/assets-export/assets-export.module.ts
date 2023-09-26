import { AssetsExportController } from './assets-export.controller';
import { AssetsExportService } from './assets-export.service';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

@Module({
  imports: [MikroOrmModule.forFeature({}), ConfigModule],
  providers: [AssetsExportService],
  exports: [AssetsExportService],
  controllers: [AssetsExportController],
})
export class AssetsExportModule {}

import {
  SearchRequestCreateOneResolver,
  SearchRequestFindManyResolver,
  SearchRequestFindOneResolver,
  SearchRequestResolver,
  SearchRequestUpdateOneResolver,
} from './search-request.resolver';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { SearchRequest } from './search-request.entity';
import { SearchRequestAssetReference } from './search-request-asset-reference.entity';
import { SearchRequestController } from './search-request.controller';
import { SearchRequestImportService } from './search-request-import.service';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [SearchRequest, SearchRequestAssetReference],
    }),
  ],
  providers: [
    SearchRequestResolver,
    SearchRequestFindOneResolver,
    SearchRequestFindManyResolver,
    SearchRequestCreateOneResolver,
    SearchRequestUpdateOneResolver,
    SearchRequestImportService,
  ],
  controllers: [SearchRequestController],
})
export class SearchRequestModule {}

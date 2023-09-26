import {
  SearchRequestInterestCreateOneResolver,
  SearchRequestInterestDeleteOneResolver,
  SearchRequestInterestFindManyResolver,
  SearchRequestInterestFindOneResolver,
  SearchRequestInterestResolver,
  SearchRequestInterestUpdateOneResolver,
} from './search-request-interest.resolver';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { SearchRequestInterest } from './search-request-interest.entity';
import { SearchRequestInterestService } from './search-request-interest.service';
import { SearchRequestInterestController } from './search-request-interest.controller';
import { AssignedBuildingComponent } from './assigned-building-component.entity';
import { BuildingComponentModule } from '../building-component/building-component.module';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [SearchRequestInterest, AssignedBuildingComponent],
    }),
    BuildingComponentModule,
  ],
  providers: [
    SearchRequestInterestResolver,
    SearchRequestInterestFindOneResolver,
    SearchRequestInterestFindManyResolver,
    SearchRequestInterestCreateOneResolver,
    SearchRequestInterestUpdateOneResolver,
    SearchRequestInterestDeleteOneResolver,
    SearchRequestInterestService,
  ],
  controllers: [SearchRequestInterestController],
})
export class SearchRequestInterestModule {}

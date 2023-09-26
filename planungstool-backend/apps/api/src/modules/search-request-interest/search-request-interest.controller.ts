import { Controller } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { ExportManyController } from '@panter/nestjs-utils';
import { SearchRequestInterest } from './search-request-interest.entity';
import { searchRequestInterestCsvSchema } from './search-request-interest.csv-schema';
import { SearchRequestInterestState } from './search-request-interest-state.enum';

@Controller('/search-request-interest')
export class SearchRequestInterestController extends ExportManyController<SearchRequestInterest>(
  SearchRequestInterest,
  {
    schema: searchRequestInterestCsvSchema,
    entitiesProvider: async (
      repository: EntityRepository<SearchRequestInterest>,
    ) => {
      return await repository.find(
        { state: SearchRequestInterestState.Open },
        {
          populate: [
            'searchRequest',
            'searchRequest.project',
            'searchRequest.dimensionRanges',
            'responsibleUser',
            'buildingComponent',
            'buildingComponent.dimensions',
          ],
        },
      );
    },
  },
) {}

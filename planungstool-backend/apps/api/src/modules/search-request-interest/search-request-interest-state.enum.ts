import { registerEnumType } from '@nestjs/graphql';

export enum SearchRequestInterestState {
  Open = 'open',
  Rejected = 'rejected',
  Accepted = 'accepted',
}

registerEnumType(SearchRequestInterestState, {
  name: 'SearchRequestInterestState',
});

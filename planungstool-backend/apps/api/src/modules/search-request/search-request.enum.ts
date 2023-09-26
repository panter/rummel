import { registerEnumType } from '@nestjs/graphql';

export enum SearchRequestState {
  draft = 'draft',
  active = 'active',
  closed = 'closed',
}

registerEnumType(SearchRequestState, {
  name: 'SearchRequestState',
});

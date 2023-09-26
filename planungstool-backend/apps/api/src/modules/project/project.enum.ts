import { registerEnumType } from '@nestjs/graphql';

export enum ProjectState {
  draft = 'draft',
  active = 'active',
  closed = 'closed',
}

registerEnumType(ProjectState, {
  name: 'ProjectState',
});

export enum ProjectPhase {
  empty = 'empty',
  phase0 = 'phase0',
  phase1 = 'phase1',
}

registerEnumType(ProjectPhase, {
  name: 'ProjectPhase',
});

import { Resolver } from '@nestjs/graphql';
import {
  CreateOneResolver,
  FindManyResolver,
  FindOneResolver,
  Public,
  UpdateOneResolver,
} from '@panter/nestjs-utils';
import { MaterialsDepotTimeline } from './materials-depot-timeline.entity';

@Public()
@Resolver(() => MaterialsDepotTimeline)
export class MaterialsDepotTimelineResolver {}

@Resolver(() => MaterialsDepotTimeline)
export class MaterialsDepotTimelineFindOneResolver extends FindOneResolver(
  MaterialsDepotTimeline,
) {}

@Resolver(() => MaterialsDepotTimeline)
export class MaterialsDepotTimelineFindManyResolver extends FindManyResolver(
  MaterialsDepotTimeline,
) {}

@Resolver(() => MaterialsDepotTimeline)
export class MaterialsDepotTimelineCreateOneResolver extends CreateOneResolver(
  MaterialsDepotTimeline,
) {}

@Resolver(() => MaterialsDepotTimeline)
export class MaterialsDepotTimelineUpdateOneResolver extends UpdateOneResolver(
  MaterialsDepotTimeline,
) {}

import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import {
  MaterialsDepotTimelineCreateOneResolver,
  MaterialsDepotTimelineFindManyResolver,
  MaterialsDepotTimelineFindOneResolver,
  MaterialsDepotTimelineResolver,
  MaterialsDepotTimelineUpdateOneResolver,
} from './materials-depot-timeline.resolver';
import { MaterialsDepotTimeline } from './materials-depot-timeline.entity';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [MaterialsDepotTimeline] })],
  providers: [
    MaterialsDepotTimelineResolver,
    MaterialsDepotTimelineFindOneResolver,
    MaterialsDepotTimelineFindManyResolver,
    MaterialsDepotTimelineCreateOneResolver,
    MaterialsDepotTimelineUpdateOneResolver,
  ],
})
export class MaterialsDepotTimelineModule {}

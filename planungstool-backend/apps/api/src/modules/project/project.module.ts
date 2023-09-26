import {
  ProjectCreateOneResolver,
  ProjectFindManyResolver,
  ProjectFindOneResolver,
  ProjectResolver,
  ProjectUpdateOneResolver,
} from './project.resolver';

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Project } from './entities/project.entity';
import { ProjectAssetService } from './project-asset.service';
import { ProjectService } from './project.service';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Project] })],
  providers: [
    ProjectResolver,
    ProjectService,
    ProjectAssetService,
    ProjectFindOneResolver,
    ProjectFindManyResolver,
    ProjectCreateOneResolver,
    ProjectUpdateOneResolver,
  ],
})
export class ProjectModule {}

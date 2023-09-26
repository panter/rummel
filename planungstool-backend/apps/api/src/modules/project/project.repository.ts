import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectRepository extends EntityRepository<Project> {
  async getProjectWithAssets(projectId: string): Promise<Project> {
    return this.findOneOrFail(
      { id: projectId },
      {
        populate: ['assets'],
      },
    );
  }
}

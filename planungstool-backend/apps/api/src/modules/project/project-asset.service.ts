import { AppAsset, AppAssetRepository } from '@panter/nestjs-utils';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { EntityManager } from '@mikro-orm/postgresql';
import { Project } from './entities/project.entity';
import { ProjectRepository } from './project.repository';
import { User } from '../user-identity/user.entity';

@Injectable()
export class ProjectAssetService {
  private readonly repository: ProjectRepository;
  private readonly assetRepository: AppAssetRepository;

  constructor(private readonly em: EntityManager) {
    this.repository = em.getRepository(Project);
    this.assetRepository = em.getRepository(AppAsset);
  }

  async addAsset(
    projectId: string,
    assetId: string,
    currentUser: User,
  ): Promise<Project> {
    const project = await this.repository.getProjectWithAssets(projectId);

    if (!currentUser.hasSameTenant(project)) {
      throw new UnauthorizedException();
    }

    const image = await this.em.findOneOrFail(AppAsset, {
      id: assetId,
      tenant: currentUser.getTenantId(),
    });

    project.addAsset(image);
    return project;
  }

  async deleteAssets(
    projectId: string,
    assetIds: string[],
    currentUser: User,
  ): Promise<Project> {
    const project = await this.repository.getProjectWithAssets(projectId);
    if (!currentUser.hasSameTenant(project)) {
      throw new UnauthorizedException();
    }

    //delete images
    project.assets
      .getItems()
      .filter((assetRef) => assetIds.includes(assetRef.asset.id))
      .forEach((img) => project.removeAsset(img));

    return project;
  }
}

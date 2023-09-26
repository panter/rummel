import {
  AppAsset,
  CreateOneResolver,
  FindManyResolver,
  FindOneResolver,
  Public,
  UpdateOneResolver,
} from '@panter/nestjs-utils';

import { EntityManager } from '@mikro-orm/postgresql';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Project } from './entities/project.entity';
import { ProjectAssetReference } from './entities/project-asset-reference.entity';
import { Contact } from '../contact/contact.entity';

@Public()
@Resolver(() => Project)
export class ProjectResolver {
  constructor(private readonly em: EntityManager) {}

  @ResolveField(() => AppAsset, { nullable: true })
  async mainImage(@Parent() project: Project): Promise<AppAsset> {
    const assets = (
      await this.em.find(
        ProjectAssetReference,
        { project: { id: project.id } },
        { populate: ['asset'], fields: ['asset.*'] },
      )
    ).filter((ref) => ref.asset.mimeType.startsWith('image/'));

    return project.mainImage || assets?.[0]?.asset || null;
  }

  @ResolveField(() => AppAsset, { nullable: true })
  async mainImageId(@Parent() parent: Project): Promise<AppAsset | undefined> {
    await this.em.populate(parent, ['mainImage']);
    return parent.mainImage;
  }

  @ResolveField(() => Contact, { nullable: true })
  async somehowImportantContactWithoutName(
    @Parent() parent: Project,
  ): Promise<Contact | undefined> {
    const possibleContacts = await parent.contacts.matching({
      where: {
        type: 'Bauträgerschaft',
      },
    });
    return possibleContacts[0];
  }
}

@Resolver(() => Project)
export class ProjectFindManyResolver extends FindManyResolver(Project) {}

@Resolver(() => Project)
export class ProjectFindOneResolver extends FindOneResolver(Project) {}

@Resolver(() => Project)
export class ProjectCreateOneResolver extends CreateOneResolver(Project) {}

@Resolver(() => Project)
export class ProjectUpdateOneResolver extends UpdateOneResolver(Project) {}

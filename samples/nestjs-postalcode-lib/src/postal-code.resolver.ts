import { Query, Resolver } from '@nestjs/graphql';
import { EntityManager } from '@mikro-orm/postgresql';
import { PostalCode } from './postal-code.entity';
import { PostalCodeRepository } from './postal-code.repository';
import { Public } from '@panter/nestjs-utils';

@Resolver(() => PostalCode)
export class PostalCodeResolver {
  private readonly repository: PostalCodeRepository;

  constructor(private readonly em: EntityManager) {
    this.repository = em.getRepository(PostalCode);
  }

  @Public()
  @Query(() => [PostalCode], { name: 'allPostalCodes' })
  async findAll() {
    return this.repository.findAll();
  }
}

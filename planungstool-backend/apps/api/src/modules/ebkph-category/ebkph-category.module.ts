import { EbkphCategory } from './ebkph-category.entity';
import {
  EbkphCategoryCreateOneResolver,
  EbkphCategoryFindManyResolver,
  EbkphCategoryFindOneResolver,
  EbkphCategoryResolver,
  EbkphCategoryUpdateOneResolver,
} from './ebkph-category.resolver';
import { EbkphCategoryService } from './ebkph-category.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [EbkphCategory] })],
  providers: [
    EbkphCategoryResolver,
    EbkphCategoryService,
    EbkphCategoryFindOneResolver,
    EbkphCategoryFindManyResolver,
    EbkphCategoryCreateOneResolver,
    EbkphCategoryUpdateOneResolver,
  ],
})
export class EbkphCategoryModule {}

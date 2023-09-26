import { Category } from './category.entity';
import {
  CategoryCreateOneResolver,
  CategoryFindManyResolver,
  CategoryFindOneResolver,
  CategoryResolver,
  CategoryUpdateOneResolver,
} from './category.resolver';
import { CategoryService } from './category.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Category] })],
  providers: [
    CategoryResolver,
    CategoryService,
    CategoryFindOneResolver,
    CategoryFindManyResolver,
    CategoryCreateOneResolver,
    CategoryUpdateOneResolver,
  ],
})
export class CategoryModule {}

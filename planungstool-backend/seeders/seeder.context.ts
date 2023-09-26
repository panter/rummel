import { Category } from '../apps/api/src/modules/category/category.entity';
import { Role } from '@panter/nestjs-utils';
import { User } from '../apps/api/src/modules/user-identity';
import { EbkphCategory } from '../apps/api/src/modules/ebkph-category/ebkph-category.entity';

export type SeederContext = {
  initialUsers: User[];
  roles: Role[];
  categories: Category[];
  ebkphCategories: EbkphCategory[];
};

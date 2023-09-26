import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { PostalCode } from './postal-code.entity';

@Injectable()
export class PostalCodeRepository extends EntityRepository<PostalCode> {}

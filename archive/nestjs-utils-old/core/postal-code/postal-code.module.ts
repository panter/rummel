import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostalCode } from './postal-code.entity';
import { PostalCodeRepository } from './postal-code.repository';
import { PostalCodeResolver } from './postal-code.resolver';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [PostalCode] })],
  providers: [PostalCodeRepository, PostalCodeResolver],
  exports: [PostalCodeRepository],
})
export class PostalCodeModule {}

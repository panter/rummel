import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AsyncJobModule } from '@app/modules/async-job/async-job.module';
import mikroOrmConfig from '../../../mikro-orm.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MikroOrmModule.forRoot({ ...mikroOrmConfig, autoLoadEntities: true }),
    AsyncJobModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  exports: [MikroOrmModule, AsyncJobModule],
})
export class ModulesModule {}

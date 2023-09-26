import * as path from 'path';

import {
  AssetManagerModule,
  AuthorizationCoreModule,
  AutocompleteModule,
  CommonModule,
  EnvShort,
  EventBusModule,
  PostalCodeModule,
  SentryModule,
} from '@panter/nestjs-utils';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  authenticationModule,
  graphqlModuleFactory,
  loggerModule,
  mikroOrmModule,
} from './module-configs';

import { AssetsExportModule } from './modules/assets-export/assets-export.module';
import { BuildingComponentModule } from './modules/building-component/building-component.module';
import { CategoryModule } from './modules/category/category.module';
import { ContactModule } from './modules/contact/contact.module';
import { DimensionModule } from './modules/dimension/dimension.module';
import { EbkphCategoryModule } from './modules/ebkph-category/ebkph-category.module';
import { MaterialsDepotModule } from './modules/materials-depot/materials-depot.module';
import { Module } from '@nestjs/common';
import { ProjectModule } from './modules/project/project.module';
import { SearchRequestInterestModule } from './modules/search-request-interest/search-request-interest.module';
import { SearchRequestModule } from './modules/search-request/search-request.module';
import { CantonModule } from './modules/canton/canton.module';
import { UserIdentityModule } from './modules/user-identity';
import { UserModule } from './modules/user';
import { TaskModule } from './modules/task/task.module';
import { StorageLocationModule } from './modules/storage-location/storage-location.module';
import { MaterialsDepotTimelineModule } from './modules/materials-depot-timeline/materials-depot-timeline.module';

const featureModules = [
  ContactModule,
  TaskModule,
  UserModule,
  AssetsExportModule,
  AutocompleteModule,
  MaterialsDepotModule,
  MaterialsDepotTimelineModule,
  BuildingComponentModule,
  CategoryModule,
  EbkphCategoryModule,
  DimensionModule,
  ProjectModule,
  SearchRequestModule,
  SearchRequestInterestModule,
  CantonModule,
  PostalCodeModule,
  StorageLocationModule,
];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    SentryModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const env = config.get<EnvShort>('ENV_SHORT');
        return {
          dsn: config.get('SENTRY_DSN'),
          env: config.getOrThrow('ENV_SHORT'),
          tracesSampleRate:
            env === EnvShort.local ? 0 : env !== EnvShort.prod ? 1.0 : 0.2,
        };
      },
    }),
    graphqlModuleFactory({ path: 'graphql', schemaFileName: 'api.gql' }),
    mikroOrmModule,
    loggerModule,
    authenticationModule,
    AssetManagerModule,
    AuthorizationCoreModule,
    CommonModule.forRootAsync({
      useFactory: () => ({
        language: 'de',
        translationsPath: path.join(__dirname, './assets/i18n'),
      }),
    }),
    EventBusModule,
    UserIdentityModule,
    ...featureModules,
  ],
  providers: [],
})
export class ApiModule {}

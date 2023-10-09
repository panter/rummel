import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AssetDao } from './asset.dao';
import { AssetManagerController } from './asset-manager.controller';
import { AssetManagerService } from './asset-manager.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AppAsset } from './app-asset.entity';
import { AppAssetRepository } from './app-asset.repository';
import {
  AssetProvider,
  GcloudStorageService,
  StorageService,
} from '../../asset-manager';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [AppAsset] })],
  providers: [
    {
      provide: StorageService,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const credentials = JSON.parse(
          configService.getOrThrow('GCLOUD_CREDENTIALS'),
        );
        return new GcloudStorageService({
          projectId: credentials.project_id,
          clientEmail: credentials.client_email,
          privateKey: credentials.private_key,
          publicBucket: configService.get('GCLOUD_BUCKET_PUBLIC'),
          privateBucket: configService.get('GCLOUD_BUCKET_PRIVATE'),
        });
      },
    },
    { provide: AssetProvider, useClass: AssetDao },
    AssetManagerService,
    AppAssetRepository,
  ],
  exports: [AppAssetRepository, AssetManagerService],
  controllers: [AssetManagerController],
})
export class AssetManagerModule {}

// registerEnumType(AssetAccess, { name: 'AssetAccess' });

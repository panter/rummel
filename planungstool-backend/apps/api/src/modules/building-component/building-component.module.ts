import {
  BuildingComponentCreateOneResolver,
  BuildingComponentDeleteOneResolver,
  BuildingComponentFindManyResolver,
  BuildingComponentFindOneResolver,
  BuildingComponentResolver,
  BuildingComponentUpdateOneResolver,
} from './building-component.resolver';

import { AssetManagerModule } from '@panter/nestjs-utils';
import { BuildingComponent } from './entities/building-component.entity';
import { BuildingComponentAssetService } from './building-component-asset.service';
import { BuildingComponentController } from './building-component.controller';
import { BuildingComponentService } from './building-component.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { BuildingComponentImportService } from './building-component-import.service';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [BuildingComponent] }),
    AssetManagerModule,
  ],
  providers: [
    BuildingComponentResolver,
    BuildingComponentService,
    BuildingComponentAssetService,
    BuildingComponentFindOneResolver,
    BuildingComponentFindManyResolver,
    BuildingComponentCreateOneResolver,
    BuildingComponentUpdateOneResolver,
    BuildingComponentDeleteOneResolver,
    BuildingComponentImportService,
  ],
  exports: [BuildingComponentService],
  controllers: [BuildingComponentController],
})
export class BuildingComponentModule {}

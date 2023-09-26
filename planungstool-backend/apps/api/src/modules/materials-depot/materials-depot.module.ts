import {
  MaterialsDepotCreateOneResolver,
  MaterialsDepotFindManyResolver,
  MaterialsDepotFindOneResolver,
  MaterialsDepotResolver,
  MaterialsDepotUpdateOneResolver,
} from './materials-depot.resolver';

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { MaterialsDepot } from './entities/materials-depot.entity';
import { MaterialsDepotAssetService } from './materials-depot-asset.service';
import { MaterialsDepotImportService } from './materials-depot-import.service';
import { MaterialsDepotController } from './materials-depot.controller';
import { MaterialsDepotService } from './materials-depot.service';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [MaterialsDepot] })],
  providers: [
    MaterialsDepotResolver,
    MaterialsDepotService,
    MaterialsDepotAssetService,
    MaterialsDepotFindOneResolver,
    MaterialsDepotFindManyResolver,
    MaterialsDepotCreateOneResolver,
    MaterialsDepotUpdateOneResolver,
    MaterialsDepotImportService,
  ],
  controllers: [MaterialsDepotController],
})
export class MaterialsDepotModule {}

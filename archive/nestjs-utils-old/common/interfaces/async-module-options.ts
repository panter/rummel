import { FactoryProvider, ModuleMetadata } from '@nestjs/common';

/**
 * Helpful when creating nest.js dynamic module
 */
export type ModuleAsyncOptions<T = never> = Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider<T>, 'useFactory' | 'inject'>;

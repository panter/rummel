import { prodData } from './prod';
import { devData } from './dev';

/**
 * Use devData as source of truth for the data structure.
 */
export type SeedData = typeof devData;

export const data = {
  production: prodData,
  development: devData,
};

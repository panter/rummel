import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { Transactional } from './transactional.decorator';
import { PopulateFieldsInterceptor } from '../interceptors';

/**
 * This decorator is used to populate the fields of the entity returned by the mutation.
 */
export const AutoPopulate = (transactional: boolean = true) =>
  transactional
    ? applyDecorators(Transactional, UseInterceptors(PopulateFieldsInterceptor))
    : applyDecorators(UseInterceptors(PopulateFieldsInterceptor));

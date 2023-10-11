import { ApplicationException } from '@panter/nestjs-utils';

export class BucketsNotFoundException extends ApplicationException {
  readonly buckets: string[];

  constructor(buckets: string[]) {
    super(`One or more buckets [${buckets.join(', ')}] were not found.`);
    this.buckets = buckets;
  }
}

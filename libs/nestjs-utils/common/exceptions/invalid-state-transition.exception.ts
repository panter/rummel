import { ApplicationException } from './application.exception';
import { Type } from '@nestjs/common';

export class InvalidStateTransitionException extends ApplicationException {
  constructor(entity: Type, fromState: string, toState: string) {
    super(
      `Entity ${entity.name} sate transition '${fromState}'->'${toState}' is not allowed!`,
    );
    this.withContext({ entity, fromState, toState });
  }
}

import { TypedDocumentNode } from '@apollo/client';
import { useState } from 'react';

export type ExtractWhereVariableFromNode<
  T extends TypedDocumentNode<any, any>,
> =
  T extends TypedDocumentNode<any, infer TVariables>
    ? ExtractWhereVariable<TVariables>
    : never;

export type ExtractWhereVariable<T> = T extends { where?: infer U } ? U : never;
export function usePrismaWhereVariable<
  TResult,
  TVariables,
  Where = ExtractWhereVariable<TVariables>,
>(_: TypedDocumentNode<TResult, TVariables>, initialState?: Where) {
  return useState<Where | undefined>(initialState);
}

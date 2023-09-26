import { TypedDocumentNode } from '@apollo/client';
import { useState } from 'react';

export type ExtractSkipVariable<T> = T extends { skip?: infer U }
  ? U extends number | undefined
    ? U
    : number
  : never;
export function usePrismaSkipVariables<
  TResult,
  TVariables,
  Skip = ExtractSkipVariable<TVariables>,
>(_: TypedDocumentNode<TResult, TVariables>, initialState?: Skip) {
  return useState<Skip | undefined>(initialState);
}

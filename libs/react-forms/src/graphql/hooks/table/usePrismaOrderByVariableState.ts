import { TypedDocumentNode } from '@apollo/client';
import { useState } from 'react';

export type ExtractOrderByVariable<T> = T extends { orderBy?: infer U }
  ? U
  : never;
export function usePrismaOrderByVariable<
  TResult,
  TVariables,
  OrderBy = ExtractOrderByVariable<TVariables>,
>(_: TypedDocumentNode<TResult, TVariables>, initialState?: OrderBy) {
  return useState<OrderBy | undefined>(initialState);
}

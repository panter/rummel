/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation DeleteOneAutocomplete($where: EntityIdInput!) {\n    deleteOneAutocomplete(where: $where) {\n      id\n    }\n  }\n": types.DeleteOneAutocompleteDocument,
    "\n  mutation CreateOneAutocomplete($data: AutocompleteCreateInput!) {\n    createOneAutocomplete(data: $data) {\n      id\n      ...Autocomplete\n    }\n  }\n": types.CreateOneAutocompleteDocument,
    "\n  mutation UpdateOneAutocomplete(\n    $where: EntityIdInput!\n    $data: AutocompleteUpdateInput!\n  ) {\n    updateOneAutocomplete(where: $where, data: $data) {\n      id\n      ...Autocomplete\n    }\n  }\n": types.UpdateOneAutocompleteDocument,
    "\n  query oneAutocomplete($where: EntityIdInput!) {\n    autocomplete(where: $where) {\n      id\n      ...Autocomplete\n    }\n  }\n": types.OneAutocompleteDocument,
    "\n  query autocompletes(\n    $where: AutocompleteWhereInput\n    $orderBy: [AutocompleteOrderByInput!]\n    $take: Int\n    $skip: Int\n  ) {\n    autocompletes(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {\n      id\n      ...Autocomplete\n    }\n\n    autocompletesCount(where: $where)\n  }\n": types.AutocompletesDocument,
    "\n  fragment Autocomplete on Autocomplete {\n    id\n    key\n    value\n  }\n": types.AutocompleteFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteOneAutocomplete($where: EntityIdInput!) {\n    deleteOneAutocomplete(where: $where) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteOneAutocomplete($where: EntityIdInput!) {\n    deleteOneAutocomplete(where: $where) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateOneAutocomplete($data: AutocompleteCreateInput!) {\n    createOneAutocomplete(data: $data) {\n      id\n      ...Autocomplete\n    }\n  }\n"): (typeof documents)["\n  mutation CreateOneAutocomplete($data: AutocompleteCreateInput!) {\n    createOneAutocomplete(data: $data) {\n      id\n      ...Autocomplete\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateOneAutocomplete(\n    $where: EntityIdInput!\n    $data: AutocompleteUpdateInput!\n  ) {\n    updateOneAutocomplete(where: $where, data: $data) {\n      id\n      ...Autocomplete\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateOneAutocomplete(\n    $where: EntityIdInput!\n    $data: AutocompleteUpdateInput!\n  ) {\n    updateOneAutocomplete(where: $where, data: $data) {\n      id\n      ...Autocomplete\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query oneAutocomplete($where: EntityIdInput!) {\n    autocomplete(where: $where) {\n      id\n      ...Autocomplete\n    }\n  }\n"): (typeof documents)["\n  query oneAutocomplete($where: EntityIdInput!) {\n    autocomplete(where: $where) {\n      id\n      ...Autocomplete\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query autocompletes(\n    $where: AutocompleteWhereInput\n    $orderBy: [AutocompleteOrderByInput!]\n    $take: Int\n    $skip: Int\n  ) {\n    autocompletes(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {\n      id\n      ...Autocomplete\n    }\n\n    autocompletesCount(where: $where)\n  }\n"): (typeof documents)["\n  query autocompletes(\n    $where: AutocompleteWhereInput\n    $orderBy: [AutocompleteOrderByInput!]\n    $take: Int\n    $skip: Int\n  ) {\n    autocompletes(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {\n      id\n      ...Autocomplete\n    }\n\n    autocompletesCount(where: $where)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Autocomplete on Autocomplete {\n    id\n    key\n    value\n  }\n"): (typeof documents)["\n  fragment Autocomplete on Autocomplete {\n    id\n    key\n    value\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Address = {
  __typename?: 'Address';
  address: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type AddressConnectCreateUpdateNestedManyWithoutPersonInput = {
  connect?: InputMaybe<Array<ConnectRelationInput>>;
  create?: InputMaybe<Array<AddressCreateWithoutPersonInput>>;
  disconnect?: InputMaybe<Array<EntityIdInput>>;
  update?: InputMaybe<Array<AddressUpdateWithWhereUniqueWithoutPersonInput>>;
};

export type AddressCreateWithoutPersonInput = {
  address?: InputMaybe<Scalars['String']['input']>;
};

export type AddressOrderByInput = {
  address?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
};

export type AddressUpdateInput = {
  address?: InputMaybe<StringInput>;
};

export type AddressUpdateWithWhereUniqueWithoutPersonInput = {
  data?: InputMaybe<AddressUpdateInput>;
  where: EntityIdInput;
};

export type AddressWhereInput = {
  AND?: InputMaybe<Array<AddressWhereInput>>;
  NOT?: InputMaybe<Array<AddressWhereInput>>;
  OR?: InputMaybe<Array<AddressWhereInput>>;
  address?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
};

export type Autocomplete = {
  __typename?: 'Autocomplete';
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type AutocompleteCreateInput = {
  key?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type AutocompleteOrderByInput = {
  id?: InputMaybe<SortOrder>;
  key?: InputMaybe<SortOrder>;
  value?: InputMaybe<SortOrder>;
};

export type AutocompleteUpdateInput = {
  key?: InputMaybe<StringInput>;
  value?: InputMaybe<StringInput>;
};

export type AutocompleteWhereInput = {
  AND?: InputMaybe<Array<AutocompleteWhereInput>>;
  NOT?: InputMaybe<Array<AutocompleteWhereInput>>;
  OR?: InputMaybe<Array<AutocompleteWhereInput>>;
  id?: InputMaybe<StringFilter>;
  key?: InputMaybe<StringFilter>;
  value?: InputMaybe<StringFilter>;
};

export type ConnectRelationInput = {
  id: Scalars['String']['input'];
};

export type EntityIdInput = {
  id: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createOneAutocomplete: Autocomplete;
  createOnePerson: Person;
  deleteOneAutocomplete: Autocomplete;
  deleteOnePerson: Person;
  updateOneAutocomplete: Autocomplete;
  updateOnePerson: Person;
};


export type MutationCreateOneAutocompleteArgs = {
  data?: InputMaybe<AutocompleteCreateInput>;
};


export type MutationCreateOnePersonArgs = {
  data?: InputMaybe<PersonCreateInput>;
};


export type MutationDeleteOneAutocompleteArgs = {
  where?: InputMaybe<EntityIdInput>;
};


export type MutationDeleteOnePersonArgs = {
  where?: InputMaybe<EntityIdInput>;
};


export type MutationUpdateOneAutocompleteArgs = {
  data?: InputMaybe<AutocompleteUpdateInput>;
  where: EntityIdInput;
};


export type MutationUpdateOnePersonArgs = {
  data?: InputMaybe<PersonUpdateInput>;
  where: EntityIdInput;
};

export type Organisation = {
  __typename?: 'Organisation';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  persons: Array<Person>;
  simple?: Maybe<Simple>;
};

export type OrganisationConnectNestedOneWithoutPersonInput = {
  connect?: InputMaybe<ConnectRelationInput>;
};

export type OrganisationOneRelationFilter = {
  AND?: InputMaybe<OrganisationWhereInput>;
  NOT?: InputMaybe<OrganisationWhereInput>;
  OR?: InputMaybe<OrganisationWhereInput>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  persons?: InputMaybe<PersonWhereInput>;
  simple?: InputMaybe<SimpleOneRelationFilter>;
};

export type OrganisationOrderByInput = {
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  persons?: InputMaybe<PersonOrderByInput>;
  simple?: InputMaybe<SimpleOrderByInput>;
};

export type OrganisationWhereInput = {
  AND?: InputMaybe<Array<OrganisationWhereInput>>;
  NOT?: InputMaybe<Array<OrganisationWhereInput>>;
  OR?: InputMaybe<Array<OrganisationWhereInput>>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  persons?: InputMaybe<PersonWhereInput>;
  simple?: InputMaybe<SimpleOneRelationFilter>;
};

export type Person = {
  __typename?: 'Person';
  addresses?: Maybe<Array<Address>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organisation?: Maybe<Organisation>;
};


export type PersonAddressesArgs = {
  orderBy?: InputMaybe<Array<AddressOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AddressWhereInput>;
};

export type PersonCreateInput = {
  addresses?: InputMaybe<AddressConnectCreateUpdateNestedManyWithoutPersonInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  organisation?: InputMaybe<OrganisationConnectNestedOneWithoutPersonInput>;
};

export type PersonOrderByInput = {
  addresses?: InputMaybe<AddressOrderByInput>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  organisation?: InputMaybe<OrganisationOrderByInput>;
};

export type PersonUpdateInput = {
  addresses?: InputMaybe<AddressConnectCreateUpdateNestedManyWithoutPersonInput>;
  name?: InputMaybe<StringInput>;
  organisation?: InputMaybe<OrganisationConnectNestedOneWithoutPersonInput>;
};

export type PersonWhereInput = {
  AND?: InputMaybe<Array<PersonWhereInput>>;
  NOT?: InputMaybe<Array<PersonWhereInput>>;
  OR?: InputMaybe<Array<PersonWhereInput>>;
  addresses?: InputMaybe<AddressWhereInput>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  organisation?: InputMaybe<OrganisationOneRelationFilter>;
};

export type Query = {
  __typename?: 'Query';
  autocomplete?: Maybe<Autocomplete>;
  autocompletes: Array<Autocomplete>;
  autocompletesCount: Scalars['Int']['output'];
  people: Array<Person>;
  peopleCount: Scalars['Int']['output'];
  person?: Maybe<Person>;
};


export type QueryAutocompleteArgs = {
  where?: InputMaybe<EntityIdInput>;
};


export type QueryAutocompletesArgs = {
  orderBy?: InputMaybe<Array<AutocompleteOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AutocompleteWhereInput>;
};


export type QueryAutocompletesCountArgs = {
  orderBy?: InputMaybe<Array<AutocompleteOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AutocompleteWhereInput>;
};


export type QueryPeopleArgs = {
  orderBy?: InputMaybe<Array<PersonOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PersonWhereInput>;
};


export type QueryPeopleCountArgs = {
  orderBy?: InputMaybe<Array<PersonOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<PersonWhereInput>;
};


export type QueryPersonArgs = {
  where?: InputMaybe<EntityIdInput>;
};

export type Simple = {
  __typename?: 'Simple';
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  related: Simple;
  secondName?: Maybe<Scalars['String']['output']>;
};

export type SimpleOneRelationFilter = {
  AND?: InputMaybe<SimpleWhereInput>;
  NOT?: InputMaybe<SimpleWhereInput>;
  OR?: InputMaybe<SimpleWhereInput>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  related?: InputMaybe<SimpleOneRelationFilter>;
  secondName?: InputMaybe<StringFilter>;
};

export type SimpleOrderByInput = {
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  related?: InputMaybe<SimpleOrderByInput>;
  secondName?: InputMaybe<SortOrder>;
};

export type SimpleWhereInput = {
  AND?: InputMaybe<Array<SimpleWhereInput>>;
  NOT?: InputMaybe<Array<SimpleWhereInput>>;
  OR?: InputMaybe<Array<SimpleWhereInput>>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  related?: InputMaybe<SimpleOneRelationFilter>;
  secondName?: InputMaybe<StringFilter>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export enum SringQueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  fulltext?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<SringQueryMode>;
  nin?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type StringInput = {
  set?: InputMaybe<Scalars['String']['input']>;
};

export type AutocompleteSelectQueryVariables = Exact<{
  where?: InputMaybe<AutocompleteWhereInput>;
}>;


export type AutocompleteSelectQuery = { __typename?: 'Query', autocompletes: Array<{ __typename?: 'Autocomplete', id: string, value: string }> };

export type DeleteOneAutocompleteMutationVariables = Exact<{
  where: EntityIdInput;
}>;


export type DeleteOneAutocompleteMutation = { __typename?: 'Mutation', deleteOneAutocomplete: { __typename?: 'Autocomplete', id: string } };

export type CreateOneAutocompleteMutationVariables = Exact<{
  data: AutocompleteCreateInput;
}>;


export type CreateOneAutocompleteMutation = { __typename?: 'Mutation', createOneAutocomplete: (
    { __typename?: 'Autocomplete', id: string }
    & { ' $fragmentRefs'?: { 'AutocompleteFragment': AutocompleteFragment } }
  ) };

export type UpdateOneAutocompleteMutationVariables = Exact<{
  where: EntityIdInput;
  data: AutocompleteUpdateInput;
}>;


export type UpdateOneAutocompleteMutation = { __typename?: 'Mutation', updateOneAutocomplete: (
    { __typename?: 'Autocomplete', id: string }
    & { ' $fragmentRefs'?: { 'AutocompleteFragment': AutocompleteFragment } }
  ) };

export type OneAutocompleteQueryVariables = Exact<{
  where: EntityIdInput;
}>;


export type OneAutocompleteQuery = { __typename?: 'Query', autocomplete?: (
    { __typename?: 'Autocomplete', id: string }
    & { ' $fragmentRefs'?: { 'AutocompleteFragment': AutocompleteFragment } }
  ) | null };

export type AutocompletesQueryVariables = Exact<{
  where?: InputMaybe<AutocompleteWhereInput>;
  orderBy?: InputMaybe<Array<AutocompleteOrderByInput> | AutocompleteOrderByInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AutocompletesQuery = { __typename?: 'Query', autocompletesCount: number, autocompletes: Array<(
    { __typename?: 'Autocomplete', id: string }
    & { ' $fragmentRefs'?: { 'AutocompleteFragment': AutocompleteFragment } }
  )> };

export type AutocompleteFragment = { __typename?: 'Autocomplete', id: string, key: string, value: string } & { ' $fragmentName'?: 'AutocompleteFragment' };

export const AutocompleteFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Autocomplete"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Autocomplete"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]} as unknown as DocumentNode<AutocompleteFragment, unknown>;
export const AutocompleteSelectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AutocompleteSelect"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AutocompleteWhereInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"autocompletes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<AutocompleteSelectQuery, AutocompleteSelectQueryVariables>;
export const DeleteOneAutocompleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteOneAutocomplete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EntityIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteOneAutocomplete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteOneAutocompleteMutation, DeleteOneAutocompleteMutationVariables>;
export const CreateOneAutocompleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOneAutocomplete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AutocompleteCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOneAutocomplete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Autocomplete"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Autocomplete"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Autocomplete"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]} as unknown as DocumentNode<CreateOneAutocompleteMutation, CreateOneAutocompleteMutationVariables>;
export const UpdateOneAutocompleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOneAutocomplete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EntityIdInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AutocompleteUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOneAutocomplete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Autocomplete"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Autocomplete"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Autocomplete"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]} as unknown as DocumentNode<UpdateOneAutocompleteMutation, UpdateOneAutocompleteMutationVariables>;
export const OneAutocompleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"oneAutocomplete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EntityIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"autocomplete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Autocomplete"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Autocomplete"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Autocomplete"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]} as unknown as DocumentNode<OneAutocompleteQuery, OneAutocompleteQueryVariables>;
export const AutocompletesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"autocompletes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AutocompleteWhereInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AutocompleteOrderByInput"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"autocompletes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Autocomplete"}}]}},{"kind":"Field","name":{"kind":"Name","value":"autocompletesCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Autocomplete"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Autocomplete"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]} as unknown as DocumentNode<AutocompletesQuery, AutocompletesQueryVariables>;
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
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: { input: any; output: any; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type AcceptSearchRequestInterestInput = {
  buildingComponent: AssignBuildingComponentInput;
  interestId: Scalars['String']['input'];
};

export type AppAsset = {
  __typename?: 'AppAsset';
  confirmedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  mimeType: Scalars['String']['output'];
  originalFilename: Scalars['String']['output'];
  size: Scalars['BigInt']['output'];
  tags?: Maybe<Array<Scalars['String']['output']>>;
  updatedAt: Scalars['DateTime']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type AppAssetCreateNestedOneWithoutBuildingComponentAssetReferenceInput = {
  connect?: InputMaybe<ConnectRelationInput>;
};

export type AppAssetCreateNestedOneWithoutBuildingComponentInput = {
  connect?: InputMaybe<ConnectRelationInput>;
};

export type AppAssetCreateNestedOneWithoutMaterialsDepotAssetReferenceInput = {
  connect?: InputMaybe<ConnectRelationInput>;
};

export type AppAssetCreateNestedOneWithoutMaterialsDepotInput = {
  connect?: InputMaybe<ConnectRelationInput>;
};

export type AppAssetCreateNestedOneWithoutProjectAssetReferenceInput = {
  connect?: InputMaybe<ConnectRelationInput>;
};

export type AppAssetCreateNestedOneWithoutProjectInput = {
  connect?: InputMaybe<ConnectRelationInput>;
};

export type AppAssetCreateNestedOneWithoutSearchRequestAssetReferenceInput = {
  connect?: InputMaybe<ConnectRelationInput>;
};

export type AppAssetCreateNestedOneWithoutStorageLocationAssetReferenceInput = {
  connect?: InputMaybe<ConnectRelationInput>;
};

export type AppAssetCreateNestedOneWithoutStorageLocationInput = {
  connect?: InputMaybe<ConnectRelationInput>;
};

export type AppAssetOneRelationFilter = {
  AND?: InputMaybe<AppAssetWhereInput>;
  NOT?: InputMaybe<AppAssetWhereInput>;
  OR?: InputMaybe<AppAssetWhereInput>;
  confirmedAt?: InputMaybe<DateTimeFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  mimeType?: InputMaybe<StringFilter>;
  originalFilename?: InputMaybe<StringFilter>;
  size?: InputMaybe<IntFilter>;
  tags?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  url?: InputMaybe<StringFilter>;
};

export type AppAssetOrderByInput = {
  confirmedAt?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  mimeType?: InputMaybe<SortOrder>;
  originalFilename?: InputMaybe<SortOrder>;
  size?: InputMaybe<SortOrder>;
  tags?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  url?: InputMaybe<SortOrder>;
};

export type AppAssetUpdateNestedOneWithoutBuildingComponentAssetReferenceInput = {
  connect?: InputMaybe<ConnectRelationInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AppAssetUpdateNestedOneWithoutBuildingComponentInput = {
  connect?: InputMaybe<ConnectRelationInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AppAssetUpdateNestedOneWithoutMaterialsDepotAssetReferenceInput = {
  connect?: InputMaybe<ConnectRelationInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AppAssetUpdateNestedOneWithoutMaterialsDepotInput = {
  connect?: InputMaybe<ConnectRelationInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AppAssetUpdateNestedOneWithoutProjectAssetReferenceInput = {
  connect?: InputMaybe<ConnectRelationInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AppAssetUpdateNestedOneWithoutProjectInput = {
  connect?: InputMaybe<ConnectRelationInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AppAssetUpdateNestedOneWithoutSearchRequestAssetReferenceInput = {
  connect?: InputMaybe<ConnectRelationInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AppAssetUpdateNestedOneWithoutStorageLocationAssetReferenceInput = {
  connect?: InputMaybe<ConnectRelationInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AppAssetUpdateNestedOneWithoutStorageLocationInput = {
  connect?: InputMaybe<ConnectRelationInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AppAssetWhereInput = {
  AND?: InputMaybe<Array<AppAssetWhereInput>>;
  NOT?: InputMaybe<Array<AppAssetWhereInput>>;
  OR?: InputMaybe<Array<AppAssetWhereInput>>;
  confirmedAt?: InputMaybe<DateTimeFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  mimeType?: InputMaybe<StringFilter>;
  originalFilename?: InputMaybe<StringFilter>;
  size?: InputMaybe<IntFilter>;
  tags?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  url?: InputMaybe<StringFilter>;
};

export type AssignBuildingComponentInput = {
  amount: Scalars['Int']['input'];
  amountReserved?: InputMaybe<Scalars['Int']['input']>;
  buildingComponentId: Scalars['String']['input'];
};

export type AssignedBuildingComponent = {
  __typename?: 'AssignedBuildingComponent';
  amount: Scalars['Int']['output'];
  amountReserved: Scalars['Int']['output'];
  buildingComponent: BuildingComponent;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  searchRequest: SearchRequest;
  updatedAt: Scalars['DateTime']['output'];
};

export type AssignedBuildingComponentCreateNestedManyWithoutSearchRequestInput = {
  connect?: InputMaybe<Array<ConnectRelationInput>>;
  disconnect?: InputMaybe<Array<EntityIdInput>>;
};

export type AssignedBuildingComponentCreateNestedOneWithoutBuildingComponentInput = {
  connect?: InputMaybe<ConnectRelationInput>;
};

export type AssignedBuildingComponentOneRelationFilter = {
  AND?: InputMaybe<AssignedBuildingComponentWhereInput>;
  NOT?: InputMaybe<AssignedBuildingComponentWhereInput>;
  OR?: InputMaybe<AssignedBuildingComponentWhereInput>;
  amount?: InputMaybe<IntFilter>;
  amountReserved?: InputMaybe<IntFilter>;
  buildingComponent?: InputMaybe<BuildingComponentOneRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  searchRequest?: InputMaybe<SearchRequestOneRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type AssignedBuildingComponentOrderByInput = {
  amount?: InputMaybe<SortOrder>;
  amountReserved?: InputMaybe<SortOrder>;
  buildingComponent?: InputMaybe<BuildingComponentOrderByInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  searchRequest?: InputMaybe<SearchRequestOrderByInput>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type AssignedBuildingComponentUpdateNestedOneWithoutBuildingComponentInput = {
  connect?: InputMaybe<ConnectRelationInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AssignedBuildingComponentWhereInput = {
  AND?: InputMaybe<Array<AssignedBuildingComponentWhereInput>>;
  NOT?: InputMaybe<Array<AssignedBuildingComponentWhereInput>>;
  OR?: InputMaybe<Array<AssignedBuildingComponentWhereInput>>;
  amount?: InputMaybe<IntFilter>;
  amountReserved?: InputMaybe<IntFilter>;
  buildingComponent?: InputMaybe<BuildingComponentOneRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  searchRequest?: InputMaybe<SearchRequestOneRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
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

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
};

export type BooleanInput = {
  set?: InputMaybe<Scalars['Boolean']['input']>;
};

export type BuildingComponent = {
  __typename?: 'BuildingComponent';
  assets?: Maybe<Array<BuildingComponentAssetReference>>;
  assignedTo?: Maybe<AssignedBuildingComponent>;
  category?: Maybe<Category>;
  categoryId?: Maybe<ReferenceId>;
  co2QuantityUsed?: Maybe<Scalars['Float']['output']>;
  co2Savings?: Maybe<Scalars['Float']['output']>;
  co2SavingsExact?: Maybe<Scalars['Boolean']['output']>;
  co2SavingsPerUnit?: Maybe<Scalars['Float']['output']>;
  co2SavingsTotal?: Maybe<Scalars['Float']['output']>;
  co2Unit?: Maybe<QuantityUnit>;
  componentId?: Maybe<Scalars['String']['output']>;
  componentSn: Scalars['BigInt']['output'];
  condition?: Maybe<Condition>;
  constructionYear?: Maybe<Scalars['Float']['output']>;
  constructionYearExact?: Maybe<Scalars['Boolean']['output']>;
  constructionYearNotes?: Maybe<Scalars['String']['output']>;
  contacts?: Maybe<Array<Contact>>;
  createdAt: Scalars['DateTime']['output'];
  demolitionPhase?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  dimensions?: Maybe<Array<Dimension>>;
  dimensionsNotes?: Maybe<Scalars['String']['output']>;
  ebkphCategory?: Maybe<EbkphCategory>;
  ebkphCategoryId?: Maybe<ReferenceId>;
  fallbackLevel?: Maybe<Scalars['String']['output']>;
  fallbackLevelCO2PerUnit?: Maybe<Scalars['Float']['output']>;
  fallbackLevelCO2Total?: Maybe<Scalars['Float']['output']>;
  harmfulSubstances?: Maybe<HarmfulSubstances>;
  id: Scalars['ID']['output'];
  locationInBuilding?: Maybe<Scalars['String']['output']>;
  locationInBuildingDetail?: Maybe<Scalars['String']['output']>;
  mainImage?: Maybe<AppAsset>;
  mainImageId?: Maybe<AppAsset>;
  materialsDepot: MaterialsDepot;
  materialsDepotId?: Maybe<ReferenceId>;
  name?: Maybe<Scalars['String']['output']>;
  phase: BuildingComponentPhase;
  potentialInterests?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Scalars['Float']['output']>;
  quantityExact?: Maybe<Scalars['Boolean']['output']>;
  quantityNotes?: Maybe<Scalars['String']['output']>;
  quantitySpare?: Maybe<Scalars['Float']['output']>;
  quantityUnit?: Maybe<QuantityUnit>;
  reusePotential?: Maybe<ReusePotential>;
  reusePotentialConclusion?: Maybe<Scalars['String']['output']>;
  reusePotentialNotes?: Maybe<Scalars['String']['output']>;
  reuseValueDescription?: Maybe<Scalars['String']['output']>;
  reuseValuePerUnit?: Maybe<Scalars['Float']['output']>;
  reuseValueTotal?: Maybe<Scalars['Float']['output']>;
  ru1Explanation?: Maybe<Scalars['String']['output']>;
  ru1PerUnit?: Maybe<Scalars['Float']['output']>;
  ru1Total?: Maybe<Scalars['Float']['output']>;
  ru2Explanation?: Maybe<Scalars['String']['output']>;
  ru2PerUnit?: Maybe<Scalars['Float']['output']>;
  ru2Total?: Maybe<Scalars['Float']['output']>;
  ru3Explanation?: Maybe<Scalars['String']['output']>;
  ru3PerUnit?: Maybe<Scalars['Float']['output']>;
  ru3Total?: Maybe<Scalars['Float']['output']>;
  ruPerUnitSum?: Maybe<Scalars['Float']['output']>;
  ruTotalSum?: Maybe<Scalars['Float']['output']>;
  searchRequestInterests: Array<SearchRequestInterest>;
  showInMatching: Scalars['Boolean']['output'];
  sparePartsNotes?: Maybe<Scalars['String']['output']>;
  state: BuildingComponentState;
  storageLocation?: Maybe<StorageLocation>;
  storageLocationId?: Maybe<ReferenceId>;
  storageLocationNotes?: Maybe<Scalars['String']['output']>;
  transportDistanceInKm?: Maybe<Scalars['Float']['output']>;
  transportVehicleName?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  warrantyDetails?: Maybe<Scalars['String']['output']>;
};

export type BuildingComponentAssetReference = {
  __typename?: 'BuildingComponentAssetReference';
  asset: AppAsset;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  tags?: Maybe<Array<Scalars['String']['output']>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type BuildingComponentAssetReferenceCreateNestedManyWithoutBuildingComponentInput = {
  connect?: InputMaybe<Array<ConnectRelationInput>>;
  create?: InputMaybe<Array<BuildingComponentAssetReferenceCreateWithoutBuildingComponentInput>>;
  disconnect?: InputMaybe<Array<EntityIdInput>>;
  update?: InputMaybe<Array<BuildingComponentAssetReferenceUpdateWithWhereUniqueWithoutBuildingComponentInput>>;
};

export type BuildingComponentAssetReferenceCreateWithoutBuildingComponentInput = {
  asset?: InputMaybe<AppAssetCreateNestedOneWithoutBuildingComponentAssetReferenceInput>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type BuildingComponentAssetReferenceOrderByInput = {
  asset?: InputMaybe<AppAssetOrderByInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  tags?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type BuildingComponentAssetReferenceUpdateInput = {
  asset?: InputMaybe<AppAssetUpdateNestedOneWithoutBuildingComponentAssetReferenceInput>;
  tags?: InputMaybe<StringArrayInput>;
};

export type BuildingComponentAssetReferenceUpdateWithWhereUniqueWithoutBuildingComponentInput = {
  data?: InputMaybe<BuildingComponentAssetReferenceUpdateInput>;
  where: EntityIdInput;
};

export type BuildingComponentAssetReferenceWhereInput = {
  AND?: InputMaybe<Array<BuildingComponentAssetReferenceWhereInput>>;
  NOT?: InputMaybe<Array<BuildingComponentAssetReferenceWhereInput>>;
  OR?: InputMaybe<Array<BuildingComponentAssetReferenceWhereInput>>;
  asset?: InputMaybe<AppAssetOneRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  tags?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type BuildingComponentCreateInput = {
  assets?: InputMaybe<BuildingComponentAssetReferenceCreateNestedManyWithoutBuildingComponentInput>;
  assignedTo?: InputMaybe<AssignedBuildingComponentCreateNestedOneWithoutBuildingComponentInput>;
  category?: InputMaybe<CategoryCreateNestedOneWithoutBuildingComponentInput>;
  co2QuantityUsed?: InputMaybe<Scalars['Float']['input']>;
  co2Savings?: InputMaybe<Scalars['Float']['input']>;
  co2SavingsExact?: InputMaybe<Scalars['Boolean']['input']>;
  co2SavingsPerUnit?: InputMaybe<Scalars['Float']['input']>;
  co2SavingsTotal?: InputMaybe<Scalars['Float']['input']>;
  co2Unit?: InputMaybe<QuantityUnit>;
  condition?: InputMaybe<Condition>;
  constructionYear?: InputMaybe<Scalars['Float']['input']>;
  constructionYearExact?: InputMaybe<Scalars['Boolean']['input']>;
  constructionYearNotes?: InputMaybe<Scalars['String']['input']>;
  contacts?: InputMaybe<ContactCreateNestedManyWithoutBuildingComponentInput>;
  demolitionPhase?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  dimensions?: InputMaybe<DimensionCreateNestedManyWithoutBuildingComponentInput>;
  dimensionsNotes?: InputMaybe<Scalars['String']['input']>;
  ebkphCategory?: InputMaybe<EbkphCategoryCreateNestedOneWithoutBuildingComponentInput>;
  fallbackLevel?: InputMaybe<Scalars['String']['input']>;
  fallbackLevelCO2PerUnit?: InputMaybe<Scalars['Float']['input']>;
  fallbackLevelCO2Total?: InputMaybe<Scalars['Float']['input']>;
  harmfulSubstances?: InputMaybe<HarmfulSubstances>;
  locationInBuilding?: InputMaybe<Scalars['String']['input']>;
  locationInBuildingDetail?: InputMaybe<Scalars['String']['input']>;
  mainImage?: InputMaybe<AppAssetCreateNestedOneWithoutBuildingComponentInput>;
  materialsDepot?: InputMaybe<MaterialsDepotCreateNestedOneWithoutBuildingComponentInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  phase?: InputMaybe<BuildingComponentPhase>;
  potentialInterests?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Float']['input']>;
  quantityExact?: InputMaybe<Scalars['Boolean']['input']>;
  quantityNotes?: InputMaybe<Scalars['String']['input']>;
  quantitySpare?: InputMaybe<Scalars['Float']['input']>;
  quantityUnit?: InputMaybe<QuantityUnit>;
  reusePotential?: InputMaybe<ReusePotential>;
  reusePotentialConclusion?: InputMaybe<Scalars['String']['input']>;
  reusePotentialNotes?: InputMaybe<Scalars['String']['input']>;
  reuseValueDescription?: InputMaybe<Scalars['String']['input']>;
  reuseValuePerUnit?: InputMaybe<Scalars['Float']['input']>;
  reuseValueTotal?: InputMaybe<Scalars['Float']['input']>;
  ru1Explanation?: InputMaybe<Scalars['String']['input']>;
  ru1PerUnit?: InputMaybe<Scalars['Float']['input']>;
  ru1Total?: InputMaybe<Scalars['Float']['input']>;
  ru2Explanation?: InputMaybe<Scalars['String']['input']>;
  ru2PerUnit?: InputMaybe<Scalars['Float']['input']>;
  ru2Total?: InputMaybe<Scalars['Float']['input']>;
  ru3Explanation?: InputMaybe<Scalars['String']['input']>;
  ru3PerUnit?: InputMaybe<Scalars['Float']['input']>;
  ru3Total?: InputMaybe<Scalars['Float']['input']>;
  ruPerUnitSum?: InputMaybe<Scalars['Float']['input']>;
  ruTotalSum?: InputMaybe<Scalars['Float']['input']>;
  searchRequestInterests?: InputMaybe<SearchRequestInterestCreateNestedManyWithoutBuildingComponentInput>;
  showInMatching?: InputMaybe<Scalars['Boolean']['input']>;
  sparePartsNotes?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<BuildingComponentState>;
  storageLocation?: InputMaybe<StorageLocationCreateNestedOneWithoutBuildingComponentInput>;
  storageLocationNotes?: InputMaybe<Scalars['String']['input']>;
  transportDistanceInKm?: InputMaybe<Scalars['Float']['input']>;
  transportVehicleName?: InputMaybe<Scalars['String']['input']>;
  warrantyDetails?: InputMaybe<Scalars['String']['input']>;
};

export type BuildingComponentCreateNestedManyWithoutMaterialsDepotInput = {
  connect?: InputMaybe<Array<ConnectRelationInput>>;
  create?: InputMaybe<Array<BuildingComponentCreateWithoutMaterialsDepotInput>>;
  disconnect?: InputMaybe<Array<EntityIdInput>>;
  update?: InputMaybe<Array<BuildingComponentUpdateWithWhereUniqueWithoutMaterialsDepotInput>>;
};

export type BuildingComponentCreateNestedManyWithoutStorageLocationInput = {
  connect?: InputMaybe<Array<ConnectRelationInput>>;
  disconnect?: InputMaybe<Array<EntityIdInput>>;
};

export type BuildingComponentCreateNestedOneWithoutSearchRequestInterestInput = {
  connect?: InputMaybe<ConnectRelationInput>;
};

export type BuildingComponentCreateWithoutMaterialsDepotInput = {
  assets?: InputMaybe<BuildingComponentAssetReferenceCreateNestedManyWithoutBuildingComponentInput>;
  assignedTo?: InputMaybe<AssignedBuildingComponentCreateNestedOneWithoutBuildingComponentInput>;
  category?: InputMaybe<CategoryCreateNestedOneWithoutBuildingComponentInput>;
  co2QuantityUsed?: InputMaybe<Scalars['Float']['input']>;
  co2Savings?: InputMaybe<Scalars['Float']['input']>;
  co2SavingsExact?: InputMaybe<Scalars['Boolean']['input']>;
  co2SavingsPerUnit?: InputMaybe<Scalars['Float']['input']>;
  co2SavingsTotal?: InputMaybe<Scalars['Float']['input']>;
  co2Unit?: InputMaybe<QuantityUnit>;
  condition?: InputMaybe<Condition>;
  constructionYear?: InputMaybe<Scalars['Float']['input']>;
  constructionYearExact?: InputMaybe<Scalars['Boolean']['input']>;
  constructionYearNotes?: InputMaybe<Scalars['String']['input']>;
  contacts?: InputMaybe<ContactCreateNestedManyWithoutBuildingComponentInput>;
  demolitionPhase?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  dimensions?: InputMaybe<DimensionCreateNestedManyWithoutBuildingComponentInput>;
  dimensionsNotes?: InputMaybe<Scalars['String']['input']>;
  ebkphCategory?: InputMaybe<EbkphCategoryCreateNestedOneWithoutBuildingComponentInput>;
  fallbackLevel?: InputMaybe<Scalars['String']['input']>;
  fallbackLevelCO2PerUnit?: InputMaybe<Scalars['Float']['input']>;
  fallbackLevelCO2Total?: InputMaybe<Scalars['Float']['input']>;
  harmfulSubstances?: InputMaybe<HarmfulSubstances>;
  locationInBuilding?: InputMaybe<Scalars['String']['input']>;
  locationInBuildingDetail?: InputMaybe<Scalars['String']['input']>;
  mainImage?: InputMaybe<AppAssetCreateNestedOneWithoutBuildingComponentInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  phase?: InputMaybe<BuildingComponentPhase>;
  potentialInterests?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Float']['input']>;
  quantityExact?: InputMaybe<Scalars['Boolean']['input']>;
  quantityNotes?: InputMaybe<Scalars['String']['input']>;
  quantitySpare?: InputMaybe<Scalars['Float']['input']>;
  quantityUnit?: InputMaybe<QuantityUnit>;
  reusePotential?: InputMaybe<ReusePotential>;
  reusePotentialConclusion?: InputMaybe<Scalars['String']['input']>;
  reusePotentialNotes?: InputMaybe<Scalars['String']['input']>;
  reuseValueDescription?: InputMaybe<Scalars['String']['input']>;
  reuseValuePerUnit?: InputMaybe<Scalars['Float']['input']>;
  reuseValueTotal?: InputMaybe<Scalars['Float']['input']>;
  ru1Explanation?: InputMaybe<Scalars['String']['input']>;
  ru1PerUnit?: InputMaybe<Scalars['Float']['input']>;
  ru1Total?: InputMaybe<Scalars['Float']['input']>;
  ru2Explanation?: InputMaybe<Scalars['String']['input']>;
  ru2PerUnit?: InputMaybe<Scalars['Float']['input']>;
  ru2Total?: InputMaybe<Scalars['Float']['input']>;
  ru3Explanation?: InputMaybe<Scalars['String']['input']>;
  ru3PerUnit?: InputMaybe<Scalars['Float']['input']>;
  ru3Total?: InputMaybe<Scalars['Float']['input']>;
  ruPerUnitSum?: InputMaybe<Scalars['Float']['input']>;
  ruTotalSum?: InputMaybe<Scalars['Float']['input']>;
  searchRequestInterests?: InputMaybe<SearchRequestInterestCreateNestedManyWithoutBuildingComponentInput>;
  showInMatching?: InputMaybe<Scalars['Boolean']['input']>;
  sparePartsNotes?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<BuildingComponentState>;
  storageLocation?: InputMaybe<StorageLocationCreateNestedOneWithoutBuildingComponentInput>;
  storageLocationNotes?: InputMaybe<Scalars['String']['input']>;
  transportDistanceInKm?: InputMaybe<Scalars['Float']['input']>;
  transportVehicleName?: InputMaybe<Scalars['String']['input']>;
  warrantyDetails?: InputMaybe<Scalars['String']['input']>;
};

export type BuildingComponentOneRelationFilter = {
  AND?: InputMaybe<BuildingComponentWhereInput>;
  NOT?: InputMaybe<BuildingComponentWhereInput>;
  OR?: InputMaybe<BuildingComponentWhereInput>;
  assets?: InputMaybe<BuildingComponentAssetReferenceWhereInput>;
  category?: InputMaybe<CategoryOneRelationFilter>;
  co2QuantityUsed?: InputMaybe<IntFilter>;
  co2Savings?: InputMaybe<IntFilter>;
  co2SavingsExact?: InputMaybe<BoolFilter>;
  co2SavingsPerUnit?: InputMaybe<IntFilter>;
  co2SavingsTotal?: InputMaybe<IntFilter>;
  co2Unit?: InputMaybe<QuantityUnitEnumFilter>;
  componentId?: InputMaybe<StringFilter>;
  componentSn?: InputMaybe<IntFilter>;
  condition?: InputMaybe<ConditionEnumFilter>;
  constructionYear?: InputMaybe<IntFilter>;
  constructionYearExact?: InputMaybe<BoolFilter>;
  constructionYearNotes?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  demolitionPhase?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  dimensions?: InputMaybe<DimensionWhereInput>;
  dimensionsNotes?: InputMaybe<StringFilter>;
  ebkphCategory?: InputMaybe<EbkphCategoryOneRelationFilter>;
  fallbackLevel?: InputMaybe<StringFilter>;
  fallbackLevelCO2PerUnit?: InputMaybe<IntFilter>;
  fallbackLevelCO2Total?: InputMaybe<IntFilter>;
  harmfulSubstances?: InputMaybe<HarmfulSubstancesEnumFilter>;
  id?: InputMaybe<StringFilter>;
  locationInBuilding?: InputMaybe<StringFilter>;
  locationInBuildingDetail?: InputMaybe<StringFilter>;
  mainImage?: InputMaybe<AppAssetOneRelationFilter>;
  materialsDepot?: InputMaybe<MaterialsDepotOneRelationFilter>;
  name?: InputMaybe<StringFilter>;
  phase?: InputMaybe<BuildingComponentPhaseEnumFilter>;
  potentialInterests?: InputMaybe<StringFilter>;
  quantity?: InputMaybe<IntFilter>;
  quantityExact?: InputMaybe<BoolFilter>;
  quantityNotes?: InputMaybe<StringFilter>;
  quantitySpare?: InputMaybe<IntFilter>;
  quantityUnit?: InputMaybe<QuantityUnitEnumFilter>;
  reusePotential?: InputMaybe<ReusePotentialEnumFilter>;
  reusePotentialConclusion?: InputMaybe<StringFilter>;
  reusePotentialNotes?: InputMaybe<StringFilter>;
  reuseValueDescription?: InputMaybe<StringFilter>;
  reuseValuePerUnit?: InputMaybe<IntFilter>;
  reuseValueTotal?: InputMaybe<IntFilter>;
  ru1Explanation?: InputMaybe<StringFilter>;
  ru1PerUnit?: InputMaybe<IntFilter>;
  ru1Total?: InputMaybe<IntFilter>;
  ru2Explanation?: InputMaybe<StringFilter>;
  ru2PerUnit?: InputMaybe<IntFilter>;
  ru2Total?: InputMaybe<IntFilter>;
  ru3Explanation?: InputMaybe<StringFilter>;
  ru3PerUnit?: InputMaybe<IntFilter>;
  ru3Total?: InputMaybe<IntFilter>;
  ruPerUnitSum?: InputMaybe<IntFilter>;
  ruTotalSum?: InputMaybe<IntFilter>;
  showInMatching?: InputMaybe<BoolFilter>;
  sparePartsNotes?: InputMaybe<StringFilter>;
  state?: InputMaybe<BuildingComponentStateEnumFilter>;
  storageLocation?: InputMaybe<StorageLocationOneRelationFilter>;
  storageLocationNotes?: InputMaybe<StringFilter>;
  transportDistanceInKm?: InputMaybe<IntFilter>;
  transportVehicleName?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  warrantyDetails?: InputMaybe<StringFilter>;
};

export type BuildingComponentOrderByInput = {
  assets?: InputMaybe<BuildingComponentAssetReferenceOrderByInput>;
  assignedTo?: InputMaybe<AssignedBuildingComponentOrderByInput>;
  category?: InputMaybe<CategoryOrderByInput>;
  co2QuantityUsed?: InputMaybe<SortOrder>;
  co2Savings?: InputMaybe<SortOrder>;
  co2SavingsExact?: InputMaybe<SortOrder>;
  co2SavingsPerUnit?: InputMaybe<SortOrder>;
  co2SavingsTotal?: InputMaybe<SortOrder>;
  co2Unit?: InputMaybe<SortOrder>;
  componentId?: InputMaybe<SortOrder>;
  componentSn?: InputMaybe<SortOrder>;
  condition?: InputMaybe<SortOrder>;
  constructionYear?: InputMaybe<SortOrder>;
  constructionYearExact?: InputMaybe<SortOrder>;
  constructionYearNotes?: InputMaybe<SortOrder>;
  contacts?: InputMaybe<ContactOrderByInput>;
  createdAt?: InputMaybe<SortOrder>;
  demolitionPhase?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  dimensions?: InputMaybe<DimensionOrderByInput>;
  dimensionsNotes?: InputMaybe<SortOrder>;
  ebkphCategory?: InputMaybe<EbkphCategoryOrderByInput>;
  fallbackLevel?: InputMaybe<SortOrder>;
  fallbackLevelCO2PerUnit?: InputMaybe<SortOrder>;
  fallbackLevelCO2Total?: InputMaybe<SortOrder>;
  harmfulSubstances?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  locationInBuilding?: InputMaybe<SortOrder>;
  locationInBuildingDetail?: InputMaybe<SortOrder>;
  mainImage?: InputMaybe<AppAssetOrderByInput>;
  materialsDepot?: InputMaybe<MaterialsDepotOrderByInput>;
  name?: InputMaybe<SortOrder>;
  phase?: InputMaybe<SortOrder>;
  potentialInterests?: InputMaybe<SortOrder>;
  quantity?: InputMaybe<SortOrder>;
  quantityExact?: InputMaybe<SortOrder>;
  quantityNotes?: InputMaybe<SortOrder>;
  quantitySpare?: InputMaybe<SortOrder>;
  quantityUnit?: InputMaybe<SortOrder>;
  reusePotential?: InputMaybe<SortOrder>;
  reusePotentialConclusion?: InputMaybe<SortOrder>;
  reusePotentialNotes?: InputMaybe<SortOrder>;
  reuseValueDescription?: InputMaybe<SortOrder>;
  reuseValuePerUnit?: InputMaybe<SortOrder>;
  reuseValueTotal?: InputMaybe<SortOrder>;
  ru1Explanation?: InputMaybe<SortOrder>;
  ru1PerUnit?: InputMaybe<SortOrder>;
  ru1Total?: InputMaybe<SortOrder>;
  ru2Explanation?: InputMaybe<SortOrder>;
  ru2PerUnit?: InputMaybe<SortOrder>;
  ru2Total?: InputMaybe<SortOrder>;
  ru3Explanation?: InputMaybe<SortOrder>;
  ru3PerUnit?: InputMaybe<SortOrder>;
  ru3Total?: InputMaybe<SortOrder>;
  ruPerUnitSum?: InputMaybe<SortOrder>;
  ruTotalSum?: InputMaybe<SortOrder>;
  searchRequestInterests?: InputMaybe<SearchRequestInterestOrderByInput>;
  showInMatching?: InputMaybe<SortOrder>;
  sparePartsNotes?: InputMaybe<SortOrder>;
  state?: InputMaybe<SortOrder>;
  storageLocation?: InputMaybe<StorageLocationOrderByInput>;
  storageLocationNotes?: InputMaybe<SortOrder>;
  transportDistanceInKm?: InputMaybe<SortOrder>;
  transportVehicleName?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  warrantyDetails?: InputMaybe<SortOrder>;
};

export enum BuildingComponentPhase {
  Clarification = 'clarification',
  Disassembly = 'disassembly',
  Inventory = 'inventory',
  Meditation = 'meditation',
  Release = 'release',
  Reused = 'reused',
  Stored = 'stored'
}

export type BuildingComponentPhaseEnumFilter = {
  contains?: InputMaybe<BuildingComponentPhase>;
  equals?: InputMaybe<BuildingComponentPhase>;
  fulltext?: InputMaybe<BuildingComponentPhase>;
  gt?: InputMaybe<BuildingComponentPhase>;
  gte?: InputMaybe<BuildingComponentPhase>;
  in?: InputMaybe<Array<BuildingComponentPhase>>;
  lt?: InputMaybe<BuildingComponentPhase>;
  lte?: InputMaybe<BuildingComponentPhase>;
  mode?: InputMaybe<SringQueryMode>;
  nin?: InputMaybe<Array<BuildingComponentPhase>>;
};

export type BuildingComponentPhaseEnumInput = {
  set?: InputMaybe<BuildingComponentPhase>;
};

export enum BuildingComponentState {
  Active = 'active',
  Closed = 'closed',
  Draft = 'draft'
}

export type BuildingComponentStateEnumFilter = {
  contains?: InputMaybe<BuildingComponentState>;
  equals?: InputMaybe<BuildingComponentState>;
  fulltext?: InputMaybe<BuildingComponentState>;
  gt?: InputMaybe<BuildingComponentState>;
  gte?: InputMaybe<BuildingComponentState>;
  in?: InputMaybe<Array<BuildingComponentState>>;
  lt?: InputMaybe<BuildingComponentState>;
  lte?: InputMaybe<BuildingComponentState>;
  mode?: InputMaybe<SringQueryMode>;
  nin?: InputMaybe<Array<BuildingComponentState>>;
};

export type BuildingComponentStateEnumInput = {
  set?: InputMaybe<BuildingComponentState>;
};

export type BuildingComponentUpdateInput = {
  assets?: InputMaybe<BuildingComponentAssetReferenceCreateNestedManyWithoutBuildingComponentInput>;
  assignedTo?: InputMaybe<AssignedBuildingComponentUpdateNestedOneWithoutBuildingComponentInput>;
  category?: InputMaybe<CategoryUpdateNestedOneWithoutBuildingComponentInput>;
  co2QuantityUsed?: InputMaybe<NumberInput>;
  co2Savings?: InputMaybe<NumberInput>;
  co2SavingsExact?: InputMaybe<BooleanInput>;
  co2SavingsPerUnit?: InputMaybe<NumberInput>;
  co2SavingsTotal?: InputMaybe<NumberInput>;
  co2Unit?: InputMaybe<QuantityUnitEnumInput>;
  condition?: InputMaybe<ConditionEnumInput>;
  constructionYear?: InputMaybe<NumberInput>;
  constructionYearExact?: InputMaybe<BooleanInput>;
  constructionYearNotes?: InputMaybe<StringInput>;
  contacts?: InputMaybe<ContactCreateNestedManyWithoutBuildingComponentInput>;
  demolitionPhase?: InputMaybe<StringInput>;
  description?: InputMaybe<StringInput>;
  dimensions?: InputMaybe<DimensionCreateNestedManyWithoutBuildingComponentInput>;
  dimensionsNotes?: InputMaybe<StringInput>;
  ebkphCategory?: InputMaybe<EbkphCategoryUpdateNestedOneWithoutBuildingComponentInput>;
  fallbackLevel?: InputMaybe<StringInput>;
  fallbackLevelCO2PerUnit?: InputMaybe<NumberInput>;
  fallbackLevelCO2Total?: InputMaybe<NumberInput>;
  harmfulSubstances?: InputMaybe<HarmfulSubstancesEnumInput>;
  locationInBuilding?: InputMaybe<StringInput>;
  locationInBuildingDetail?: InputMaybe<StringInput>;
  mainImage?: InputMaybe<AppAssetUpdateNestedOneWithoutBuildingComponentInput>;
  materialsDepot?: InputMaybe<MaterialsDepotUpdateNestedOneWithoutBuildingComponentInput>;
  name?: InputMaybe<StringInput>;
  phase?: InputMaybe<BuildingComponentPhaseEnumInput>;
  potentialInterests?: InputMaybe<StringInput>;
  quantity?: InputMaybe<NumberInput>;
  quantityExact?: InputMaybe<BooleanInput>;
  quantityNotes?: InputMaybe<StringInput>;
  quantitySpare?: InputMaybe<NumberInput>;
  quantityUnit?: InputMaybe<QuantityUnitEnumInput>;
  reusePotential?: InputMaybe<ReusePotentialEnumInput>;
  reusePotentialConclusion?: InputMaybe<StringInput>;
  reusePotentialNotes?: InputMaybe<StringInput>;
  reuseValueDescription?: InputMaybe<StringInput>;
  reuseValuePerUnit?: InputMaybe<NumberInput>;
  reuseValueTotal?: InputMaybe<NumberInput>;
  ru1Explanation?: InputMaybe<StringInput>;
  ru1PerUnit?: InputMaybe<NumberInput>;
  ru1Total?: InputMaybe<NumberInput>;
  ru2Explanation?: InputMaybe<StringInput>;
  ru2PerUnit?: InputMaybe<NumberInput>;
  ru2Total?: InputMaybe<NumberInput>;
  ru3Explanation?: InputMaybe<StringInput>;
  ru3PerUnit?: InputMaybe<NumberInput>;
  ru3Total?: InputMaybe<NumberInput>;
  ruPerUnitSum?: InputMaybe<NumberInput>;
  ruTotalSum?: InputMaybe<NumberInput>;
  searchRequestInterests?: InputMaybe<SearchRequestInterestCreateNestedManyWithoutBuildingComponentInput>;
  showInMatching?: InputMaybe<BooleanInput>;
  sparePartsNotes?: InputMaybe<StringInput>;
  state?: InputMaybe<BuildingComponentStateEnumInput>;
  storageLocation?: InputMaybe<StorageLocationUpdateNestedOneWithoutBuildingComponentInput>;
  storageLocationNotes?: InputMaybe<StringInput>;
  transportDistanceInKm?: InputMaybe<NumberInput>;
  transportVehicleName?: InputMaybe<StringInput>;
  warrantyDetails?: InputMaybe<StringInput>;
};

export type BuildingComponentUpdateNestedOneWithoutSearchRequestInterestInput = {
  connect?: InputMaybe<ConnectRelationInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type BuildingComponentUpdateWithWhereUniqueWithoutMaterialsDepotInput = {
  data?: InputMaybe<BuildingComponentUpdateInput>;
  where: EntityIdInput;
};

export type BuildingComponentWhereInput = {
  AND?: InputMaybe<Array<BuildingComponentWhereInput>>;
  NOT?: InputMaybe<Array<BuildingComponentWhereInput>>;
  OR?: InputMaybe<Array<BuildingComponentWhereInput>>;
  assets?: InputMaybe<BuildingComponentAssetReferenceWhereInput>;
  assignedTo?: InputMaybe<AssignedBuildingComponentOneRelationFilter>;
  category?: InputMaybe<CategoryOneRelationFilter>;
  co2QuantityUsed?: InputMaybe<IntFilter>;
  co2Savings?: InputMaybe<IntFilter>;
  co2SavingsExact?: InputMaybe<BoolFilter>;
  co2SavingsPerUnit?: InputMaybe<IntFilter>;
  co2SavingsTotal?: InputMaybe<IntFilter>;
  co2Unit?: InputMaybe<QuantityUnitEnumFilter>;
  componentId?: InputMaybe<StringFilter>;
  componentSn?: InputMaybe<IntFilter>;
  condition?: InputMaybe<ConditionEnumFilter>;
  constructionYear?: InputMaybe<IntFilter>;
  constructionYearExact?: InputMaybe<BoolFilter>;
  constructionYearNotes?: InputMaybe<StringFilter>;
  contacts?: InputMaybe<ContactWhereInput>;
  createdAt?: InputMaybe<DateTimeFilter>;
  demolitionPhase?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  dimensions?: InputMaybe<DimensionWhereInput>;
  dimensionsNotes?: InputMaybe<StringFilter>;
  ebkphCategory?: InputMaybe<EbkphCategoryOneRelationFilter>;
  fallbackLevel?: InputMaybe<StringFilter>;
  fallbackLevelCO2PerUnit?: InputMaybe<IntFilter>;
  fallbackLevelCO2Total?: InputMaybe<IntFilter>;
  harmfulSubstances?: InputMaybe<HarmfulSubstancesEnumFilter>;
  id?: InputMaybe<StringFilter>;
  locationInBuilding?: InputMaybe<StringFilter>;
  locationInBuildingDetail?: InputMaybe<StringFilter>;
  mainImage?: InputMaybe<AppAssetOneRelationFilter>;
  materialsDepot?: InputMaybe<MaterialsDepotOneRelationFilter>;
  name?: InputMaybe<StringFilter>;
  phase?: InputMaybe<BuildingComponentPhaseEnumFilter>;
  potentialInterests?: InputMaybe<StringFilter>;
  quantity?: InputMaybe<IntFilter>;
  quantityExact?: InputMaybe<BoolFilter>;
  quantityNotes?: InputMaybe<StringFilter>;
  quantitySpare?: InputMaybe<IntFilter>;
  quantityUnit?: InputMaybe<QuantityUnitEnumFilter>;
  reusePotential?: InputMaybe<ReusePotentialEnumFilter>;
  reusePotentialConclusion?: InputMaybe<StringFilter>;
  reusePotentialNotes?: InputMaybe<StringFilter>;
  reuseValueDescription?: InputMaybe<StringFilter>;
  reuseValuePerUnit?: InputMaybe<IntFilter>;
  reuseValueTotal?: InputMaybe<IntFilter>;
  ru1Explanation?: InputMaybe<StringFilter>;
  ru1PerUnit?: InputMaybe<IntFilter>;
  ru1Total?: InputMaybe<IntFilter>;
  ru2Explanation?: InputMaybe<StringFilter>;
  ru2PerUnit?: InputMaybe<IntFilter>;
  ru2Total?: InputMaybe<IntFilter>;
  ru3Explanation?: InputMaybe<StringFilter>;
  ru3PerUnit?: InputMaybe<IntFilter>;
  ru3Total?: InputMaybe<IntFilter>;
  ruPerUnitSum?: InputMaybe<IntFilter>;
  ruTotalSum?: InputMaybe<IntFilter>;
  searchRequestInterests?: InputMaybe<SearchRequestInterestWhereInput>;
  showInMatching?: InputMaybe<BoolFilter>;
  sparePartsNotes?: InputMaybe<StringFilter>;
  state?: InputMaybe<BuildingComponentStateEnumFilter>;
  storageLocation?: InputMaybe<StorageLocationOneRelationFilter>;
  storageLocationNotes?: InputMaybe<StringFilter>;
  transportDistanceInKm?: InputMaybe<IntFilter>;
  transportVehicleName?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  warrantyDetails?: InputMaybe<StringFilter>;
};

export type Canton = {
  __typename?: 'Canton';
  name: Scalars['String']['output'];
};

export type CantonByPostalCodeAndCityInput = {
  postalCode: Scalars['String']['input'];
};

export type CantonOrderByInput = {
  name?: InputMaybe<SortOrder>;
};

export type CantonWhereInput = {
  AND?: InputMaybe<Array<CantonWhereInput>>;
  NOT?: InputMaybe<Array<CantonWhereInput>>;
  OR?: InputMaybe<Array<CantonWhereInput>>;
  name?: InputMaybe<StringFilter>;
};

export type Category = {
  __typename?: 'Category';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  parent?: Maybe<Category>;
  sortOrder?: Maybe<Scalars['Float']['output']>;
};

export type CategoryCreateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<CategoryCreateNestedOneWithoutCategoryInput>;
  sortOrder?: InputMaybe<Scalars['Float']['input']>;
};

export type CategoryCreateNestedOneWithoutBuildingComponentInput = {
  connect?: InputMaybe<ConnectRelationInput>;
};

export type CategoryCreateNestedOneWithoutCategoryInput = {
  connect?: InputMaybe<ConnectRelationInput>;
};

export type CategoryCreateNestedOneWithoutSearchRequestInput = {
  connect?: InputMaybe<ConnectRelationInput>;
};

export type CategoryOneRelationFilter = {
  AND?: InputMaybe<CategoryWhereInput>;
  NOT?: InputMaybe<CategoryWhereInput>;
  OR?: InputMaybe<CategoryWhereInput>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  parent?: InputMaybe<CategoryOneRelationFilter>;
  sortOrder?: InputMaybe<IntFilter>;
};

export type CategoryOrderByInput = {
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  parent?: InputMaybe<CategoryOrderByInput>;
  sortOrder?: InputMaybe<SortOrder>;
};

export type CategoryUpdateInput = {
  description?: InputMaybe<StringInput>;
  name?: InputMaybe<StringInput>;
  parent?: InputMaybe<CategoryUpdateNestedOneWithoutCategoryInput>;
  sortOrder?: InputMaybe<NumberInput>;
};

export type CategoryUpdateNestedOneWithoutBuildingComponentInput = {
  connect?: InputMaybe<ConnectRelationInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CategoryUpdateNestedOneWithoutCategoryInput = {
  connect?: InputMaybe<ConnectRelationInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CategoryUpdateNestedOneWithoutSearchRequestInput = {
  connect?: InputMaybe<ConnectRelationInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CategoryWhereInput = {
  AND?: InputMaybe<Array<CategoryWhereInput>>;
  NOT?: InputMaybe<Array<CategoryWhereInput>>;
  OR?: InputMaybe<Array<CategoryWhereInput>>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  parent?: InputMaybe<CategoryOneRelationFilter>;
  sortOrder?: InputMaybe<IntFilter>;
};

export enum Condition {
  Bad = 'bad',
  Fair = 'fair',
  Good = 'good',
  Unknown = 'unknown'
}

export type ConditionEnumFilter = {
  contains?: InputMaybe<Condition>;
  equals?: InputMaybe<Condition>;
  fulltext?: InputMaybe<Condition>;
  gt?: InputMaybe<Condition>;
  gte?: InputMaybe<Condition>;
  in?: InputMaybe<Array<Condition>>;
  lt?: InputMaybe<Condition>;
  lte?: InputMaybe<Condition>;
  mode?: InputMaybe<SringQueryMode>;
  nin?: InputMaybe<Array<Condition>>;
};

export type ConditionEnumInput = {
  set?: InputMaybe<Condition>;
};

export type ConnectRelationInput = {
  id: Scalars['String']['input'];
};

export type Contact = {
  __typename?: 'Contact';
  canton?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  contact1?: Maybe<Scalars['String']['output']>;
  contact2?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  firstLine?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ContactCreateNestedManyWithoutBuildingComponentInput = {
  connect?: InputMaybe<Array<ConnectRelationInput>>;
  create?: InputMaybe<Array<ContactCreateWithoutBuildingComponentInput>>;
  disconnect?: InputMaybe<Array<EntityIdInput>>;
  update?: InputMaybe<Array<ContactUpdateWithWhereUniqueWithoutBuildingComponentInput>>;
};

export type ContactCreateNestedManyWithoutMaterialsDepotInput = {
  connect?: InputMaybe<Array<ConnectRelationInput>>;
  create?: InputMaybe<Array<ContactCreateWithoutMaterialsDepotInput>>;
  disconnect?: InputMaybe<Array<EntityIdInput>>;
  update?: InputMaybe<Array<ContactUpdateWithWhereUniqueWithoutMaterialsDepotInput>>;
};

export type ContactCreateNestedManyWithoutProjectInput = {
  connect?: InputMaybe<Array<ConnectRelationInput>>;
  create?: InputMaybe<Array<ContactCreateWithoutProjectInput>>;
  disconnect?: InputMaybe<Array<EntityIdInput>>;
  update?: InputMaybe<Array<ContactUpdateWithWhereUniqueWithoutProjectInput>>;
};

export type ContactCreateNestedManyWithoutStorageLocationInput = {
  connect?: InputMaybe<Array<ConnectRelationInput>>;
  create?: InputMaybe<Array<ContactCreateWithoutStorageLocationInput>>;
  disconnect?: InputMaybe<Array<EntityIdInput>>;
  update?: InputMaybe<Array<ContactUpdateWithWhereUniqueWithoutStorageLocationInput>>;
};

export type ContactCreateWithoutBuildingComponentInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  contact1?: InputMaybe<Scalars['String']['input']>;
  contact2?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  firstLine?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type ContactCreateWithoutMaterialsDepotInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  contact1?: InputMaybe<Scalars['String']['input']>;
  contact2?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  firstLine?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type ContactCreateWithoutProjectInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  contact1?: InputMaybe<Scalars['String']['input']>;
  contact2?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  firstLine?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type ContactCreateWithoutStorageLocationInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  contact1?: InputMaybe<Scalars['String']['input']>;
  contact2?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  firstLine?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type ContactOrderByInput = {
  canton?: InputMaybe<SortOrder>;
  city?: InputMaybe<SortOrder>;
  contact1?: InputMaybe<SortOrder>;
  contact2?: InputMaybe<SortOrder>;
  country?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  firstLine?: InputMaybe<SortOrder>;
  firstName?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  lastName?: InputMaybe<SortOrder>;
  notes?: InputMaybe<SortOrder>;
  postalCode?: InputMaybe<SortOrder>;
  street?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ContactUpdateInput = {
  city?: InputMaybe<StringInput>;
  contact1?: InputMaybe<StringInput>;
  contact2?: InputMaybe<StringInput>;
  country?: InputMaybe<StringInput>;
  firstLine?: InputMaybe<StringInput>;
  firstName?: InputMaybe<StringInput>;
  lastName?: InputMaybe<StringInput>;
  notes?: InputMaybe<StringInput>;
  postalCode?: InputMaybe<StringInput>;
  street?: InputMaybe<StringInput>;
  type?: InputMaybe<StringInput>;
};

export type ContactUpdateWithWhereUniqueWithoutBuildingComponentInput = {
  data?: InputMaybe<ContactUpdateInput>;
  where: EntityIdInput;
};

export type ContactUpdateWithWhereUniqueWithoutMaterialsDepotInput = {
  data?: InputMaybe<ContactUpdateInput>;
  where: EntityIdInput;
};

export type ContactUpdateWithWhereUniqueWithoutProjectInput = {
  data?: InputMaybe<ContactUpdateInput>;
  where: EntityIdInput;
};

export type ContactUpdateWithWhereUniqueWithoutStorageLocationInput = {
  data?: InputMaybe<ContactUpdateInput>;
  where: EntityIdInput;
};

export type ContactWhereInput = {
  AND?: InputMaybe<Array<ContactWhereInput>>;
  NOT?: InputMaybe<Array<ContactWhereInput>>;
  OR?: InputMaybe<Array<ContactWhereInput>>;
  canton?: InputMaybe<StringFilter>;
  city?: InputMaybe<StringFilter>;
  contact1?: InputMaybe<StringFilter>;
  contact2?: InputMaybe<StringFilter>;
  country?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  firstLine?: InputMaybe<StringFilter>;
  firstName?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  lastName?: InputMaybe<StringFilter>;
  notes?: InputMaybe<StringFilter>;
  postalCode?: InputMaybe<StringFilter>;
  street?: InputMaybe<StringFilter>;
  type?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type DateInput = {
  set?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Dimension = {
  __typename?: 'Dimension';
  createdAt: Scalars['DateTime']['output'];
  depth?: Maybe<Scalars['Float']['output']>;
  height?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  isExact?: Maybe<Scalars['Boolean']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  unit?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  width?: Maybe<Scalars['Float']['output']>;
};

export type DimensionCreateNestedManyWithoutBuildingComponentInput = {
  connect?: InputMaybe<Array<ConnectRelationInput>>;
  create?: InputMaybe<Array<DimensionCreateWithoutBuildingComponentInput>>;
  disconnect?: InputMaybe<Array<EntityIdInput>>;
  update?: InputMaybe<Array<DimensionUpdateWithWhereUniqueWithoutBuildingComponentInput>>;
};

export type DimensionCreateWithoutBuildingComponentInput = {
  depth?: InputMaybe<Scalars['Float']['input']>;
  height?: InputMaybe<Scalars['Float']['input']>;
  isExact?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type DimensionOrderByInput = {
  createdAt?: InputMaybe<SortOrder>;
  depth?: InputMaybe<SortOrder>;
  height?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  isExact?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  unit?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  width?: InputMaybe<SortOrder>;
};

export type DimensionRange = {
  __typename?: 'DimensionRange';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  maxDepth?: Maybe<Scalars['Float']['output']>;
  maxHeight?: Maybe<Scalars['Float']['output']>;
  maxWidth?: Maybe<Scalars['Float']['output']>;
  minDepth?: Maybe<Scalars['Float']['output']>;
  minHeight?: Maybe<Scalars['Float']['output']>;
  minWidth?: Maybe<Scalars['Float']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  unit: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type DimensionRangeCreateNestedManyWithoutSearchRequestInput = {
  connect?: InputMaybe<Array<ConnectRelationInput>>;
  create?: InputMaybe<Array<DimensionRangeCreateWithoutSearchRequestInput>>;
  disconnect?: InputMaybe<Array<EntityIdInput>>;
  update?: InputMaybe<Array<DimensionRangeUpdateWithWhereUniqueWithoutSearchRequestInput>>;
};

export type DimensionRangeCreateWithoutSearchRequestInput = {
  maxDepth?: InputMaybe<Scalars['Float']['input']>;
  maxHeight?: InputMaybe<Scalars['Float']['input']>;
  maxWidth?: InputMaybe<Scalars['Float']['input']>;
  minDepth?: InputMaybe<Scalars['Float']['input']>;
  minHeight?: InputMaybe<Scalars['Float']['input']>;
  minWidth?: InputMaybe<Scalars['Float']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type DimensionRangeOrderByInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  maxDepth?: InputMaybe<SortOrder>;
  maxHeight?: InputMaybe<SortOrder>;
  maxWidth?: InputMaybe<SortOrder>;
  minDepth?: InputMaybe<SortOrder>;
  minHeight?: InputMaybe<SortOrder>;
  minWidth?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  unit?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type DimensionRangeUpdateInput = {
  maxDepth?: InputMaybe<NumberInput>;
  maxHeight?: InputMaybe<NumberInput>;
  maxWidth?: InputMaybe<NumberInput>;
  minDepth?: InputMaybe<NumberInput>;
  minHeight?: InputMaybe<NumberInput>;
  minWidth?: InputMaybe<NumberInput>;
  type?: InputMaybe<StringInput>;
};

export type DimensionRangeUpdateWithWhereUniqueWithoutSearchRequestInput = {
  data?: InputMaybe<DimensionRangeUpdateInput>;
  where: EntityIdInput;
};

export type DimensionRangeWhereInput = {
  AND?: InputMaybe<Array<DimensionRangeWhereInput>>;
  NOT?: InputMaybe<Array<DimensionRangeWhereInput>>;
  OR?: InputMaybe<Array<DimensionRangeWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  maxDepth?: InputMaybe<IntFilter>;
  maxHeight?: InputMaybe<IntFilter>;
  maxWidth?: InputMaybe<IntFilter>;
  minDepth?: InputMaybe<IntFilter>;
  minHeight?: InputMaybe<IntFilter>;
  minWidth?: InputMaybe<IntFilter>;
  type?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type DimensionUpdateInput = {
  depth?: InputMaybe<NumberInput>;
  height?: InputMaybe<NumberInput>;
  isExact?: InputMaybe<BooleanInput>;
  type?: InputMaybe<StringInput>;
  width?: InputMaybe<NumberInput>;
};

export type DimensionUpdateWithWhereUniqueWithoutBuildingComponentInput = {
  data?: InputMaybe<DimensionUpdateInput>;
  where: EntityIdInput;
};

export type DimensionWhereInput = {
  AND?: InputMaybe<Array<DimensionWhereInput>>;
  NOT?: InputMaybe<Array<DimensionWhereInput>>;
  OR?: InputMaybe<Array<DimensionWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  depth?: InputMaybe<IntFilter>;
  height?: InputMaybe<IntFilter>;
  id?: InputMaybe<StringFilter>;
  isExact?: InputMaybe<BoolFilter>;
  type?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  width?: InputMaybe<IntFilter>;
};

export type EbkphCategory = {
  __typename?: 'EbkphCategory';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  parent?: Maybe<EbkphCategory>;
  parentId?: Maybe<EbkphCategory>;
};

export type EbkphCategoryCreateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<EbkphCategoryCreateNestedOneWithoutEbkphCategoryInput>;
};

export type EbkphCategoryCreateNestedOneWithoutBuildingComponentInput = {
  connect?: InputMaybe<ConnectRelationInput>;
};

export type EbkphCategoryCreateNestedOneWithoutEbkphCategoryInput = {
  connect?: InputMaybe<ConnectRelationInput>;
};

export type EbkphCategoryCreateNestedOneWithoutSearchRequestInput = {
  connect?: InputMaybe<ConnectRelationInput>;
};

export type EbkphCategoryOneRelationFilter = {
  AND?: InputMaybe<EbkphCategoryWhereInput>;
  NOT?: InputMaybe<EbkphCategoryWhereInput>;
  OR?: InputMaybe<EbkphCategoryWhereInput>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  parent?: InputMaybe<EbkphCategoryOneRelationFilter>;
};

export type EbkphCategoryOrderByInput = {
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  parent?: InputMaybe<EbkphCategoryOrderByInput>;
};

export type EbkphCategoryUpdateInput = {
  description?: InputMaybe<StringInput>;
  name?: InputMaybe<StringInput>;
  parent?: InputMaybe<EbkphCategoryUpdateNestedOneWithoutEbkphCategoryInput>;
};

export type EbkphCategoryUpdateNestedOneWithoutBuildingComponentInput = {
  connect?: InputMaybe<ConnectRelationInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type EbkphCategoryUpdateNestedOneWithoutEbkphCategoryInput = {
  connect?: InputMaybe<ConnectRelationInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type EbkphCategoryUpdateNestedOneWithoutSearchRequestInput = {
  connect?: InputMaybe<ConnectRelationInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type EbkphCategoryWhereInput = {
  AND?: InputMaybe<Array<EbkphCategoryWhereInput>>;
  NOT?: InputMaybe<Array<EbkphCategoryWhereInput>>;
  OR?: InputMaybe<Array<EbkphCategoryWhereInput>>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  parent?: InputMaybe<EbkphCategoryOneRelationFilter>;
};

export type EntityIdInput = {
  id: Scalars['String']['input'];
};

export type FinishOtpLoginInput = {
  email: Scalars['String']['input'];
  otp: Scalars['String']['input'];
};

export type FinishOtpLoginResponse = {
  __typename?: 'FinishOtpLoginResponse';
  access_token: Scalars['String']['output'];
  user: FinishOtpLoginUserResponse;
};

export type FinishOtpLoginUserResponse = {
  __typename?: 'FinishOtpLoginUserResponse';
  id: Scalars['String']['output'];
};

export enum HarmfulSubstances {
  NoAssessment = 'noAssessment',
  NotToExpect = 'notToExpect',
  Pollutant = 'pollutant',
  SuspectedPollutant = 'suspectedPollutant'
}

export type HarmfulSubstancesEnumFilter = {
  contains?: InputMaybe<HarmfulSubstances>;
  equals?: InputMaybe<HarmfulSubstances>;
  fulltext?: InputMaybe<HarmfulSubstances>;
  gt?: InputMaybe<HarmfulSubstances>;
  gte?: InputMaybe<HarmfulSubstances>;
  in?: InputMaybe<Array<HarmfulSubstances>>;
  lt?: InputMaybe<HarmfulSubstances>;
  lte?: InputMaybe<HarmfulSubstances>;
  mode?: InputMaybe<SringQueryMode>;
  nin?: InputMaybe<Array<HarmfulSubstances>>;
};

export type HarmfulSubstancesEnumInput = {
  set?: InputMaybe<HarmfulSubstances>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
};

export type MaterialsDepot = {
  __typename?: 'MaterialsDepot';
  assets?: Maybe<Array<MaterialsDepotAssetReference>>;
  buildingComponents: Array<BuildingComponent>;
  buildingComponentsIds?: Maybe<Array<ReferenceId>>;
  canton?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  complex?: Maybe<Scalars['String']['output']>;
  constructionYear?: Maybe<Scalars['Float']['output']>;
  constructionYearExact?: Maybe<Scalars['Boolean']['output']>;
  contacts?: Maybe<Array<Contact>>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  googleMapsLink?: Maybe<Scalars['String']['output']>;
  historyNotes?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  interventionDepth?: Maybe<Scalars['String']['output']>;
  mainImage?: Maybe<AppAsset>;
  mainImageId?: Maybe<AppAsset>;
  materialDepotFulltextSearch?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  phase?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  reUseRating?: Maybe<Scalars['Float']['output']>;
  responsableUser: User;
  responsableUserId?: Maybe<ReferenceId>;
  searchInterests?: Maybe<Array<Scalars['String']['output']>>;
  shortName: Scalars['String']['output'];
  state: MaterialsDepotState;
  street?: Maybe<Scalars['String']['output']>;
  tasks?: Maybe<Array<Task>>;
  timelines: Array<MaterialsDepotTimeline>;
  typology?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};


export type MaterialsDepotAssetsArgs = {
  orderBy?: InputMaybe<Array<MaterialsDepotAssetReferenceOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MaterialsDepotAssetReferenceWhereInput>;
};


export type MaterialsDepotBuildingComponentsArgs = {
  orderBy?: InputMaybe<Array<BuildingComponentOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BuildingComponentWhereInput>;
};


export type MaterialsDepotContactsArgs = {
  orderBy?: InputMaybe<Array<ContactOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ContactWhereInput>;
};


export type MaterialsDepotTasksArgs = {
  orderBy?: InputMaybe<Array<TaskOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TaskWhereInput>;
};


export type MaterialsDepotTimelinesArgs = {
  orderBy?: InputMaybe<Array<MaterialsDepotTimelineOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MaterialsDepotTimelineWhereInput>;
};

export type MaterialsDepotAssetReference = {
  __typename?: 'MaterialsDepotAssetReference';
  asset: AppAsset;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  tags?: Maybe<Array<Scalars['String']['output']>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type MaterialsDepotAssetReferenceCreateNestedManyWithoutMaterialsDepotInput = {
  connect?: InputMaybe<Array<ConnectRelationInput>>;
  create?: InputMaybe<Array<MaterialsDepotAssetReferenceCreateWithoutMaterialsDepotInput>>;
  disconnect?: InputMaybe<Array<EntityIdInput>>;
  update?: InputMaybe<Array<MaterialsDepotAssetReferenceUpdateWithWhereUniqueWithoutMaterialsDepotInput>>;
};

export type MaterialsDepotAssetReferenceCreateWithoutMaterialsDepotInput = {
  asset?: InputMaybe<AppAssetCreateNestedOneWithoutMaterialsDepotAssetReferenceInput>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type MaterialsDepotAssetReferenceOrderByInput = {
  asset?: InputMaybe<AppAssetOrderByInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  tags?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type MaterialsDepotAssetReferenceUpdateInput = {
  asset?: InputMaybe<AppAssetUpdateNestedOneWithoutMaterialsDepotAssetReferenceInput>;
  tags?: InputMaybe<StringArrayInput>;
};

export type MaterialsDepotAssetReferenceUpdateWithWhereUniqueWithoutMaterialsDepotInput = {
  data?: InputMaybe<MaterialsDepotAssetReferenceUpdateInput>;
  where: EntityIdInput;
};

export type MaterialsDepotAssetReferenceWhereInput = {
  AND?: InputMaybe<Array<MaterialsDepotAssetReferenceWhereInput>>;
  NOT?: InputMaybe<Array<MaterialsDepotAssetReferenceWhereInput>>;
  OR?: InputMaybe<Array<MaterialsDepotAssetReferenceWhereInput>>;
  asset?: InputMaybe<AppAssetOneRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  tags?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type MaterialsDepotCreateInput = {
  assets?: InputMaybe<MaterialsDepotAssetReferenceCreateNestedManyWithoutMaterialsDepotInput>;
  buildingComponents?: InputMaybe<BuildingComponentCreateNestedManyWithoutMaterialsDepotInput>;
  city?: InputMaybe<Scalars['String']['input']>;
  complex?: InputMaybe<Scalars['String']['input']>;
  constructionYear?: InputMaybe<Scalars['Float']['input']>;
  constructionYearExact?: InputMaybe<Scalars['Boolean']['input']>;
  contacts?: InputMaybe<ContactCreateNestedManyWithoutMaterialsDepotInput>;
  country?: InputMaybe<Scalars['String']['input']>;
  googleMapsLink?: InputMaybe<Scalars['String']['input']>;
  historyNotes?: InputMaybe<Scalars['String']['input']>;
  interventionDepth?: InputMaybe<Scalars['String']['input']>;
  mainImage?: InputMaybe<AppAssetCreateNestedOneWithoutMaterialsDepotInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  phase?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  reUseRating?: InputMaybe<Scalars['Float']['input']>;
  responsableUser?: InputMaybe<UserCreateNestedOneWithoutMaterialsDepotInput>;
  shortName?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<MaterialsDepotState>;
  street?: InputMaybe<Scalars['String']['input']>;
  tasks?: InputMaybe<TaskCreateNestedManyWithoutMaterialsDepotInput>;
  timelines?: InputMaybe<MaterialsDepotTimelineCreateNestedManyWithoutMaterialsDepotInput>;
  typology?: InputMaybe<Scalars['String']['input']>;
};

export type MaterialsDepotCreateNestedOneWithoutBuildingComponentInput = {
  connect?: InputMaybe<ConnectRelationInput>;
};

export type MaterialsDepotOneRelationFilter = {
  AND?: InputMaybe<MaterialsDepotWhereInput>;
  NOT?: InputMaybe<MaterialsDepotWhereInput>;
  OR?: InputMaybe<MaterialsDepotWhereInput>;
  assets?: InputMaybe<MaterialsDepotAssetReferenceWhereInput>;
  buildingComponents?: InputMaybe<BuildingComponentWhereInput>;
  canton?: InputMaybe<StringFilter>;
  city?: InputMaybe<StringFilter>;
  complex?: InputMaybe<StringFilter>;
  constructionYear?: InputMaybe<IntFilter>;
  constructionYearExact?: InputMaybe<BoolFilter>;
  contacts?: InputMaybe<ContactWhereInput>;
  country?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  googleMapsLink?: InputMaybe<StringFilter>;
  historyNotes?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  interventionDepth?: InputMaybe<StringFilter>;
  mainImage?: InputMaybe<AppAssetOneRelationFilter>;
  materialDepotFulltextSearch?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  notes?: InputMaybe<StringFilter>;
  phase?: InputMaybe<StringFilter>;
  postalCode?: InputMaybe<StringFilter>;
  reUseRating?: InputMaybe<IntFilter>;
  responsableUser?: InputMaybe<UserOneRelationFilter>;
  shortName?: InputMaybe<StringFilter>;
  state?: InputMaybe<MaterialsDepotStateEnumFilter>;
  street?: InputMaybe<StringFilter>;
  tasks?: InputMaybe<TaskWhereInput>;
  timelines?: InputMaybe<MaterialsDepotTimelineWhereInput>;
  typology?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type MaterialsDepotOrderByInput = {
  assets?: InputMaybe<MaterialsDepotAssetReferenceOrderByInput>;
  buildingComponents?: InputMaybe<BuildingComponentOrderByInput>;
  canton?: InputMaybe<SortOrder>;
  city?: InputMaybe<SortOrder>;
  complex?: InputMaybe<SortOrder>;
  constructionYear?: InputMaybe<SortOrder>;
  constructionYearExact?: InputMaybe<SortOrder>;
  contacts?: InputMaybe<ContactOrderByInput>;
  country?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  googleMapsLink?: InputMaybe<SortOrder>;
  historyNotes?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  interventionDepth?: InputMaybe<SortOrder>;
  mainImage?: InputMaybe<AppAssetOrderByInput>;
  materialDepotFulltextSearch?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  notes?: InputMaybe<SortOrder>;
  phase?: InputMaybe<SortOrder>;
  postalCode?: InputMaybe<SortOrder>;
  reUseRating?: InputMaybe<SortOrder>;
  responsableUser?: InputMaybe<UserOrderByInput>;
  shortName?: InputMaybe<SortOrder>;
  state?: InputMaybe<SortOrder>;
  street?: InputMaybe<SortOrder>;
  tasks?: InputMaybe<TaskOrderByInput>;
  timelines?: InputMaybe<MaterialsDepotTimelineOrderByInput>;
  typology?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum MaterialsDepotState {
  Active = 'active',
  Closed = 'closed',
  Draft = 'draft'
}

export type MaterialsDepotStateEnumFilter = {
  contains?: InputMaybe<MaterialsDepotState>;
  equals?: InputMaybe<MaterialsDepotState>;
  fulltext?: InputMaybe<MaterialsDepotState>;
  gt?: InputMaybe<MaterialsDepotState>;
  gte?: InputMaybe<MaterialsDepotState>;
  in?: InputMaybe<Array<MaterialsDepotState>>;
  lt?: InputMaybe<MaterialsDepotState>;
  lte?: InputMaybe<MaterialsDepotState>;
  mode?: InputMaybe<SringQueryMode>;
  nin?: InputMaybe<Array<MaterialsDepotState>>;
};

export type MaterialsDepotStateEnumInput = {
  set?: InputMaybe<MaterialsDepotState>;
};

export type MaterialsDepotTimeline = {
  __typename?: 'MaterialsDepotTimeline';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  startDate?: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type MaterialsDepotTimelineCreateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type MaterialsDepotTimelineCreateNestedManyWithoutMaterialsDepotInput = {
  connect?: InputMaybe<Array<ConnectRelationInput>>;
  create?: InputMaybe<Array<MaterialsDepotTimelineCreateWithoutMaterialsDepotInput>>;
  disconnect?: InputMaybe<Array<EntityIdInput>>;
  update?: InputMaybe<Array<MaterialsDepotTimelineUpdateWithWhereUniqueWithoutMaterialsDepotInput>>;
};

export type MaterialsDepotTimelineCreateWithoutMaterialsDepotInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type MaterialsDepotTimelineOrderByInput = {
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  endDate?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  startDate?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type MaterialsDepotTimelineUpdateInput = {
  description?: InputMaybe<StringInput>;
  endDate?: InputMaybe<DateInput>;
  startDate?: InputMaybe<DateInput>;
};

export type MaterialsDepotTimelineUpdateWithWhereUniqueWithoutMaterialsDepotInput = {
  data?: InputMaybe<MaterialsDepotTimelineUpdateInput>;
  where: EntityIdInput;
};

export type MaterialsDepotTimelineWhereInput = {
  AND?: InputMaybe<Array<MaterialsDepotTimelineWhereInput>>;
  NOT?: InputMaybe<Array<MaterialsDepotTimelineWhereInput>>;
  OR?: InputMaybe<Array<MaterialsDepotTimelineWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  endDate?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  startDate?: InputMaybe<DateTimeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type MaterialsDepotUpdateInput = {
  assets?: InputMaybe<MaterialsDepotAssetReferenceCreateNestedManyWithoutMaterialsDepotInput>;
  buildingComponents?: InputMaybe<BuildingComponentCreateNestedManyWithoutMaterialsDepotInput>;
  city?: InputMaybe<StringInput>;
  complex?: InputMaybe<StringInput>;
  constructionYear?: InputMaybe<NumberInput>;
  constructionYearExact?: InputMaybe<BooleanInput>;
  contacts?: InputMaybe<ContactCreateNestedManyWithoutMaterialsDepotInput>;
  country?: InputMaybe<StringInput>;
  googleMapsLink?: InputMaybe<StringInput>;
  historyNotes?: InputMaybe<StringInput>;
  interventionDepth?: InputMaybe<StringInput>;
  mainImage?: InputMaybe<AppAssetUpdateNestedOneWithoutMaterialsDepotInput>;
  name?: InputMaybe<StringInput>;
  notes?: InputMaybe<StringInput>;
  phase?: InputMaybe<StringInput>;
  postalCode?: InputMaybe<StringInput>;
  reUseRating?: InputMaybe<NumberInput>;
  responsableUser?: InputMaybe<UserUpdateNestedOneWithoutMaterialsDepotInput>;
  shortName?: InputMaybe<StringInput>;
  state?: InputMaybe<MaterialsDepotStateEnumInput>;
  street?: InputMaybe<StringInput>;
  tasks?: InputMaybe<TaskCreateNestedManyWithoutMaterialsDepotInput>;
  timelines?: InputMaybe<MaterialsDepotTimelineCreateNestedManyWithoutMaterialsDepotInput>;
  typology?: InputMaybe<StringInput>;
};

export type MaterialsDepotUpdateNestedOneWithoutBuildingComponentInput = {
  connect?: InputMaybe<ConnectRelationInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MaterialsDepotWhereInput = {
  AND?: InputMaybe<Array<MaterialsDepotWhereInput>>;
  NOT?: InputMaybe<Array<MaterialsDepotWhereInput>>;
  OR?: InputMaybe<Array<MaterialsDepotWhereInput>>;
  assets?: InputMaybe<MaterialsDepotAssetReferenceWhereInput>;
  buildingComponents?: InputMaybe<BuildingComponentWhereInput>;
  canton?: InputMaybe<StringFilter>;
  city?: InputMaybe<StringFilter>;
  complex?: InputMaybe<StringFilter>;
  constructionYear?: InputMaybe<IntFilter>;
  constructionYearExact?: InputMaybe<BoolFilter>;
  contacts?: InputMaybe<ContactWhereInput>;
  country?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  googleMapsLink?: InputMaybe<StringFilter>;
  historyNotes?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  interventionDepth?: InputMaybe<StringFilter>;
  mainImage?: InputMaybe<AppAssetOneRelationFilter>;
  materialDepotFulltextSearch?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  notes?: InputMaybe<StringFilter>;
  phase?: InputMaybe<StringFilter>;
  postalCode?: InputMaybe<StringFilter>;
  reUseRating?: InputMaybe<IntFilter>;
  responsableUser?: InputMaybe<UserOneRelationFilter>;
  shortName?: InputMaybe<StringFilter>;
  state?: InputMaybe<MaterialsDepotStateEnumFilter>;
  street?: InputMaybe<StringFilter>;
  tasks?: InputMaybe<TaskWhereInput>;
  timelines?: InputMaybe<MaterialsDepotTimelineWhereInput>;
  typology?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptSearchRequestInterest: SearchRequestInterest;
  createOneAutocomplete: Autocomplete;
  createOneBuildingComponent: BuildingComponent;
  createOneCategory: Category;
  createOneEbkphCategory: EbkphCategory;
  createOneMaterialsDepot: MaterialsDepot;
  createOneMaterialsDepotTimeline: MaterialsDepotTimeline;
  createOneProject: Project;
  createOneSearchRequest: SearchRequest;
  createOneSearchRequestInterest: SearchRequestInterest;
  createOneStorageLocation: StorageLocation;
  createOneTask: Task;
  deleteOneAutocomplete: Autocomplete;
  deleteOneBuildingComponent: BuildingComponent;
  deleteOneMaterialsDepot: MaterialsDepot;
  deleteOneSearchRequestInterest: SearchRequestInterest;
  finishOtpLogin: FinishOtpLoginResponse;
  logout?: Maybe<User>;
  rejectSearchRequestInterest: SearchRequestInterest;
  triggerOtpLogin: Scalars['Boolean']['output'];
  updateOneAutocomplete: Autocomplete;
  updateOneBuildingComponent: BuildingComponent;
  updateOneCategory: Category;
  updateOneEbkphCategory: EbkphCategory;
  updateOneMaterialsDepot: MaterialsDepot;
  updateOneMaterialsDepotTimeline: MaterialsDepotTimeline;
  updateOneProject: Project;
  updateOneSearchRequest: SearchRequest;
  updateOneSearchRequestInterest: SearchRequestInterest;
  updateOneStorageLocation: StorageLocation;
  updateOneTask: Task;
};


export type MutationAcceptSearchRequestInterestArgs = {
  input: AcceptSearchRequestInterestInput;
};


export type MutationCreateOneAutocompleteArgs = {
  data?: InputMaybe<AutocompleteCreateInput>;
};


export type MutationCreateOneBuildingComponentArgs = {
  data?: InputMaybe<BuildingComponentCreateInput>;
};


export type MutationCreateOneCategoryArgs = {
  data?: InputMaybe<CategoryCreateInput>;
};


export type MutationCreateOneEbkphCategoryArgs = {
  data?: InputMaybe<EbkphCategoryCreateInput>;
};


export type MutationCreateOneMaterialsDepotArgs = {
  data?: InputMaybe<MaterialsDepotCreateInput>;
};


export type MutationCreateOneMaterialsDepotTimelineArgs = {
  data?: InputMaybe<MaterialsDepotTimelineCreateInput>;
};


export type MutationCreateOneProjectArgs = {
  data?: InputMaybe<ProjectCreateInput>;
};


export type MutationCreateOneSearchRequestArgs = {
  data?: InputMaybe<SearchRequestCreateInput>;
};


export type MutationCreateOneSearchRequestInterestArgs = {
  data?: InputMaybe<SearchRequestInterestCreateInput>;
};


export type MutationCreateOneStorageLocationArgs = {
  data?: InputMaybe<StorageLocationCreateInput>;
};


export type MutationCreateOneTaskArgs = {
  data?: InputMaybe<TaskCreateInput>;
};


export type MutationDeleteOneAutocompleteArgs = {
  where?: InputMaybe<EntityIdInput>;
};


export type MutationDeleteOneBuildingComponentArgs = {
  where?: InputMaybe<EntityIdInput>;
};


export type MutationDeleteOneMaterialsDepotArgs = {
  where?: InputMaybe<EntityIdInput>;
};


export type MutationDeleteOneSearchRequestInterestArgs = {
  where?: InputMaybe<EntityIdInput>;
};


export type MutationFinishOtpLoginArgs = {
  input: FinishOtpLoginInput;
};


export type MutationRejectSearchRequestInterestArgs = {
  input: RejectSearchRequestInterestInput;
};


export type MutationTriggerOtpLoginArgs = {
  input: TriggerOtpLoginInput;
};


export type MutationUpdateOneAutocompleteArgs = {
  data?: InputMaybe<AutocompleteUpdateInput>;
  where: EntityIdInput;
};


export type MutationUpdateOneBuildingComponentArgs = {
  data?: InputMaybe<BuildingComponentUpdateInput>;
  where: EntityIdInput;
};


export type MutationUpdateOneCategoryArgs = {
  data?: InputMaybe<CategoryUpdateInput>;
  where: EntityIdInput;
};


export type MutationUpdateOneEbkphCategoryArgs = {
  data?: InputMaybe<EbkphCategoryUpdateInput>;
  where: EntityIdInput;
};


export type MutationUpdateOneMaterialsDepotArgs = {
  data?: InputMaybe<MaterialsDepotUpdateInput>;
  where: EntityIdInput;
};


export type MutationUpdateOneMaterialsDepotTimelineArgs = {
  data?: InputMaybe<MaterialsDepotTimelineUpdateInput>;
  where: EntityIdInput;
};


export type MutationUpdateOneProjectArgs = {
  data?: InputMaybe<ProjectUpdateInput>;
  where: EntityIdInput;
};


export type MutationUpdateOneSearchRequestArgs = {
  data?: InputMaybe<SearchRequestUpdateInput>;
  where: EntityIdInput;
};


export type MutationUpdateOneSearchRequestInterestArgs = {
  data?: InputMaybe<SearchRequestInterestUpdateInput>;
  where: EntityIdInput;
};


export type MutationUpdateOneStorageLocationArgs = {
  data?: InputMaybe<StorageLocationUpdateInput>;
  where: EntityIdInput;
};


export type MutationUpdateOneTaskArgs = {
  data?: InputMaybe<TaskUpdateInput>;
  where: EntityIdInput;
};

export type NumberInput = {
  set?: InputMaybe<Scalars['Float']['input']>;
};

export type PostalCode = {
  __typename?: 'PostalCode';
  canton: Scalars['String']['output'];
  description: Scalars['String']['output'];
  postalCode: Scalars['ID']['output'];
};

export type Project = {
  __typename?: 'Project';
  assets?: Maybe<Array<ProjectAssetReference>>;
  city?: Maybe<Scalars['String']['output']>;
  contacts?: Maybe<Array<Contact>>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  mainImage?: Maybe<AppAsset>;
  mainImageId?: Maybe<AppAsset>;
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  phase: ProjectPhase;
  postalCode?: Maybe<Scalars['String']['output']>;
  responsableUserPM: User;
  responsableUserSearch: User;
  shortName: Scalars['String']['output'];
  somehowImportantContactWithoutName?: Maybe<Contact>;
  state: ProjectState;
  street?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ProjectAssetReference = {
  __typename?: 'ProjectAssetReference';
  asset: AppAsset;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  tags?: Maybe<Array<Scalars['String']['output']>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ProjectAssetReferenceCreateNestedManyWithoutProjectInput = {
  connect?: InputMaybe<Array<ConnectRelationInput>>;
  create?: InputMaybe<Array<ProjectAssetReferenceCreateWithoutProjectInput>>;
  disconnect?: InputMaybe<Array<EntityIdInput>>;
  update?: InputMaybe<Array<ProjectAssetReferenceUpdateWithWhereUniqueWithoutProjectInput>>;
};

export type ProjectAssetReferenceCreateWithoutProjectInput = {
  asset?: InputMaybe<AppAssetCreateNestedOneWithoutProjectAssetReferenceInput>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type ProjectAssetReferenceOrderByInput = {
  asset?: InputMaybe<AppAssetOrderByInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  tags?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ProjectAssetReferenceUpdateInput = {
  asset?: InputMaybe<AppAssetUpdateNestedOneWithoutProjectAssetReferenceInput>;
  tags?: InputMaybe<StringArrayInput>;
};

export type ProjectAssetReferenceUpdateWithWhereUniqueWithoutProjectInput = {
  data?: InputMaybe<ProjectAssetReferenceUpdateInput>;
  where: EntityIdInput;
};

export type ProjectAssetReferenceWhereInput = {
  AND?: InputMaybe<Array<ProjectAssetReferenceWhereInput>>;
  NOT?: InputMaybe<Array<ProjectAssetReferenceWhereInput>>;
  OR?: InputMaybe<Array<ProjectAssetReferenceWhereInput>>;
  asset?: InputMaybe<AppAssetOneRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  tags?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ProjectCreateInput = {
  assets?: InputMaybe<ProjectAssetReferenceCreateNestedManyWithoutProjectInput>;
  city?: InputMaybe<Scalars['String']['input']>;
  contacts?: InputMaybe<ContactCreateNestedManyWithoutProjectInput>;
  country?: InputMaybe<Scalars['String']['input']>;
  mainImage?: InputMaybe<AppAssetCreateNestedOneWithoutProjectInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  phase?: InputMaybe<ProjectPhase>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  responsableUserPM?: InputMaybe<UserCreateNestedOneWithoutProjectInput>;
  responsableUserSearch?: InputMaybe<UserCreateNestedOneWithoutProjectInput>;
  shortName?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<ProjectState>;
  street?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type ProjectCreateNestedOneWithoutSearchRequestInput = {
  connect?: InputMaybe<ConnectRelationInput>;
};

export type ProjectOneRelationFilter = {
  AND?: InputMaybe<ProjectWhereInput>;
  NOT?: InputMaybe<ProjectWhereInput>;
  OR?: InputMaybe<ProjectWhereInput>;
  assets?: InputMaybe<ProjectAssetReferenceWhereInput>;
  city?: InputMaybe<StringFilter>;
  contacts?: InputMaybe<ContactWhereInput>;
  country?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  mainImage?: InputMaybe<AppAssetOneRelationFilter>;
  name?: InputMaybe<StringFilter>;
  notes?: InputMaybe<StringFilter>;
  phase?: InputMaybe<ProjectPhaseEnumFilter>;
  postalCode?: InputMaybe<StringFilter>;
  responsableUserPM?: InputMaybe<UserOneRelationFilter>;
  responsableUserSearch?: InputMaybe<UserOneRelationFilter>;
  shortName?: InputMaybe<StringFilter>;
  state?: InputMaybe<ProjectStateEnumFilter>;
  street?: InputMaybe<StringFilter>;
  type?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ProjectOrderByInput = {
  assets?: InputMaybe<ProjectAssetReferenceOrderByInput>;
  city?: InputMaybe<SortOrder>;
  contacts?: InputMaybe<ContactOrderByInput>;
  country?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  mainImage?: InputMaybe<AppAssetOrderByInput>;
  name?: InputMaybe<SortOrder>;
  notes?: InputMaybe<SortOrder>;
  phase?: InputMaybe<SortOrder>;
  postalCode?: InputMaybe<SortOrder>;
  responsableUserPM?: InputMaybe<UserOrderByInput>;
  responsableUserSearch?: InputMaybe<UserOrderByInput>;
  shortName?: InputMaybe<SortOrder>;
  state?: InputMaybe<SortOrder>;
  street?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum ProjectPhase {
  Empty = 'empty',
  Phase0 = 'phase0',
  Phase1 = 'phase1'
}

export type ProjectPhaseEnumFilter = {
  contains?: InputMaybe<ProjectPhase>;
  equals?: InputMaybe<ProjectPhase>;
  fulltext?: InputMaybe<ProjectPhase>;
  gt?: InputMaybe<ProjectPhase>;
  gte?: InputMaybe<ProjectPhase>;
  in?: InputMaybe<Array<ProjectPhase>>;
  lt?: InputMaybe<ProjectPhase>;
  lte?: InputMaybe<ProjectPhase>;
  mode?: InputMaybe<SringQueryMode>;
  nin?: InputMaybe<Array<ProjectPhase>>;
};

export type ProjectPhaseEnumInput = {
  set?: InputMaybe<ProjectPhase>;
};

export enum ProjectState {
  Active = 'active',
  Closed = 'closed',
  Draft = 'draft'
}

export type ProjectStateEnumFilter = {
  contains?: InputMaybe<ProjectState>;
  equals?: InputMaybe<ProjectState>;
  fulltext?: InputMaybe<ProjectState>;
  gt?: InputMaybe<ProjectState>;
  gte?: InputMaybe<ProjectState>;
  in?: InputMaybe<Array<ProjectState>>;
  lt?: InputMaybe<ProjectState>;
  lte?: InputMaybe<ProjectState>;
  mode?: InputMaybe<SringQueryMode>;
  nin?: InputMaybe<Array<ProjectState>>;
};

export type ProjectStateEnumInput = {
  set?: InputMaybe<ProjectState>;
};

export type ProjectUpdateInput = {
  assets?: InputMaybe<ProjectAssetReferenceCreateNestedManyWithoutProjectInput>;
  city?: InputMaybe<StringInput>;
  contacts?: InputMaybe<ContactCreateNestedManyWithoutProjectInput>;
  country?: InputMaybe<StringInput>;
  mainImage?: InputMaybe<AppAssetUpdateNestedOneWithoutProjectInput>;
  name?: InputMaybe<StringInput>;
  notes?: InputMaybe<StringInput>;
  phase?: InputMaybe<ProjectPhaseEnumInput>;
  postalCode?: InputMaybe<StringInput>;
  responsableUserPM?: InputMaybe<UserUpdateNestedOneWithoutProjectInput>;
  responsableUserSearch?: InputMaybe<UserUpdateNestedOneWithoutProjectInput>;
  shortName?: InputMaybe<StringInput>;
  state?: InputMaybe<ProjectStateEnumInput>;
  street?: InputMaybe<StringInput>;
  type?: InputMaybe<StringInput>;
};

export type ProjectUpdateNestedOneWithoutSearchRequestInput = {
  connect?: InputMaybe<ConnectRelationInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ProjectWhereInput = {
  AND?: InputMaybe<Array<ProjectWhereInput>>;
  NOT?: InputMaybe<Array<ProjectWhereInput>>;
  OR?: InputMaybe<Array<ProjectWhereInput>>;
  assets?: InputMaybe<ProjectAssetReferenceWhereInput>;
  city?: InputMaybe<StringFilter>;
  contacts?: InputMaybe<ContactWhereInput>;
  country?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  mainImage?: InputMaybe<AppAssetOneRelationFilter>;
  name?: InputMaybe<StringFilter>;
  notes?: InputMaybe<StringFilter>;
  phase?: InputMaybe<ProjectPhaseEnumFilter>;
  postalCode?: InputMaybe<StringFilter>;
  responsableUserPM?: InputMaybe<UserOneRelationFilter>;
  responsableUserSearch?: InputMaybe<UserOneRelationFilter>;
  shortName?: InputMaybe<StringFilter>;
  state?: InputMaybe<ProjectStateEnumFilter>;
  street?: InputMaybe<StringFilter>;
  type?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export enum QuantityUnit {
  Kg = 'kg',
  Lfm = 'lfm',
  M = 'm',
  M2 = 'm2',
  M3 = 'm3',
  Stk = 'stk'
}

export type QuantityUnitEnumFilter = {
  contains?: InputMaybe<QuantityUnit>;
  equals?: InputMaybe<QuantityUnit>;
  fulltext?: InputMaybe<QuantityUnit>;
  gt?: InputMaybe<QuantityUnit>;
  gte?: InputMaybe<QuantityUnit>;
  in?: InputMaybe<Array<QuantityUnit>>;
  lt?: InputMaybe<QuantityUnit>;
  lte?: InputMaybe<QuantityUnit>;
  mode?: InputMaybe<SringQueryMode>;
  nin?: InputMaybe<Array<QuantityUnit>>;
};

export type QuantityUnitEnumInput = {
  set?: InputMaybe<QuantityUnit>;
};

export type Query = {
  __typename?: 'Query';
  allPostalCodes: Array<PostalCode>;
  autocomplete?: Maybe<Autocomplete>;
  autocompletes: Array<Autocomplete>;
  autocompletesCount: Scalars['Int']['output'];
  buildingComponent?: Maybe<BuildingComponent>;
  buildingComponents: Array<BuildingComponent>;
  buildingComponentsCount: Scalars['Int']['output'];
  canton?: Maybe<Canton>;
  cantonByPostalCodeAndCity: Scalars['String']['output'];
  cantons: Array<Canton>;
  cantonsCount: Scalars['Int']['output'];
  categories: Array<Category>;
  categoriesCount: Scalars['Int']['output'];
  category?: Maybe<Category>;
  contacts: Array<Contact>;
  contactsCount: Scalars['Int']['output'];
  dimensionRanges: Array<DimensionRange>;
  dimensionRangesCount: Scalars['Int']['output'];
  dimensions: Array<Dimension>;
  dimensionsCount: Scalars['Int']['output'];
  ebkphCategories: Array<EbkphCategory>;
  ebkphCategoriesCount: Scalars['Int']['output'];
  ebkphCategory?: Maybe<EbkphCategory>;
  materialsDepot?: Maybe<MaterialsDepot>;
  materialsDepotTimeline?: Maybe<MaterialsDepotTimeline>;
  materialsDepotTimelines: Array<MaterialsDepotTimeline>;
  materialsDepotTimelinesCount: Scalars['Int']['output'];
  materialsDepots: Array<MaterialsDepot>;
  materialsDepotsCount: Scalars['Int']['output'];
  me?: Maybe<User>;
  project?: Maybe<Project>;
  projects: Array<Project>;
  projectsCount: Scalars['Int']['output'];
  searchRequest?: Maybe<SearchRequest>;
  searchRequestInterest?: Maybe<SearchRequestInterest>;
  searchRequestInterests: Array<SearchRequestInterest>;
  searchRequestInterestsCount: Scalars['Int']['output'];
  searchRequests: Array<SearchRequest>;
  searchRequestsCount: Scalars['Int']['output'];
  storageLocation?: Maybe<StorageLocation>;
  storageLocations: Array<StorageLocation>;
  storageLocationsCount: Scalars['Int']['output'];
  task?: Maybe<Task>;
  tasks: Array<Task>;
  tasksCount: Scalars['Int']['output'];
  user?: Maybe<User>;
  users: Array<User>;
  usersCount: Scalars['Int']['output'];
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


export type QueryBuildingComponentArgs = {
  where?: InputMaybe<EntityIdInput>;
};


export type QueryBuildingComponentsArgs = {
  orderBy?: InputMaybe<Array<BuildingComponentOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BuildingComponentWhereInput>;
};


export type QueryBuildingComponentsCountArgs = {
  orderBy?: InputMaybe<Array<BuildingComponentOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<BuildingComponentWhereInput>;
};


export type QueryCantonArgs = {
  where?: InputMaybe<EntityIdInput>;
};


export type QueryCantonByPostalCodeAndCityArgs = {
  input: CantonByPostalCodeAndCityInput;
};


export type QueryCantonsArgs = {
  orderBy?: InputMaybe<Array<CantonOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CantonWhereInput>;
};


export type QueryCantonsCountArgs = {
  orderBy?: InputMaybe<Array<CantonOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CantonWhereInput>;
};


export type QueryCategoriesArgs = {
  orderBy?: InputMaybe<Array<CategoryOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CategoryWhereInput>;
};


export type QueryCategoriesCountArgs = {
  orderBy?: InputMaybe<Array<CategoryOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<CategoryWhereInput>;
};


export type QueryCategoryArgs = {
  where?: InputMaybe<EntityIdInput>;
};


export type QueryContactsArgs = {
  orderBy?: InputMaybe<Array<ContactOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ContactWhereInput>;
};


export type QueryContactsCountArgs = {
  orderBy?: InputMaybe<Array<ContactOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ContactWhereInput>;
};


export type QueryDimensionRangesArgs = {
  orderBy?: InputMaybe<Array<DimensionRangeOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<DimensionRangeWhereInput>;
};


export type QueryDimensionRangesCountArgs = {
  orderBy?: InputMaybe<Array<DimensionRangeOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<DimensionRangeWhereInput>;
};


export type QueryDimensionsArgs = {
  orderBy?: InputMaybe<Array<DimensionOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<DimensionWhereInput>;
};


export type QueryDimensionsCountArgs = {
  orderBy?: InputMaybe<Array<DimensionOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<DimensionWhereInput>;
};


export type QueryEbkphCategoriesArgs = {
  orderBy?: InputMaybe<Array<EbkphCategoryOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EbkphCategoryWhereInput>;
};


export type QueryEbkphCategoriesCountArgs = {
  orderBy?: InputMaybe<Array<EbkphCategoryOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EbkphCategoryWhereInput>;
};


export type QueryEbkphCategoryArgs = {
  where?: InputMaybe<EntityIdInput>;
};


export type QueryMaterialsDepotArgs = {
  where?: InputMaybe<EntityIdInput>;
};


export type QueryMaterialsDepotTimelineArgs = {
  where?: InputMaybe<EntityIdInput>;
};


export type QueryMaterialsDepotTimelinesArgs = {
  orderBy?: InputMaybe<Array<MaterialsDepotTimelineOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MaterialsDepotTimelineWhereInput>;
};


export type QueryMaterialsDepotTimelinesCountArgs = {
  orderBy?: InputMaybe<Array<MaterialsDepotTimelineOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MaterialsDepotTimelineWhereInput>;
};


export type QueryMaterialsDepotsArgs = {
  orderBy?: InputMaybe<Array<MaterialsDepotOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MaterialsDepotWhereInput>;
};


export type QueryMaterialsDepotsCountArgs = {
  orderBy?: InputMaybe<Array<MaterialsDepotOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MaterialsDepotWhereInput>;
};


export type QueryProjectArgs = {
  where?: InputMaybe<EntityIdInput>;
};


export type QueryProjectsArgs = {
  orderBy?: InputMaybe<Array<ProjectOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ProjectWhereInput>;
};


export type QueryProjectsCountArgs = {
  orderBy?: InputMaybe<Array<ProjectOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ProjectWhereInput>;
};


export type QuerySearchRequestArgs = {
  where?: InputMaybe<EntityIdInput>;
};


export type QuerySearchRequestInterestArgs = {
  where?: InputMaybe<EntityIdInput>;
};


export type QuerySearchRequestInterestsArgs = {
  orderBy?: InputMaybe<Array<SearchRequestInterestOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SearchRequestInterestWhereInput>;
};


export type QuerySearchRequestInterestsCountArgs = {
  orderBy?: InputMaybe<Array<SearchRequestInterestOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SearchRequestInterestWhereInput>;
};


export type QuerySearchRequestsArgs = {
  orderBy?: InputMaybe<Array<SearchRequestOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SearchRequestWhereInput>;
};


export type QuerySearchRequestsCountArgs = {
  orderBy?: InputMaybe<Array<SearchRequestOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SearchRequestWhereInput>;
};


export type QueryStorageLocationArgs = {
  where?: InputMaybe<EntityIdInput>;
};


export type QueryStorageLocationsArgs = {
  orderBy?: InputMaybe<Array<StorageLocationOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<StorageLocationWhereInput>;
};


export type QueryStorageLocationsCountArgs = {
  orderBy?: InputMaybe<Array<StorageLocationOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<StorageLocationWhereInput>;
};


export type QueryTaskArgs = {
  where?: InputMaybe<EntityIdInput>;
};


export type QueryTasksArgs = {
  orderBy?: InputMaybe<Array<TaskOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TaskWhereInput>;
};


export type QueryTasksCountArgs = {
  orderBy?: InputMaybe<Array<TaskOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TaskWhereInput>;
};


export type QueryUserArgs = {
  where?: InputMaybe<EntityIdInput>;
};


export type QueryUsersArgs = {
  orderBy?: InputMaybe<Array<UserOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryUsersCountArgs = {
  orderBy?: InputMaybe<Array<UserOrderByInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserWhereInput>;
};

export type ReferenceId = {
  __typename?: 'ReferenceId';
  id: Scalars['String']['output'];
};

export type RejectSearchRequestInterestInput = {
  interestId: Scalars['String']['input'];
  rejectionReason?: InputMaybe<Scalars['String']['input']>;
};

export enum ReusePotential {
  Bad = 'bad',
  Fair = 'fair',
  Good = 'good',
  Unknown = 'unknown'
}

export type ReusePotentialEnumFilter = {
  contains?: InputMaybe<ReusePotential>;
  equals?: InputMaybe<ReusePotential>;
  fulltext?: InputMaybe<ReusePotential>;
  gt?: InputMaybe<ReusePotential>;
  gte?: InputMaybe<ReusePotential>;
  in?: InputMaybe<Array<ReusePotential>>;
  lt?: InputMaybe<ReusePotential>;
  lte?: InputMaybe<ReusePotential>;
  mode?: InputMaybe<SringQueryMode>;
  nin?: InputMaybe<Array<ReusePotential>>;
};

export type ReusePotentialEnumInput = {
  set?: InputMaybe<ReusePotential>;
};

export type RowMessage = {
  __typename?: 'RowMessage';
  index: Scalars['Float']['output'];
  message: Scalars['String']['output'];
};

export type SearchRequest = {
  __typename?: 'SearchRequest';
  assets?: Maybe<Array<SearchRequestAssetReference>>;
  assignedBuildingComponents: Array<AssignedBuildingComponent>;
  assignedBuildingComponentsCount: Scalars['Int']['output'];
  budgetInRappens?: Maybe<Scalars['Float']['output']>;
  budgetNotes?: Maybe<Scalars['String']['output']>;
  buildingComponentDescription?: Maybe<Scalars['String']['output']>;
  buildingComponentName?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Category>;
  categoryId?: Maybe<ReferenceId>;
  comments?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deadlineFound?: Maybe<Scalars['DateTime']['output']>;
  deadlineShipment?: Maybe<Scalars['DateTime']['output']>;
  dimensionRanges?: Maybe<Array<DimensionRange>>;
  ebkphCategory?: Maybe<EbkphCategory>;
  ebkphCategoryId?: Maybe<ReferenceId>;
  fallbackLevel?: Maybe<Scalars['String']['output']>;
  fallbackLevelCO2PerUnit?: Maybe<Scalars['Float']['output']>;
  fallbackLevelCO2Total?: Maybe<Scalars['Float']['output']>;
  fireProtectionNotes?: Maybe<Scalars['String']['output']>;
  huntingStatusNotes?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  interests: Array<SearchRequestInterest>;
  project: Project;
  projectId?: Maybe<ReferenceId>;
  quantity?: Maybe<Scalars['BigInt']['output']>;
  quantityUnit?: Maybe<QuantityUnit>;
  reservedBuildingComponentsCount: Scalars['Int']['output'];
  responsibleUser: User;
  responsibleUserId?: Maybe<ReferenceId>;
  searchConceptNotes?: Maybe<Scalars['String']['output']>;
  securityNotes?: Maybe<Scalars['String']['output']>;
  soundProofNotes?: Maybe<Scalars['String']['output']>;
  state: SearchRequestState;
  updatedAt: Scalars['DateTime']['output'];
};

export type SearchRequestAssetReference = {
  __typename?: 'SearchRequestAssetReference';
  asset: AppAsset;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  tags?: Maybe<Array<Scalars['String']['output']>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type SearchRequestAssetReferenceCreateNestedManyWithoutSearchRequestInput = {
  connect?: InputMaybe<Array<ConnectRelationInput>>;
  create?: InputMaybe<Array<SearchRequestAssetReferenceCreateWithoutSearchRequestInput>>;
  disconnect?: InputMaybe<Array<EntityIdInput>>;
  update?: InputMaybe<Array<SearchRequestAssetReferenceUpdateWithWhereUniqueWithoutSearchRequestInput>>;
};

export type SearchRequestAssetReferenceCreateWithoutSearchRequestInput = {
  asset?: InputMaybe<AppAssetCreateNestedOneWithoutSearchRequestAssetReferenceInput>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type SearchRequestAssetReferenceOrderByInput = {
  asset?: InputMaybe<AppAssetOrderByInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  tags?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type SearchRequestAssetReferenceUpdateInput = {
  asset?: InputMaybe<AppAssetUpdateNestedOneWithoutSearchRequestAssetReferenceInput>;
  tags?: InputMaybe<StringArrayInput>;
};

export type SearchRequestAssetReferenceUpdateWithWhereUniqueWithoutSearchRequestInput = {
  data?: InputMaybe<SearchRequestAssetReferenceUpdateInput>;
  where: EntityIdInput;
};

export type SearchRequestAssetReferenceWhereInput = {
  AND?: InputMaybe<Array<SearchRequestAssetReferenceWhereInput>>;
  NOT?: InputMaybe<Array<SearchRequestAssetReferenceWhereInput>>;
  OR?: InputMaybe<Array<SearchRequestAssetReferenceWhereInput>>;
  asset?: InputMaybe<AppAssetOneRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  tags?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type SearchRequestCreateInput = {
  assets?: InputMaybe<SearchRequestAssetReferenceCreateNestedManyWithoutSearchRequestInput>;
  assignedBuildingComponents?: InputMaybe<AssignedBuildingComponentCreateNestedManyWithoutSearchRequestInput>;
  budgetInRappens?: InputMaybe<Scalars['Float']['input']>;
  budgetNotes?: InputMaybe<Scalars['String']['input']>;
  buildingComponentDescription?: InputMaybe<Scalars['String']['input']>;
  buildingComponentName?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<CategoryCreateNestedOneWithoutSearchRequestInput>;
  comments?: InputMaybe<Scalars['String']['input']>;
  deadlineFound?: InputMaybe<Scalars['DateTime']['input']>;
  deadlineShipment?: InputMaybe<Scalars['DateTime']['input']>;
  dimensionRanges?: InputMaybe<DimensionRangeCreateNestedManyWithoutSearchRequestInput>;
  ebkphCategory?: InputMaybe<EbkphCategoryCreateNestedOneWithoutSearchRequestInput>;
  fallbackLevel?: InputMaybe<Scalars['String']['input']>;
  fallbackLevelCO2PerUnit?: InputMaybe<Scalars['Float']['input']>;
  fallbackLevelCO2Total?: InputMaybe<Scalars['Float']['input']>;
  fireProtectionNotes?: InputMaybe<Scalars['String']['input']>;
  huntingStatusNotes?: InputMaybe<Scalars['String']['input']>;
  interests?: InputMaybe<SearchRequestInterestCreateNestedManyWithoutSearchRequestInput>;
  project?: InputMaybe<ProjectCreateNestedOneWithoutSearchRequestInput>;
  quantity?: InputMaybe<Scalars['Float']['input']>;
  quantityUnit?: InputMaybe<QuantityUnit>;
  responsibleUser?: InputMaybe<UserCreateNestedOneWithoutSearchRequestInput>;
  searchConceptNotes?: InputMaybe<Scalars['String']['input']>;
  securityNotes?: InputMaybe<Scalars['String']['input']>;
  soundProofNotes?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<SearchRequestState>;
};

export type SearchRequestCreateNestedOneWithoutSearchRequestInterestInput = {
  connect?: InputMaybe<ConnectRelationInput>;
};

export type SearchRequestInterest = {
  __typename?: 'SearchRequestInterest';
  acceptedAt?: Maybe<Scalars['DateTime']['output']>;
  buildingComponent: BuildingComponent;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  rejectedAt?: Maybe<Scalars['DateTime']['output']>;
  rejectionReason?: Maybe<Scalars['String']['output']>;
  responsibleUser: User;
  searchRequest: SearchRequest;
  state: SearchRequestInterestState;
  updatedAt: Scalars['DateTime']['output'];
};

export type SearchRequestInterestCreateInput = {
  acceptedAt?: InputMaybe<Scalars['DateTime']['input']>;
  buildingComponent?: InputMaybe<BuildingComponentCreateNestedOneWithoutSearchRequestInterestInput>;
  notes?: InputMaybe<Scalars['String']['input']>;
  rejectedAt?: InputMaybe<Scalars['DateTime']['input']>;
  rejectionReason?: InputMaybe<Scalars['String']['input']>;
  responsibleUser?: InputMaybe<UserCreateNestedOneWithoutSearchRequestInterestInput>;
  searchRequest?: InputMaybe<SearchRequestCreateNestedOneWithoutSearchRequestInterestInput>;
  state?: InputMaybe<SearchRequestInterestState>;
};

export type SearchRequestInterestCreateNestedManyWithoutBuildingComponentInput = {
  connect?: InputMaybe<Array<ConnectRelationInput>>;
  disconnect?: InputMaybe<Array<EntityIdInput>>;
};

export type SearchRequestInterestCreateNestedManyWithoutSearchRequestInput = {
  connect?: InputMaybe<Array<ConnectRelationInput>>;
  disconnect?: InputMaybe<Array<EntityIdInput>>;
};

export type SearchRequestInterestOrderByInput = {
  acceptedAt?: InputMaybe<SortOrder>;
  buildingComponent?: InputMaybe<BuildingComponentOrderByInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  notes?: InputMaybe<SortOrder>;
  rejectedAt?: InputMaybe<SortOrder>;
  rejectionReason?: InputMaybe<SortOrder>;
  responsibleUser?: InputMaybe<UserOrderByInput>;
  searchRequest?: InputMaybe<SearchRequestOrderByInput>;
  state?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum SearchRequestInterestState {
  Accepted = 'accepted',
  Open = 'open',
  Rejected = 'rejected'
}

export type SearchRequestInterestStateEnumFilter = {
  contains?: InputMaybe<SearchRequestInterestState>;
  equals?: InputMaybe<SearchRequestInterestState>;
  fulltext?: InputMaybe<SearchRequestInterestState>;
  gt?: InputMaybe<SearchRequestInterestState>;
  gte?: InputMaybe<SearchRequestInterestState>;
  in?: InputMaybe<Array<SearchRequestInterestState>>;
  lt?: InputMaybe<SearchRequestInterestState>;
  lte?: InputMaybe<SearchRequestInterestState>;
  mode?: InputMaybe<SringQueryMode>;
  nin?: InputMaybe<Array<SearchRequestInterestState>>;
};

export type SearchRequestInterestStateEnumInput = {
  set?: InputMaybe<SearchRequestInterestState>;
};

export type SearchRequestInterestUpdateInput = {
  acceptedAt?: InputMaybe<DateInput>;
  buildingComponent?: InputMaybe<BuildingComponentUpdateNestedOneWithoutSearchRequestInterestInput>;
  notes?: InputMaybe<StringInput>;
  rejectedAt?: InputMaybe<DateInput>;
  rejectionReason?: InputMaybe<StringInput>;
  responsibleUser?: InputMaybe<UserUpdateNestedOneWithoutSearchRequestInterestInput>;
  searchRequest?: InputMaybe<SearchRequestUpdateNestedOneWithoutSearchRequestInterestInput>;
  state?: InputMaybe<SearchRequestInterestStateEnumInput>;
};

export type SearchRequestInterestWhereInput = {
  AND?: InputMaybe<Array<SearchRequestInterestWhereInput>>;
  NOT?: InputMaybe<Array<SearchRequestInterestWhereInput>>;
  OR?: InputMaybe<Array<SearchRequestInterestWhereInput>>;
  acceptedAt?: InputMaybe<DateTimeFilter>;
  buildingComponent?: InputMaybe<BuildingComponentOneRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  notes?: InputMaybe<StringFilter>;
  rejectedAt?: InputMaybe<DateTimeFilter>;
  rejectionReason?: InputMaybe<StringFilter>;
  responsibleUser?: InputMaybe<UserOneRelationFilter>;
  searchRequest?: InputMaybe<SearchRequestOneRelationFilter>;
  state?: InputMaybe<SearchRequestInterestStateEnumFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type SearchRequestOneRelationFilter = {
  AND?: InputMaybe<SearchRequestWhereInput>;
  NOT?: InputMaybe<SearchRequestWhereInput>;
  OR?: InputMaybe<SearchRequestWhereInput>;
  assets?: InputMaybe<SearchRequestAssetReferenceWhereInput>;
  assignedBuildingComponents?: InputMaybe<AssignedBuildingComponentWhereInput>;
  budgetInRappens?: InputMaybe<IntFilter>;
  budgetNotes?: InputMaybe<StringFilter>;
  buildingComponentDescription?: InputMaybe<StringFilter>;
  buildingComponentName?: InputMaybe<StringFilter>;
  category?: InputMaybe<CategoryOneRelationFilter>;
  comments?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  deadlineFound?: InputMaybe<DateTimeFilter>;
  deadlineShipment?: InputMaybe<DateTimeFilter>;
  dimensionRanges?: InputMaybe<DimensionRangeWhereInput>;
  ebkphCategory?: InputMaybe<EbkphCategoryOneRelationFilter>;
  fallbackLevel?: InputMaybe<StringFilter>;
  fallbackLevelCO2PerUnit?: InputMaybe<IntFilter>;
  fallbackLevelCO2Total?: InputMaybe<IntFilter>;
  fireProtectionNotes?: InputMaybe<StringFilter>;
  huntingStatusNotes?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  interests?: InputMaybe<SearchRequestInterestWhereInput>;
  project?: InputMaybe<ProjectOneRelationFilter>;
  quantity?: InputMaybe<IntFilter>;
  quantityUnit?: InputMaybe<QuantityUnitEnumFilter>;
  responsibleUser?: InputMaybe<UserOneRelationFilter>;
  searchConceptNotes?: InputMaybe<StringFilter>;
  securityNotes?: InputMaybe<StringFilter>;
  soundProofNotes?: InputMaybe<StringFilter>;
  state?: InputMaybe<SearchRequestStateEnumFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type SearchRequestOrderByInput = {
  assets?: InputMaybe<SearchRequestAssetReferenceOrderByInput>;
  assignedBuildingComponents?: InputMaybe<AssignedBuildingComponentOrderByInput>;
  budgetInRappens?: InputMaybe<SortOrder>;
  budgetNotes?: InputMaybe<SortOrder>;
  buildingComponentDescription?: InputMaybe<SortOrder>;
  buildingComponentName?: InputMaybe<SortOrder>;
  category?: InputMaybe<CategoryOrderByInput>;
  comments?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  deadlineFound?: InputMaybe<SortOrder>;
  deadlineShipment?: InputMaybe<SortOrder>;
  dimensionRanges?: InputMaybe<DimensionRangeOrderByInput>;
  ebkphCategory?: InputMaybe<EbkphCategoryOrderByInput>;
  fallbackLevel?: InputMaybe<SortOrder>;
  fallbackLevelCO2PerUnit?: InputMaybe<SortOrder>;
  fallbackLevelCO2Total?: InputMaybe<SortOrder>;
  fireProtectionNotes?: InputMaybe<SortOrder>;
  huntingStatusNotes?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  interests?: InputMaybe<SearchRequestInterestOrderByInput>;
  project?: InputMaybe<ProjectOrderByInput>;
  quantity?: InputMaybe<SortOrder>;
  quantityUnit?: InputMaybe<SortOrder>;
  responsibleUser?: InputMaybe<UserOrderByInput>;
  searchConceptNotes?: InputMaybe<SortOrder>;
  securityNotes?: InputMaybe<SortOrder>;
  soundProofNotes?: InputMaybe<SortOrder>;
  state?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum SearchRequestState {
  Active = 'active',
  Closed = 'closed',
  Draft = 'draft',
  Inactive = 'inactive'
}

export type SearchRequestStateEnumFilter = {
  contains?: InputMaybe<SearchRequestState>;
  equals?: InputMaybe<SearchRequestState>;
  fulltext?: InputMaybe<SearchRequestState>;
  gt?: InputMaybe<SearchRequestState>;
  gte?: InputMaybe<SearchRequestState>;
  in?: InputMaybe<Array<SearchRequestState>>;
  lt?: InputMaybe<SearchRequestState>;
  lte?: InputMaybe<SearchRequestState>;
  mode?: InputMaybe<SringQueryMode>;
  nin?: InputMaybe<Array<SearchRequestState>>;
};

export type SearchRequestStateEnumInput = {
  set?: InputMaybe<SearchRequestState>;
};

export type SearchRequestUpdateInput = {
  assets?: InputMaybe<SearchRequestAssetReferenceCreateNestedManyWithoutSearchRequestInput>;
  assignedBuildingComponents?: InputMaybe<AssignedBuildingComponentCreateNestedManyWithoutSearchRequestInput>;
  budgetInRappens?: InputMaybe<NumberInput>;
  budgetNotes?: InputMaybe<StringInput>;
  buildingComponentDescription?: InputMaybe<StringInput>;
  buildingComponentName?: InputMaybe<StringInput>;
  category?: InputMaybe<CategoryUpdateNestedOneWithoutSearchRequestInput>;
  comments?: InputMaybe<StringInput>;
  deadlineFound?: InputMaybe<DateInput>;
  deadlineShipment?: InputMaybe<DateInput>;
  dimensionRanges?: InputMaybe<DimensionRangeCreateNestedManyWithoutSearchRequestInput>;
  ebkphCategory?: InputMaybe<EbkphCategoryUpdateNestedOneWithoutSearchRequestInput>;
  fallbackLevel?: InputMaybe<StringInput>;
  fallbackLevelCO2PerUnit?: InputMaybe<NumberInput>;
  fallbackLevelCO2Total?: InputMaybe<NumberInput>;
  fireProtectionNotes?: InputMaybe<StringInput>;
  huntingStatusNotes?: InputMaybe<StringInput>;
  interests?: InputMaybe<SearchRequestInterestCreateNestedManyWithoutSearchRequestInput>;
  project?: InputMaybe<ProjectUpdateNestedOneWithoutSearchRequestInput>;
  quantity?: InputMaybe<NumberInput>;
  quantityUnit?: InputMaybe<QuantityUnitEnumInput>;
  responsibleUser?: InputMaybe<UserUpdateNestedOneWithoutSearchRequestInput>;
  searchConceptNotes?: InputMaybe<StringInput>;
  securityNotes?: InputMaybe<StringInput>;
  soundProofNotes?: InputMaybe<StringInput>;
  state?: InputMaybe<SearchRequestStateEnumInput>;
};

export type SearchRequestUpdateNestedOneWithoutSearchRequestInterestInput = {
  connect?: InputMaybe<ConnectRelationInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SearchRequestWhereInput = {
  AND?: InputMaybe<Array<SearchRequestWhereInput>>;
  NOT?: InputMaybe<Array<SearchRequestWhereInput>>;
  OR?: InputMaybe<Array<SearchRequestWhereInput>>;
  assets?: InputMaybe<SearchRequestAssetReferenceWhereInput>;
  assignedBuildingComponents?: InputMaybe<AssignedBuildingComponentWhereInput>;
  budgetInRappens?: InputMaybe<IntFilter>;
  budgetNotes?: InputMaybe<StringFilter>;
  buildingComponentDescription?: InputMaybe<StringFilter>;
  buildingComponentName?: InputMaybe<StringFilter>;
  category?: InputMaybe<CategoryOneRelationFilter>;
  comments?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  deadlineFound?: InputMaybe<DateTimeFilter>;
  deadlineShipment?: InputMaybe<DateTimeFilter>;
  dimensionRanges?: InputMaybe<DimensionRangeWhereInput>;
  ebkphCategory?: InputMaybe<EbkphCategoryOneRelationFilter>;
  fallbackLevel?: InputMaybe<StringFilter>;
  fallbackLevelCO2PerUnit?: InputMaybe<IntFilter>;
  fallbackLevelCO2Total?: InputMaybe<IntFilter>;
  fireProtectionNotes?: InputMaybe<StringFilter>;
  huntingStatusNotes?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  interests?: InputMaybe<SearchRequestInterestWhereInput>;
  project?: InputMaybe<ProjectOneRelationFilter>;
  quantity?: InputMaybe<IntFilter>;
  quantityUnit?: InputMaybe<QuantityUnitEnumFilter>;
  responsibleUser?: InputMaybe<UserOneRelationFilter>;
  searchConceptNotes?: InputMaybe<StringFilter>;
  securityNotes?: InputMaybe<StringFilter>;
  soundProofNotes?: InputMaybe<StringFilter>;
  state?: InputMaybe<SearchRequestStateEnumFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export enum SringQueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type StorageLocation = {
  __typename?: 'StorageLocation';
  assets?: Maybe<Array<StorageLocationAssetReference>>;
  buildingComponents: Array<BuildingComponent>;
  canton?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  contacts?: Maybe<Array<Contact>>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  googleMapsLink?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  mainImage?: Maybe<AppAsset>;
  mainImageId?: Maybe<AppAsset>;
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type StorageLocationAssetReference = {
  __typename?: 'StorageLocationAssetReference';
  asset: AppAsset;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  tags?: Maybe<Array<Scalars['String']['output']>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type StorageLocationAssetReferenceCreateNestedManyWithoutStorageLocationInput = {
  connect?: InputMaybe<Array<ConnectRelationInput>>;
  create?: InputMaybe<Array<StorageLocationAssetReferenceCreateWithoutStorageLocationInput>>;
  disconnect?: InputMaybe<Array<EntityIdInput>>;
  update?: InputMaybe<Array<StorageLocationAssetReferenceUpdateWithWhereUniqueWithoutStorageLocationInput>>;
};

export type StorageLocationAssetReferenceCreateWithoutStorageLocationInput = {
  asset?: InputMaybe<AppAssetCreateNestedOneWithoutStorageLocationAssetReferenceInput>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type StorageLocationAssetReferenceOrderByInput = {
  asset?: InputMaybe<AppAssetOrderByInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  tags?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type StorageLocationAssetReferenceUpdateInput = {
  asset?: InputMaybe<AppAssetUpdateNestedOneWithoutStorageLocationAssetReferenceInput>;
  tags?: InputMaybe<StringArrayInput>;
};

export type StorageLocationAssetReferenceUpdateWithWhereUniqueWithoutStorageLocationInput = {
  data?: InputMaybe<StorageLocationAssetReferenceUpdateInput>;
  where: EntityIdInput;
};

export type StorageLocationAssetReferenceWhereInput = {
  AND?: InputMaybe<Array<StorageLocationAssetReferenceWhereInput>>;
  NOT?: InputMaybe<Array<StorageLocationAssetReferenceWhereInput>>;
  OR?: InputMaybe<Array<StorageLocationAssetReferenceWhereInput>>;
  asset?: InputMaybe<AppAssetOneRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  tags?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type StorageLocationCreateInput = {
  assets?: InputMaybe<StorageLocationAssetReferenceCreateNestedManyWithoutStorageLocationInput>;
  buildingComponents?: InputMaybe<BuildingComponentCreateNestedManyWithoutStorageLocationInput>;
  city?: InputMaybe<Scalars['String']['input']>;
  contacts?: InputMaybe<ContactCreateNestedManyWithoutStorageLocationInput>;
  country?: InputMaybe<Scalars['String']['input']>;
  googleMapsLink?: InputMaybe<Scalars['String']['input']>;
  mainImage?: InputMaybe<AppAssetCreateNestedOneWithoutStorageLocationInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
};

export type StorageLocationCreateNestedOneWithoutBuildingComponentInput = {
  connect?: InputMaybe<ConnectRelationInput>;
};

export type StorageLocationOneRelationFilter = {
  AND?: InputMaybe<StorageLocationWhereInput>;
  NOT?: InputMaybe<StorageLocationWhereInput>;
  OR?: InputMaybe<StorageLocationWhereInput>;
  assets?: InputMaybe<StorageLocationAssetReferenceWhereInput>;
  buildingComponents?: InputMaybe<BuildingComponentWhereInput>;
  canton?: InputMaybe<StringFilter>;
  city?: InputMaybe<StringFilter>;
  contacts?: InputMaybe<ContactWhereInput>;
  country?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  googleMapsLink?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  mainImage?: InputMaybe<AppAssetOneRelationFilter>;
  name?: InputMaybe<StringFilter>;
  notes?: InputMaybe<StringFilter>;
  postalCode?: InputMaybe<StringFilter>;
  street?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type StorageLocationOrderByInput = {
  assets?: InputMaybe<StorageLocationAssetReferenceOrderByInput>;
  buildingComponents?: InputMaybe<BuildingComponentOrderByInput>;
  canton?: InputMaybe<SortOrder>;
  city?: InputMaybe<SortOrder>;
  contacts?: InputMaybe<ContactOrderByInput>;
  country?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  googleMapsLink?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  mainImage?: InputMaybe<AppAssetOrderByInput>;
  name?: InputMaybe<SortOrder>;
  notes?: InputMaybe<SortOrder>;
  postalCode?: InputMaybe<SortOrder>;
  street?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type StorageLocationUpdateInput = {
  assets?: InputMaybe<StorageLocationAssetReferenceCreateNestedManyWithoutStorageLocationInput>;
  buildingComponents?: InputMaybe<BuildingComponentCreateNestedManyWithoutStorageLocationInput>;
  city?: InputMaybe<StringInput>;
  contacts?: InputMaybe<ContactCreateNestedManyWithoutStorageLocationInput>;
  country?: InputMaybe<StringInput>;
  googleMapsLink?: InputMaybe<StringInput>;
  mainImage?: InputMaybe<AppAssetUpdateNestedOneWithoutStorageLocationInput>;
  name?: InputMaybe<StringInput>;
  notes?: InputMaybe<StringInput>;
  postalCode?: InputMaybe<StringInput>;
  street?: InputMaybe<StringInput>;
};

export type StorageLocationUpdateNestedOneWithoutBuildingComponentInput = {
  connect?: InputMaybe<ConnectRelationInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type StorageLocationWhereInput = {
  AND?: InputMaybe<Array<StorageLocationWhereInput>>;
  NOT?: InputMaybe<Array<StorageLocationWhereInput>>;
  OR?: InputMaybe<Array<StorageLocationWhereInput>>;
  assets?: InputMaybe<StorageLocationAssetReferenceWhereInput>;
  buildingComponents?: InputMaybe<BuildingComponentWhereInput>;
  canton?: InputMaybe<StringFilter>;
  city?: InputMaybe<StringFilter>;
  contacts?: InputMaybe<ContactWhereInput>;
  country?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  googleMapsLink?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  mainImage?: InputMaybe<AppAssetOneRelationFilter>;
  name?: InputMaybe<StringFilter>;
  notes?: InputMaybe<StringFilter>;
  postalCode?: InputMaybe<StringFilter>;
  street?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type StringArrayInput = {
  set?: InputMaybe<Array<Scalars['String']['input']>>;
};

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

export type Task = {
  __typename?: 'Task';
  closedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  dueDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TaskCreateInput = {
  closedAt?: InputMaybe<Scalars['DateTime']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type TaskCreateNestedManyWithoutMaterialsDepotInput = {
  connect?: InputMaybe<Array<ConnectRelationInput>>;
  create?: InputMaybe<Array<TaskCreateWithoutMaterialsDepotInput>>;
  disconnect?: InputMaybe<Array<EntityIdInput>>;
  update?: InputMaybe<Array<TaskUpdateWithWhereUniqueWithoutMaterialsDepotInput>>;
};

export type TaskCreateWithoutMaterialsDepotInput = {
  closedAt?: InputMaybe<Scalars['DateTime']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type TaskOrderByInput = {
  closedAt?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  dueDate?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type TaskUpdateInput = {
  closedAt?: InputMaybe<DateInput>;
  dueDate?: InputMaybe<DateInput>;
  name?: InputMaybe<StringInput>;
};

export type TaskUpdateWithWhereUniqueWithoutMaterialsDepotInput = {
  data?: InputMaybe<TaskUpdateInput>;
  where: EntityIdInput;
};

export type TaskWhereInput = {
  AND?: InputMaybe<Array<TaskWhereInput>>;
  NOT?: InputMaybe<Array<TaskWhereInput>>;
  OR?: InputMaybe<Array<TaskWhereInput>>;
  closedAt?: InputMaybe<DateTimeFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  dueDate?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type TriggerOtpLoginInput = {
  email: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type UserCreateNestedOneWithoutMaterialsDepotInput = {
  connect?: InputMaybe<ConnectRelationInput>;
};

export type UserCreateNestedOneWithoutProjectInput = {
  connect?: InputMaybe<ConnectRelationInput>;
};

export type UserCreateNestedOneWithoutSearchRequestInput = {
  connect?: InputMaybe<ConnectRelationInput>;
};

export type UserCreateNestedOneWithoutSearchRequestInterestInput = {
  connect?: InputMaybe<ConnectRelationInput>;
};

export type UserOneRelationFilter = {
  AND?: InputMaybe<UserWhereInput>;
  NOT?: InputMaybe<UserWhereInput>;
  OR?: InputMaybe<UserWhereInput>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  notes?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type UserOrderByInput = {
  createdAt?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  notes?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type UserUpdateNestedOneWithoutMaterialsDepotInput = {
  connect?: InputMaybe<ConnectRelationInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserUpdateNestedOneWithoutProjectInput = {
  connect?: InputMaybe<ConnectRelationInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserUpdateNestedOneWithoutSearchRequestInput = {
  connect?: InputMaybe<ConnectRelationInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserUpdateNestedOneWithoutSearchRequestInterestInput = {
  connect?: InputMaybe<ConnectRelationInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  notes?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string } | null };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: { __typename?: 'User', id: string } | null };

export type FinishOtpFlowLoginMutationVariables = Exact<{
  input: FinishOtpLoginInput;
}>;


export type FinishOtpFlowLoginMutation = { __typename?: 'Mutation', finishOtpLogin: { __typename?: 'FinishOtpLoginResponse', access_token: string, user: { __typename?: 'FinishOtpLoginUserResponse', id: string } } };

export type TriggerOtpFlowLoginMutationVariables = Exact<{
  input: TriggerOtpLoginInput;
}>;


export type TriggerOtpFlowLoginMutation = { __typename?: 'Mutation', triggerOtpLogin: boolean };

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

export type BuildingComponentImagesFragment = { __typename?: 'BuildingComponent', id: string, componentId?: string | null, assets?: Array<{ __typename?: 'BuildingComponentAssetReference', id: string, tags?: Array<string> | null, asset: { __typename?: 'AppAsset', id: string, url?: string | null, originalFilename: string, mimeType: string, updatedAt: any } }> | null } & { ' $fragmentName'?: 'BuildingComponentImagesFragment' };

export type BuildingComponentImagesQueryVariables = Exact<{
  where: EntityIdInput;
}>;


export type BuildingComponentImagesQuery = { __typename?: 'Query', buildingComponent?: (
    { __typename?: 'BuildingComponent', id: string }
    & { ' $fragmentRefs'?: { 'BuildingComponentImagesFragment': BuildingComponentImagesFragment } }
  ) | null };

export type BuildingComponent_ListFragment = (
  { __typename?: 'BuildingComponent', id: string, state: BuildingComponentState, phase: BuildingComponentPhase, materialsDepot: { __typename?: 'MaterialsDepot', id: string, shortName: string }, storageLocation?: { __typename?: 'StorageLocation', id: string, name: string } | null, searchRequestInterests: Array<{ __typename?: 'SearchRequestInterest', id: string }>, assignedTo?: { __typename?: 'AssignedBuildingComponent', id: string } | null }
  & { ' $fragmentRefs'?: { 'BuildingComponent_ListItemFragment': BuildingComponent_ListItemFragment } }
) & { ' $fragmentName'?: 'BuildingComponent_ListFragment' };

export type BuildingComponentListQueryVariables = Exact<{
  where?: InputMaybe<BuildingComponentWhereInput>;
  orderBy?: InputMaybe<Array<BuildingComponentOrderByInput> | BuildingComponentOrderByInput>;
}>;


export type BuildingComponentListQuery = { __typename?: 'Query', buildingComponentsCount: number, buildingComponents: Array<(
    { __typename?: 'BuildingComponent', id: string }
    & { ' $fragmentRefs'?: { 'BuildingComponent_ListFragment': BuildingComponent_ListFragment } }
  )> };

export type BuildingComponent_ListItemFragment = { __typename?: 'BuildingComponent', id: string, name?: string | null, phase: BuildingComponentPhase, createdAt: any, componentSn: any, componentId?: string | null, state: BuildingComponentState, quantity?: number | null, quantityUnit?: QuantityUnit | null, materialsDepot: { __typename?: 'MaterialsDepot', id: string, shortName: string, name: string }, mainImage?: { __typename?: 'AppAsset', id: string, url?: string | null } | null, searchRequestInterests: Array<{ __typename?: 'SearchRequestInterest', id: string }> } & { ' $fragmentName'?: 'BuildingComponent_ListItemFragment' };

export type CreateOneBuildingComponentMutationVariables = Exact<{
  data: BuildingComponentCreateInput;
}>;


export type CreateOneBuildingComponentMutation = { __typename?: 'Mutation', createOneBuildingComponent: (
    { __typename?: 'BuildingComponent', id: string }
    & { ' $fragmentRefs'?: { 'BuildingComponentFragment': BuildingComponentFragment } }
  ) };

export type UpdateOneBuildingComponentMutationVariables = Exact<{
  where: EntityIdInput;
  data: BuildingComponentUpdateInput;
}>;


export type UpdateOneBuildingComponentMutation = { __typename?: 'Mutation', updateOneBuildingComponent: (
    { __typename?: 'BuildingComponent', id: string }
    & { ' $fragmentRefs'?: { 'BuildingComponentFragment': BuildingComponentFragment } }
  ) };

export type DeleteOneBuildingComponentMutationVariables = Exact<{
  where: EntityIdInput;
}>;


export type DeleteOneBuildingComponentMutation = { __typename?: 'Mutation', deleteOneBuildingComponent: (
    { __typename?: 'BuildingComponent', id: string }
    & { ' $fragmentRefs'?: { 'BuildingComponentFragment': BuildingComponentFragment } }
  ) };

export type BuildingComponentQueryVariables = Exact<{
  where: EntityIdInput;
}>;


export type BuildingComponentQuery = { __typename?: 'Query', buildingComponent?: (
    { __typename?: 'BuildingComponent', id: string, componentId?: string | null, state: BuildingComponentState, materialsDepot: { __typename?: 'MaterialsDepot', id: string, shortName: string }, searchRequestInterests: Array<{ __typename?: 'SearchRequestInterest', id: string }> }
    & { ' $fragmentRefs'?: { 'BuildingComponentFragment': BuildingComponentFragment;'BuildingComponentReferenceSelectorFragment': BuildingComponentReferenceSelectorFragment } }
  ) | null };

export type CreateBuildingComponentDefaultsQueryVariables = Exact<{
  materialsDepotId: Scalars['String']['input'];
}>;


export type CreateBuildingComponentDefaultsQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string } | null, materialsDepot?: { __typename?: 'MaterialsDepot', id: string, shortName: string } | null };

export type BuildingComponentFragment = (
  { __typename?: 'BuildingComponent', id: string, state: BuildingComponentState, phase: BuildingComponentPhase, componentId?: string | null, name?: string | null, description?: string | null, quantity?: number | null, quantityExact?: boolean | null, quantityUnit?: QuantityUnit | null, quantitySpare?: number | null, quantityNotes?: string | null, sparePartsNotes?: string | null, constructionYear?: number | null, constructionYearExact?: boolean | null, constructionYearNotes?: string | null, co2Savings?: number | null, co2SavingsExact?: boolean | null, condition?: Condition | null, harmfulSubstances?: HarmfulSubstances | null, reusePotential?: ReusePotential | null, reusePotentialNotes?: string | null, reusePotentialConclusion?: string | null, locationInBuilding?: string | null, locationInBuildingDetail?: string | null, showInMatching: boolean, reuseValuePerUnit?: number | null, reuseValueTotal?: number | null, reuseValueDescription?: string | null, ru1Explanation?: string | null, ru2Explanation?: string | null, ru3Explanation?: string | null, ru1PerUnit?: number | null, ru2PerUnit?: number | null, ru3PerUnit?: number | null, ruPerUnitSum?: number | null, fallbackLevel?: string | null, fallbackLevelCO2PerUnit?: number | null, fallbackLevelCO2Total?: number | null, co2SavingsPerUnit?: number | null, ru1Total?: number | null, ru2Total?: number | null, ru3Total?: number | null, ruTotalSum?: number | null, co2SavingsTotal?: number | null, co2Unit?: QuantityUnit | null, co2QuantityUsed?: number | null, transportDistanceInKm?: number | null, transportVehicleName?: string | null, dimensionsNotes?: string | null, demolitionPhase?: string | null, potentialInterests?: string | null, warrantyDetails?: string | null, storageLocationNotes?: string | null, categoryId?: { __typename?: 'ReferenceId', id: string } | null, dimensions?: Array<{ __typename?: 'Dimension', id: string, type?: string | null, width?: number | null, depth?: number | null, height?: number | null, isExact?: boolean | null }> | null, ebkphCategoryId?: { __typename?: 'ReferenceId', id: string } | null, materialsDepot: { __typename?: 'MaterialsDepot', id: string, name: string, shortName: string }, materialsDepotId?: { __typename?: 'ReferenceId', id: string } | null, storageLocationId?: { __typename?: 'ReferenceId', id: string } | null, contacts?: Array<{ __typename?: 'Contact', id: string, type?: string | null, firstLine?: string | null, firstName?: string | null, lastName?: string | null, street?: string | null, postalCode?: string | null, city?: string | null, country?: string | null, canton?: string | null, notes?: string | null, contact1?: string | null, contact2?: string | null }> | null, assets?: Array<{ __typename?: 'BuildingComponentAssetReference', id: string, tags?: Array<string> | null, createdAt: any, updatedAt: any, asset: { __typename?: 'AppAsset', id: string, url?: string | null, mimeType: string } }> | null, mainImageId?: { __typename?: 'AppAsset', id: string, url?: string | null } | null, searchRequestInterests: Array<{ __typename?: 'SearchRequestInterest', id: string }> }
  & { ' $fragmentRefs'?: { 'BuildingComponentReferenceSelectorFragment': BuildingComponentReferenceSelectorFragment } }
) & { ' $fragmentName'?: 'BuildingComponentFragment' };

export type BuildingComponentReferenceSelectorFragment = { __typename?: 'BuildingComponent', id: string, name?: string | null, componentId?: string | null, quantity?: number | null, searchRequestInterests: Array<{ __typename?: 'SearchRequestInterest', id: string }> } & { ' $fragmentName'?: 'BuildingComponentReferenceSelectorFragment' };

export type BuildingComponentReferenceQueryVariables = Exact<{
  where?: InputMaybe<BuildingComponentWhereInput>;
  orderBy?: InputMaybe<Array<BuildingComponentOrderByInput> | BuildingComponentOrderByInput>;
}>;


export type BuildingComponentReferenceQuery = { __typename?: 'Query', buildingComponents: Array<(
    { __typename?: 'BuildingComponent', id: string }
    & { ' $fragmentRefs'?: { 'BuildingComponentReferenceSelectorFragment': BuildingComponentReferenceSelectorFragment } }
  )> };

export type CategoriesTableQueryVariables = Exact<{
  where?: InputMaybe<CategoryWhereInput>;
  orderBy?: InputMaybe<Array<CategoryOrderByInput> | CategoryOrderByInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CategoriesTableQuery = { __typename?: 'Query', categoriesCount: number, categories: Array<{ __typename?: 'Category', id: string, name: string, sortOrder?: number | null }> };

export type CreateOneCategoryMutationVariables = Exact<{
  data: CategoryCreateInput;
}>;


export type CreateOneCategoryMutation = { __typename?: 'Mutation', createOneCategory: (
    { __typename?: 'Category', id: string }
    & { ' $fragmentRefs'?: { 'CategoryFragment': CategoryFragment } }
  ) };

export type UpdateOneCategoryMutationVariables = Exact<{
  where: EntityIdInput;
  data: CategoryUpdateInput;
}>;


export type UpdateOneCategoryMutation = { __typename?: 'Mutation', updateOneCategory: (
    { __typename?: 'Category', id: string }
    & { ' $fragmentRefs'?: { 'CategoryFragment': CategoryFragment } }
  ) };

export type OneCategoryQueryVariables = Exact<{
  where: EntityIdInput;
}>;


export type OneCategoryQuery = { __typename?: 'Query', category?: (
    { __typename?: 'Category', id: string }
    & { ' $fragmentRefs'?: { 'CategoryFragment': CategoryFragment } }
  ) | null };

export type CategoryFragment = { __typename?: 'Category', id: string, name: string, sortOrder?: number | null, description?: string | null, parent?: { __typename?: 'Category', id: string } | null } & { ' $fragmentName'?: 'CategoryFragment' };

export type CategoryReferenceSelectorFragment = { __typename?: 'Category', id: string, name: string, parent?: { __typename?: 'Category', id: string, name: string } | null } & { ' $fragmentName'?: 'CategoryReferenceSelectorFragment' };

export type CategoriesReferenceQueryVariables = Exact<{
  where?: InputMaybe<CategoryWhereInput>;
  orderBy?: InputMaybe<Array<CategoryOrderByInput> | CategoryOrderByInput>;
}>;


export type CategoriesReferenceQuery = { __typename?: 'Query', categoriesCount: number, categories: Array<(
    { __typename?: 'Category', id: string }
    & { ' $fragmentRefs'?: { 'CategoryReferenceSelectorFragment': CategoryReferenceSelectorFragment } }
  )> };

export type CategoriesQueryVariables = Exact<{
  where?: InputMaybe<CategoryWhereInput>;
  orderBy?: InputMaybe<Array<CategoryOrderByInput> | CategoryOrderByInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CategoriesQuery = { __typename?: 'Query', categoriesCount: number, categories: Array<{ __typename?: 'Category', id: string, name: string }> };

export type ContactReferenceSelectorFragment = { __typename?: 'Contact', id: string, firstName?: string | null, lastName?: string | null, postalCode?: string | null, city?: string | null } & { ' $fragmentName'?: 'ContactReferenceSelectorFragment' };

export type ContactReferenceQueryVariables = Exact<{
  where?: InputMaybe<ContactWhereInput>;
  orderBy?: InputMaybe<Array<ContactOrderByInput> | ContactOrderByInput>;
}>;


export type ContactReferenceQuery = { __typename?: 'Query', contactsCount: number, contacts: Array<(
    { __typename?: 'Contact', id: string }
    & { ' $fragmentRefs'?: { 'ContactReferenceSelectorFragment': ContactReferenceSelectorFragment } }
  )> };

export type EbkphCategoriesTableQueryVariables = Exact<{
  where?: InputMaybe<EbkphCategoryWhereInput>;
  orderBy?: InputMaybe<Array<EbkphCategoryOrderByInput> | EbkphCategoryOrderByInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type EbkphCategoriesTableQuery = { __typename?: 'Query', ebkphCategoriesCount: number, ebkphCategories: Array<(
    { __typename?: 'EbkphCategory' }
    & { ' $fragmentRefs'?: { 'EbkphCategoryFragment': EbkphCategoryFragment } }
  )> };

export type CreateOneEbkphCategoryMutationVariables = Exact<{
  data: EbkphCategoryCreateInput;
}>;


export type CreateOneEbkphCategoryMutation = { __typename?: 'Mutation', createOneEbkphCategory: (
    { __typename?: 'EbkphCategory', id: string }
    & { ' $fragmentRefs'?: { 'EbkphCategoryFragment': EbkphCategoryFragment } }
  ) };

export type UpdateOneEbkphCategoryMutationVariables = Exact<{
  where: EntityIdInput;
  data: EbkphCategoryUpdateInput;
}>;


export type UpdateOneEbkphCategoryMutation = { __typename?: 'Mutation', updateOneEbkphCategory: (
    { __typename?: 'EbkphCategory', id: string }
    & { ' $fragmentRefs'?: { 'EbkphCategoryFragment': EbkphCategoryFragment } }
  ) };

export type OneEbkphCategoryQueryVariables = Exact<{
  where: EntityIdInput;
}>;


export type OneEbkphCategoryQuery = { __typename?: 'Query', ebkphCategory?: (
    { __typename?: 'EbkphCategory', id: string }
    & { ' $fragmentRefs'?: { 'EbkphCategoryFragment': EbkphCategoryFragment } }
  ) | null };

export type EbkphCategoryReferenceSelectorFragment = { __typename?: 'EbkphCategory', id: string, name: string, description?: string | null, parent?: { __typename?: 'EbkphCategory', id: string } | null } & { ' $fragmentName'?: 'EbkphCategoryReferenceSelectorFragment' };

export type EbkphCategoriesReferenceQueryVariables = Exact<{
  where?: InputMaybe<EbkphCategoryWhereInput>;
  orderBy?: InputMaybe<Array<EbkphCategoryOrderByInput> | EbkphCategoryOrderByInput>;
}>;


export type EbkphCategoriesReferenceQuery = { __typename?: 'Query', ebkphCategoriesCount: number, ebkphCategories: Array<(
    { __typename?: 'EbkphCategory', id: string }
    & { ' $fragmentRefs'?: { 'EbkphCategoryReferenceSelectorFragment': EbkphCategoryReferenceSelectorFragment } }
  )> };

export type EbkphCategoriesQueryVariables = Exact<{
  where?: InputMaybe<EbkphCategoryWhereInput>;
  orderBy?: InputMaybe<Array<EbkphCategoryOrderByInput> | EbkphCategoryOrderByInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type EbkphCategoriesQuery = { __typename?: 'Query', ebkphCategoriesCount: number, ebkphCategories: Array<{ __typename?: 'EbkphCategory', id: string, name: string }> };

export type EbkphCategoryFragment = { __typename?: 'EbkphCategory', id: string, name: string, description?: string | null, parentId?: { __typename?: 'EbkphCategory', id: string, name: string } | null } & { ' $fragmentName'?: 'EbkphCategoryFragment' };

export type BuildingComponentsQueryQueryVariables = Exact<{
  where?: InputMaybe<BuildingComponentWhereInput>;
  orderBy?: InputMaybe<Array<BuildingComponentOrderByInput> | BuildingComponentOrderByInput>;
}>;


export type BuildingComponentsQueryQuery = { __typename?: 'Query', buildingComponents: Array<(
    { __typename?: 'BuildingComponent', id: string, name?: string | null, componentId?: string | null, updatedAt: any, quantity?: number | null, quantityUnit?: QuantityUnit | null, dimensions?: Array<{ __typename?: 'Dimension', id: string, depth?: number | null, height?: number | null, width?: number | null, type?: string | null, unit?: string | null }> | null, category?: { __typename?: 'Category', id: string, name: string } | null, materialsDepot: { __typename?: 'MaterialsDepot', id: string, shortName: string }, storageLocation?: { __typename?: 'StorageLocation', id: string, name: string } | null, searchRequestInterests: Array<{ __typename?: 'SearchRequestInterest', id: string }> }
    & { ' $fragmentRefs'?: { 'BuildingComponent_ListItemFragment': BuildingComponent_ListItemFragment } }
  )> };

export type SearchRequestsQueryQueryVariables = Exact<{
  where?: InputMaybe<SearchRequestWhereInput>;
  orderBy?: InputMaybe<Array<SearchRequestOrderByInput> | SearchRequestOrderByInput>;
}>;


export type SearchRequestsQueryQuery = { __typename?: 'Query', searchRequests: Array<{ __typename?: 'SearchRequest', id: string, buildingComponentName?: string | null, quantity?: any | null, updatedAt: any, quantityUnit?: QuantityUnit | null, project: { __typename?: 'Project', id: string, shortName: string } }> };

export type MaterialsDepotImagesFragment = { __typename?: 'MaterialsDepot', shortName: string, assets?: Array<{ __typename?: 'MaterialsDepotAssetReference', id: string, tags?: Array<string> | null, asset: { __typename?: 'AppAsset', id: string, url?: string | null, originalFilename: string, mimeType: string, updatedAt: any } }> | null, buildingComponents: Array<{ __typename?: 'BuildingComponent', id: string, componentId?: string | null, assets?: Array<{ __typename?: 'BuildingComponentAssetReference', id: string, tags?: Array<string> | null, asset: { __typename?: 'AppAsset', id: string, url?: string | null, originalFilename: string, mimeType: string, updatedAt: any } }> | null }> } & { ' $fragmentName'?: 'MaterialsDepotImagesFragment' };

export type MaterialsDepotImagesQueryVariables = Exact<{
  where: EntityIdInput;
}>;


export type MaterialsDepotImagesQuery = { __typename?: 'Query', materialsDepot?: (
    { __typename?: 'MaterialsDepot', id: string, shortName: string }
    & { ' $fragmentRefs'?: { 'MaterialsDepotImagesFragment': MaterialsDepotImagesFragment } }
  ) | null };

export type MaterialsDepot_ListFragment = (
  { __typename?: 'MaterialsDepot', id: string }
  & { ' $fragmentRefs'?: { 'MaterialsDepot_ListItemFragment': MaterialsDepot_ListItemFragment } }
) & { ' $fragmentName'?: 'MaterialsDepot_ListFragment' };

export type MaterialsDepotListQueryVariables = Exact<{
  where?: InputMaybe<MaterialsDepotWhereInput>;
  orderBy?: InputMaybe<Array<MaterialsDepotOrderByInput> | MaterialsDepotOrderByInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
}>;


export type MaterialsDepotListQuery = { __typename?: 'Query', materialsDepotsCount: number, materialsDepots: Array<(
    { __typename?: 'MaterialsDepot', id: string }
    & { ' $fragmentRefs'?: { 'MaterialsDepot_ListFragment': MaterialsDepot_ListFragment } }
  )> };

export type MaterialsDepot_ListItemFragment = { __typename?: 'MaterialsDepot', id: string, shortName: string, name: string, state: MaterialsDepotState, searchInterests?: Array<string> | null, mainImage?: { __typename?: 'AppAsset', id: string, url?: string | null } | null, buildingComponents: Array<{ __typename?: 'BuildingComponent', id: string, name?: string | null }> } & { ' $fragmentName'?: 'MaterialsDepot_ListItemFragment' };

export type CantonByPostalCodeAndCityQueryQueryVariables = Exact<{
  input: CantonByPostalCodeAndCityInput;
}>;


export type CantonByPostalCodeAndCityQueryQuery = { __typename?: 'Query', cantonByPostalCodeAndCity: string };

export type MaterialsDepotReferenceQueryVariables = Exact<{
  materialsDepotId: Scalars['String']['input'];
}>;


export type MaterialsDepotReferenceQuery = { __typename?: 'Query', materialsDepot?: { __typename?: 'MaterialsDepot', id: string, shortName: string } | null };

export type CreateOneMaterialsDepotMutationVariables = Exact<{
  data: MaterialsDepotCreateInput;
}>;


export type CreateOneMaterialsDepotMutation = { __typename?: 'Mutation', createOneMaterialsDepot: (
    { __typename?: 'MaterialsDepot', id: string }
    & { ' $fragmentRefs'?: { 'MaterialsDepotFragment': MaterialsDepotFragment } }
  ) };

export type UpdateOneMaterialsDepotMutationVariables = Exact<{
  where: EntityIdInput;
  data: MaterialsDepotUpdateInput;
}>;


export type UpdateOneMaterialsDepotMutation = { __typename?: 'Mutation', updateOneMaterialsDepot: (
    { __typename?: 'MaterialsDepot', id: string }
    & { ' $fragmentRefs'?: { 'MaterialsDepotFragment': MaterialsDepotFragment } }
  ) };

export type OneMaterialsDepotQueryVariables = Exact<{
  where: EntityIdInput;
}>;


export type OneMaterialsDepotQuery = { __typename?: 'Query', materialsDepot?: (
    { __typename?: 'MaterialsDepot', id: string, shortName: string }
    & { ' $fragmentRefs'?: { 'MaterialsDepotFragment': MaterialsDepotFragment;'MaterialsDepotReferenceSelectorFragment': MaterialsDepotReferenceSelectorFragment } }
  ) | null };

export type CreateMaterialsDepotDefaultsQueryVariables = Exact<{ [key: string]: never; }>;


export type CreateMaterialsDepotDefaultsQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string } | null };

export type MaterialsDepotFragment = (
  { __typename?: 'MaterialsDepot', id: string, state: MaterialsDepotState, shortName: string, name: string, googleMapsLink?: string | null, complex?: string | null, notes?: string | null, historyNotes?: string | null, typology?: string | null, interventionDepth?: string | null, phase?: string | null, reUseRating?: number | null, constructionYear?: number | null, constructionYearExact?: boolean | null, city?: string | null, country?: string | null, postalCode?: string | null, canton?: string | null, street?: string | null, updatedAt: any, assets?: Array<{ __typename?: 'MaterialsDepotAssetReference', id: string, tags?: Array<string> | null, createdAt: any, updatedAt: any, asset: { __typename?: 'AppAsset', id: string, url?: string | null, originalFilename: string, mimeType: string } }> | null, mainImageId?: { __typename?: 'AppAsset', id: string, originalFilename: string, url?: string | null } | null, contacts?: Array<{ __typename?: 'Contact', id: string, type?: string | null, firstLine?: string | null, firstName?: string | null, lastName?: string | null, street?: string | null, postalCode?: string | null, canton?: string | null, city?: string | null, country?: string | null, notes?: string | null, contact1?: string | null, contact2?: string | null }> | null, tasks?: Array<{ __typename?: 'Task', id: string, name: string, closedAt?: any | null, dueDate?: any | null, createdAt: any }> | null, timelines: Array<{ __typename?: 'MaterialsDepotTimeline', id: string, description: string, startDate?: any | null, endDate?: any | null, createdAt: any }>, buildingComponents: Array<{ __typename?: 'BuildingComponent', id: string, componentId?: string | null, assets?: Array<{ __typename?: 'BuildingComponentAssetReference', id: string, tags?: Array<string> | null, createdAt: any, updatedAt: any, asset: { __typename?: 'AppAsset', id: string, url?: string | null, originalFilename: string, mimeType: string } }> | null }>, responsableUserId?: { __typename?: 'ReferenceId', id: string } | null }
  & { ' $fragmentRefs'?: { 'MaterialsDepotReferenceSelectorFragment': MaterialsDepotReferenceSelectorFragment } }
) & { ' $fragmentName'?: 'MaterialsDepotFragment' };

export type DeleteOneMaterialsDepotMutationVariables = Exact<{
  where: EntityIdInput;
}>;


export type DeleteOneMaterialsDepotMutation = { __typename?: 'Mutation', deleteOneMaterialsDepot: (
    { __typename?: 'MaterialsDepot', id: string }
    & { ' $fragmentRefs'?: { 'MaterialsDepotFragment': MaterialsDepotFragment } }
  ) };

export type MaterialsDepotReferenceSelectorFragment = { __typename?: 'MaterialsDepot', id: string, shortName: string, name: string } & { ' $fragmentName'?: 'MaterialsDepotReferenceSelectorFragment' };

export type MaterialsDepotsReferenceQueryVariables = Exact<{
  where?: InputMaybe<MaterialsDepotWhereInput>;
  orderBy?: InputMaybe<Array<MaterialsDepotOrderByInput> | MaterialsDepotOrderByInput>;
}>;


export type MaterialsDepotsReferenceQuery = { __typename?: 'Query', materialsDepots: Array<(
    { __typename?: 'MaterialsDepot', id: string }
    & { ' $fragmentRefs'?: { 'MaterialsDepotReferenceSelectorFragment': MaterialsDepotReferenceSelectorFragment } }
  )> };

export type ProjectImagesFragment = { __typename?: 'Project', id: string, assets?: Array<{ __typename?: 'ProjectAssetReference', id: string, tags?: Array<string> | null, asset: { __typename?: 'AppAsset', id: string, url?: string | null, originalFilename: string, mimeType: string, updatedAt: any } }> | null } & { ' $fragmentName'?: 'ProjectImagesFragment' };

export type ProjectImagesQueryVariables = Exact<{
  where: EntityIdInput;
}>;


export type ProjectImagesQuery = { __typename?: 'Query', project?: (
    { __typename?: 'Project', id: string, shortName: string }
    & { ' $fragmentRefs'?: { 'ProjectImagesFragment': ProjectImagesFragment } }
  ) | null };

export type ProjectsQueryVariables = Exact<{
  where?: InputMaybe<ProjectWhereInput>;
  orderBy?: InputMaybe<Array<ProjectOrderByInput> | ProjectOrderByInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ProjectsQuery = { __typename?: 'Query', projectsCount: number, projects: Array<{ __typename?: 'Project', id: string, name: string, shortName: string, state: ProjectState, phase: ProjectPhase, mainImageId?: { __typename?: 'AppAsset', id: string, url?: string | null } | null, somehowImportantContactWithoutName?: { __typename?: 'Contact', id: string, firstLine?: string | null, firstName?: string | null, lastName?: string | null, canton?: string | null } | null }> };

export type CreateOneProjectMutationVariables = Exact<{
  data: ProjectCreateInput;
}>;


export type CreateOneProjectMutation = { __typename?: 'Mutation', createOneProject: (
    { __typename?: 'Project', id: string, shortName: string, name: string }
    & { ' $fragmentRefs'?: { 'ProjectFragment': ProjectFragment } }
  ) };

export type UpdateOneProjectMutationVariables = Exact<{
  where: EntityIdInput;
  data: ProjectUpdateInput;
}>;


export type UpdateOneProjectMutation = { __typename?: 'Mutation', updateOneProject: (
    { __typename?: 'Project', id: string, shortName: string, name: string }
    & { ' $fragmentRefs'?: { 'ProjectFragment': ProjectFragment } }
  ) };

export type OneProjectQueryVariables = Exact<{
  where: EntityIdInput;
}>;


export type OneProjectQuery = { __typename?: 'Query', project?: (
    { __typename?: 'Project', id: string, name: string, shortName: string }
    & { ' $fragmentRefs'?: { 'ProjectFragment': ProjectFragment } }
  ) | null };

export type ProjectDefaultsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectDefaultsQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string } | null };

export type ProjectFragment = { __typename?: 'Project', id: string, shortName: string, name: string, state: ProjectState, phase: ProjectPhase, city?: string | null, country?: string | null, postalCode?: string | null, street?: string | null, notes?: string | null, responsableUserPM: { __typename?: 'User', id: string }, responsableUserSearch: { __typename?: 'User', id: string }, contacts?: Array<{ __typename?: 'Contact', id: string, type?: string | null, firstLine?: string | null, firstName?: string | null, lastName?: string | null, street?: string | null, postalCode?: string | null, city?: string | null, country?: string | null, canton?: string | null, notes?: string | null, contact1?: string | null, contact2?: string | null }> | null, assets?: Array<{ __typename?: 'ProjectAssetReference', id: string, tags?: Array<string> | null, createdAt: any, updatedAt: any, asset: { __typename?: 'AppAsset', id: string, url?: string | null, mimeType: string } }> | null, mainImageId?: { __typename?: 'AppAsset', id: string, url?: string | null } | null } & { ' $fragmentName'?: 'ProjectFragment' };

export type ProjectReferenceSelectorFragment = { __typename?: 'Project', id: string, shortName: string, name: string } & { ' $fragmentName'?: 'ProjectReferenceSelectorFragment' };

export type ProjectReferenceQueryVariables = Exact<{
  where?: InputMaybe<ProjectWhereInput>;
  orderBy?: InputMaybe<Array<ProjectOrderByInput> | ProjectOrderByInput>;
}>;


export type ProjectReferenceQuery = { __typename?: 'Query', projectsCount: number, projects: Array<(
    { __typename?: 'Project', id: string }
    & { ' $fragmentRefs'?: { 'ProjectReferenceSelectorFragment': ProjectReferenceSelectorFragment } }
  )> };

export type SearchRequestInterestsQueryVariables = Exact<{
  where?: InputMaybe<SearchRequestInterestWhereInput>;
  orderBy?: InputMaybe<Array<SearchRequestInterestOrderByInput> | SearchRequestInterestOrderByInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SearchRequestInterestsQuery = { __typename?: 'Query', searchRequestInterestsCount: number, searchRequestInterests: Array<{ __typename?: 'SearchRequestInterest', id: string, state: SearchRequestInterestState, rejectionReason?: string | null, rejectedAt?: any | null, createdAt: any, responsibleUser: { __typename?: 'User', id: string, email: string }, searchRequest: { __typename?: 'SearchRequest', id: string, buildingComponentName?: string | null, assignedBuildingComponentsCount: number, reservedBuildingComponentsCount: number, quantity?: any | null, huntingStatusNotes?: string | null, quantityUnit?: QuantityUnit | null, deadlineFound?: any | null, category?: { __typename?: 'Category', id: string, name: string } | null, project: { __typename?: 'Project', id: string, name: string, shortName: string }, ebkphCategory?: { __typename?: 'EbkphCategory', id: string, name: string } | null }, buildingComponent: { __typename?: 'BuildingComponent', id: string, name?: string | null, quantity?: number | null, quantityUnit?: QuantityUnit | null, materialsDepot: { __typename?: 'MaterialsDepot', id: string, shortName: string } } }> };

export type CreateOneSearchRequestInterestMutationVariables = Exact<{
  data: SearchRequestInterestCreateInput;
}>;


export type CreateOneSearchRequestInterestMutation = { __typename?: 'Mutation', createOneSearchRequestInterest: (
    { __typename?: 'SearchRequestInterest', id: string, state: SearchRequestInterestState }
    & { ' $fragmentRefs'?: { 'SearchRequestInterestFragment': SearchRequestInterestFragment } }
  ) };

export type UpdateOneSearchRequestInterestMutationVariables = Exact<{
  where: EntityIdInput;
  data: SearchRequestInterestUpdateInput;
}>;


export type UpdateOneSearchRequestInterestMutation = { __typename?: 'Mutation', updateOneSearchRequestInterest: (
    { __typename?: 'SearchRequestInterest', id: string, state: SearchRequestInterestState }
    & { ' $fragmentRefs'?: { 'SearchRequestInterestFragment': SearchRequestInterestFragment } }
  ) };

export type OneSearchRequestInterestQueryVariables = Exact<{
  where: EntityIdInput;
}>;


export type OneSearchRequestInterestQuery = { __typename?: 'Query', searchRequestInterest?: (
    { __typename?: 'SearchRequestInterest', id: string, state: SearchRequestInterestState, searchRequest: { __typename?: 'SearchRequest', id: string, project: { __typename?: 'Project', id: string, shortName: string } } }
    & { ' $fragmentRefs'?: { 'SearchRequestInterestFragment': SearchRequestInterestFragment } }
  ) | null };

export type SearchRequestInterestDefaultsQueryVariables = Exact<{ [key: string]: never; }>;


export type SearchRequestInterestDefaultsQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string } | null };

export type RejectOneSearchRequestInterestMutationVariables = Exact<{
  input: RejectSearchRequestInterestInput;
}>;


export type RejectOneSearchRequestInterestMutation = { __typename?: 'Mutation', rejectSearchRequestInterest: (
    { __typename?: 'SearchRequestInterest', id: string }
    & { ' $fragmentRefs'?: { 'SearchRequestInterestFragment': SearchRequestInterestFragment } }
  ) };

export type AcceptOneSearchRequestInterestMutationVariables = Exact<{
  input: AcceptSearchRequestInterestInput;
}>;


export type AcceptOneSearchRequestInterestMutation = { __typename?: 'Mutation', acceptSearchRequestInterest: (
    { __typename?: 'SearchRequestInterest', id: string }
    & { ' $fragmentRefs'?: { 'SearchRequestInterestFragment': SearchRequestInterestFragment } }
  ) };

export type DeleteOneSearchRequestInterestMutationVariables = Exact<{
  where: EntityIdInput;
}>;


export type DeleteOneSearchRequestInterestMutation = { __typename?: 'Mutation', deleteOneSearchRequestInterest: (
    { __typename?: 'SearchRequestInterest', id: string }
    & { ' $fragmentRefs'?: { 'SearchRequestInterestFragment': SearchRequestInterestFragment } }
  ) };

export type SearchRequestInterestFragment = { __typename?: 'SearchRequestInterest', id: string, state: SearchRequestInterestState, rejectedAt?: any | null, rejectionReason?: string | null, notes?: string | null, responsibleUser: { __typename?: 'User', id: string }, searchRequest: { __typename?: 'SearchRequest', id: string }, buildingComponent: { __typename?: 'BuildingComponent', id: string } } & { ' $fragmentName'?: 'SearchRequestInterestFragment' };

export type SearchRequestInterestReferenceSelectorFragment = { __typename?: 'SearchRequestInterest', id: string, state: SearchRequestInterestState } & { ' $fragmentName'?: 'SearchRequestInterestReferenceSelectorFragment' };

export type SearchRequestInterestReferenceQueryVariables = Exact<{
  where?: InputMaybe<SearchRequestInterestWhereInput>;
  orderBy?: InputMaybe<Array<SearchRequestInterestOrderByInput> | SearchRequestInterestOrderByInput>;
}>;


export type SearchRequestInterestReferenceQuery = { __typename?: 'Query', searchRequestInterestsCount: number, searchRequestInterests: Array<(
    { __typename?: 'SearchRequestInterest', id: string }
    & { ' $fragmentRefs'?: { 'SearchRequestInterestReferenceSelectorFragment': SearchRequestInterestReferenceSelectorFragment } }
  )> };

export type SearchRequestImagesFragment = { __typename?: 'SearchRequest', id: string, assets?: Array<{ __typename?: 'SearchRequestAssetReference', id: string, tags?: Array<string> | null, asset: { __typename?: 'AppAsset', id: string, url?: string | null, originalFilename: string, mimeType: string, updatedAt: any } }> | null } & { ' $fragmentName'?: 'SearchRequestImagesFragment' };

export type SearchRequestImagesQueryVariables = Exact<{
  where: EntityIdInput;
}>;


export type SearchRequestImagesQuery = { __typename?: 'Query', searchRequest?: (
    { __typename?: 'SearchRequest', id: string, buildingComponentName?: string | null, project: { __typename?: 'Project', id: string, name: string, shortName: string } }
    & { ' $fragmentRefs'?: { 'SearchRequestImagesFragment': SearchRequestImagesFragment } }
  ) | null };

export type SearchRequestsQueryVariables = Exact<{
  where?: InputMaybe<SearchRequestWhereInput>;
  orderBy?: InputMaybe<Array<SearchRequestOrderByInput> | SearchRequestOrderByInput>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SearchRequestsQuery = { __typename?: 'Query', searchRequestsCount: number, searchRequests: Array<{ __typename?: 'SearchRequest', id: string, state: SearchRequestState, reservedBuildingComponentsCount: number, assignedBuildingComponentsCount: number, buildingComponentName?: string | null, quantity?: any | null, quantityUnit?: QuantityUnit | null, deadlineFound?: any | null, responsibleUser: { __typename?: 'User', id: string, email: string }, project: { __typename?: 'Project', id: string, shortName: string }, category?: { __typename?: 'Category', id: string, name: string } | null, ebkphCategory?: { __typename?: 'EbkphCategory', id: string, name: string } | null }> };

export type SearchRequestProjectQueryVariables = Exact<{
  where: EntityIdInput;
}>;


export type SearchRequestProjectQuery = { __typename?: 'Query', searchRequest?: { __typename?: 'SearchRequest', id: string, project: { __typename?: 'Project', id: string, shortName: string } } | null };

export type CreateOneSearchRequestMutationVariables = Exact<{
  data: SearchRequestCreateInput;
}>;


export type CreateOneSearchRequestMutation = { __typename?: 'Mutation', createOneSearchRequest: (
    { __typename?: 'SearchRequest', id: string, project: { __typename?: 'Project', id: string, shortName: string } }
    & { ' $fragmentRefs'?: { 'SearchRequestFragment': SearchRequestFragment } }
  ) };

export type UpdateOneSearchRequestMutationVariables = Exact<{
  where: EntityIdInput;
  data: SearchRequestUpdateInput;
}>;


export type UpdateOneSearchRequestMutation = { __typename?: 'Mutation', updateOneSearchRequest: (
    { __typename?: 'SearchRequest', id: string, project: { __typename?: 'Project', id: string, shortName: string } }
    & { ' $fragmentRefs'?: { 'SearchRequestFragment': SearchRequestFragment } }
  ) };

export type OneSearchRequestQueryVariables = Exact<{
  where: EntityIdInput;
}>;


export type OneSearchRequestQuery = { __typename?: 'Query', searchRequest?: (
    { __typename?: 'SearchRequest', id: string, project: { __typename?: 'Project', id: string, shortName: string } }
    & { ' $fragmentRefs'?: { 'SearchRequestFragment': SearchRequestFragment } }
  ) | null };

export type SearchRequestDefaultsQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;


export type SearchRequestDefaultsQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string } | null, project?: { __typename?: 'Project', id: string, shortName: string } | null };

export type SearchRequestFragment = { __typename?: 'SearchRequest', id: string, state: SearchRequestState, buildingComponentName?: string | null, buildingComponentDescription?: string | null, quantity?: any | null, quantityUnit?: QuantityUnit | null, deadlineFound?: any | null, deadlineShipment?: any | null, comments?: string | null, budgetInRappens?: number | null, budgetNotes?: string | null, searchConceptNotes?: string | null, huntingStatusNotes?: string | null, fireProtectionNotes?: string | null, soundProofNotes?: string | null, securityNotes?: string | null, fallbackLevel?: string | null, fallbackLevelCO2PerUnit?: number | null, fallbackLevelCO2Total?: number | null, createdAt: any, projectId?: { __typename?: 'ReferenceId', id: string } | null, responsibleUserId?: { __typename?: 'ReferenceId', id: string } | null, categoryId?: { __typename?: 'ReferenceId', id: string } | null, ebkphCategoryId?: { __typename?: 'ReferenceId', id: string } | null, dimensionRanges?: Array<{ __typename?: 'DimensionRange', id: string, minWidth?: number | null, maxWidth?: number | null, type?: string | null, minHeight?: number | null, maxHeight?: number | null, minDepth?: number | null, maxDepth?: number | null }> | null, assets?: Array<{ __typename?: 'SearchRequestAssetReference', id: string, tags?: Array<string> | null, createdAt: any, updatedAt: any, asset: { __typename?: 'AppAsset', id: string, url?: string | null, mimeType: string } }> | null } & { ' $fragmentName'?: 'SearchRequestFragment' };

export type SearchRequestReferenceSelectorFragment = { __typename?: 'SearchRequest', id: string, state: SearchRequestState, buildingComponentName?: string | null, createdAt: any, project: { __typename?: 'Project', shortName: string, name: string }, responsibleUser: { __typename?: 'User', email: string } } & { ' $fragmentName'?: 'SearchRequestReferenceSelectorFragment' };

export type SearchRequestReferenceQueryVariables = Exact<{
  where?: InputMaybe<SearchRequestWhereInput>;
  orderBy?: InputMaybe<Array<SearchRequestOrderByInput> | SearchRequestOrderByInput>;
}>;


export type SearchRequestReferenceQuery = { __typename?: 'Query', searchRequestsCount: number, searchRequests: Array<(
    { __typename?: 'SearchRequest', id: string }
    & { ' $fragmentRefs'?: { 'SearchRequestReferenceSelectorFragment': SearchRequestReferenceSelectorFragment } }
  )> };

export type StorageLocationImagesFragment = { __typename?: 'StorageLocation', id: string, name: string, assets?: Array<{ __typename?: 'StorageLocationAssetReference', id: string, tags?: Array<string> | null, asset: { __typename?: 'AppAsset', id: string, url?: string | null, mimeType: string, originalFilename: string, updatedAt: any } }> | null, buildingComponents: Array<{ __typename?: 'BuildingComponent', id: string, componentId?: string | null, assets?: Array<{ __typename?: 'BuildingComponentAssetReference', id: string, tags?: Array<string> | null, asset: { __typename?: 'AppAsset', id: string, url?: string | null, mimeType: string, originalFilename: string, updatedAt: any } }> | null }> } & { ' $fragmentName'?: 'StorageLocationImagesFragment' };

export type StorageLocationImagesQueryVariables = Exact<{
  where: EntityIdInput;
}>;


export type StorageLocationImagesQuery = { __typename?: 'Query', storageLocation?: (
    { __typename?: 'StorageLocation', id: string, name: string }
    & { ' $fragmentRefs'?: { 'StorageLocationImagesFragment': StorageLocationImagesFragment } }
  ) | null };

export type StorageLocation_ListFragment = (
  { __typename?: 'StorageLocation', id: string }
  & { ' $fragmentRefs'?: { 'StorageLocation_ListItemFragment': StorageLocation_ListItemFragment } }
) & { ' $fragmentName'?: 'StorageLocation_ListFragment' };

export type StorageLocationListQueryVariables = Exact<{
  where?: InputMaybe<StorageLocationWhereInput>;
  orderBy?: InputMaybe<Array<StorageLocationOrderByInput> | StorageLocationOrderByInput>;
}>;


export type StorageLocationListQuery = { __typename?: 'Query', storageLocationsCount: number, storageLocations: Array<(
    { __typename?: 'StorageLocation', id: string, name: string }
    & { ' $fragmentRefs'?: { 'StorageLocation_ListFragment': StorageLocation_ListFragment } }
  )> };

export type StorageLocation_ListItemFragment = { __typename?: 'StorageLocation', id: string, name: string, country?: string | null, canton?: string | null, city?: string | null, street?: string | null, googleMapsLink?: string | null, postalCode?: string | null, notes?: string | null, mainImage?: { __typename?: 'AppAsset', id: string, url?: string | null } | null, contacts?: Array<{ __typename?: 'Contact', id: string }> | null, assets?: Array<{ __typename?: 'StorageLocationAssetReference', id: string }> | null, buildingComponents: Array<{ __typename?: 'BuildingComponent', id: string }> } & { ' $fragmentName'?: 'StorageLocation_ListItemFragment' };

export type StorageLocationReferenceQueryVariables = Exact<{
  storageLocationId: Scalars['String']['input'];
}>;


export type StorageLocationReferenceQuery = { __typename?: 'Query', storageLocation?: { __typename?: 'StorageLocation', id: string, name: string } | null };

export type CreateOneStorageLocationMutationVariables = Exact<{
  data: StorageLocationCreateInput;
}>;


export type CreateOneStorageLocationMutation = { __typename?: 'Mutation', createOneStorageLocation: (
    { __typename?: 'StorageLocation', id: string, name: string }
    & { ' $fragmentRefs'?: { 'StorageLocationFragment': StorageLocationFragment } }
  ) };

export type UpdateOneStorageLocationMutationVariables = Exact<{
  where: EntityIdInput;
  data: StorageLocationUpdateInput;
}>;


export type UpdateOneStorageLocationMutation = { __typename?: 'Mutation', updateOneStorageLocation: (
    { __typename?: 'StorageLocation', id: string, name: string }
    & { ' $fragmentRefs'?: { 'StorageLocationFragment': StorageLocationFragment } }
  ) };

export type OneStorageLocationQueryVariables = Exact<{
  where: EntityIdInput;
}>;


export type OneStorageLocationQuery = { __typename?: 'Query', storageLocation?: (
    { __typename?: 'StorageLocation', id: string, name: string }
    & { ' $fragmentRefs'?: { 'StorageLocationFragment': StorageLocationFragment;'StorageLocationReferenceSelectorFragment': StorageLocationReferenceSelectorFragment } }
  ) | null };

export type StorageLocationReferenceSelectorFragment = { __typename?: 'StorageLocation', id: string, name: string } & { ' $fragmentName'?: 'StorageLocationReferenceSelectorFragment' };

export type StorageLocationsReferenceQueryVariables = Exact<{
  where?: InputMaybe<StorageLocationWhereInput>;
  orderBy?: InputMaybe<Array<StorageLocationOrderByInput> | StorageLocationOrderByInput>;
}>;


export type StorageLocationsReferenceQuery = { __typename?: 'Query', storageLocations: Array<(
    { __typename?: 'StorageLocation', id: string, name: string }
    & { ' $fragmentRefs'?: { 'StorageLocationReferenceSelectorFragment': StorageLocationReferenceSelectorFragment } }
  )> };

export type StorageLocationFragment = { __typename?: 'StorageLocation', id: string, name: string, country?: string | null, canton?: string | null, city?: string | null, street?: string | null, googleMapsLink?: string | null, postalCode?: string | null, notes?: string | null, mainImage?: { __typename?: 'AppAsset', id: string, url?: string | null } | null, contacts?: Array<{ __typename?: 'Contact', id: string, type?: string | null, firstLine?: string | null, firstName?: string | null, lastName?: string | null, street?: string | null, postalCode?: string | null, canton?: string | null, city?: string | null, country?: string | null, notes?: string | null, contact1?: string | null, contact2?: string | null }> | null, assets?: Array<{ __typename?: 'StorageLocationAssetReference', id: string, tags?: Array<string> | null, createdAt: any, updatedAt: any, asset: { __typename?: 'AppAsset', id: string, url?: string | null, mimeType: string } }> | null, buildingComponents: Array<{ __typename?: 'BuildingComponent', id: string }> } & { ' $fragmentName'?: 'StorageLocationFragment' };

export type CreateStorageLocationDefaultsQueryVariables = Exact<{ [key: string]: never; }>;


export type CreateStorageLocationDefaultsQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string } | null };

export type OneUserQueryVariables = Exact<{
  where: EntityIdInput;
}>;


export type OneUserQuery = { __typename?: 'Query', user?: (
    { __typename?: 'User', id: string }
    & { ' $fragmentRefs'?: { 'UserFragment': UserFragment;'UserReferenceSelectorFragment': UserReferenceSelectorFragment } }
  ) | null };

export type UserFragment = (
  { __typename?: 'User', id: string, email: string, notes?: string | null }
  & { ' $fragmentRefs'?: { 'UserReferenceSelectorFragment': UserReferenceSelectorFragment } }
) & { ' $fragmentName'?: 'UserFragment' };

export type UserReferenceSelectorFragment = { __typename?: 'User', id: string, email: string } & { ' $fragmentName'?: 'UserReferenceSelectorFragment' };

export type UserReferenceQueryVariables = Exact<{
  where?: InputMaybe<UserWhereInput>;
  orderBy?: InputMaybe<Array<UserOrderByInput> | UserOrderByInput>;
}>;


export type UserReferenceQuery = { __typename?: 'Query', usersCount: number, users: Array<(
    { __typename?: 'User', id: string }
    & { ' $fragmentRefs'?: { 'UserReferenceSelectorFragment': UserReferenceSelectorFragment } }
  )> };

export const AutocompleteFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Autocomplete"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Autocomplete"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]} as unknown as DocumentNode<AutocompleteFragment, unknown>;
export const BuildingComponentImagesFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BuildingComponentImages"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingComponent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"componentId"}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<BuildingComponentImagesFragment, unknown>;
export const BuildingComponent_ListItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BuildingComponent_ListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingComponent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"componentSn"}},{"kind":"Field","name":{"kind":"Name","value":"componentId"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"quantityUnit"}},{"kind":"Field","name":{"kind":"Name","value":"materialsDepot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mainImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"searchRequestInterests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<BuildingComponent_ListItemFragment, unknown>;
export const BuildingComponent_ListFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BuildingComponent_List"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingComponent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"materialsDepot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"storageLocation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"searchRequestInterests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BuildingComponent_ListItem"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BuildingComponent_ListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingComponent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"componentSn"}},{"kind":"Field","name":{"kind":"Name","value":"componentId"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"quantityUnit"}},{"kind":"Field","name":{"kind":"Name","value":"materialsDepot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mainImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"searchRequestInterests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<BuildingComponent_ListFragment, unknown>;
export const BuildingComponentReferenceSelectorFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BuildingComponentReferenceSelector"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingComponent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"componentId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"searchRequestInterests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<BuildingComponentReferenceSelectorFragment, unknown>;
export const BuildingComponentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BuildingComponent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingComponent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"componentId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"quantityExact"}},{"kind":"Field","name":{"kind":"Name","value":"quantityUnit"}},{"kind":"Field","name":{"kind":"Name","value":"quantitySpare"}},{"kind":"Field","name":{"kind":"Name","value":"quantityNotes"}},{"kind":"Field","name":{"kind":"Name","value":"sparePartsNotes"}},{"kind":"Field","name":{"kind":"Name","value":"constructionYear"}},{"kind":"Field","name":{"kind":"Name","value":"constructionYearExact"}},{"kind":"Field","name":{"kind":"Name","value":"constructionYearNotes"}},{"kind":"Field","name":{"kind":"Name","value":"co2Savings"}},{"kind":"Field","name":{"kind":"Name","value":"co2SavingsExact"}},{"kind":"Field","name":{"kind":"Name","value":"condition"}},{"kind":"Field","name":{"kind":"Name","value":"harmfulSubstances"}},{"kind":"Field","name":{"kind":"Name","value":"reusePotential"}},{"kind":"Field","name":{"kind":"Name","value":"reusePotentialNotes"}},{"kind":"Field","name":{"kind":"Name","value":"reusePotentialConclusion"}},{"kind":"Field","name":{"kind":"Name","value":"locationInBuilding"}},{"kind":"Field","name":{"kind":"Name","value":"locationInBuildingDetail"}},{"kind":"Field","name":{"kind":"Name","value":"showInMatching"}},{"kind":"Field","name":{"kind":"Name","value":"reuseValuePerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"reuseValueTotal"}},{"kind":"Field","name":{"kind":"Name","value":"reuseValueDescription"}},{"kind":"Field","name":{"kind":"Name","value":"ru1Explanation"}},{"kind":"Field","name":{"kind":"Name","value":"ru2Explanation"}},{"kind":"Field","name":{"kind":"Name","value":"ru3Explanation"}},{"kind":"Field","name":{"kind":"Name","value":"ru1PerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"ru2PerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"ru3PerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"ruPerUnitSum"}},{"kind":"Field","name":{"kind":"Name","value":"fallbackLevel"}},{"kind":"Field","name":{"kind":"Name","value":"fallbackLevelCO2PerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"fallbackLevelCO2Total"}},{"kind":"Field","name":{"kind":"Name","value":"co2SavingsPerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"ru1Total"}},{"kind":"Field","name":{"kind":"Name","value":"ru2Total"}},{"kind":"Field","name":{"kind":"Name","value":"ru3Total"}},{"kind":"Field","name":{"kind":"Name","value":"ruTotalSum"}},{"kind":"Field","name":{"kind":"Name","value":"co2SavingsTotal"}},{"kind":"Field","name":{"kind":"Name","value":"co2Unit"}},{"kind":"Field","name":{"kind":"Name","value":"co2QuantityUsed"}},{"kind":"Field","name":{"kind":"Name","value":"transportDistanceInKm"}},{"kind":"Field","name":{"kind":"Name","value":"transportVehicleName"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"depth"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"isExact"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dimensionsNotes"}},{"kind":"Field","name":{"kind":"Name","value":"demolitionPhase"}},{"kind":"Field","name":{"kind":"Name","value":"potentialInterests"}},{"kind":"Field","name":{"kind":"Name","value":"warrantyDetails"}},{"kind":"Field","name":{"kind":"Name","value":"ebkphCategoryId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"materialsDepot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"materialsDepotId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"storageLocationId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"storageLocationNotes"}},{"kind":"Field","name":{"kind":"Name","value":"contacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"firstLine"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"contact1"}},{"kind":"Field","name":{"kind":"Name","value":"contact2"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"mainImageId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"searchRequestInterests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BuildingComponentReferenceSelector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BuildingComponentReferenceSelector"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingComponent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"componentId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"searchRequestInterests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<BuildingComponentFragment, unknown>;
export const CategoryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Category"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sortOrder"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CategoryFragment, unknown>;
export const CategoryReferenceSelectorFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CategoryReferenceSelector"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CategoryReferenceSelectorFragment, unknown>;
export const ContactReferenceSelectorFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactReferenceSelector"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"city"}}]}}]} as unknown as DocumentNode<ContactReferenceSelectorFragment, unknown>;
export const EbkphCategoryReferenceSelectorFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EbkphCategoryReferenceSelector"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EbkphCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<EbkphCategoryReferenceSelectorFragment, unknown>;
export const EbkphCategoryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EbkphCategory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EbkphCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<EbkphCategoryFragment, unknown>;
export const MaterialsDepotImagesFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MaterialsDepotImages"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MaterialsDepot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"componentId"}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MaterialsDepotImagesFragment, unknown>;
export const MaterialsDepot_ListItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MaterialsDepot_ListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MaterialsDepot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"mainImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"searchInterests"}}]}}]} as unknown as DocumentNode<MaterialsDepot_ListItemFragment, unknown>;
export const MaterialsDepot_ListFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MaterialsDepot_List"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MaterialsDepot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"MaterialsDepot_ListItem"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MaterialsDepot_ListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MaterialsDepot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"mainImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"searchInterests"}}]}}]} as unknown as DocumentNode<MaterialsDepot_ListFragment, unknown>;
export const MaterialsDepotReferenceSelectorFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MaterialsDepotReferenceSelector"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MaterialsDepot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<MaterialsDepotReferenceSelectorFragment, unknown>;
export const MaterialsDepotFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MaterialsDepot"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MaterialsDepot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"googleMapsLink"}},{"kind":"Field","name":{"kind":"Name","value":"complex"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"historyNotes"}},{"kind":"Field","name":{"kind":"Name","value":"typology"}},{"kind":"Field","name":{"kind":"Name","value":"interventionDepth"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"reUseRating"}},{"kind":"Field","name":{"kind":"Name","value":"constructionYear"}},{"kind":"Field","name":{"kind":"Name","value":"constructionYearExact"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"mainImageId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"firstLine"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"contact1"}},{"kind":"Field","name":{"kind":"Name","value":"contact2"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"closedAt"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timelines"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"componentId"}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"responsableUserId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"MaterialsDepotReferenceSelector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MaterialsDepotReferenceSelector"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MaterialsDepot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<MaterialsDepotFragment, unknown>;
export const ProjectImagesFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectImages"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<ProjectImagesFragment, unknown>;
export const ProjectFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Project"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"responsableUserPM"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"responsableUserSearch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"contacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"firstLine"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"contact1"}},{"kind":"Field","name":{"kind":"Name","value":"contact2"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"mainImageId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<ProjectFragment, unknown>;
export const ProjectReferenceSelectorFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectReferenceSelector"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<ProjectReferenceSelectorFragment, unknown>;
export const SearchRequestInterestFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SearchRequestInterest"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SearchRequestInterest"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"responsibleUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"searchRequest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"rejectedAt"}},{"kind":"Field","name":{"kind":"Name","value":"rejectionReason"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}}]} as unknown as DocumentNode<SearchRequestInterestFragment, unknown>;
export const SearchRequestInterestReferenceSelectorFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SearchRequestInterestReferenceSelector"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SearchRequestInterest"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}}]}}]} as unknown as DocumentNode<SearchRequestInterestReferenceSelectorFragment, unknown>;
export const SearchRequestImagesFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SearchRequestImages"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SearchRequest"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<SearchRequestImagesFragment, unknown>;
export const SearchRequestFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SearchRequest"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SearchRequest"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponentName"}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponentDescription"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"quantityUnit"}},{"kind":"Field","name":{"kind":"Name","value":"deadlineFound"}},{"kind":"Field","name":{"kind":"Name","value":"deadlineShipment"}},{"kind":"Field","name":{"kind":"Name","value":"comments"}},{"kind":"Field","name":{"kind":"Name","value":"budgetInRappens"}},{"kind":"Field","name":{"kind":"Name","value":"budgetNotes"}},{"kind":"Field","name":{"kind":"Name","value":"searchConceptNotes"}},{"kind":"Field","name":{"kind":"Name","value":"huntingStatusNotes"}},{"kind":"Field","name":{"kind":"Name","value":"fireProtectionNotes"}},{"kind":"Field","name":{"kind":"Name","value":"soundProofNotes"}},{"kind":"Field","name":{"kind":"Name","value":"securityNotes"}},{"kind":"Field","name":{"kind":"Name","value":"fallbackLevel"}},{"kind":"Field","name":{"kind":"Name","value":"fallbackLevelCO2PerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"fallbackLevelCO2Total"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"responsibleUserId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ebkphCategoryId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dimensionRanges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"minWidth"}},{"kind":"Field","name":{"kind":"Name","value":"maxWidth"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"minHeight"}},{"kind":"Field","name":{"kind":"Name","value":"maxHeight"}},{"kind":"Field","name":{"kind":"Name","value":"minDepth"}},{"kind":"Field","name":{"kind":"Name","value":"maxDepth"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}}]}}]}}]} as unknown as DocumentNode<SearchRequestFragment, unknown>;
export const SearchRequestReferenceSelectorFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SearchRequestReferenceSelector"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SearchRequest"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"responsibleUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponentName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<SearchRequestReferenceSelectorFragment, unknown>;
export const StorageLocationImagesFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StorageLocationImages"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StorageLocation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"componentId"}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<StorageLocationImagesFragment, unknown>;
export const StorageLocation_ListItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StorageLocation_ListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StorageLocation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"googleMapsLink"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"mainImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mainImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}}]} as unknown as DocumentNode<StorageLocation_ListItemFragment, unknown>;
export const StorageLocation_ListFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StorageLocation_List"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StorageLocation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"StorageLocation_ListItem"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StorageLocation_ListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StorageLocation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"googleMapsLink"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"mainImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mainImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}}]} as unknown as DocumentNode<StorageLocation_ListFragment, unknown>;
export const StorageLocationReferenceSelectorFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StorageLocationReferenceSelector"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StorageLocation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<StorageLocationReferenceSelectorFragment, unknown>;
export const StorageLocationFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StorageLocation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StorageLocation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"googleMapsLink"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"mainImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"firstLine"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"contact1"}},{"kind":"Field","name":{"kind":"Name","value":"contact2"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mainImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}}]} as unknown as DocumentNode<StorageLocationFragment, unknown>;
export const UserReferenceSelectorFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserReferenceSelector"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<UserReferenceSelectorFragment, unknown>;
export const UserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserReferenceSelector"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserReferenceSelector"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<UserFragment, unknown>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const FinishOtpFlowLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FinishOtpFlowLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FinishOtpLoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"finishOtpLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"access_token"}}]}}]}}]} as unknown as DocumentNode<FinishOtpFlowLoginMutation, FinishOtpFlowLoginMutationVariables>;
export const TriggerOtpFlowLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TriggerOtpFlowLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TriggerOtpLoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"triggerOtpLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<TriggerOtpFlowLoginMutation, TriggerOtpFlowLoginMutationVariables>;
export const AutocompleteSelectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AutocompleteSelect"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AutocompleteWhereInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"autocompletes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<AutocompleteSelectQuery, AutocompleteSelectQueryVariables>;
export const DeleteOneAutocompleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteOneAutocomplete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EntityIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteOneAutocomplete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteOneAutocompleteMutation, DeleteOneAutocompleteMutationVariables>;
export const CreateOneAutocompleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOneAutocomplete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AutocompleteCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOneAutocomplete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Autocomplete"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Autocomplete"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Autocomplete"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]} as unknown as DocumentNode<CreateOneAutocompleteMutation, CreateOneAutocompleteMutationVariables>;
export const UpdateOneAutocompleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOneAutocomplete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EntityIdInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AutocompleteUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOneAutocomplete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Autocomplete"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Autocomplete"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Autocomplete"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]} as unknown as DocumentNode<UpdateOneAutocompleteMutation, UpdateOneAutocompleteMutationVariables>;
export const OneAutocompleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"oneAutocomplete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EntityIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"autocomplete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Autocomplete"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Autocomplete"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Autocomplete"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]} as unknown as DocumentNode<OneAutocompleteQuery, OneAutocompleteQueryVariables>;
export const AutocompletesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"autocompletes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AutocompleteWhereInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AutocompleteOrderByInput"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"autocompletes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Autocomplete"}}]}},{"kind":"Field","name":{"kind":"Name","value":"autocompletesCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Autocomplete"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Autocomplete"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]} as unknown as DocumentNode<AutocompletesQuery, AutocompletesQueryVariables>;
export const BuildingComponentImagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BuildingComponentImages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EntityIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buildingComponent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BuildingComponentImages"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BuildingComponentImages"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingComponent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"componentId"}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<BuildingComponentImagesQuery, BuildingComponentImagesQueryVariables>;
export const BuildingComponentListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"buildingComponentList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingComponentWhereInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingComponentOrderByInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buildingComponents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BuildingComponent_List"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponentsCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BuildingComponent_ListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingComponent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"componentSn"}},{"kind":"Field","name":{"kind":"Name","value":"componentId"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"quantityUnit"}},{"kind":"Field","name":{"kind":"Name","value":"materialsDepot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mainImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"searchRequestInterests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BuildingComponent_List"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingComponent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"materialsDepot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"storageLocation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"searchRequestInterests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BuildingComponent_ListItem"}}]}}]} as unknown as DocumentNode<BuildingComponentListQuery, BuildingComponentListQueryVariables>;
export const CreateOneBuildingComponentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOneBuildingComponent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingComponentCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOneBuildingComponent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BuildingComponent"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BuildingComponentReferenceSelector"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingComponent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"componentId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"searchRequestInterests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BuildingComponent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingComponent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"componentId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"quantityExact"}},{"kind":"Field","name":{"kind":"Name","value":"quantityUnit"}},{"kind":"Field","name":{"kind":"Name","value":"quantitySpare"}},{"kind":"Field","name":{"kind":"Name","value":"quantityNotes"}},{"kind":"Field","name":{"kind":"Name","value":"sparePartsNotes"}},{"kind":"Field","name":{"kind":"Name","value":"constructionYear"}},{"kind":"Field","name":{"kind":"Name","value":"constructionYearExact"}},{"kind":"Field","name":{"kind":"Name","value":"constructionYearNotes"}},{"kind":"Field","name":{"kind":"Name","value":"co2Savings"}},{"kind":"Field","name":{"kind":"Name","value":"co2SavingsExact"}},{"kind":"Field","name":{"kind":"Name","value":"condition"}},{"kind":"Field","name":{"kind":"Name","value":"harmfulSubstances"}},{"kind":"Field","name":{"kind":"Name","value":"reusePotential"}},{"kind":"Field","name":{"kind":"Name","value":"reusePotentialNotes"}},{"kind":"Field","name":{"kind":"Name","value":"reusePotentialConclusion"}},{"kind":"Field","name":{"kind":"Name","value":"locationInBuilding"}},{"kind":"Field","name":{"kind":"Name","value":"locationInBuildingDetail"}},{"kind":"Field","name":{"kind":"Name","value":"showInMatching"}},{"kind":"Field","name":{"kind":"Name","value":"reuseValuePerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"reuseValueTotal"}},{"kind":"Field","name":{"kind":"Name","value":"reuseValueDescription"}},{"kind":"Field","name":{"kind":"Name","value":"ru1Explanation"}},{"kind":"Field","name":{"kind":"Name","value":"ru2Explanation"}},{"kind":"Field","name":{"kind":"Name","value":"ru3Explanation"}},{"kind":"Field","name":{"kind":"Name","value":"ru1PerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"ru2PerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"ru3PerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"ruPerUnitSum"}},{"kind":"Field","name":{"kind":"Name","value":"fallbackLevel"}},{"kind":"Field","name":{"kind":"Name","value":"fallbackLevelCO2PerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"fallbackLevelCO2Total"}},{"kind":"Field","name":{"kind":"Name","value":"co2SavingsPerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"ru1Total"}},{"kind":"Field","name":{"kind":"Name","value":"ru2Total"}},{"kind":"Field","name":{"kind":"Name","value":"ru3Total"}},{"kind":"Field","name":{"kind":"Name","value":"ruTotalSum"}},{"kind":"Field","name":{"kind":"Name","value":"co2SavingsTotal"}},{"kind":"Field","name":{"kind":"Name","value":"co2Unit"}},{"kind":"Field","name":{"kind":"Name","value":"co2QuantityUsed"}},{"kind":"Field","name":{"kind":"Name","value":"transportDistanceInKm"}},{"kind":"Field","name":{"kind":"Name","value":"transportVehicleName"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"depth"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"isExact"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dimensionsNotes"}},{"kind":"Field","name":{"kind":"Name","value":"demolitionPhase"}},{"kind":"Field","name":{"kind":"Name","value":"potentialInterests"}},{"kind":"Field","name":{"kind":"Name","value":"warrantyDetails"}},{"kind":"Field","name":{"kind":"Name","value":"ebkphCategoryId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"materialsDepot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"materialsDepotId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"storageLocationId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"storageLocationNotes"}},{"kind":"Field","name":{"kind":"Name","value":"contacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"firstLine"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"contact1"}},{"kind":"Field","name":{"kind":"Name","value":"contact2"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"mainImageId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"searchRequestInterests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BuildingComponentReferenceSelector"}}]}}]} as unknown as DocumentNode<CreateOneBuildingComponentMutation, CreateOneBuildingComponentMutationVariables>;
export const UpdateOneBuildingComponentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOneBuildingComponent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EntityIdInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingComponentUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOneBuildingComponent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BuildingComponent"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BuildingComponentReferenceSelector"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingComponent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"componentId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"searchRequestInterests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BuildingComponent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingComponent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"componentId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"quantityExact"}},{"kind":"Field","name":{"kind":"Name","value":"quantityUnit"}},{"kind":"Field","name":{"kind":"Name","value":"quantitySpare"}},{"kind":"Field","name":{"kind":"Name","value":"quantityNotes"}},{"kind":"Field","name":{"kind":"Name","value":"sparePartsNotes"}},{"kind":"Field","name":{"kind":"Name","value":"constructionYear"}},{"kind":"Field","name":{"kind":"Name","value":"constructionYearExact"}},{"kind":"Field","name":{"kind":"Name","value":"constructionYearNotes"}},{"kind":"Field","name":{"kind":"Name","value":"co2Savings"}},{"kind":"Field","name":{"kind":"Name","value":"co2SavingsExact"}},{"kind":"Field","name":{"kind":"Name","value":"condition"}},{"kind":"Field","name":{"kind":"Name","value":"harmfulSubstances"}},{"kind":"Field","name":{"kind":"Name","value":"reusePotential"}},{"kind":"Field","name":{"kind":"Name","value":"reusePotentialNotes"}},{"kind":"Field","name":{"kind":"Name","value":"reusePotentialConclusion"}},{"kind":"Field","name":{"kind":"Name","value":"locationInBuilding"}},{"kind":"Field","name":{"kind":"Name","value":"locationInBuildingDetail"}},{"kind":"Field","name":{"kind":"Name","value":"showInMatching"}},{"kind":"Field","name":{"kind":"Name","value":"reuseValuePerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"reuseValueTotal"}},{"kind":"Field","name":{"kind":"Name","value":"reuseValueDescription"}},{"kind":"Field","name":{"kind":"Name","value":"ru1Explanation"}},{"kind":"Field","name":{"kind":"Name","value":"ru2Explanation"}},{"kind":"Field","name":{"kind":"Name","value":"ru3Explanation"}},{"kind":"Field","name":{"kind":"Name","value":"ru1PerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"ru2PerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"ru3PerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"ruPerUnitSum"}},{"kind":"Field","name":{"kind":"Name","value":"fallbackLevel"}},{"kind":"Field","name":{"kind":"Name","value":"fallbackLevelCO2PerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"fallbackLevelCO2Total"}},{"kind":"Field","name":{"kind":"Name","value":"co2SavingsPerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"ru1Total"}},{"kind":"Field","name":{"kind":"Name","value":"ru2Total"}},{"kind":"Field","name":{"kind":"Name","value":"ru3Total"}},{"kind":"Field","name":{"kind":"Name","value":"ruTotalSum"}},{"kind":"Field","name":{"kind":"Name","value":"co2SavingsTotal"}},{"kind":"Field","name":{"kind":"Name","value":"co2Unit"}},{"kind":"Field","name":{"kind":"Name","value":"co2QuantityUsed"}},{"kind":"Field","name":{"kind":"Name","value":"transportDistanceInKm"}},{"kind":"Field","name":{"kind":"Name","value":"transportVehicleName"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"depth"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"isExact"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dimensionsNotes"}},{"kind":"Field","name":{"kind":"Name","value":"demolitionPhase"}},{"kind":"Field","name":{"kind":"Name","value":"potentialInterests"}},{"kind":"Field","name":{"kind":"Name","value":"warrantyDetails"}},{"kind":"Field","name":{"kind":"Name","value":"ebkphCategoryId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"materialsDepot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"materialsDepotId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"storageLocationId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"storageLocationNotes"}},{"kind":"Field","name":{"kind":"Name","value":"contacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"firstLine"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"contact1"}},{"kind":"Field","name":{"kind":"Name","value":"contact2"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"mainImageId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"searchRequestInterests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BuildingComponentReferenceSelector"}}]}}]} as unknown as DocumentNode<UpdateOneBuildingComponentMutation, UpdateOneBuildingComponentMutationVariables>;
export const DeleteOneBuildingComponentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteOneBuildingComponent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EntityIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteOneBuildingComponent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BuildingComponent"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BuildingComponentReferenceSelector"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingComponent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"componentId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"searchRequestInterests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BuildingComponent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingComponent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"componentId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"quantityExact"}},{"kind":"Field","name":{"kind":"Name","value":"quantityUnit"}},{"kind":"Field","name":{"kind":"Name","value":"quantitySpare"}},{"kind":"Field","name":{"kind":"Name","value":"quantityNotes"}},{"kind":"Field","name":{"kind":"Name","value":"sparePartsNotes"}},{"kind":"Field","name":{"kind":"Name","value":"constructionYear"}},{"kind":"Field","name":{"kind":"Name","value":"constructionYearExact"}},{"kind":"Field","name":{"kind":"Name","value":"constructionYearNotes"}},{"kind":"Field","name":{"kind":"Name","value":"co2Savings"}},{"kind":"Field","name":{"kind":"Name","value":"co2SavingsExact"}},{"kind":"Field","name":{"kind":"Name","value":"condition"}},{"kind":"Field","name":{"kind":"Name","value":"harmfulSubstances"}},{"kind":"Field","name":{"kind":"Name","value":"reusePotential"}},{"kind":"Field","name":{"kind":"Name","value":"reusePotentialNotes"}},{"kind":"Field","name":{"kind":"Name","value":"reusePotentialConclusion"}},{"kind":"Field","name":{"kind":"Name","value":"locationInBuilding"}},{"kind":"Field","name":{"kind":"Name","value":"locationInBuildingDetail"}},{"kind":"Field","name":{"kind":"Name","value":"showInMatching"}},{"kind":"Field","name":{"kind":"Name","value":"reuseValuePerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"reuseValueTotal"}},{"kind":"Field","name":{"kind":"Name","value":"reuseValueDescription"}},{"kind":"Field","name":{"kind":"Name","value":"ru1Explanation"}},{"kind":"Field","name":{"kind":"Name","value":"ru2Explanation"}},{"kind":"Field","name":{"kind":"Name","value":"ru3Explanation"}},{"kind":"Field","name":{"kind":"Name","value":"ru1PerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"ru2PerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"ru3PerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"ruPerUnitSum"}},{"kind":"Field","name":{"kind":"Name","value":"fallbackLevel"}},{"kind":"Field","name":{"kind":"Name","value":"fallbackLevelCO2PerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"fallbackLevelCO2Total"}},{"kind":"Field","name":{"kind":"Name","value":"co2SavingsPerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"ru1Total"}},{"kind":"Field","name":{"kind":"Name","value":"ru2Total"}},{"kind":"Field","name":{"kind":"Name","value":"ru3Total"}},{"kind":"Field","name":{"kind":"Name","value":"ruTotalSum"}},{"kind":"Field","name":{"kind":"Name","value":"co2SavingsTotal"}},{"kind":"Field","name":{"kind":"Name","value":"co2Unit"}},{"kind":"Field","name":{"kind":"Name","value":"co2QuantityUsed"}},{"kind":"Field","name":{"kind":"Name","value":"transportDistanceInKm"}},{"kind":"Field","name":{"kind":"Name","value":"transportVehicleName"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"depth"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"isExact"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dimensionsNotes"}},{"kind":"Field","name":{"kind":"Name","value":"demolitionPhase"}},{"kind":"Field","name":{"kind":"Name","value":"potentialInterests"}},{"kind":"Field","name":{"kind":"Name","value":"warrantyDetails"}},{"kind":"Field","name":{"kind":"Name","value":"ebkphCategoryId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"materialsDepot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"materialsDepotId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"storageLocationId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"storageLocationNotes"}},{"kind":"Field","name":{"kind":"Name","value":"contacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"firstLine"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"contact1"}},{"kind":"Field","name":{"kind":"Name","value":"contact2"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"mainImageId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"searchRequestInterests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BuildingComponentReferenceSelector"}}]}}]} as unknown as DocumentNode<DeleteOneBuildingComponentMutation, DeleteOneBuildingComponentMutationVariables>;
export const BuildingComponentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BuildingComponent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EntityIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buildingComponent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"componentId"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"materialsDepot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"searchRequestInterests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BuildingComponent"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BuildingComponentReferenceSelector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BuildingComponentReferenceSelector"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingComponent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"componentId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"searchRequestInterests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BuildingComponent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingComponent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"componentId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"quantityExact"}},{"kind":"Field","name":{"kind":"Name","value":"quantityUnit"}},{"kind":"Field","name":{"kind":"Name","value":"quantitySpare"}},{"kind":"Field","name":{"kind":"Name","value":"quantityNotes"}},{"kind":"Field","name":{"kind":"Name","value":"sparePartsNotes"}},{"kind":"Field","name":{"kind":"Name","value":"constructionYear"}},{"kind":"Field","name":{"kind":"Name","value":"constructionYearExact"}},{"kind":"Field","name":{"kind":"Name","value":"constructionYearNotes"}},{"kind":"Field","name":{"kind":"Name","value":"co2Savings"}},{"kind":"Field","name":{"kind":"Name","value":"co2SavingsExact"}},{"kind":"Field","name":{"kind":"Name","value":"condition"}},{"kind":"Field","name":{"kind":"Name","value":"harmfulSubstances"}},{"kind":"Field","name":{"kind":"Name","value":"reusePotential"}},{"kind":"Field","name":{"kind":"Name","value":"reusePotentialNotes"}},{"kind":"Field","name":{"kind":"Name","value":"reusePotentialConclusion"}},{"kind":"Field","name":{"kind":"Name","value":"locationInBuilding"}},{"kind":"Field","name":{"kind":"Name","value":"locationInBuildingDetail"}},{"kind":"Field","name":{"kind":"Name","value":"showInMatching"}},{"kind":"Field","name":{"kind":"Name","value":"reuseValuePerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"reuseValueTotal"}},{"kind":"Field","name":{"kind":"Name","value":"reuseValueDescription"}},{"kind":"Field","name":{"kind":"Name","value":"ru1Explanation"}},{"kind":"Field","name":{"kind":"Name","value":"ru2Explanation"}},{"kind":"Field","name":{"kind":"Name","value":"ru3Explanation"}},{"kind":"Field","name":{"kind":"Name","value":"ru1PerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"ru2PerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"ru3PerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"ruPerUnitSum"}},{"kind":"Field","name":{"kind":"Name","value":"fallbackLevel"}},{"kind":"Field","name":{"kind":"Name","value":"fallbackLevelCO2PerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"fallbackLevelCO2Total"}},{"kind":"Field","name":{"kind":"Name","value":"co2SavingsPerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"ru1Total"}},{"kind":"Field","name":{"kind":"Name","value":"ru2Total"}},{"kind":"Field","name":{"kind":"Name","value":"ru3Total"}},{"kind":"Field","name":{"kind":"Name","value":"ruTotalSum"}},{"kind":"Field","name":{"kind":"Name","value":"co2SavingsTotal"}},{"kind":"Field","name":{"kind":"Name","value":"co2Unit"}},{"kind":"Field","name":{"kind":"Name","value":"co2QuantityUsed"}},{"kind":"Field","name":{"kind":"Name","value":"transportDistanceInKm"}},{"kind":"Field","name":{"kind":"Name","value":"transportVehicleName"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"depth"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"isExact"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dimensionsNotes"}},{"kind":"Field","name":{"kind":"Name","value":"demolitionPhase"}},{"kind":"Field","name":{"kind":"Name","value":"potentialInterests"}},{"kind":"Field","name":{"kind":"Name","value":"warrantyDetails"}},{"kind":"Field","name":{"kind":"Name","value":"ebkphCategoryId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"materialsDepot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"materialsDepotId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"storageLocationId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"storageLocationNotes"}},{"kind":"Field","name":{"kind":"Name","value":"contacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"firstLine"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"contact1"}},{"kind":"Field","name":{"kind":"Name","value":"contact2"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"mainImageId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"searchRequestInterests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BuildingComponentReferenceSelector"}}]}}]} as unknown as DocumentNode<BuildingComponentQuery, BuildingComponentQueryVariables>;
export const CreateBuildingComponentDefaultsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"createBuildingComponentDefaults"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"materialsDepotId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"materialsDepot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"materialsDepotId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}}]}}]} as unknown as DocumentNode<CreateBuildingComponentDefaultsQuery, CreateBuildingComponentDefaultsQueryVariables>;
export const BuildingComponentReferenceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"buildingComponentReference"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingComponentWhereInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingComponentOrderByInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buildingComponents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BuildingComponentReferenceSelector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BuildingComponentReferenceSelector"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingComponent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"componentId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"searchRequestInterests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<BuildingComponentReferenceQuery, BuildingComponentReferenceQueryVariables>;
export const CategoriesTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"categoriesTable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CategoryWhereInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CategoryOrderByInput"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sortOrder"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categoriesCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}]}]}}]} as unknown as DocumentNode<CategoriesTableQuery, CategoriesTableQueryVariables>;
export const CreateOneCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOneCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CategoryCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOneCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Category"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Category"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sortOrder"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateOneCategoryMutation, CreateOneCategoryMutationVariables>;
export const UpdateOneCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOneCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EntityIdInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CategoryUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOneCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Category"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Category"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sortOrder"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateOneCategoryMutation, UpdateOneCategoryMutationVariables>;
export const OneCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OneCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EntityIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Category"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Category"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sortOrder"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<OneCategoryQuery, OneCategoryQueryVariables>;
export const CategoriesReferenceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"categoriesReference"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CategoryWhereInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CategoryOrderByInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CategoryReferenceSelector"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categoriesCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CategoryReferenceSelector"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Category"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CategoriesReferenceQuery, CategoriesReferenceQueryVariables>;
export const CategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"categories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CategoryWhereInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CategoryOrderByInput"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categoriesCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}]}]}}]} as unknown as DocumentNode<CategoriesQuery, CategoriesQueryVariables>;
export const ContactReferenceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContactReference"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ContactWhereInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ContactOrderByInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contacts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContactReferenceSelector"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contactsCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContactReferenceSelector"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contact"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"city"}}]}}]} as unknown as DocumentNode<ContactReferenceQuery, ContactReferenceQueryVariables>;
export const EbkphCategoriesTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ebkphCategoriesTable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"EbkphCategoryWhereInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EbkphCategoryOrderByInput"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ebkphCategories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EbkphCategory"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ebkphCategoriesCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EbkphCategory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EbkphCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<EbkphCategoriesTableQuery, EbkphCategoriesTableQueryVariables>;
export const CreateOneEbkphCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOneEbkphCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EbkphCategoryCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOneEbkphCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EbkphCategory"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EbkphCategory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EbkphCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateOneEbkphCategoryMutation, CreateOneEbkphCategoryMutationVariables>;
export const UpdateOneEbkphCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOneEbkphCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EntityIdInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EbkphCategoryUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOneEbkphCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EbkphCategory"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EbkphCategory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EbkphCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateOneEbkphCategoryMutation, UpdateOneEbkphCategoryMutationVariables>;
export const OneEbkphCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OneEbkphCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EntityIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ebkphCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EbkphCategory"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EbkphCategory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EbkphCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<OneEbkphCategoryQuery, OneEbkphCategoryQueryVariables>;
export const EbkphCategoriesReferenceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ebkphCategoriesReference"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"EbkphCategoryWhereInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EbkphCategoryOrderByInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ebkphCategories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"IntValue","value":"1000"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EbkphCategoryReferenceSelector"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ebkphCategoriesCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EbkphCategoryReferenceSelector"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EbkphCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<EbkphCategoriesReferenceQuery, EbkphCategoriesReferenceQueryVariables>;
export const EbkphCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ebkphCategories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"EbkphCategoryWhereInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EbkphCategoryOrderByInput"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ebkphCategories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ebkphCategoriesCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}]}]}}]} as unknown as DocumentNode<EbkphCategoriesQuery, EbkphCategoriesQueryVariables>;
export const BuildingComponentsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BuildingComponentsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingComponentWhereInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingComponentOrderByInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buildingComponents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"componentId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"depth"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"quantityUnit"}},{"kind":"Field","name":{"kind":"Name","value":"materialsDepot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"storageLocation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"searchRequestInterests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BuildingComponent_ListItem"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BuildingComponent_ListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BuildingComponent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"componentSn"}},{"kind":"Field","name":{"kind":"Name","value":"componentId"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"quantityUnit"}},{"kind":"Field","name":{"kind":"Name","value":"materialsDepot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mainImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"searchRequestInterests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<BuildingComponentsQueryQuery, BuildingComponentsQueryQueryVariables>;
export const SearchRequestsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchRequestsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchRequestWhereInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchRequestOrderByInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchRequests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponentName"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"quantityUnit"}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}}]}}]}}]} as unknown as DocumentNode<SearchRequestsQueryQuery, SearchRequestsQueryQueryVariables>;
export const MaterialsDepotImagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"materialsDepotImages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EntityIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"materialsDepot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"MaterialsDepotImages"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MaterialsDepotImages"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MaterialsDepot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"componentId"}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<MaterialsDepotImagesQuery, MaterialsDepotImagesQueryVariables>;
export const MaterialsDepotListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"materialsDepotList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MaterialsDepotWhereInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MaterialsDepotOrderByInput"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"materialsDepots"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"MaterialsDepot_List"}}]}},{"kind":"Field","name":{"kind":"Name","value":"materialsDepotsCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MaterialsDepot_ListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MaterialsDepot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"mainImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"searchInterests"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MaterialsDepot_List"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MaterialsDepot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"MaterialsDepot_ListItem"}}]}}]} as unknown as DocumentNode<MaterialsDepotListQuery, MaterialsDepotListQueryVariables>;
export const CantonByPostalCodeAndCityQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CantonByPostalCodeAndCityQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CantonByPostalCodeAndCityInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cantonByPostalCodeAndCity"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<CantonByPostalCodeAndCityQueryQuery, CantonByPostalCodeAndCityQueryQueryVariables>;
export const MaterialsDepotReferenceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MaterialsDepotReference"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"materialsDepotId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"materialsDepot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"materialsDepotId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}}]}}]} as unknown as DocumentNode<MaterialsDepotReferenceQuery, MaterialsDepotReferenceQueryVariables>;
export const CreateOneMaterialsDepotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOneMaterialsDepot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MaterialsDepotCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOneMaterialsDepot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"MaterialsDepot"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MaterialsDepotReferenceSelector"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MaterialsDepot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MaterialsDepot"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MaterialsDepot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"googleMapsLink"}},{"kind":"Field","name":{"kind":"Name","value":"complex"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"historyNotes"}},{"kind":"Field","name":{"kind":"Name","value":"typology"}},{"kind":"Field","name":{"kind":"Name","value":"interventionDepth"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"reUseRating"}},{"kind":"Field","name":{"kind":"Name","value":"constructionYear"}},{"kind":"Field","name":{"kind":"Name","value":"constructionYearExact"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"mainImageId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"firstLine"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"contact1"}},{"kind":"Field","name":{"kind":"Name","value":"contact2"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"closedAt"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timelines"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"componentId"}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"responsableUserId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"MaterialsDepotReferenceSelector"}}]}}]} as unknown as DocumentNode<CreateOneMaterialsDepotMutation, CreateOneMaterialsDepotMutationVariables>;
export const UpdateOneMaterialsDepotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOneMaterialsDepot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EntityIdInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MaterialsDepotUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOneMaterialsDepot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"MaterialsDepot"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MaterialsDepotReferenceSelector"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MaterialsDepot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MaterialsDepot"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MaterialsDepot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"googleMapsLink"}},{"kind":"Field","name":{"kind":"Name","value":"complex"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"historyNotes"}},{"kind":"Field","name":{"kind":"Name","value":"typology"}},{"kind":"Field","name":{"kind":"Name","value":"interventionDepth"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"reUseRating"}},{"kind":"Field","name":{"kind":"Name","value":"constructionYear"}},{"kind":"Field","name":{"kind":"Name","value":"constructionYearExact"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"mainImageId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"firstLine"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"contact1"}},{"kind":"Field","name":{"kind":"Name","value":"contact2"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"closedAt"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timelines"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"componentId"}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"responsableUserId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"MaterialsDepotReferenceSelector"}}]}}]} as unknown as DocumentNode<UpdateOneMaterialsDepotMutation, UpdateOneMaterialsDepotMutationVariables>;
export const OneMaterialsDepotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"oneMaterialsDepot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EntityIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"materialsDepot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"MaterialsDepot"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"MaterialsDepotReferenceSelector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MaterialsDepotReferenceSelector"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MaterialsDepot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MaterialsDepot"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MaterialsDepot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"googleMapsLink"}},{"kind":"Field","name":{"kind":"Name","value":"complex"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"historyNotes"}},{"kind":"Field","name":{"kind":"Name","value":"typology"}},{"kind":"Field","name":{"kind":"Name","value":"interventionDepth"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"reUseRating"}},{"kind":"Field","name":{"kind":"Name","value":"constructionYear"}},{"kind":"Field","name":{"kind":"Name","value":"constructionYearExact"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"mainImageId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"firstLine"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"contact1"}},{"kind":"Field","name":{"kind":"Name","value":"contact2"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"closedAt"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timelines"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"componentId"}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"responsableUserId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"MaterialsDepotReferenceSelector"}}]}}]} as unknown as DocumentNode<OneMaterialsDepotQuery, OneMaterialsDepotQueryVariables>;
export const CreateMaterialsDepotDefaultsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"createMaterialsDepotDefaults"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateMaterialsDepotDefaultsQuery, CreateMaterialsDepotDefaultsQueryVariables>;
export const DeleteOneMaterialsDepotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteOneMaterialsDepot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EntityIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteOneMaterialsDepot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"MaterialsDepot"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MaterialsDepotReferenceSelector"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MaterialsDepot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MaterialsDepot"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MaterialsDepot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"googleMapsLink"}},{"kind":"Field","name":{"kind":"Name","value":"complex"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"historyNotes"}},{"kind":"Field","name":{"kind":"Name","value":"typology"}},{"kind":"Field","name":{"kind":"Name","value":"interventionDepth"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"reUseRating"}},{"kind":"Field","name":{"kind":"Name","value":"constructionYear"}},{"kind":"Field","name":{"kind":"Name","value":"constructionYearExact"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"mainImageId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"firstLine"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"contact1"}},{"kind":"Field","name":{"kind":"Name","value":"contact2"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"closedAt"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timelines"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"componentId"}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"responsableUserId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"MaterialsDepotReferenceSelector"}}]}}]} as unknown as DocumentNode<DeleteOneMaterialsDepotMutation, DeleteOneMaterialsDepotMutationVariables>;
export const MaterialsDepotsReferenceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"materialsDepotsReference"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MaterialsDepotWhereInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MaterialsDepotOrderByInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"materialsDepots"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"MaterialsDepotReferenceSelector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MaterialsDepotReferenceSelector"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MaterialsDepot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<MaterialsDepotsReferenceQuery, MaterialsDepotsReferenceQueryVariables>;
export const ProjectImagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProjectImages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EntityIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"project"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectImages"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectImages"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<ProjectImagesQuery, ProjectImagesQueryVariables>;
export const ProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"projects"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectWhereInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectOrderByInput"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"mainImageId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"somehowImportantContactWithoutName"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstLine"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"projectsCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}]}]}}]} as unknown as DocumentNode<ProjectsQuery, ProjectsQueryVariables>;
export const CreateOneProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOneProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOneProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Project"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Project"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"responsableUserPM"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"responsableUserSearch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"contacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"firstLine"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"contact1"}},{"kind":"Field","name":{"kind":"Name","value":"contact2"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"mainImageId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<CreateOneProjectMutation, CreateOneProjectMutationVariables>;
export const UpdateOneProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOneProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EntityIdInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOneProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Project"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Project"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"responsableUserPM"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"responsableUserSearch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"contacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"firstLine"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"contact1"}},{"kind":"Field","name":{"kind":"Name","value":"contact2"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"mainImageId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<UpdateOneProjectMutation, UpdateOneProjectMutationVariables>;
export const OneProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"oneProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EntityIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"project"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Project"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Project"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"phase"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"responsableUserPM"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"responsableUserSearch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"contacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"firstLine"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"contact1"}},{"kind":"Field","name":{"kind":"Name","value":"contact2"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"mainImageId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<OneProjectQuery, OneProjectQueryVariables>;
export const ProjectDefaultsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"projectDefaults"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ProjectDefaultsQuery, ProjectDefaultsQueryVariables>;
export const ProjectReferenceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"projectReference"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectWhereInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectOrderByInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectReferenceSelector"}}]}},{"kind":"Field","name":{"kind":"Name","value":"projectsCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectReferenceSelector"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<ProjectReferenceQuery, ProjectReferenceQueryVariables>;
export const SearchRequestInterestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"searchRequestInterests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchRequestInterestWhereInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchRequestInterestOrderByInput"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchRequestInterests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"responsibleUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"rejectionReason"}},{"kind":"Field","name":{"kind":"Name","value":"rejectedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"searchRequest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponentName"}},{"kind":"Field","name":{"kind":"Name","value":"assignedBuildingComponentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"reservedBuildingComponentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ebkphCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"huntingStatusNotes"}},{"kind":"Field","name":{"kind":"Name","value":"quantityUnit"}},{"kind":"Field","name":{"kind":"Name","value":"deadlineFound"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"quantityUnit"}},{"kind":"Field","name":{"kind":"Name","value":"materialsDepot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"searchRequestInterestsCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}]}]}}]} as unknown as DocumentNode<SearchRequestInterestsQuery, SearchRequestInterestsQueryVariables>;
export const CreateOneSearchRequestInterestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOneSearchRequestInterest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchRequestInterestCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOneSearchRequestInterest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SearchRequestInterest"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SearchRequestInterest"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SearchRequestInterest"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"responsibleUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"searchRequest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"rejectedAt"}},{"kind":"Field","name":{"kind":"Name","value":"rejectionReason"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}}]} as unknown as DocumentNode<CreateOneSearchRequestInterestMutation, CreateOneSearchRequestInterestMutationVariables>;
export const UpdateOneSearchRequestInterestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOneSearchRequestInterest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EntityIdInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchRequestInterestUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOneSearchRequestInterest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SearchRequestInterest"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SearchRequestInterest"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SearchRequestInterest"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"responsibleUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"searchRequest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"rejectedAt"}},{"kind":"Field","name":{"kind":"Name","value":"rejectionReason"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}}]} as unknown as DocumentNode<UpdateOneSearchRequestInterestMutation, UpdateOneSearchRequestInterestMutationVariables>;
export const OneSearchRequestInterestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"oneSearchRequestInterest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EntityIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchRequestInterest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"searchRequest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SearchRequestInterest"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SearchRequestInterest"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SearchRequestInterest"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"responsibleUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"searchRequest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"rejectedAt"}},{"kind":"Field","name":{"kind":"Name","value":"rejectionReason"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}}]} as unknown as DocumentNode<OneSearchRequestInterestQuery, OneSearchRequestInterestQueryVariables>;
export const SearchRequestInterestDefaultsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchRequestInterestDefaults"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SearchRequestInterestDefaultsQuery, SearchRequestInterestDefaultsQueryVariables>;
export const RejectOneSearchRequestInterestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RejectOneSearchRequestInterest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RejectSearchRequestInterestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rejectSearchRequestInterest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SearchRequestInterest"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SearchRequestInterest"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SearchRequestInterest"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"responsibleUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"searchRequest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"rejectedAt"}},{"kind":"Field","name":{"kind":"Name","value":"rejectionReason"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}}]} as unknown as DocumentNode<RejectOneSearchRequestInterestMutation, RejectOneSearchRequestInterestMutationVariables>;
export const AcceptOneSearchRequestInterestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AcceptOneSearchRequestInterest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AcceptSearchRequestInterestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"acceptSearchRequestInterest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SearchRequestInterest"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SearchRequestInterest"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SearchRequestInterest"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"responsibleUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"searchRequest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"rejectedAt"}},{"kind":"Field","name":{"kind":"Name","value":"rejectionReason"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}}]} as unknown as DocumentNode<AcceptOneSearchRequestInterestMutation, AcceptOneSearchRequestInterestMutationVariables>;
export const DeleteOneSearchRequestInterestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteOneSearchRequestInterest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EntityIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteOneSearchRequestInterest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SearchRequestInterest"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SearchRequestInterest"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SearchRequestInterest"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"responsibleUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"searchRequest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"rejectedAt"}},{"kind":"Field","name":{"kind":"Name","value":"rejectionReason"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}}]} as unknown as DocumentNode<DeleteOneSearchRequestInterestMutation, DeleteOneSearchRequestInterestMutationVariables>;
export const SearchRequestInterestReferenceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"searchRequestInterestReference"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchRequestInterestWhereInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchRequestInterestOrderByInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchRequestInterests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SearchRequestInterestReferenceSelector"}}]}},{"kind":"Field","name":{"kind":"Name","value":"searchRequestInterestsCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SearchRequestInterestReferenceSelector"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SearchRequestInterest"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}}]}}]} as unknown as DocumentNode<SearchRequestInterestReferenceQuery, SearchRequestInterestReferenceQueryVariables>;
export const SearchRequestImagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"searchRequestImages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EntityIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponentName"}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SearchRequestImages"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SearchRequestImages"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SearchRequest"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<SearchRequestImagesQuery, SearchRequestImagesQueryVariables>;
export const SearchRequestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"searchRequests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchRequestWhereInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchRequestOrderByInput"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchRequests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"responsibleUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ebkphCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reservedBuildingComponentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"assignedBuildingComponentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponentName"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"quantityUnit"}},{"kind":"Field","name":{"kind":"Name","value":"deadlineFound"}}]}},{"kind":"Field","name":{"kind":"Name","value":"searchRequestsCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}]}]}}]} as unknown as DocumentNode<SearchRequestsQuery, SearchRequestsQueryVariables>;
export const SearchRequestProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"searchRequestProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EntityIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}}]}}]}}]} as unknown as DocumentNode<SearchRequestProjectQuery, SearchRequestProjectQueryVariables>;
export const CreateOneSearchRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOneSearchRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchRequestCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOneSearchRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SearchRequest"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SearchRequest"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SearchRequest"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponentName"}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponentDescription"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"quantityUnit"}},{"kind":"Field","name":{"kind":"Name","value":"deadlineFound"}},{"kind":"Field","name":{"kind":"Name","value":"deadlineShipment"}},{"kind":"Field","name":{"kind":"Name","value":"comments"}},{"kind":"Field","name":{"kind":"Name","value":"budgetInRappens"}},{"kind":"Field","name":{"kind":"Name","value":"budgetNotes"}},{"kind":"Field","name":{"kind":"Name","value":"searchConceptNotes"}},{"kind":"Field","name":{"kind":"Name","value":"huntingStatusNotes"}},{"kind":"Field","name":{"kind":"Name","value":"fireProtectionNotes"}},{"kind":"Field","name":{"kind":"Name","value":"soundProofNotes"}},{"kind":"Field","name":{"kind":"Name","value":"securityNotes"}},{"kind":"Field","name":{"kind":"Name","value":"fallbackLevel"}},{"kind":"Field","name":{"kind":"Name","value":"fallbackLevelCO2PerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"fallbackLevelCO2Total"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"responsibleUserId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ebkphCategoryId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dimensionRanges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"minWidth"}},{"kind":"Field","name":{"kind":"Name","value":"maxWidth"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"minHeight"}},{"kind":"Field","name":{"kind":"Name","value":"maxHeight"}},{"kind":"Field","name":{"kind":"Name","value":"minDepth"}},{"kind":"Field","name":{"kind":"Name","value":"maxDepth"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}}]}}]}}]} as unknown as DocumentNode<CreateOneSearchRequestMutation, CreateOneSearchRequestMutationVariables>;
export const UpdateOneSearchRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOneSearchRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EntityIdInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchRequestUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOneSearchRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SearchRequest"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SearchRequest"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SearchRequest"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponentName"}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponentDescription"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"quantityUnit"}},{"kind":"Field","name":{"kind":"Name","value":"deadlineFound"}},{"kind":"Field","name":{"kind":"Name","value":"deadlineShipment"}},{"kind":"Field","name":{"kind":"Name","value":"comments"}},{"kind":"Field","name":{"kind":"Name","value":"budgetInRappens"}},{"kind":"Field","name":{"kind":"Name","value":"budgetNotes"}},{"kind":"Field","name":{"kind":"Name","value":"searchConceptNotes"}},{"kind":"Field","name":{"kind":"Name","value":"huntingStatusNotes"}},{"kind":"Field","name":{"kind":"Name","value":"fireProtectionNotes"}},{"kind":"Field","name":{"kind":"Name","value":"soundProofNotes"}},{"kind":"Field","name":{"kind":"Name","value":"securityNotes"}},{"kind":"Field","name":{"kind":"Name","value":"fallbackLevel"}},{"kind":"Field","name":{"kind":"Name","value":"fallbackLevelCO2PerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"fallbackLevelCO2Total"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"responsibleUserId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ebkphCategoryId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dimensionRanges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"minWidth"}},{"kind":"Field","name":{"kind":"Name","value":"maxWidth"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"minHeight"}},{"kind":"Field","name":{"kind":"Name","value":"maxHeight"}},{"kind":"Field","name":{"kind":"Name","value":"minDepth"}},{"kind":"Field","name":{"kind":"Name","value":"maxDepth"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateOneSearchRequestMutation, UpdateOneSearchRequestMutationVariables>;
export const OneSearchRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"oneSearchRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EntityIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SearchRequest"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SearchRequest"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SearchRequest"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponentName"}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponentDescription"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"quantityUnit"}},{"kind":"Field","name":{"kind":"Name","value":"deadlineFound"}},{"kind":"Field","name":{"kind":"Name","value":"deadlineShipment"}},{"kind":"Field","name":{"kind":"Name","value":"comments"}},{"kind":"Field","name":{"kind":"Name","value":"budgetInRappens"}},{"kind":"Field","name":{"kind":"Name","value":"budgetNotes"}},{"kind":"Field","name":{"kind":"Name","value":"searchConceptNotes"}},{"kind":"Field","name":{"kind":"Name","value":"huntingStatusNotes"}},{"kind":"Field","name":{"kind":"Name","value":"fireProtectionNotes"}},{"kind":"Field","name":{"kind":"Name","value":"soundProofNotes"}},{"kind":"Field","name":{"kind":"Name","value":"securityNotes"}},{"kind":"Field","name":{"kind":"Name","value":"fallbackLevel"}},{"kind":"Field","name":{"kind":"Name","value":"fallbackLevelCO2PerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"fallbackLevelCO2Total"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"responsibleUserId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ebkphCategoryId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dimensionRanges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"minWidth"}},{"kind":"Field","name":{"kind":"Name","value":"maxWidth"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"minHeight"}},{"kind":"Field","name":{"kind":"Name","value":"maxHeight"}},{"kind":"Field","name":{"kind":"Name","value":"minDepth"}},{"kind":"Field","name":{"kind":"Name","value":"maxDepth"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}}]}}]}}]} as unknown as DocumentNode<OneSearchRequestQuery, OneSearchRequestQueryVariables>;
export const SearchRequestDefaultsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"searchRequestDefaults"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"project"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}}]}}]} as unknown as DocumentNode<SearchRequestDefaultsQuery, SearchRequestDefaultsQueryVariables>;
export const SearchRequestReferenceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"searchRequestReference"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchRequestWhereInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchRequestOrderByInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchRequests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SearchRequestReferenceSelector"}}]}},{"kind":"Field","name":{"kind":"Name","value":"searchRequestsCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SearchRequestReferenceSelector"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SearchRequest"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"responsibleUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponentName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<SearchRequestReferenceQuery, SearchRequestReferenceQueryVariables>;
export const StorageLocationImagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"storageLocationImages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EntityIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"storageLocation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"StorageLocationImages"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StorageLocationImages"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StorageLocation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"componentId"}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"originalFilename"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<StorageLocationImagesQuery, StorageLocationImagesQueryVariables>;
export const StorageLocationListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"storageLocationList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"StorageLocationWhereInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StorageLocationOrderByInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"storageLocations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"StorageLocation_List"}}]}},{"kind":"Field","name":{"kind":"Name","value":"storageLocationsCount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}]}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StorageLocation_ListItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StorageLocation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"googleMapsLink"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"mainImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mainImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StorageLocation_List"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StorageLocation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"StorageLocation_ListItem"}}]}}]} as unknown as DocumentNode<StorageLocationListQuery, StorageLocationListQueryVariables>;
export const StorageLocationReferenceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StorageLocationReference"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"storageLocationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"storageLocation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"storageLocationId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<StorageLocationReferenceQuery, StorageLocationReferenceQueryVariables>;
export const CreateOneStorageLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOneStorageLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StorageLocationCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOneStorageLocation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"StorageLocation"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StorageLocation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StorageLocation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"googleMapsLink"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"mainImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"firstLine"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"contact1"}},{"kind":"Field","name":{"kind":"Name","value":"contact2"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mainImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}}]} as unknown as DocumentNode<CreateOneStorageLocationMutation, CreateOneStorageLocationMutationVariables>;
export const UpdateOneStorageLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOneStorageLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EntityIdInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StorageLocationUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOneStorageLocation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"StorageLocation"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StorageLocation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StorageLocation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"googleMapsLink"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"mainImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"firstLine"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"contact1"}},{"kind":"Field","name":{"kind":"Name","value":"contact2"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mainImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}}]} as unknown as DocumentNode<UpdateOneStorageLocationMutation, UpdateOneStorageLocationMutationVariables>;
export const OneStorageLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"oneStorageLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EntityIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"storageLocation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"StorageLocation"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"StorageLocationReferenceSelector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StorageLocation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StorageLocation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"googleMapsLink"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"mainImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"firstLine"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"canton"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"contact1"}},{"kind":"Field","name":{"kind":"Name","value":"contact2"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"buildingComponents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mainImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StorageLocationReferenceSelector"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StorageLocation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<OneStorageLocationQuery, OneStorageLocationQueryVariables>;
export const StorageLocationsReferenceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"storageLocationsReference"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"StorageLocationWhereInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StorageLocationOrderByInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"storageLocations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"StorageLocationReferenceSelector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StorageLocationReferenceSelector"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StorageLocation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<StorageLocationsReferenceQuery, StorageLocationsReferenceQueryVariables>;
export const CreateStorageLocationDefaultsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"createStorageLocationDefaults"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateStorageLocationDefaultsQuery, CreateStorageLocationDefaultsQueryVariables>;
export const OneUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"oneUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EntityIdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"User"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserReferenceSelector"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserReferenceSelector"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserReferenceSelector"}}]}}]} as unknown as DocumentNode<OneUserQuery, OneUserQueryVariables>;
export const UserReferenceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userReference"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UserWhereInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserOrderByInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"IntValue","value":"50"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserReferenceSelector"}}]}},{"kind":"Field","name":{"kind":"Name","value":"usersCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserReferenceSelector"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<UserReferenceQuery, UserReferenceQueryVariables>;
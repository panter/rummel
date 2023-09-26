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
    "\n  query Me {\n    me {\n      id\n    }\n  }\n": types.MeDocument,
    "\n  mutation Logout {\n    logout {\n      id\n    }\n  }\n": types.LogoutDocument,
    "\n  mutation FinishOtpFlowLogin($input: FinishOtpLoginInput!) {\n    finishOtpLogin(input: $input) {\n      user {\n        id\n      }\n      access_token\n    }\n  }\n": types.FinishOtpFlowLoginDocument,
    "\n  mutation TriggerOtpFlowLogin($input: TriggerOtpLoginInput!) {\n    triggerOtpLogin(input: $input)\n  }\n": types.TriggerOtpFlowLoginDocument,
    "\n  query AutocompleteSelect($where: AutocompleteWhereInput) {\n    autocompletes(where: $where) {\n      id\n      value\n    }\n  }\n": types.AutocompleteSelectDocument,
    "\n  mutation DeleteOneAutocomplete($where: EntityIdInput!) {\n    deleteOneAutocomplete(where: $where) {\n      id\n    }\n  }\n": types.DeleteOneAutocompleteDocument,
    "\n  mutation CreateOneAutocomplete($data: AutocompleteCreateInput!) {\n    createOneAutocomplete(data: $data) {\n      id\n      ...Autocomplete\n    }\n  }\n": types.CreateOneAutocompleteDocument,
    "\n  mutation UpdateOneAutocomplete(\n    $where: EntityIdInput!\n    $data: AutocompleteUpdateInput!\n  ) {\n    updateOneAutocomplete(where: $where, data: $data) {\n      id\n      ...Autocomplete\n    }\n  }\n": types.UpdateOneAutocompleteDocument,
    "\n  query oneAutocomplete($where: EntityIdInput!) {\n    autocomplete(where: $where) {\n      id\n      ...Autocomplete\n    }\n  }\n": types.OneAutocompleteDocument,
    "\n  query autocompletes(\n    $where: AutocompleteWhereInput\n    $orderBy: [AutocompleteOrderByInput!]\n    $take: Int\n    $skip: Int\n  ) {\n    autocompletes(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {\n      id\n      ...Autocomplete\n    }\n\n    autocompletesCount(where: $where)\n  }\n": types.AutocompletesDocument,
    "\n  fragment Autocomplete on Autocomplete {\n    id\n    key\n    value\n  }\n": types.AutocompleteFragmentDoc,
    "\n  fragment BuildingComponentImages on BuildingComponent {\n    id\n    componentId\n    assets {\n      id\n      tags\n      asset {\n        id\n        url\n        originalFilename\n        mimeType\n        updatedAt\n      }\n    }\n  }\n": types.BuildingComponentImagesFragmentDoc,
    "\n  query BuildingComponentImages($where: EntityIdInput!) {\n    buildingComponent(where: $where) {\n      id\n      ...BuildingComponentImages\n    }\n  }\n": types.BuildingComponentImagesDocument,
    "\n  fragment BuildingComponent_List on BuildingComponent {\n    id\n    state\n    phase\n    materialsDepot {\n      id\n      shortName\n    }\n    storageLocation {\n      id\n      name\n    }\n    searchRequestInterests {\n      id\n    }\n    assignedTo {\n      id\n    }\n    ...BuildingComponent_ListItem\n  }\n": types.BuildingComponent_ListFragmentDoc,
    "\n  query buildingComponentList(\n    $where: BuildingComponentWhereInput\n    $orderBy: [BuildingComponentOrderByInput!]\n  ) {\n    buildingComponents(where: $where, orderBy: $orderBy) {\n      id\n      ...BuildingComponent_List\n    }\n    buildingComponentsCount(where: $where)\n  }\n": types.BuildingComponentListDocument,
    "\n  fragment BuildingComponent_ListItem on BuildingComponent {\n    id\n    name\n    phase\n    createdAt\n    componentSn\n    componentId\n    state\n    quantity\n    quantityUnit\n    materialsDepot {\n      id\n      shortName\n      name\n    }\n    mainImage {\n      id\n      url\n    }\n    searchRequestInterests {\n      id\n    }\n  }\n": types.BuildingComponent_ListItemFragmentDoc,
    "\n  mutation CreateOneBuildingComponent($data: BuildingComponentCreateInput!) {\n    createOneBuildingComponent(data: $data) {\n      id\n      ...BuildingComponent\n    }\n  }\n": types.CreateOneBuildingComponentDocument,
    "\n  mutation UpdateOneBuildingComponent(\n    $where: EntityIdInput!\n    $data: BuildingComponentUpdateInput!\n  ) {\n    updateOneBuildingComponent(where: $where, data: $data) {\n      id\n      ...BuildingComponent\n    }\n  }\n": types.UpdateOneBuildingComponentDocument,
    "\n  mutation DeleteOneBuildingComponent($where: EntityIdInput!) {\n    deleteOneBuildingComponent(where: $where) {\n      id\n      ...BuildingComponent\n    }\n  }\n": types.DeleteOneBuildingComponentDocument,
    "\n  query BuildingComponent($where: EntityIdInput!) {\n    buildingComponent(where: $where) {\n      id\n      componentId\n      materialsDepot {\n        id\n        shortName\n      }\n      searchRequestInterests {\n        id\n      }\n      ...BuildingComponent\n      ...BuildingComponentReferenceSelector\n    }\n  }\n": types.BuildingComponentDocument,
    "\n  query createBuildingComponentDefaults($materialsDepotId: String!) {\n    me {\n      id\n    }\n    materialsDepot(where: { id: $materialsDepotId }) {\n      id\n      shortName\n    }\n  }\n": types.CreateBuildingComponentDefaultsDocument,
    "\n  fragment BuildingComponent on BuildingComponent {\n    id\n    state\n    phase\n    componentId\n    name\n    description\n    quantity\n    quantityExact\n    quantityUnit\n    quantitySpare\n    quantityNotes\n    sparePartsNotes\n    constructionYear\n    constructionYearExact\n    constructionYearNotes\n    co2Savings\n    co2SavingsExact\n    condition\n    harmfulSubstances\n    reusePotential\n    reusePotentialNotes\n    reusePotentialConclusion\n    locationInBuilding\n    locationInBuildingDetail\n    showInMatching\n    reuseValuePerUnit\n    reuseValueTotal\n    reuseValueDescription\n    ru1Explanation\n    ru2Explanation\n    ru3Explanation\n    ru1PerUnit\n    ru2PerUnit\n    ru3PerUnit\n    ruPerUnitSum\n    fallbackLevel\n    fallbackLevelCO2PerUnit\n    fallbackLevelCO2Total\n    co2SavingsPerUnit\n    ru1Total\n    ru2Total\n    ru3Total\n    ruTotalSum\n    co2SavingsTotal\n    co2Unit\n    co2QuantityUsed\n    transportDistanceInKm\n    transportVehicleName\n    categoryId {\n      id\n    }\n    dimensions {\n      id\n      type\n      width\n      depth\n      height\n      isExact\n    }\n    dimensionsNotes\n    demolitionPhase\n    potentialInterests\n    warrantyDetails\n    ebkphCategoryId {\n      id\n    }\n    materialsDepot {\n      id\n      name\n      shortName\n    }\n    materialsDepotId {\n      id\n    }\n    storageLocationId {\n      id\n    }\n    storageLocationNotes\n    contacts {\n      id\n      type\n      firstLine\n      firstName\n      lastName\n      street\n      postalCode\n      city\n      country\n      canton\n      notes\n      contact1\n      contact2\n    }\n    assets {\n      id\n      tags\n      createdAt\n      updatedAt\n      asset {\n        id\n        url\n        mimeType\n      }\n    }\n    mainImageId {\n      id\n      url\n    }\n    searchRequestInterests {\n      id\n    }\n    ...BuildingComponentReferenceSelector\n  }\n": types.BuildingComponentFragmentDoc,
    "\n    fragment BuildingComponentReferenceSelector on BuildingComponent {\n      id\n      name\n      componentId\n      quantity\n      searchRequestInterests {\n        id\n      }\n    }\n  ": types.BuildingComponentReferenceSelectorFragmentDoc,
    "\n  query buildingComponentReference(\n    $where: BuildingComponentWhereInput\n    $orderBy: [BuildingComponentOrderByInput!]\n  ) {\n    buildingComponents(where: $where, orderBy: $orderBy) {\n      id\n      ...BuildingComponentReferenceSelector\n    }\n  }\n": types.BuildingComponentReferenceDocument,
    "\n  query categoriesTable(\n    $where: CategoryWhereInput\n    $orderBy: [CategoryOrderByInput!]\n    $take: Int\n    $skip: Int\n  ) {\n    categories(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {\n      id\n      name\n      sortOrder\n    }\n    categoriesCount(where: $where)\n  }\n": types.CategoriesTableDocument,
    "\n  mutation CreateOneCategory($data: CategoryCreateInput!) {\n    createOneCategory(data: $data) {\n      id\n      ...Category\n    }\n  }\n": types.CreateOneCategoryDocument,
    "\n  mutation UpdateOneCategory(\n    $where: EntityIdInput!\n    $data: CategoryUpdateInput!\n  ) {\n    updateOneCategory(where: $where, data: $data) {\n      id\n      ...Category\n    }\n  }\n": types.UpdateOneCategoryDocument,
    "\n  query OneCategory($where: EntityIdInput!) {\n    category(where: $where) {\n      id\n      ...Category\n    }\n  }\n": types.OneCategoryDocument,
    "\n  fragment Category on Category {\n    id\n    name\n    sortOrder\n    description\n    parent {\n      id\n    }\n  }\n": types.CategoryFragmentDoc,
    "\n  fragment CategoryReferenceSelector on Category {\n    id\n    name\n    parent {\n      id\n      name\n    }\n  }\n": types.CategoryReferenceSelectorFragmentDoc,
    "\n  query categoriesReference(\n    $where: CategoryWhereInput\n    $orderBy: [CategoryOrderByInput!]\n  ) {\n    categories(where: $where, orderBy: $orderBy) {\n      id\n      ...CategoryReferenceSelector\n    }\n    categoriesCount\n  }\n": types.CategoriesReferenceDocument,
    "\n  query categories(\n    $where: CategoryWhereInput\n    $orderBy: [CategoryOrderByInput!]\n    $take: Int\n    $skip: Int\n  ) {\n    categories(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {\n      id\n      name\n    }\n    categoriesCount(where: $where)\n  }\n": types.CategoriesDocument,
    "\n  fragment ContactReferenceSelector on Contact {\n    id\n    firstName\n    lastName\n    postalCode\n    city\n  }\n": types.ContactReferenceSelectorFragmentDoc,
    "\n  query ContactReference(\n    $where: ContactWhereInput\n    $orderBy: [ContactOrderByInput!]\n  ) {\n    contacts(where: $where, orderBy: $orderBy) {\n      id\n      ...ContactReferenceSelector\n    }\n    contactsCount\n  }\n": types.ContactReferenceDocument,
    "\n  query ebkphCategoriesTable(\n    $where: EbkphCategoryWhereInput\n    $orderBy: [EbkphCategoryOrderByInput!]\n    $take: Int\n    $skip: Int\n  ) {\n    ebkphCategories(\n      where: $where\n      orderBy: $orderBy\n      take: $take\n      skip: $skip\n    ) {\n      ...EbkphCategory\n    }\n    ebkphCategoriesCount(where: $where)\n  }\n": types.EbkphCategoriesTableDocument,
    "\n  mutation CreateOneEbkphCategory($data: EbkphCategoryCreateInput!) {\n    createOneEbkphCategory(data: $data) {\n      id\n      ...EbkphCategory\n    }\n  }\n": types.CreateOneEbkphCategoryDocument,
    "\n  mutation UpdateOneEbkphCategory(\n    $where: EntityIdInput!\n    $data: EbkphCategoryUpdateInput!\n  ) {\n    updateOneEbkphCategory(where: $where, data: $data) {\n      id\n      ...EbkphCategory\n    }\n  }\n": types.UpdateOneEbkphCategoryDocument,
    "\n  query OneEbkphCategory($where: EntityIdInput!) {\n    ebkphCategory(where: $where) {\n      id\n      ...EbkphCategory\n    }\n  }\n": types.OneEbkphCategoryDocument,
    "\n  fragment EbkphCategoryReferenceSelector on EbkphCategory {\n    id\n    name\n    description\n    parent {\n      id\n    }\n  }\n": types.EbkphCategoryReferenceSelectorFragmentDoc,
    "\n  query ebkphCategoriesReference(\n    $where: EbkphCategoryWhereInput\n    $orderBy: [EbkphCategoryOrderByInput!]\n  ) {\n    ebkphCategories(where: $where, orderBy: $orderBy, take: 1000) {\n      id\n      ...EbkphCategoryReferenceSelector\n    }\n    ebkphCategoriesCount\n  }\n": types.EbkphCategoriesReferenceDocument,
    "\n  query ebkphCategories(\n    $where: EbkphCategoryWhereInput\n    $orderBy: [EbkphCategoryOrderByInput!]\n    $take: Int\n    $skip: Int\n  ) {\n    ebkphCategories(\n      where: $where\n      orderBy: $orderBy\n      take: $take\n      skip: $skip\n    ) {\n      id\n      name\n    }\n    ebkphCategoriesCount(where: $where)\n  }\n": types.EbkphCategoriesDocument,
    "\n  fragment EbkphCategory on EbkphCategory {\n    id\n    name\n    description\n    parentId {\n      id\n      name\n    }\n  }\n": types.EbkphCategoryFragmentDoc,
    "\n  query BuildingComponentsQuery(\n    $where: BuildingComponentWhereInput\n    $orderBy: [BuildingComponentOrderByInput!]\n  ) {\n    buildingComponents(where: $where, orderBy: $orderBy) {\n      id\n      name\n      componentId\n      updatedAt\n      dimensions {\n        id\n        depth\n        height\n        width\n        type\n        unit\n      }\n      category {\n        id\n        name\n      }\n      quantity\n      quantityUnit\n      materialsDepot {\n        id\n        shortName\n      }\n      storageLocation {\n        id\n        name\n      }\n      searchRequestInterests {\n        id\n      }\n      ...BuildingComponent_ListItem\n    }\n  }\n": types.BuildingComponentsQueryDocument,
    "\n  query SearchRequestsQuery(\n    $where: SearchRequestWhereInput\n    $orderBy: [SearchRequestOrderByInput!]\n  ) {\n    searchRequests(where: $where, orderBy: $orderBy) {\n      id\n      buildingComponentName\n      quantity\n      updatedAt\n      quantityUnit\n      project {\n        id\n        shortName\n      }\n    }\n  }\n": types.SearchRequestsQueryDocument,
    "\n  fragment MaterialsDepotImages on MaterialsDepot {\n    shortName\n    assets {\n      id\n      tags\n      asset {\n        id\n        url\n        originalFilename\n        mimeType\n        updatedAt\n      }\n    }\n    buildingComponents {\n      id\n      componentId\n      assets {\n        id\n        tags\n        asset {\n          id\n          url\n          originalFilename\n          mimeType\n          updatedAt\n        }\n      }\n    }\n  }\n": types.MaterialsDepotImagesFragmentDoc,
    "\n  query materialsDepotImages($where: EntityIdInput!) {\n    materialsDepot(where: $where) {\n      id\n      shortName\n      ...MaterialsDepotImages\n    }\n  }\n": types.MaterialsDepotImagesDocument,
    "\n  fragment MaterialsDepot_List on MaterialsDepot {\n    id\n    ...MaterialsDepot_ListItem\n  }\n": types.MaterialsDepot_ListFragmentDoc,
    "\n  query materialsDepotList(\n    $where: MaterialsDepotWhereInput\n    $orderBy: [MaterialsDepotOrderByInput!]\n    $take: Int\n  ) {\n    materialsDepots(where: $where, orderBy: $orderBy, take: $take) {\n      id\n      ...MaterialsDepot_List\n    }\n    materialsDepotsCount(where: $where)\n  }\n": types.MaterialsDepotListDocument,
    "\n  fragment MaterialsDepot_ListItem on MaterialsDepot {\n    id\n    shortName\n    name\n    state\n    mainImage {\n      id\n      url\n    }\n    buildingComponents {\n      id\n      name\n    }\n    searchInterests\n  }\n": types.MaterialsDepot_ListItemFragmentDoc,
    "\n  query CantonByPostalCodeAndCityQuery(\n    $input: CantonByPostalCodeAndCityInput!\n  ) {\n    cantonByPostalCodeAndCity(input: $input)\n  }\n": types.CantonByPostalCodeAndCityQueryDocument,
    "\n  query MaterialsDepotReference($materialsDepotId: String!) {\n    materialsDepot(where: { id: $materialsDepotId }) {\n      id\n      shortName\n    }\n  }\n": types.MaterialsDepotReferenceDocument,
    "\n  mutation CreateOneMaterialsDepot($data: MaterialsDepotCreateInput!) {\n    createOneMaterialsDepot(data: $data) {\n      id\n      ...MaterialsDepot\n    }\n  }\n": types.CreateOneMaterialsDepotDocument,
    "\n  mutation UpdateOneMaterialsDepot(\n    $where: EntityIdInput!\n    $data: MaterialsDepotUpdateInput!\n  ) {\n    updateOneMaterialsDepot(where: $where, data: $data) {\n      id\n      ...MaterialsDepot\n    }\n  }\n": types.UpdateOneMaterialsDepotDocument,
    "\n  query oneMaterialsDepot($where: EntityIdInput!) {\n    materialsDepot(where: $where) {\n      id\n      shortName\n      ...MaterialsDepot\n      ...MaterialsDepotReferenceSelector\n    }\n  }\n": types.OneMaterialsDepotDocument,
    "\n  query createMaterialsDepotDefaults {\n    me {\n      id\n    }\n  }\n": types.CreateMaterialsDepotDefaultsDocument,
    "\n  fragment MaterialsDepot on MaterialsDepot {\n    id\n    state\n    shortName\n    name\n    googleMapsLink\n    complex\n    notes\n    historyNotes\n    typology\n    interventionDepth\n    phase\n    reUseRating\n    constructionYear\n    constructionYearExact\n    city\n    country\n    postalCode\n    canton\n    street\n    updatedAt\n    assets {\n      id\n      tags\n      createdAt\n      updatedAt\n      asset {\n        id\n        url\n        originalFilename\n        mimeType\n      }\n    }\n    mainImageId {\n      id\n      originalFilename\n      url\n    }\n    contacts {\n      id\n      type\n      firstLine\n      firstName\n      lastName\n      street\n      postalCode\n      canton\n      city\n      country\n      notes\n      contact1\n      contact2\n    }\n    tasks {\n      id\n      name\n      closedAt\n      dueDate\n      createdAt\n    }\n    timelines {\n      id\n      description\n      startDate\n      endDate\n      createdAt\n    }\n    buildingComponents {\n      id\n      componentId\n      assets {\n        id\n        tags\n        createdAt\n        updatedAt\n        asset {\n          id\n          url\n          originalFilename\n          mimeType\n        }\n      }\n    }\n    responsableUserId {\n      id\n    }\n    ...MaterialsDepotReferenceSelector\n  }\n": types.MaterialsDepotFragmentDoc,
    "\n  mutation DeleteOneMaterialsDepot($where: EntityIdInput!) {\n    deleteOneMaterialsDepot(where: $where) {\n      id\n      ...MaterialsDepot\n    }\n  }\n": types.DeleteOneMaterialsDepotDocument,
    "\n  fragment MaterialsDepotReferenceSelector on MaterialsDepot {\n    id\n    shortName\n    name\n  }\n": types.MaterialsDepotReferenceSelectorFragmentDoc,
    "\n  query materialsDepotsReference(\n    $where: MaterialsDepotWhereInput\n    $orderBy: [MaterialsDepotOrderByInput!]\n  ) {\n    materialsDepots(where: $where, orderBy: $orderBy) {\n      id\n      ...MaterialsDepotReferenceSelector\n    }\n  }\n": types.MaterialsDepotsReferenceDocument,
    "\n  fragment ProjectImages on Project {\n    id\n    assets {\n      id\n      tags\n      asset {\n        id\n        url\n        originalFilename\n        mimeType\n        updatedAt\n      }\n    }\n  }\n": types.ProjectImagesFragmentDoc,
    "\n  query ProjectImages($where: EntityIdInput!) {\n    project(where: $where) {\n      id\n      shortName\n      ...ProjectImages\n    }\n  }\n": types.ProjectImagesDocument,
    "\n  query projects(\n    $where: ProjectWhereInput\n    $orderBy: [ProjectOrderByInput!]\n    $take: Int\n    $skip: Int\n  ) {\n    projects(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {\n      id\n      name\n      shortName\n      state\n      phase\n      mainImageId {\n        id\n        url\n      }\n      somehowImportantContactWithoutName {\n        id\n        firstLine\n        firstName\n        lastName\n        canton\n      }\n    }\n    projectsCount(where: $where)\n  }\n": types.ProjectsDocument,
    "\n  mutation CreateOneProject($data: ProjectCreateInput!) {\n    createOneProject(data: $data) {\n      id\n      shortName\n      name\n      ...Project\n    }\n  }\n": types.CreateOneProjectDocument,
    "\n  mutation UpdateOneProject(\n    $where: EntityIdInput!\n    $data: ProjectUpdateInput!\n  ) {\n    updateOneProject(where: $where, data: $data) {\n      id\n      shortName\n      name\n      ...Project\n    }\n  }\n": types.UpdateOneProjectDocument,
    "\n  query oneProject($where: EntityIdInput!) {\n    project(where: $where) {\n      id\n      name\n      shortName\n\n      ...Project\n    }\n  }\n": types.OneProjectDocument,
    "\n  query projectDefaults {\n    me {\n      id\n    }\n  }\n": types.ProjectDefaultsDocument,
    "\n  fragment Project on Project {\n    id\n    shortName\n    name\n    state\n    phase\n    city\n    country\n    postalCode\n    street\n    responsableUserPM {\n      id\n    }\n    responsableUserSearch {\n      id\n    }\n    notes\n    contacts {\n      id\n      type\n      firstLine\n      firstName\n      lastName\n      street\n      postalCode\n      city\n      country\n      canton\n      notes\n      contact1\n      contact2\n    }\n    assets {\n      id\n      tags\n      createdAt\n      updatedAt\n      asset {\n        id\n        url\n        mimeType\n      }\n    }\n    mainImageId {\n      id\n      url\n    }\n  }\n": types.ProjectFragmentDoc,
    "\n  fragment ProjectReferenceSelector on Project {\n    id\n    shortName\n    name\n  }\n": types.ProjectReferenceSelectorFragmentDoc,
    "\n  query projectReference(\n    $where: ProjectWhereInput\n    $orderBy: [ProjectOrderByInput!]\n  ) {\n    projects(where: $where, orderBy: $orderBy) {\n      id\n      ...ProjectReferenceSelector\n    }\n    projectsCount\n  }\n": types.ProjectReferenceDocument,
    "\n  query searchRequestInterests(\n    $where: SearchRequestInterestWhereInput\n    $orderBy: [SearchRequestInterestOrderByInput!]\n    $take: Int\n    $skip: Int\n  ) {\n    searchRequestInterests(\n      where: $where\n      orderBy: $orderBy\n      take: $take\n      skip: $skip\n    ) {\n      id\n      responsibleUser {\n        id\n        email\n      }\n      state\n      rejectionReason\n      rejectedAt\n      createdAt\n      searchRequest {\n        id\n        buildingComponentName\n        assignedBuildingComponentsCount\n        reservedBuildingComponentsCount\n        category {\n          id\n          name\n        }\n        project {\n          id\n          name\n          shortName\n        }\n        ebkphCategory {\n          id\n          name\n        }\n        quantity\n        huntingStatusNotes\n        quantityUnit\n        deadlineFound\n      }\n      buildingComponent {\n        id\n        name\n        quantity\n        quantityUnit\n        materialsDepot {\n          id\n          shortName\n        }\n      }\n    }\n    searchRequestInterestsCount(where: $where)\n  }\n": types.SearchRequestInterestsDocument,
    "\n  mutation CreateOneSearchRequestInterest(\n    $data: SearchRequestInterestCreateInput!\n  ) {\n    createOneSearchRequestInterest(data: $data) {\n      id\n      state\n      ...SearchRequestInterest\n    }\n  }\n": types.CreateOneSearchRequestInterestDocument,
    "\n  mutation UpdateOneSearchRequestInterest(\n    $where: EntityIdInput!\n    $data: SearchRequestInterestUpdateInput!\n  ) {\n    updateOneSearchRequestInterest(where: $where, data: $data) {\n      id\n      state\n      ...SearchRequestInterest\n    }\n  }\n": types.UpdateOneSearchRequestInterestDocument,
    "\n  query oneSearchRequestInterest($where: EntityIdInput!) {\n    searchRequestInterest(where: $where) {\n      id\n      state\n      searchRequest {\n        id\n        project {\n          id\n          shortName\n        }\n      }\n      ...SearchRequestInterest\n    }\n  }\n": types.OneSearchRequestInterestDocument,
    "\n  query SearchRequestInterestDefaults {\n    me {\n      id\n    }\n  }\n": types.SearchRequestInterestDefaultsDocument,
    "\n  mutation RejectOneSearchRequestInterest(\n    $input: RejectSearchRequestInterestInput!\n  ) {\n    rejectSearchRequestInterest(input: $input) {\n      id\n      ...SearchRequestInterest\n    }\n  }\n": types.RejectOneSearchRequestInterestDocument,
    "\n  mutation AcceptOneSearchRequestInterest(\n    $input: AcceptSearchRequestInterestInput!\n  ) {\n    acceptSearchRequestInterest(input: $input) {\n      id\n      ...SearchRequestInterest\n    }\n  }\n": types.AcceptOneSearchRequestInterestDocument,
    "\n  mutation DeleteOneSearchRequestInterest($where: EntityIdInput!) {\n    deleteOneSearchRequestInterest(where: $where) {\n      id\n      ...SearchRequestInterest\n    }\n  }\n": types.DeleteOneSearchRequestInterestDocument,
    "\n  fragment SearchRequestInterest on SearchRequestInterest {\n    id\n    responsibleUser {\n      id\n    }\n    searchRequest {\n      id\n    }\n    buildingComponent {\n      id\n    }\n    state\n    rejectedAt\n    rejectionReason\n    notes\n  }\n": types.SearchRequestInterestFragmentDoc,
    "\n    fragment SearchRequestInterestReferenceSelector on SearchRequestInterest {\n      id\n      state\n    }\n  ": types.SearchRequestInterestReferenceSelectorFragmentDoc,
    "\n  query searchRequestInterestReference(\n    $where: SearchRequestInterestWhereInput\n    $orderBy: [SearchRequestInterestOrderByInput!]\n  ) {\n    searchRequestInterests(where: $where, orderBy: $orderBy) {\n      id\n      ...SearchRequestInterestReferenceSelector\n    }\n    searchRequestInterestsCount\n  }\n": types.SearchRequestInterestReferenceDocument,
    "\n  query searchRequests(\n    $where: SearchRequestWhereInput\n    $orderBy: [SearchRequestOrderByInput!]\n    $take: Int\n    $skip: Int\n  ) {\n    searchRequests(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {\n      id\n      state\n      responsibleUser {\n        id\n        email\n      }\n      project {\n        id\n        shortName\n      }\n      category {\n        id\n        name\n      }\n      ebkphCategory {\n        id\n        name\n      }\n      reservedBuildingComponentsCount\n      assignedBuildingComponentsCount\n      buildingComponentName\n      quantity\n      quantityUnit\n      deadlineFound\n    }\n    searchRequestsCount(where: $where)\n  }\n": types.SearchRequestsDocument,
    "\n  query searchRequestProject($where: EntityIdInput!) {\n    searchRequest(where: $where) {\n      id\n      project {\n        id\n        shortName\n      }\n    }\n  }\n": types.SearchRequestProjectDocument,
    "\n  mutation CreateOneSearchRequest($data: SearchRequestCreateInput!) {\n    createOneSearchRequest(data: $data) {\n      id\n      project {\n        id\n        shortName\n      }\n      ...SearchRequest\n    }\n  }\n": types.CreateOneSearchRequestDocument,
    "\n  mutation UpdateOneSearchRequest(\n    $where: EntityIdInput!\n    $data: SearchRequestUpdateInput!\n  ) {\n    updateOneSearchRequest(where: $where, data: $data) {\n      id\n      project {\n        id\n        shortName\n      }\n      ...SearchRequest\n    }\n  }\n": types.UpdateOneSearchRequestDocument,
    "\n  query oneSearchRequest($where: EntityIdInput!) {\n    searchRequest(where: $where) {\n      id\n      project {\n        id\n        shortName\n      }\n      ...SearchRequest\n    }\n  }\n": types.OneSearchRequestDocument,
    "\n  query searchRequestDefaults($projectId: String!) {\n    me {\n      id\n    }\n    project(where: { id: $projectId }) {\n      id\n      shortName\n    }\n  }\n": types.SearchRequestDefaultsDocument,
    "\n  fragment SearchRequest on SearchRequest {\n    id\n    state\n    buildingComponentName\n    buildingComponentDescription\n    quantity\n    quantityUnit\n    deadlineFound\n    deadlineShipment\n    comments\n    budgetInRappens\n    budgetNotes\n    searchConceptNotes\n    huntingStatusNotes\n    fireProtectionNotes\n    soundProofNotes\n    securityNotes\n    fallbackLevel\n    fallbackLevelCO2PerUnit\n    fallbackLevelCO2Total\n    createdAt\n    projectId {\n      id\n    }\n    responsibleUserId {\n      id\n    }\n    categoryId {\n      id\n    }\n    ebkphCategoryId {\n      id\n    }\n    dimensionRanges {\n      id\n      minWidth\n      maxWidth\n      type\n      minHeight\n      maxHeight\n      minDepth\n      maxDepth\n    }\n    assets {\n      id\n      tags\n      createdAt\n      updatedAt\n      asset {\n        id\n        url\n        mimeType\n      }\n    }\n  }\n": types.SearchRequestFragmentDoc,
    "\n  fragment SearchRequestReferenceSelector on SearchRequest {\n    id\n    state\n    project {\n      shortName\n      name\n    }\n    responsibleUser {\n      email\n    }\n    buildingComponentName\n    createdAt\n  }\n": types.SearchRequestReferenceSelectorFragmentDoc,
    "\n  query searchRequestReference(\n    $where: SearchRequestWhereInput\n    $orderBy: [SearchRequestOrderByInput!]\n  ) {\n    searchRequests(where: $where, orderBy: $orderBy) {\n      id\n      ...SearchRequestReferenceSelector\n    }\n    searchRequestsCount\n  }\n": types.SearchRequestReferenceDocument,
    "\n  fragment StorageLocationImages on StorageLocation {\n    id\n    name\n    assets {\n      id\n      tags\n      asset {\n        id\n        url\n        mimeType\n        originalFilename\n        updatedAt\n      }\n    }\n    buildingComponents {\n      id\n      componentId\n      assets {\n        id\n        tags\n        asset {\n          id\n          url\n          mimeType\n          originalFilename\n          updatedAt\n        }\n      }\n    }\n  }\n": types.StorageLocationImagesFragmentDoc,
    "\n  query storageLocationImages($where: EntityIdInput!) {\n    storageLocation(where: $where) {\n      id\n      name\n      ...StorageLocationImages\n    }\n  }\n": types.StorageLocationImagesDocument,
    "\n  fragment StorageLocation_List on StorageLocation {\n    id\n    ...StorageLocation_ListItem\n  }\n": types.StorageLocation_ListFragmentDoc,
    "\n  query storageLocationList(\n    $where: StorageLocationWhereInput\n    $orderBy: [StorageLocationOrderByInput!]\n  ) {\n    storageLocations(where: $where, orderBy: $orderBy) {\n      id\n      name\n      ...StorageLocation_List\n    }\n    storageLocationsCount(where: $where)\n  }\n": types.StorageLocationListDocument,
    "\n  fragment StorageLocation_ListItem on StorageLocation {\n    id\n    name\n    country\n    canton\n    city\n    street\n    googleMapsLink\n    postalCode\n    mainImage {\n      id\n    }\n    contacts {\n      id\n    }\n    assets {\n      id\n    }\n    buildingComponents {\n      id\n    }\n    mainImage {\n      id\n      url\n    }\n    notes\n  }\n": types.StorageLocation_ListItemFragmentDoc,
    "\n  query StorageLocationReference($storageLocationId: String!) {\n    storageLocation(where: { id: $storageLocationId }) {\n      id\n      name\n    }\n  }\n": types.StorageLocationReferenceDocument,
    "\n  mutation CreateOneStorageLocation($data: StorageLocationCreateInput!) {\n    createOneStorageLocation(data: $data) {\n      id\n      name\n      ...StorageLocation\n    }\n  }\n": types.CreateOneStorageLocationDocument,
    "\n  mutation UpdateOneStorageLocation(\n    $where: EntityIdInput!\n    $data: StorageLocationUpdateInput!\n  ) {\n    updateOneStorageLocation(where: $where, data: $data) {\n      id\n      name\n      ...StorageLocation\n    }\n  }\n": types.UpdateOneStorageLocationDocument,
    "\n  query oneStorageLocation($where: EntityIdInput!) {\n    storageLocation(where: $where) {\n      id\n      name\n      ...StorageLocation\n      ...StorageLocationReferenceSelector\n    }\n  }\n": types.OneStorageLocationDocument,
    "\n  fragment StorageLocationReferenceSelector on StorageLocation {\n    id\n    name\n  }\n": types.StorageLocationReferenceSelectorFragmentDoc,
    "\n  query storageLocationsReference(\n    $where: StorageLocationWhereInput\n    $orderBy: [StorageLocationOrderByInput!]\n  ) {\n    storageLocations(where: $where, orderBy: $orderBy) {\n      id\n      name\n      ...StorageLocationReferenceSelector\n    }\n  }\n": types.StorageLocationsReferenceDocument,
    "\n  fragment StorageLocation on StorageLocation {\n    id\n    name\n    country\n    canton\n    city\n    street\n    googleMapsLink\n    postalCode\n    mainImage {\n      id\n    }\n    contacts {\n      id\n      type\n      firstLine\n      firstName\n      lastName\n      street\n      postalCode\n      canton\n      city\n      country\n      notes\n      contact1\n      contact2\n    }\n    assets {\n      id\n      tags\n      createdAt\n      updatedAt\n      asset {\n        id\n        url\n        mimeType\n      }\n    }\n    buildingComponents {\n      id\n    }\n    mainImage {\n      id\n      url\n    }\n    notes\n  }\n": types.StorageLocationFragmentDoc,
    "\n  query createStorageLocationDefaults {\n    me {\n      id\n    }\n  }\n": types.CreateStorageLocationDefaultsDocument,
    "\n  query oneUser($where: EntityIdInput!) {\n    user(where: $where) {\n      id\n      ...User\n      ...UserReferenceSelector\n    }\n  }\n": types.OneUserDocument,
    "\n  fragment User on User {\n    id\n    email\n    notes\n    ...UserReferenceSelector\n  }\n": types.UserFragmentDoc,
    "\n  fragment UserReferenceSelector on User {\n    id\n    email\n  }\n": types.UserReferenceSelectorFragmentDoc,
    "\n  query userReference($where: UserWhereInput, $orderBy: [UserOrderByInput!]) {\n    users(where: $where, orderBy: $orderBy, take: 50) {\n      id\n      ...UserReferenceSelector\n    }\n\n    usersCount\n  }\n": types.UserReferenceDocument,
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
export function graphql(source: "\n  query Me {\n    me {\n      id\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Logout {\n    logout {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation Logout {\n    logout {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation FinishOtpFlowLogin($input: FinishOtpLoginInput!) {\n    finishOtpLogin(input: $input) {\n      user {\n        id\n      }\n      access_token\n    }\n  }\n"): (typeof documents)["\n  mutation FinishOtpFlowLogin($input: FinishOtpLoginInput!) {\n    finishOtpLogin(input: $input) {\n      user {\n        id\n      }\n      access_token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation TriggerOtpFlowLogin($input: TriggerOtpLoginInput!) {\n    triggerOtpLogin(input: $input)\n  }\n"): (typeof documents)["\n  mutation TriggerOtpFlowLogin($input: TriggerOtpLoginInput!) {\n    triggerOtpLogin(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AutocompleteSelect($where: AutocompleteWhereInput) {\n    autocompletes(where: $where) {\n      id\n      value\n    }\n  }\n"): (typeof documents)["\n  query AutocompleteSelect($where: AutocompleteWhereInput) {\n    autocompletes(where: $where) {\n      id\n      value\n    }\n  }\n"];
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
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment BuildingComponentImages on BuildingComponent {\n    id\n    componentId\n    assets {\n      id\n      tags\n      asset {\n        id\n        url\n        originalFilename\n        mimeType\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment BuildingComponentImages on BuildingComponent {\n    id\n    componentId\n    assets {\n      id\n      tags\n      asset {\n        id\n        url\n        originalFilename\n        mimeType\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query BuildingComponentImages($where: EntityIdInput!) {\n    buildingComponent(where: $where) {\n      id\n      ...BuildingComponentImages\n    }\n  }\n"): (typeof documents)["\n  query BuildingComponentImages($where: EntityIdInput!) {\n    buildingComponent(where: $where) {\n      id\n      ...BuildingComponentImages\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment BuildingComponent_List on BuildingComponent {\n    id\n    state\n    phase\n    materialsDepot {\n      id\n      shortName\n    }\n    storageLocation {\n      id\n      name\n    }\n    searchRequestInterests {\n      id\n    }\n    assignedTo {\n      id\n    }\n    ...BuildingComponent_ListItem\n  }\n"): (typeof documents)["\n  fragment BuildingComponent_List on BuildingComponent {\n    id\n    state\n    phase\n    materialsDepot {\n      id\n      shortName\n    }\n    storageLocation {\n      id\n      name\n    }\n    searchRequestInterests {\n      id\n    }\n    assignedTo {\n      id\n    }\n    ...BuildingComponent_ListItem\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query buildingComponentList(\n    $where: BuildingComponentWhereInput\n    $orderBy: [BuildingComponentOrderByInput!]\n  ) {\n    buildingComponents(where: $where, orderBy: $orderBy) {\n      id\n      ...BuildingComponent_List\n    }\n    buildingComponentsCount(where: $where)\n  }\n"): (typeof documents)["\n  query buildingComponentList(\n    $where: BuildingComponentWhereInput\n    $orderBy: [BuildingComponentOrderByInput!]\n  ) {\n    buildingComponents(where: $where, orderBy: $orderBy) {\n      id\n      ...BuildingComponent_List\n    }\n    buildingComponentsCount(where: $where)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment BuildingComponent_ListItem on BuildingComponent {\n    id\n    name\n    phase\n    createdAt\n    componentSn\n    componentId\n    state\n    quantity\n    quantityUnit\n    materialsDepot {\n      id\n      shortName\n      name\n    }\n    mainImage {\n      id\n      url\n    }\n    searchRequestInterests {\n      id\n    }\n  }\n"): (typeof documents)["\n  fragment BuildingComponent_ListItem on BuildingComponent {\n    id\n    name\n    phase\n    createdAt\n    componentSn\n    componentId\n    state\n    quantity\n    quantityUnit\n    materialsDepot {\n      id\n      shortName\n      name\n    }\n    mainImage {\n      id\n      url\n    }\n    searchRequestInterests {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateOneBuildingComponent($data: BuildingComponentCreateInput!) {\n    createOneBuildingComponent(data: $data) {\n      id\n      ...BuildingComponent\n    }\n  }\n"): (typeof documents)["\n  mutation CreateOneBuildingComponent($data: BuildingComponentCreateInput!) {\n    createOneBuildingComponent(data: $data) {\n      id\n      ...BuildingComponent\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateOneBuildingComponent(\n    $where: EntityIdInput!\n    $data: BuildingComponentUpdateInput!\n  ) {\n    updateOneBuildingComponent(where: $where, data: $data) {\n      id\n      ...BuildingComponent\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateOneBuildingComponent(\n    $where: EntityIdInput!\n    $data: BuildingComponentUpdateInput!\n  ) {\n    updateOneBuildingComponent(where: $where, data: $data) {\n      id\n      ...BuildingComponent\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteOneBuildingComponent($where: EntityIdInput!) {\n    deleteOneBuildingComponent(where: $where) {\n      id\n      ...BuildingComponent\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteOneBuildingComponent($where: EntityIdInput!) {\n    deleteOneBuildingComponent(where: $where) {\n      id\n      ...BuildingComponent\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query BuildingComponent($where: EntityIdInput!) {\n    buildingComponent(where: $where) {\n      id\n      componentId\n      materialsDepot {\n        id\n        shortName\n      }\n      searchRequestInterests {\n        id\n      }\n      ...BuildingComponent\n      ...BuildingComponentReferenceSelector\n    }\n  }\n"): (typeof documents)["\n  query BuildingComponent($where: EntityIdInput!) {\n    buildingComponent(where: $where) {\n      id\n      componentId\n      materialsDepot {\n        id\n        shortName\n      }\n      searchRequestInterests {\n        id\n      }\n      ...BuildingComponent\n      ...BuildingComponentReferenceSelector\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query createBuildingComponentDefaults($materialsDepotId: String!) {\n    me {\n      id\n    }\n    materialsDepot(where: { id: $materialsDepotId }) {\n      id\n      shortName\n    }\n  }\n"): (typeof documents)["\n  query createBuildingComponentDefaults($materialsDepotId: String!) {\n    me {\n      id\n    }\n    materialsDepot(where: { id: $materialsDepotId }) {\n      id\n      shortName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment BuildingComponent on BuildingComponent {\n    id\n    state\n    phase\n    componentId\n    name\n    description\n    quantity\n    quantityExact\n    quantityUnit\n    quantitySpare\n    quantityNotes\n    sparePartsNotes\n    constructionYear\n    constructionYearExact\n    constructionYearNotes\n    co2Savings\n    co2SavingsExact\n    condition\n    harmfulSubstances\n    reusePotential\n    reusePotentialNotes\n    reusePotentialConclusion\n    locationInBuilding\n    locationInBuildingDetail\n    showInMatching\n    reuseValuePerUnit\n    reuseValueTotal\n    reuseValueDescription\n    ru1Explanation\n    ru2Explanation\n    ru3Explanation\n    ru1PerUnit\n    ru2PerUnit\n    ru3PerUnit\n    ruPerUnitSum\n    fallbackLevel\n    fallbackLevelCO2PerUnit\n    fallbackLevelCO2Total\n    co2SavingsPerUnit\n    ru1Total\n    ru2Total\n    ru3Total\n    ruTotalSum\n    co2SavingsTotal\n    co2Unit\n    co2QuantityUsed\n    transportDistanceInKm\n    transportVehicleName\n    categoryId {\n      id\n    }\n    dimensions {\n      id\n      type\n      width\n      depth\n      height\n      isExact\n    }\n    dimensionsNotes\n    demolitionPhase\n    potentialInterests\n    warrantyDetails\n    ebkphCategoryId {\n      id\n    }\n    materialsDepot {\n      id\n      name\n      shortName\n    }\n    materialsDepotId {\n      id\n    }\n    storageLocationId {\n      id\n    }\n    storageLocationNotes\n    contacts {\n      id\n      type\n      firstLine\n      firstName\n      lastName\n      street\n      postalCode\n      city\n      country\n      canton\n      notes\n      contact1\n      contact2\n    }\n    assets {\n      id\n      tags\n      createdAt\n      updatedAt\n      asset {\n        id\n        url\n        mimeType\n      }\n    }\n    mainImageId {\n      id\n      url\n    }\n    searchRequestInterests {\n      id\n    }\n    ...BuildingComponentReferenceSelector\n  }\n"): (typeof documents)["\n  fragment BuildingComponent on BuildingComponent {\n    id\n    state\n    phase\n    componentId\n    name\n    description\n    quantity\n    quantityExact\n    quantityUnit\n    quantitySpare\n    quantityNotes\n    sparePartsNotes\n    constructionYear\n    constructionYearExact\n    constructionYearNotes\n    co2Savings\n    co2SavingsExact\n    condition\n    harmfulSubstances\n    reusePotential\n    reusePotentialNotes\n    reusePotentialConclusion\n    locationInBuilding\n    locationInBuildingDetail\n    showInMatching\n    reuseValuePerUnit\n    reuseValueTotal\n    reuseValueDescription\n    ru1Explanation\n    ru2Explanation\n    ru3Explanation\n    ru1PerUnit\n    ru2PerUnit\n    ru3PerUnit\n    ruPerUnitSum\n    fallbackLevel\n    fallbackLevelCO2PerUnit\n    fallbackLevelCO2Total\n    co2SavingsPerUnit\n    ru1Total\n    ru2Total\n    ru3Total\n    ruTotalSum\n    co2SavingsTotal\n    co2Unit\n    co2QuantityUsed\n    transportDistanceInKm\n    transportVehicleName\n    categoryId {\n      id\n    }\n    dimensions {\n      id\n      type\n      width\n      depth\n      height\n      isExact\n    }\n    dimensionsNotes\n    demolitionPhase\n    potentialInterests\n    warrantyDetails\n    ebkphCategoryId {\n      id\n    }\n    materialsDepot {\n      id\n      name\n      shortName\n    }\n    materialsDepotId {\n      id\n    }\n    storageLocationId {\n      id\n    }\n    storageLocationNotes\n    contacts {\n      id\n      type\n      firstLine\n      firstName\n      lastName\n      street\n      postalCode\n      city\n      country\n      canton\n      notes\n      contact1\n      contact2\n    }\n    assets {\n      id\n      tags\n      createdAt\n      updatedAt\n      asset {\n        id\n        url\n        mimeType\n      }\n    }\n    mainImageId {\n      id\n      url\n    }\n    searchRequestInterests {\n      id\n    }\n    ...BuildingComponentReferenceSelector\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment BuildingComponentReferenceSelector on BuildingComponent {\n      id\n      name\n      componentId\n      quantity\n      searchRequestInterests {\n        id\n      }\n    }\n  "): (typeof documents)["\n    fragment BuildingComponentReferenceSelector on BuildingComponent {\n      id\n      name\n      componentId\n      quantity\n      searchRequestInterests {\n        id\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query buildingComponentReference(\n    $where: BuildingComponentWhereInput\n    $orderBy: [BuildingComponentOrderByInput!]\n  ) {\n    buildingComponents(where: $where, orderBy: $orderBy) {\n      id\n      ...BuildingComponentReferenceSelector\n    }\n  }\n"): (typeof documents)["\n  query buildingComponentReference(\n    $where: BuildingComponentWhereInput\n    $orderBy: [BuildingComponentOrderByInput!]\n  ) {\n    buildingComponents(where: $where, orderBy: $orderBy) {\n      id\n      ...BuildingComponentReferenceSelector\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query categoriesTable(\n    $where: CategoryWhereInput\n    $orderBy: [CategoryOrderByInput!]\n    $take: Int\n    $skip: Int\n  ) {\n    categories(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {\n      id\n      name\n      sortOrder\n    }\n    categoriesCount(where: $where)\n  }\n"): (typeof documents)["\n  query categoriesTable(\n    $where: CategoryWhereInput\n    $orderBy: [CategoryOrderByInput!]\n    $take: Int\n    $skip: Int\n  ) {\n    categories(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {\n      id\n      name\n      sortOrder\n    }\n    categoriesCount(where: $where)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateOneCategory($data: CategoryCreateInput!) {\n    createOneCategory(data: $data) {\n      id\n      ...Category\n    }\n  }\n"): (typeof documents)["\n  mutation CreateOneCategory($data: CategoryCreateInput!) {\n    createOneCategory(data: $data) {\n      id\n      ...Category\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateOneCategory(\n    $where: EntityIdInput!\n    $data: CategoryUpdateInput!\n  ) {\n    updateOneCategory(where: $where, data: $data) {\n      id\n      ...Category\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateOneCategory(\n    $where: EntityIdInput!\n    $data: CategoryUpdateInput!\n  ) {\n    updateOneCategory(where: $where, data: $data) {\n      id\n      ...Category\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query OneCategory($where: EntityIdInput!) {\n    category(where: $where) {\n      id\n      ...Category\n    }\n  }\n"): (typeof documents)["\n  query OneCategory($where: EntityIdInput!) {\n    category(where: $where) {\n      id\n      ...Category\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Category on Category {\n    id\n    name\n    sortOrder\n    description\n    parent {\n      id\n    }\n  }\n"): (typeof documents)["\n  fragment Category on Category {\n    id\n    name\n    sortOrder\n    description\n    parent {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CategoryReferenceSelector on Category {\n    id\n    name\n    parent {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  fragment CategoryReferenceSelector on Category {\n    id\n    name\n    parent {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query categoriesReference(\n    $where: CategoryWhereInput\n    $orderBy: [CategoryOrderByInput!]\n  ) {\n    categories(where: $where, orderBy: $orderBy) {\n      id\n      ...CategoryReferenceSelector\n    }\n    categoriesCount\n  }\n"): (typeof documents)["\n  query categoriesReference(\n    $where: CategoryWhereInput\n    $orderBy: [CategoryOrderByInput!]\n  ) {\n    categories(where: $where, orderBy: $orderBy) {\n      id\n      ...CategoryReferenceSelector\n    }\n    categoriesCount\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query categories(\n    $where: CategoryWhereInput\n    $orderBy: [CategoryOrderByInput!]\n    $take: Int\n    $skip: Int\n  ) {\n    categories(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {\n      id\n      name\n    }\n    categoriesCount(where: $where)\n  }\n"): (typeof documents)["\n  query categories(\n    $where: CategoryWhereInput\n    $orderBy: [CategoryOrderByInput!]\n    $take: Int\n    $skip: Int\n  ) {\n    categories(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {\n      id\n      name\n    }\n    categoriesCount(where: $where)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ContactReferenceSelector on Contact {\n    id\n    firstName\n    lastName\n    postalCode\n    city\n  }\n"): (typeof documents)["\n  fragment ContactReferenceSelector on Contact {\n    id\n    firstName\n    lastName\n    postalCode\n    city\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ContactReference(\n    $where: ContactWhereInput\n    $orderBy: [ContactOrderByInput!]\n  ) {\n    contacts(where: $where, orderBy: $orderBy) {\n      id\n      ...ContactReferenceSelector\n    }\n    contactsCount\n  }\n"): (typeof documents)["\n  query ContactReference(\n    $where: ContactWhereInput\n    $orderBy: [ContactOrderByInput!]\n  ) {\n    contacts(where: $where, orderBy: $orderBy) {\n      id\n      ...ContactReferenceSelector\n    }\n    contactsCount\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ebkphCategoriesTable(\n    $where: EbkphCategoryWhereInput\n    $orderBy: [EbkphCategoryOrderByInput!]\n    $take: Int\n    $skip: Int\n  ) {\n    ebkphCategories(\n      where: $where\n      orderBy: $orderBy\n      take: $take\n      skip: $skip\n    ) {\n      ...EbkphCategory\n    }\n    ebkphCategoriesCount(where: $where)\n  }\n"): (typeof documents)["\n  query ebkphCategoriesTable(\n    $where: EbkphCategoryWhereInput\n    $orderBy: [EbkphCategoryOrderByInput!]\n    $take: Int\n    $skip: Int\n  ) {\n    ebkphCategories(\n      where: $where\n      orderBy: $orderBy\n      take: $take\n      skip: $skip\n    ) {\n      ...EbkphCategory\n    }\n    ebkphCategoriesCount(where: $where)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateOneEbkphCategory($data: EbkphCategoryCreateInput!) {\n    createOneEbkphCategory(data: $data) {\n      id\n      ...EbkphCategory\n    }\n  }\n"): (typeof documents)["\n  mutation CreateOneEbkphCategory($data: EbkphCategoryCreateInput!) {\n    createOneEbkphCategory(data: $data) {\n      id\n      ...EbkphCategory\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateOneEbkphCategory(\n    $where: EntityIdInput!\n    $data: EbkphCategoryUpdateInput!\n  ) {\n    updateOneEbkphCategory(where: $where, data: $data) {\n      id\n      ...EbkphCategory\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateOneEbkphCategory(\n    $where: EntityIdInput!\n    $data: EbkphCategoryUpdateInput!\n  ) {\n    updateOneEbkphCategory(where: $where, data: $data) {\n      id\n      ...EbkphCategory\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query OneEbkphCategory($where: EntityIdInput!) {\n    ebkphCategory(where: $where) {\n      id\n      ...EbkphCategory\n    }\n  }\n"): (typeof documents)["\n  query OneEbkphCategory($where: EntityIdInput!) {\n    ebkphCategory(where: $where) {\n      id\n      ...EbkphCategory\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment EbkphCategoryReferenceSelector on EbkphCategory {\n    id\n    name\n    description\n    parent {\n      id\n    }\n  }\n"): (typeof documents)["\n  fragment EbkphCategoryReferenceSelector on EbkphCategory {\n    id\n    name\n    description\n    parent {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ebkphCategoriesReference(\n    $where: EbkphCategoryWhereInput\n    $orderBy: [EbkphCategoryOrderByInput!]\n  ) {\n    ebkphCategories(where: $where, orderBy: $orderBy, take: 1000) {\n      id\n      ...EbkphCategoryReferenceSelector\n    }\n    ebkphCategoriesCount\n  }\n"): (typeof documents)["\n  query ebkphCategoriesReference(\n    $where: EbkphCategoryWhereInput\n    $orderBy: [EbkphCategoryOrderByInput!]\n  ) {\n    ebkphCategories(where: $where, orderBy: $orderBy, take: 1000) {\n      id\n      ...EbkphCategoryReferenceSelector\n    }\n    ebkphCategoriesCount\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ebkphCategories(\n    $where: EbkphCategoryWhereInput\n    $orderBy: [EbkphCategoryOrderByInput!]\n    $take: Int\n    $skip: Int\n  ) {\n    ebkphCategories(\n      where: $where\n      orderBy: $orderBy\n      take: $take\n      skip: $skip\n    ) {\n      id\n      name\n    }\n    ebkphCategoriesCount(where: $where)\n  }\n"): (typeof documents)["\n  query ebkphCategories(\n    $where: EbkphCategoryWhereInput\n    $orderBy: [EbkphCategoryOrderByInput!]\n    $take: Int\n    $skip: Int\n  ) {\n    ebkphCategories(\n      where: $where\n      orderBy: $orderBy\n      take: $take\n      skip: $skip\n    ) {\n      id\n      name\n    }\n    ebkphCategoriesCount(where: $where)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment EbkphCategory on EbkphCategory {\n    id\n    name\n    description\n    parentId {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  fragment EbkphCategory on EbkphCategory {\n    id\n    name\n    description\n    parentId {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query BuildingComponentsQuery(\n    $where: BuildingComponentWhereInput\n    $orderBy: [BuildingComponentOrderByInput!]\n  ) {\n    buildingComponents(where: $where, orderBy: $orderBy) {\n      id\n      name\n      componentId\n      updatedAt\n      dimensions {\n        id\n        depth\n        height\n        width\n        type\n        unit\n      }\n      category {\n        id\n        name\n      }\n      quantity\n      quantityUnit\n      materialsDepot {\n        id\n        shortName\n      }\n      storageLocation {\n        id\n        name\n      }\n      searchRequestInterests {\n        id\n      }\n      ...BuildingComponent_ListItem\n    }\n  }\n"): (typeof documents)["\n  query BuildingComponentsQuery(\n    $where: BuildingComponentWhereInput\n    $orderBy: [BuildingComponentOrderByInput!]\n  ) {\n    buildingComponents(where: $where, orderBy: $orderBy) {\n      id\n      name\n      componentId\n      updatedAt\n      dimensions {\n        id\n        depth\n        height\n        width\n        type\n        unit\n      }\n      category {\n        id\n        name\n      }\n      quantity\n      quantityUnit\n      materialsDepot {\n        id\n        shortName\n      }\n      storageLocation {\n        id\n        name\n      }\n      searchRequestInterests {\n        id\n      }\n      ...BuildingComponent_ListItem\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchRequestsQuery(\n    $where: SearchRequestWhereInput\n    $orderBy: [SearchRequestOrderByInput!]\n  ) {\n    searchRequests(where: $where, orderBy: $orderBy) {\n      id\n      buildingComponentName\n      quantity\n      updatedAt\n      quantityUnit\n      project {\n        id\n        shortName\n      }\n    }\n  }\n"): (typeof documents)["\n  query SearchRequestsQuery(\n    $where: SearchRequestWhereInput\n    $orderBy: [SearchRequestOrderByInput!]\n  ) {\n    searchRequests(where: $where, orderBy: $orderBy) {\n      id\n      buildingComponentName\n      quantity\n      updatedAt\n      quantityUnit\n      project {\n        id\n        shortName\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MaterialsDepotImages on MaterialsDepot {\n    shortName\n    assets {\n      id\n      tags\n      asset {\n        id\n        url\n        originalFilename\n        mimeType\n        updatedAt\n      }\n    }\n    buildingComponents {\n      id\n      componentId\n      assets {\n        id\n        tags\n        asset {\n          id\n          url\n          originalFilename\n          mimeType\n          updatedAt\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment MaterialsDepotImages on MaterialsDepot {\n    shortName\n    assets {\n      id\n      tags\n      asset {\n        id\n        url\n        originalFilename\n        mimeType\n        updatedAt\n      }\n    }\n    buildingComponents {\n      id\n      componentId\n      assets {\n        id\n        tags\n        asset {\n          id\n          url\n          originalFilename\n          mimeType\n          updatedAt\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query materialsDepotImages($where: EntityIdInput!) {\n    materialsDepot(where: $where) {\n      id\n      shortName\n      ...MaterialsDepotImages\n    }\n  }\n"): (typeof documents)["\n  query materialsDepotImages($where: EntityIdInput!) {\n    materialsDepot(where: $where) {\n      id\n      shortName\n      ...MaterialsDepotImages\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MaterialsDepot_List on MaterialsDepot {\n    id\n    ...MaterialsDepot_ListItem\n  }\n"): (typeof documents)["\n  fragment MaterialsDepot_List on MaterialsDepot {\n    id\n    ...MaterialsDepot_ListItem\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query materialsDepotList(\n    $where: MaterialsDepotWhereInput\n    $orderBy: [MaterialsDepotOrderByInput!]\n    $take: Int\n  ) {\n    materialsDepots(where: $where, orderBy: $orderBy, take: $take) {\n      id\n      ...MaterialsDepot_List\n    }\n    materialsDepotsCount(where: $where)\n  }\n"): (typeof documents)["\n  query materialsDepotList(\n    $where: MaterialsDepotWhereInput\n    $orderBy: [MaterialsDepotOrderByInput!]\n    $take: Int\n  ) {\n    materialsDepots(where: $where, orderBy: $orderBy, take: $take) {\n      id\n      ...MaterialsDepot_List\n    }\n    materialsDepotsCount(where: $where)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MaterialsDepot_ListItem on MaterialsDepot {\n    id\n    shortName\n    name\n    state\n    mainImage {\n      id\n      url\n    }\n    buildingComponents {\n      id\n      name\n    }\n    searchInterests\n  }\n"): (typeof documents)["\n  fragment MaterialsDepot_ListItem on MaterialsDepot {\n    id\n    shortName\n    name\n    state\n    mainImage {\n      id\n      url\n    }\n    buildingComponents {\n      id\n      name\n    }\n    searchInterests\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CantonByPostalCodeAndCityQuery(\n    $input: CantonByPostalCodeAndCityInput!\n  ) {\n    cantonByPostalCodeAndCity(input: $input)\n  }\n"): (typeof documents)["\n  query CantonByPostalCodeAndCityQuery(\n    $input: CantonByPostalCodeAndCityInput!\n  ) {\n    cantonByPostalCodeAndCity(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MaterialsDepotReference($materialsDepotId: String!) {\n    materialsDepot(where: { id: $materialsDepotId }) {\n      id\n      shortName\n    }\n  }\n"): (typeof documents)["\n  query MaterialsDepotReference($materialsDepotId: String!) {\n    materialsDepot(where: { id: $materialsDepotId }) {\n      id\n      shortName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateOneMaterialsDepot($data: MaterialsDepotCreateInput!) {\n    createOneMaterialsDepot(data: $data) {\n      id\n      ...MaterialsDepot\n    }\n  }\n"): (typeof documents)["\n  mutation CreateOneMaterialsDepot($data: MaterialsDepotCreateInput!) {\n    createOneMaterialsDepot(data: $data) {\n      id\n      ...MaterialsDepot\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateOneMaterialsDepot(\n    $where: EntityIdInput!\n    $data: MaterialsDepotUpdateInput!\n  ) {\n    updateOneMaterialsDepot(where: $where, data: $data) {\n      id\n      ...MaterialsDepot\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateOneMaterialsDepot(\n    $where: EntityIdInput!\n    $data: MaterialsDepotUpdateInput!\n  ) {\n    updateOneMaterialsDepot(where: $where, data: $data) {\n      id\n      ...MaterialsDepot\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query oneMaterialsDepot($where: EntityIdInput!) {\n    materialsDepot(where: $where) {\n      id\n      shortName\n      ...MaterialsDepot\n      ...MaterialsDepotReferenceSelector\n    }\n  }\n"): (typeof documents)["\n  query oneMaterialsDepot($where: EntityIdInput!) {\n    materialsDepot(where: $where) {\n      id\n      shortName\n      ...MaterialsDepot\n      ...MaterialsDepotReferenceSelector\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query createMaterialsDepotDefaults {\n    me {\n      id\n    }\n  }\n"): (typeof documents)["\n  query createMaterialsDepotDefaults {\n    me {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MaterialsDepot on MaterialsDepot {\n    id\n    state\n    shortName\n    name\n    googleMapsLink\n    complex\n    notes\n    historyNotes\n    typology\n    interventionDepth\n    phase\n    reUseRating\n    constructionYear\n    constructionYearExact\n    city\n    country\n    postalCode\n    canton\n    street\n    updatedAt\n    assets {\n      id\n      tags\n      createdAt\n      updatedAt\n      asset {\n        id\n        url\n        originalFilename\n        mimeType\n      }\n    }\n    mainImageId {\n      id\n      originalFilename\n      url\n    }\n    contacts {\n      id\n      type\n      firstLine\n      firstName\n      lastName\n      street\n      postalCode\n      canton\n      city\n      country\n      notes\n      contact1\n      contact2\n    }\n    tasks {\n      id\n      name\n      closedAt\n      dueDate\n      createdAt\n    }\n    timelines {\n      id\n      description\n      startDate\n      endDate\n      createdAt\n    }\n    buildingComponents {\n      id\n      componentId\n      assets {\n        id\n        tags\n        createdAt\n        updatedAt\n        asset {\n          id\n          url\n          originalFilename\n          mimeType\n        }\n      }\n    }\n    responsableUserId {\n      id\n    }\n    ...MaterialsDepotReferenceSelector\n  }\n"): (typeof documents)["\n  fragment MaterialsDepot on MaterialsDepot {\n    id\n    state\n    shortName\n    name\n    googleMapsLink\n    complex\n    notes\n    historyNotes\n    typology\n    interventionDepth\n    phase\n    reUseRating\n    constructionYear\n    constructionYearExact\n    city\n    country\n    postalCode\n    canton\n    street\n    updatedAt\n    assets {\n      id\n      tags\n      createdAt\n      updatedAt\n      asset {\n        id\n        url\n        originalFilename\n        mimeType\n      }\n    }\n    mainImageId {\n      id\n      originalFilename\n      url\n    }\n    contacts {\n      id\n      type\n      firstLine\n      firstName\n      lastName\n      street\n      postalCode\n      canton\n      city\n      country\n      notes\n      contact1\n      contact2\n    }\n    tasks {\n      id\n      name\n      closedAt\n      dueDate\n      createdAt\n    }\n    timelines {\n      id\n      description\n      startDate\n      endDate\n      createdAt\n    }\n    buildingComponents {\n      id\n      componentId\n      assets {\n        id\n        tags\n        createdAt\n        updatedAt\n        asset {\n          id\n          url\n          originalFilename\n          mimeType\n        }\n      }\n    }\n    responsableUserId {\n      id\n    }\n    ...MaterialsDepotReferenceSelector\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteOneMaterialsDepot($where: EntityIdInput!) {\n    deleteOneMaterialsDepot(where: $where) {\n      id\n      ...MaterialsDepot\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteOneMaterialsDepot($where: EntityIdInput!) {\n    deleteOneMaterialsDepot(where: $where) {\n      id\n      ...MaterialsDepot\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MaterialsDepotReferenceSelector on MaterialsDepot {\n    id\n    shortName\n    name\n  }\n"): (typeof documents)["\n  fragment MaterialsDepotReferenceSelector on MaterialsDepot {\n    id\n    shortName\n    name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query materialsDepotsReference(\n    $where: MaterialsDepotWhereInput\n    $orderBy: [MaterialsDepotOrderByInput!]\n  ) {\n    materialsDepots(where: $where, orderBy: $orderBy) {\n      id\n      ...MaterialsDepotReferenceSelector\n    }\n  }\n"): (typeof documents)["\n  query materialsDepotsReference(\n    $where: MaterialsDepotWhereInput\n    $orderBy: [MaterialsDepotOrderByInput!]\n  ) {\n    materialsDepots(where: $where, orderBy: $orderBy) {\n      id\n      ...MaterialsDepotReferenceSelector\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProjectImages on Project {\n    id\n    assets {\n      id\n      tags\n      asset {\n        id\n        url\n        originalFilename\n        mimeType\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment ProjectImages on Project {\n    id\n    assets {\n      id\n      tags\n      asset {\n        id\n        url\n        originalFilename\n        mimeType\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ProjectImages($where: EntityIdInput!) {\n    project(where: $where) {\n      id\n      shortName\n      ...ProjectImages\n    }\n  }\n"): (typeof documents)["\n  query ProjectImages($where: EntityIdInput!) {\n    project(where: $where) {\n      id\n      shortName\n      ...ProjectImages\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query projects(\n    $where: ProjectWhereInput\n    $orderBy: [ProjectOrderByInput!]\n    $take: Int\n    $skip: Int\n  ) {\n    projects(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {\n      id\n      name\n      shortName\n      state\n      phase\n      mainImageId {\n        id\n        url\n      }\n      somehowImportantContactWithoutName {\n        id\n        firstLine\n        firstName\n        lastName\n        canton\n      }\n    }\n    projectsCount(where: $where)\n  }\n"): (typeof documents)["\n  query projects(\n    $where: ProjectWhereInput\n    $orderBy: [ProjectOrderByInput!]\n    $take: Int\n    $skip: Int\n  ) {\n    projects(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {\n      id\n      name\n      shortName\n      state\n      phase\n      mainImageId {\n        id\n        url\n      }\n      somehowImportantContactWithoutName {\n        id\n        firstLine\n        firstName\n        lastName\n        canton\n      }\n    }\n    projectsCount(where: $where)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateOneProject($data: ProjectCreateInput!) {\n    createOneProject(data: $data) {\n      id\n      shortName\n      name\n      ...Project\n    }\n  }\n"): (typeof documents)["\n  mutation CreateOneProject($data: ProjectCreateInput!) {\n    createOneProject(data: $data) {\n      id\n      shortName\n      name\n      ...Project\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateOneProject(\n    $where: EntityIdInput!\n    $data: ProjectUpdateInput!\n  ) {\n    updateOneProject(where: $where, data: $data) {\n      id\n      shortName\n      name\n      ...Project\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateOneProject(\n    $where: EntityIdInput!\n    $data: ProjectUpdateInput!\n  ) {\n    updateOneProject(where: $where, data: $data) {\n      id\n      shortName\n      name\n      ...Project\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query oneProject($where: EntityIdInput!) {\n    project(where: $where) {\n      id\n      name\n      shortName\n\n      ...Project\n    }\n  }\n"): (typeof documents)["\n  query oneProject($where: EntityIdInput!) {\n    project(where: $where) {\n      id\n      name\n      shortName\n\n      ...Project\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query projectDefaults {\n    me {\n      id\n    }\n  }\n"): (typeof documents)["\n  query projectDefaults {\n    me {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Project on Project {\n    id\n    shortName\n    name\n    state\n    phase\n    city\n    country\n    postalCode\n    street\n    responsableUserPM {\n      id\n    }\n    responsableUserSearch {\n      id\n    }\n    notes\n    contacts {\n      id\n      type\n      firstLine\n      firstName\n      lastName\n      street\n      postalCode\n      city\n      country\n      canton\n      notes\n      contact1\n      contact2\n    }\n    assets {\n      id\n      tags\n      createdAt\n      updatedAt\n      asset {\n        id\n        url\n        mimeType\n      }\n    }\n    mainImageId {\n      id\n      url\n    }\n  }\n"): (typeof documents)["\n  fragment Project on Project {\n    id\n    shortName\n    name\n    state\n    phase\n    city\n    country\n    postalCode\n    street\n    responsableUserPM {\n      id\n    }\n    responsableUserSearch {\n      id\n    }\n    notes\n    contacts {\n      id\n      type\n      firstLine\n      firstName\n      lastName\n      street\n      postalCode\n      city\n      country\n      canton\n      notes\n      contact1\n      contact2\n    }\n    assets {\n      id\n      tags\n      createdAt\n      updatedAt\n      asset {\n        id\n        url\n        mimeType\n      }\n    }\n    mainImageId {\n      id\n      url\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ProjectReferenceSelector on Project {\n    id\n    shortName\n    name\n  }\n"): (typeof documents)["\n  fragment ProjectReferenceSelector on Project {\n    id\n    shortName\n    name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query projectReference(\n    $where: ProjectWhereInput\n    $orderBy: [ProjectOrderByInput!]\n  ) {\n    projects(where: $where, orderBy: $orderBy) {\n      id\n      ...ProjectReferenceSelector\n    }\n    projectsCount\n  }\n"): (typeof documents)["\n  query projectReference(\n    $where: ProjectWhereInput\n    $orderBy: [ProjectOrderByInput!]\n  ) {\n    projects(where: $where, orderBy: $orderBy) {\n      id\n      ...ProjectReferenceSelector\n    }\n    projectsCount\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query searchRequestInterests(\n    $where: SearchRequestInterestWhereInput\n    $orderBy: [SearchRequestInterestOrderByInput!]\n    $take: Int\n    $skip: Int\n  ) {\n    searchRequestInterests(\n      where: $where\n      orderBy: $orderBy\n      take: $take\n      skip: $skip\n    ) {\n      id\n      responsibleUser {\n        id\n        email\n      }\n      state\n      rejectionReason\n      rejectedAt\n      createdAt\n      searchRequest {\n        id\n        buildingComponentName\n        assignedBuildingComponentsCount\n        reservedBuildingComponentsCount\n        category {\n          id\n          name\n        }\n        project {\n          id\n          name\n          shortName\n        }\n        ebkphCategory {\n          id\n          name\n        }\n        quantity\n        huntingStatusNotes\n        quantityUnit\n        deadlineFound\n      }\n      buildingComponent {\n        id\n        name\n        quantity\n        quantityUnit\n        materialsDepot {\n          id\n          shortName\n        }\n      }\n    }\n    searchRequestInterestsCount(where: $where)\n  }\n"): (typeof documents)["\n  query searchRequestInterests(\n    $where: SearchRequestInterestWhereInput\n    $orderBy: [SearchRequestInterestOrderByInput!]\n    $take: Int\n    $skip: Int\n  ) {\n    searchRequestInterests(\n      where: $where\n      orderBy: $orderBy\n      take: $take\n      skip: $skip\n    ) {\n      id\n      responsibleUser {\n        id\n        email\n      }\n      state\n      rejectionReason\n      rejectedAt\n      createdAt\n      searchRequest {\n        id\n        buildingComponentName\n        assignedBuildingComponentsCount\n        reservedBuildingComponentsCount\n        category {\n          id\n          name\n        }\n        project {\n          id\n          name\n          shortName\n        }\n        ebkphCategory {\n          id\n          name\n        }\n        quantity\n        huntingStatusNotes\n        quantityUnit\n        deadlineFound\n      }\n      buildingComponent {\n        id\n        name\n        quantity\n        quantityUnit\n        materialsDepot {\n          id\n          shortName\n        }\n      }\n    }\n    searchRequestInterestsCount(where: $where)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateOneSearchRequestInterest(\n    $data: SearchRequestInterestCreateInput!\n  ) {\n    createOneSearchRequestInterest(data: $data) {\n      id\n      state\n      ...SearchRequestInterest\n    }\n  }\n"): (typeof documents)["\n  mutation CreateOneSearchRequestInterest(\n    $data: SearchRequestInterestCreateInput!\n  ) {\n    createOneSearchRequestInterest(data: $data) {\n      id\n      state\n      ...SearchRequestInterest\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateOneSearchRequestInterest(\n    $where: EntityIdInput!\n    $data: SearchRequestInterestUpdateInput!\n  ) {\n    updateOneSearchRequestInterest(where: $where, data: $data) {\n      id\n      state\n      ...SearchRequestInterest\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateOneSearchRequestInterest(\n    $where: EntityIdInput!\n    $data: SearchRequestInterestUpdateInput!\n  ) {\n    updateOneSearchRequestInterest(where: $where, data: $data) {\n      id\n      state\n      ...SearchRequestInterest\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query oneSearchRequestInterest($where: EntityIdInput!) {\n    searchRequestInterest(where: $where) {\n      id\n      state\n      searchRequest {\n        id\n        project {\n          id\n          shortName\n        }\n      }\n      ...SearchRequestInterest\n    }\n  }\n"): (typeof documents)["\n  query oneSearchRequestInterest($where: EntityIdInput!) {\n    searchRequestInterest(where: $where) {\n      id\n      state\n      searchRequest {\n        id\n        project {\n          id\n          shortName\n        }\n      }\n      ...SearchRequestInterest\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchRequestInterestDefaults {\n    me {\n      id\n    }\n  }\n"): (typeof documents)["\n  query SearchRequestInterestDefaults {\n    me {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RejectOneSearchRequestInterest(\n    $input: RejectSearchRequestInterestInput!\n  ) {\n    rejectSearchRequestInterest(input: $input) {\n      id\n      ...SearchRequestInterest\n    }\n  }\n"): (typeof documents)["\n  mutation RejectOneSearchRequestInterest(\n    $input: RejectSearchRequestInterestInput!\n  ) {\n    rejectSearchRequestInterest(input: $input) {\n      id\n      ...SearchRequestInterest\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AcceptOneSearchRequestInterest(\n    $input: AcceptSearchRequestInterestInput!\n  ) {\n    acceptSearchRequestInterest(input: $input) {\n      id\n      ...SearchRequestInterest\n    }\n  }\n"): (typeof documents)["\n  mutation AcceptOneSearchRequestInterest(\n    $input: AcceptSearchRequestInterestInput!\n  ) {\n    acceptSearchRequestInterest(input: $input) {\n      id\n      ...SearchRequestInterest\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteOneSearchRequestInterest($where: EntityIdInput!) {\n    deleteOneSearchRequestInterest(where: $where) {\n      id\n      ...SearchRequestInterest\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteOneSearchRequestInterest($where: EntityIdInput!) {\n    deleteOneSearchRequestInterest(where: $where) {\n      id\n      ...SearchRequestInterest\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment SearchRequestInterest on SearchRequestInterest {\n    id\n    responsibleUser {\n      id\n    }\n    searchRequest {\n      id\n    }\n    buildingComponent {\n      id\n    }\n    state\n    rejectedAt\n    rejectionReason\n    notes\n  }\n"): (typeof documents)["\n  fragment SearchRequestInterest on SearchRequestInterest {\n    id\n    responsibleUser {\n      id\n    }\n    searchRequest {\n      id\n    }\n    buildingComponent {\n      id\n    }\n    state\n    rejectedAt\n    rejectionReason\n    notes\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment SearchRequestInterestReferenceSelector on SearchRequestInterest {\n      id\n      state\n    }\n  "): (typeof documents)["\n    fragment SearchRequestInterestReferenceSelector on SearchRequestInterest {\n      id\n      state\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query searchRequestInterestReference(\n    $where: SearchRequestInterestWhereInput\n    $orderBy: [SearchRequestInterestOrderByInput!]\n  ) {\n    searchRequestInterests(where: $where, orderBy: $orderBy) {\n      id\n      ...SearchRequestInterestReferenceSelector\n    }\n    searchRequestInterestsCount\n  }\n"): (typeof documents)["\n  query searchRequestInterestReference(\n    $where: SearchRequestInterestWhereInput\n    $orderBy: [SearchRequestInterestOrderByInput!]\n  ) {\n    searchRequestInterests(where: $where, orderBy: $orderBy) {\n      id\n      ...SearchRequestInterestReferenceSelector\n    }\n    searchRequestInterestsCount\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query searchRequests(\n    $where: SearchRequestWhereInput\n    $orderBy: [SearchRequestOrderByInput!]\n    $take: Int\n    $skip: Int\n  ) {\n    searchRequests(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {\n      id\n      state\n      responsibleUser {\n        id\n        email\n      }\n      project {\n        id\n        shortName\n      }\n      category {\n        id\n        name\n      }\n      ebkphCategory {\n        id\n        name\n      }\n      reservedBuildingComponentsCount\n      assignedBuildingComponentsCount\n      buildingComponentName\n      quantity\n      quantityUnit\n      deadlineFound\n    }\n    searchRequestsCount(where: $where)\n  }\n"): (typeof documents)["\n  query searchRequests(\n    $where: SearchRequestWhereInput\n    $orderBy: [SearchRequestOrderByInput!]\n    $take: Int\n    $skip: Int\n  ) {\n    searchRequests(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {\n      id\n      state\n      responsibleUser {\n        id\n        email\n      }\n      project {\n        id\n        shortName\n      }\n      category {\n        id\n        name\n      }\n      ebkphCategory {\n        id\n        name\n      }\n      reservedBuildingComponentsCount\n      assignedBuildingComponentsCount\n      buildingComponentName\n      quantity\n      quantityUnit\n      deadlineFound\n    }\n    searchRequestsCount(where: $where)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query searchRequestProject($where: EntityIdInput!) {\n    searchRequest(where: $where) {\n      id\n      project {\n        id\n        shortName\n      }\n    }\n  }\n"): (typeof documents)["\n  query searchRequestProject($where: EntityIdInput!) {\n    searchRequest(where: $where) {\n      id\n      project {\n        id\n        shortName\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateOneSearchRequest($data: SearchRequestCreateInput!) {\n    createOneSearchRequest(data: $data) {\n      id\n      project {\n        id\n        shortName\n      }\n      ...SearchRequest\n    }\n  }\n"): (typeof documents)["\n  mutation CreateOneSearchRequest($data: SearchRequestCreateInput!) {\n    createOneSearchRequest(data: $data) {\n      id\n      project {\n        id\n        shortName\n      }\n      ...SearchRequest\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateOneSearchRequest(\n    $where: EntityIdInput!\n    $data: SearchRequestUpdateInput!\n  ) {\n    updateOneSearchRequest(where: $where, data: $data) {\n      id\n      project {\n        id\n        shortName\n      }\n      ...SearchRequest\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateOneSearchRequest(\n    $where: EntityIdInput!\n    $data: SearchRequestUpdateInput!\n  ) {\n    updateOneSearchRequest(where: $where, data: $data) {\n      id\n      project {\n        id\n        shortName\n      }\n      ...SearchRequest\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query oneSearchRequest($where: EntityIdInput!) {\n    searchRequest(where: $where) {\n      id\n      project {\n        id\n        shortName\n      }\n      ...SearchRequest\n    }\n  }\n"): (typeof documents)["\n  query oneSearchRequest($where: EntityIdInput!) {\n    searchRequest(where: $where) {\n      id\n      project {\n        id\n        shortName\n      }\n      ...SearchRequest\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query searchRequestDefaults($projectId: String!) {\n    me {\n      id\n    }\n    project(where: { id: $projectId }) {\n      id\n      shortName\n    }\n  }\n"): (typeof documents)["\n  query searchRequestDefaults($projectId: String!) {\n    me {\n      id\n    }\n    project(where: { id: $projectId }) {\n      id\n      shortName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment SearchRequest on SearchRequest {\n    id\n    state\n    buildingComponentName\n    buildingComponentDescription\n    quantity\n    quantityUnit\n    deadlineFound\n    deadlineShipment\n    comments\n    budgetInRappens\n    budgetNotes\n    searchConceptNotes\n    huntingStatusNotes\n    fireProtectionNotes\n    soundProofNotes\n    securityNotes\n    fallbackLevel\n    fallbackLevelCO2PerUnit\n    fallbackLevelCO2Total\n    createdAt\n    projectId {\n      id\n    }\n    responsibleUserId {\n      id\n    }\n    categoryId {\n      id\n    }\n    ebkphCategoryId {\n      id\n    }\n    dimensionRanges {\n      id\n      minWidth\n      maxWidth\n      type\n      minHeight\n      maxHeight\n      minDepth\n      maxDepth\n    }\n    assets {\n      id\n      tags\n      createdAt\n      updatedAt\n      asset {\n        id\n        url\n        mimeType\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment SearchRequest on SearchRequest {\n    id\n    state\n    buildingComponentName\n    buildingComponentDescription\n    quantity\n    quantityUnit\n    deadlineFound\n    deadlineShipment\n    comments\n    budgetInRappens\n    budgetNotes\n    searchConceptNotes\n    huntingStatusNotes\n    fireProtectionNotes\n    soundProofNotes\n    securityNotes\n    fallbackLevel\n    fallbackLevelCO2PerUnit\n    fallbackLevelCO2Total\n    createdAt\n    projectId {\n      id\n    }\n    responsibleUserId {\n      id\n    }\n    categoryId {\n      id\n    }\n    ebkphCategoryId {\n      id\n    }\n    dimensionRanges {\n      id\n      minWidth\n      maxWidth\n      type\n      minHeight\n      maxHeight\n      minDepth\n      maxDepth\n    }\n    assets {\n      id\n      tags\n      createdAt\n      updatedAt\n      asset {\n        id\n        url\n        mimeType\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment SearchRequestReferenceSelector on SearchRequest {\n    id\n    state\n    project {\n      shortName\n      name\n    }\n    responsibleUser {\n      email\n    }\n    buildingComponentName\n    createdAt\n  }\n"): (typeof documents)["\n  fragment SearchRequestReferenceSelector on SearchRequest {\n    id\n    state\n    project {\n      shortName\n      name\n    }\n    responsibleUser {\n      email\n    }\n    buildingComponentName\n    createdAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query searchRequestReference(\n    $where: SearchRequestWhereInput\n    $orderBy: [SearchRequestOrderByInput!]\n  ) {\n    searchRequests(where: $where, orderBy: $orderBy) {\n      id\n      ...SearchRequestReferenceSelector\n    }\n    searchRequestsCount\n  }\n"): (typeof documents)["\n  query searchRequestReference(\n    $where: SearchRequestWhereInput\n    $orderBy: [SearchRequestOrderByInput!]\n  ) {\n    searchRequests(where: $where, orderBy: $orderBy) {\n      id\n      ...SearchRequestReferenceSelector\n    }\n    searchRequestsCount\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment StorageLocationImages on StorageLocation {\n    id\n    name\n    assets {\n      id\n      tags\n      asset {\n        id\n        url\n        mimeType\n        originalFilename\n        updatedAt\n      }\n    }\n    buildingComponents {\n      id\n      componentId\n      assets {\n        id\n        tags\n        asset {\n          id\n          url\n          mimeType\n          originalFilename\n          updatedAt\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment StorageLocationImages on StorageLocation {\n    id\n    name\n    assets {\n      id\n      tags\n      asset {\n        id\n        url\n        mimeType\n        originalFilename\n        updatedAt\n      }\n    }\n    buildingComponents {\n      id\n      componentId\n      assets {\n        id\n        tags\n        asset {\n          id\n          url\n          mimeType\n          originalFilename\n          updatedAt\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query storageLocationImages($where: EntityIdInput!) {\n    storageLocation(where: $where) {\n      id\n      name\n      ...StorageLocationImages\n    }\n  }\n"): (typeof documents)["\n  query storageLocationImages($where: EntityIdInput!) {\n    storageLocation(where: $where) {\n      id\n      name\n      ...StorageLocationImages\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment StorageLocation_List on StorageLocation {\n    id\n    ...StorageLocation_ListItem\n  }\n"): (typeof documents)["\n  fragment StorageLocation_List on StorageLocation {\n    id\n    ...StorageLocation_ListItem\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query storageLocationList(\n    $where: StorageLocationWhereInput\n    $orderBy: [StorageLocationOrderByInput!]\n  ) {\n    storageLocations(where: $where, orderBy: $orderBy) {\n      id\n      name\n      ...StorageLocation_List\n    }\n    storageLocationsCount(where: $where)\n  }\n"): (typeof documents)["\n  query storageLocationList(\n    $where: StorageLocationWhereInput\n    $orderBy: [StorageLocationOrderByInput!]\n  ) {\n    storageLocations(where: $where, orderBy: $orderBy) {\n      id\n      name\n      ...StorageLocation_List\n    }\n    storageLocationsCount(where: $where)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment StorageLocation_ListItem on StorageLocation {\n    id\n    name\n    country\n    canton\n    city\n    street\n    googleMapsLink\n    postalCode\n    mainImage {\n      id\n    }\n    contacts {\n      id\n    }\n    assets {\n      id\n    }\n    buildingComponents {\n      id\n    }\n    mainImage {\n      id\n      url\n    }\n    notes\n  }\n"): (typeof documents)["\n  fragment StorageLocation_ListItem on StorageLocation {\n    id\n    name\n    country\n    canton\n    city\n    street\n    googleMapsLink\n    postalCode\n    mainImage {\n      id\n    }\n    contacts {\n      id\n    }\n    assets {\n      id\n    }\n    buildingComponents {\n      id\n    }\n    mainImage {\n      id\n      url\n    }\n    notes\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query StorageLocationReference($storageLocationId: String!) {\n    storageLocation(where: { id: $storageLocationId }) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query StorageLocationReference($storageLocationId: String!) {\n    storageLocation(where: { id: $storageLocationId }) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateOneStorageLocation($data: StorageLocationCreateInput!) {\n    createOneStorageLocation(data: $data) {\n      id\n      name\n      ...StorageLocation\n    }\n  }\n"): (typeof documents)["\n  mutation CreateOneStorageLocation($data: StorageLocationCreateInput!) {\n    createOneStorageLocation(data: $data) {\n      id\n      name\n      ...StorageLocation\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateOneStorageLocation(\n    $where: EntityIdInput!\n    $data: StorageLocationUpdateInput!\n  ) {\n    updateOneStorageLocation(where: $where, data: $data) {\n      id\n      name\n      ...StorageLocation\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateOneStorageLocation(\n    $where: EntityIdInput!\n    $data: StorageLocationUpdateInput!\n  ) {\n    updateOneStorageLocation(where: $where, data: $data) {\n      id\n      name\n      ...StorageLocation\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query oneStorageLocation($where: EntityIdInput!) {\n    storageLocation(where: $where) {\n      id\n      name\n      ...StorageLocation\n      ...StorageLocationReferenceSelector\n    }\n  }\n"): (typeof documents)["\n  query oneStorageLocation($where: EntityIdInput!) {\n    storageLocation(where: $where) {\n      id\n      name\n      ...StorageLocation\n      ...StorageLocationReferenceSelector\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment StorageLocationReferenceSelector on StorageLocation {\n    id\n    name\n  }\n"): (typeof documents)["\n  fragment StorageLocationReferenceSelector on StorageLocation {\n    id\n    name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query storageLocationsReference(\n    $where: StorageLocationWhereInput\n    $orderBy: [StorageLocationOrderByInput!]\n  ) {\n    storageLocations(where: $where, orderBy: $orderBy) {\n      id\n      name\n      ...StorageLocationReferenceSelector\n    }\n  }\n"): (typeof documents)["\n  query storageLocationsReference(\n    $where: StorageLocationWhereInput\n    $orderBy: [StorageLocationOrderByInput!]\n  ) {\n    storageLocations(where: $where, orderBy: $orderBy) {\n      id\n      name\n      ...StorageLocationReferenceSelector\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment StorageLocation on StorageLocation {\n    id\n    name\n    country\n    canton\n    city\n    street\n    googleMapsLink\n    postalCode\n    mainImage {\n      id\n    }\n    contacts {\n      id\n      type\n      firstLine\n      firstName\n      lastName\n      street\n      postalCode\n      canton\n      city\n      country\n      notes\n      contact1\n      contact2\n    }\n    assets {\n      id\n      tags\n      createdAt\n      updatedAt\n      asset {\n        id\n        url\n        mimeType\n      }\n    }\n    buildingComponents {\n      id\n    }\n    mainImage {\n      id\n      url\n    }\n    notes\n  }\n"): (typeof documents)["\n  fragment StorageLocation on StorageLocation {\n    id\n    name\n    country\n    canton\n    city\n    street\n    googleMapsLink\n    postalCode\n    mainImage {\n      id\n    }\n    contacts {\n      id\n      type\n      firstLine\n      firstName\n      lastName\n      street\n      postalCode\n      canton\n      city\n      country\n      notes\n      contact1\n      contact2\n    }\n    assets {\n      id\n      tags\n      createdAt\n      updatedAt\n      asset {\n        id\n        url\n        mimeType\n      }\n    }\n    buildingComponents {\n      id\n    }\n    mainImage {\n      id\n      url\n    }\n    notes\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query createStorageLocationDefaults {\n    me {\n      id\n    }\n  }\n"): (typeof documents)["\n  query createStorageLocationDefaults {\n    me {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query oneUser($where: EntityIdInput!) {\n    user(where: $where) {\n      id\n      ...User\n      ...UserReferenceSelector\n    }\n  }\n"): (typeof documents)["\n  query oneUser($where: EntityIdInput!) {\n    user(where: $where) {\n      id\n      ...User\n      ...UserReferenceSelector\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment User on User {\n    id\n    email\n    notes\n    ...UserReferenceSelector\n  }\n"): (typeof documents)["\n  fragment User on User {\n    id\n    email\n    notes\n    ...UserReferenceSelector\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserReferenceSelector on User {\n    id\n    email\n  }\n"): (typeof documents)["\n  fragment UserReferenceSelector on User {\n    id\n    email\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query userReference($where: UserWhereInput, $orderBy: [UserOrderByInput!]) {\n    users(where: $where, orderBy: $orderBy, take: 50) {\n      id\n      ...UserReferenceSelector\n    }\n\n    usersCount\n  }\n"): (typeof documents)["\n  query userReference($where: UserWhereInput, $orderBy: [UserOrderByInput!]) {\n    users(where: $where, orderBy: $orderBy, take: 50) {\n      id\n      ...UserReferenceSelector\n    }\n\n    usersCount\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
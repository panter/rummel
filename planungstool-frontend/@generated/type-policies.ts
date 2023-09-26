import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type AppAssetKeySpecifier = ('confirmedAt' | 'createdAt' | 'id' | 'mimeType' | 'originalFilename' | 'size' | 'tags' | 'updatedAt' | 'url' | AppAssetKeySpecifier)[];
export type AppAssetFieldPolicy = {
	confirmedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	mimeType?: FieldPolicy<any> | FieldReadFunction<any>,
	originalFilename?: FieldPolicy<any> | FieldReadFunction<any>,
	size?: FieldPolicy<any> | FieldReadFunction<any>,
	tags?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AssignedBuildingComponentKeySpecifier = ('amount' | 'amountReserved' | 'buildingComponent' | 'createdAt' | 'id' | 'searchRequest' | 'updatedAt' | AssignedBuildingComponentKeySpecifier)[];
export type AssignedBuildingComponentFieldPolicy = {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	amountReserved?: FieldPolicy<any> | FieldReadFunction<any>,
	buildingComponent?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	searchRequest?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AutocompleteKeySpecifier = ('id' | 'key' | 'value' | AutocompleteKeySpecifier)[];
export type AutocompleteFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	key?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BuildingComponentKeySpecifier = ('assets' | 'assignedTo' | 'category' | 'categoryId' | 'co2QuantityUsed' | 'co2Savings' | 'co2SavingsExact' | 'co2SavingsPerUnit' | 'co2SavingsTotal' | 'co2Unit' | 'componentId' | 'componentSn' | 'condition' | 'constructionYear' | 'constructionYearExact' | 'constructionYearNotes' | 'contacts' | 'createdAt' | 'demolitionPhase' | 'description' | 'dimensions' | 'dimensionsNotes' | 'ebkphCategory' | 'ebkphCategoryId' | 'fallbackLevel' | 'fallbackLevelCO2PerUnit' | 'fallbackLevelCO2Total' | 'harmfulSubstances' | 'id' | 'locationInBuilding' | 'locationInBuildingDetail' | 'mainImage' | 'mainImageId' | 'materialsDepot' | 'materialsDepotId' | 'name' | 'phase' | 'potentialInterests' | 'quantity' | 'quantityExact' | 'quantityNotes' | 'quantitySpare' | 'quantityUnit' | 'reusePotential' | 'reusePotentialConclusion' | 'reusePotentialNotes' | 'reuseValueDescription' | 'reuseValuePerUnit' | 'reuseValueTotal' | 'ru1Explanation' | 'ru1PerUnit' | 'ru1Total' | 'ru2Explanation' | 'ru2PerUnit' | 'ru2Total' | 'ru3Explanation' | 'ru3PerUnit' | 'ru3Total' | 'ruPerUnitSum' | 'ruTotalSum' | 'searchRequestInterests' | 'showInMatching' | 'sparePartsNotes' | 'state' | 'storageLocation' | 'storageLocationId' | 'storageLocationNotes' | 'transportDistanceInKm' | 'transportVehicleName' | 'updatedAt' | 'warrantyDetails' | BuildingComponentKeySpecifier)[];
export type BuildingComponentFieldPolicy = {
	assets?: FieldPolicy<any> | FieldReadFunction<any>,
	assignedTo?: FieldPolicy<any> | FieldReadFunction<any>,
	category?: FieldPolicy<any> | FieldReadFunction<any>,
	categoryId?: FieldPolicy<any> | FieldReadFunction<any>,
	co2QuantityUsed?: FieldPolicy<any> | FieldReadFunction<any>,
	co2Savings?: FieldPolicy<any> | FieldReadFunction<any>,
	co2SavingsExact?: FieldPolicy<any> | FieldReadFunction<any>,
	co2SavingsPerUnit?: FieldPolicy<any> | FieldReadFunction<any>,
	co2SavingsTotal?: FieldPolicy<any> | FieldReadFunction<any>,
	co2Unit?: FieldPolicy<any> | FieldReadFunction<any>,
	componentId?: FieldPolicy<any> | FieldReadFunction<any>,
	componentSn?: FieldPolicy<any> | FieldReadFunction<any>,
	condition?: FieldPolicy<any> | FieldReadFunction<any>,
	constructionYear?: FieldPolicy<any> | FieldReadFunction<any>,
	constructionYearExact?: FieldPolicy<any> | FieldReadFunction<any>,
	constructionYearNotes?: FieldPolicy<any> | FieldReadFunction<any>,
	contacts?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	demolitionPhase?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	dimensions?: FieldPolicy<any> | FieldReadFunction<any>,
	dimensionsNotes?: FieldPolicy<any> | FieldReadFunction<any>,
	ebkphCategory?: FieldPolicy<any> | FieldReadFunction<any>,
	ebkphCategoryId?: FieldPolicy<any> | FieldReadFunction<any>,
	fallbackLevel?: FieldPolicy<any> | FieldReadFunction<any>,
	fallbackLevelCO2PerUnit?: FieldPolicy<any> | FieldReadFunction<any>,
	fallbackLevelCO2Total?: FieldPolicy<any> | FieldReadFunction<any>,
	harmfulSubstances?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	locationInBuilding?: FieldPolicy<any> | FieldReadFunction<any>,
	locationInBuildingDetail?: FieldPolicy<any> | FieldReadFunction<any>,
	mainImage?: FieldPolicy<any> | FieldReadFunction<any>,
	mainImageId?: FieldPolicy<any> | FieldReadFunction<any>,
	materialsDepot?: FieldPolicy<any> | FieldReadFunction<any>,
	materialsDepotId?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	phase?: FieldPolicy<any> | FieldReadFunction<any>,
	potentialInterests?: FieldPolicy<any> | FieldReadFunction<any>,
	quantity?: FieldPolicy<any> | FieldReadFunction<any>,
	quantityExact?: FieldPolicy<any> | FieldReadFunction<any>,
	quantityNotes?: FieldPolicy<any> | FieldReadFunction<any>,
	quantitySpare?: FieldPolicy<any> | FieldReadFunction<any>,
	quantityUnit?: FieldPolicy<any> | FieldReadFunction<any>,
	reusePotential?: FieldPolicy<any> | FieldReadFunction<any>,
	reusePotentialConclusion?: FieldPolicy<any> | FieldReadFunction<any>,
	reusePotentialNotes?: FieldPolicy<any> | FieldReadFunction<any>,
	reuseValueDescription?: FieldPolicy<any> | FieldReadFunction<any>,
	reuseValuePerUnit?: FieldPolicy<any> | FieldReadFunction<any>,
	reuseValueTotal?: FieldPolicy<any> | FieldReadFunction<any>,
	ru1Explanation?: FieldPolicy<any> | FieldReadFunction<any>,
	ru1PerUnit?: FieldPolicy<any> | FieldReadFunction<any>,
	ru1Total?: FieldPolicy<any> | FieldReadFunction<any>,
	ru2Explanation?: FieldPolicy<any> | FieldReadFunction<any>,
	ru2PerUnit?: FieldPolicy<any> | FieldReadFunction<any>,
	ru2Total?: FieldPolicy<any> | FieldReadFunction<any>,
	ru3Explanation?: FieldPolicy<any> | FieldReadFunction<any>,
	ru3PerUnit?: FieldPolicy<any> | FieldReadFunction<any>,
	ru3Total?: FieldPolicy<any> | FieldReadFunction<any>,
	ruPerUnitSum?: FieldPolicy<any> | FieldReadFunction<any>,
	ruTotalSum?: FieldPolicy<any> | FieldReadFunction<any>,
	searchRequestInterests?: FieldPolicy<any> | FieldReadFunction<any>,
	showInMatching?: FieldPolicy<any> | FieldReadFunction<any>,
	sparePartsNotes?: FieldPolicy<any> | FieldReadFunction<any>,
	state?: FieldPolicy<any> | FieldReadFunction<any>,
	storageLocation?: FieldPolicy<any> | FieldReadFunction<any>,
	storageLocationId?: FieldPolicy<any> | FieldReadFunction<any>,
	storageLocationNotes?: FieldPolicy<any> | FieldReadFunction<any>,
	transportDistanceInKm?: FieldPolicy<any> | FieldReadFunction<any>,
	transportVehicleName?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	warrantyDetails?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BuildingComponentAssetReferenceKeySpecifier = ('asset' | 'createdAt' | 'id' | 'tags' | 'updatedAt' | BuildingComponentAssetReferenceKeySpecifier)[];
export type BuildingComponentAssetReferenceFieldPolicy = {
	asset?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	tags?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CantonKeySpecifier = ('name' | CantonKeySpecifier)[];
export type CantonFieldPolicy = {
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CategoryKeySpecifier = ('description' | 'id' | 'name' | 'parent' | 'sortOrder' | CategoryKeySpecifier)[];
export type CategoryFieldPolicy = {
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	parent?: FieldPolicy<any> | FieldReadFunction<any>,
	sortOrder?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ContactKeySpecifier = ('canton' | 'city' | 'contact1' | 'contact2' | 'country' | 'createdAt' | 'firstLine' | 'firstName' | 'id' | 'lastName' | 'notes' | 'postalCode' | 'street' | 'type' | 'updatedAt' | ContactKeySpecifier)[];
export type ContactFieldPolicy = {
	canton?: FieldPolicy<any> | FieldReadFunction<any>,
	city?: FieldPolicy<any> | FieldReadFunction<any>,
	contact1?: FieldPolicy<any> | FieldReadFunction<any>,
	contact2?: FieldPolicy<any> | FieldReadFunction<any>,
	country?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	firstLine?: FieldPolicy<any> | FieldReadFunction<any>,
	firstName?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	lastName?: FieldPolicy<any> | FieldReadFunction<any>,
	notes?: FieldPolicy<any> | FieldReadFunction<any>,
	postalCode?: FieldPolicy<any> | FieldReadFunction<any>,
	street?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DimensionKeySpecifier = ('createdAt' | 'depth' | 'height' | 'id' | 'isExact' | 'type' | 'unit' | 'updatedAt' | 'width' | DimensionKeySpecifier)[];
export type DimensionFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	depth?: FieldPolicy<any> | FieldReadFunction<any>,
	height?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isExact?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	unit?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	width?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DimensionRangeKeySpecifier = ('createdAt' | 'id' | 'maxDepth' | 'maxHeight' | 'maxWidth' | 'minDepth' | 'minHeight' | 'minWidth' | 'type' | 'unit' | 'updatedAt' | DimensionRangeKeySpecifier)[];
export type DimensionRangeFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	maxDepth?: FieldPolicy<any> | FieldReadFunction<any>,
	maxHeight?: FieldPolicy<any> | FieldReadFunction<any>,
	maxWidth?: FieldPolicy<any> | FieldReadFunction<any>,
	minDepth?: FieldPolicy<any> | FieldReadFunction<any>,
	minHeight?: FieldPolicy<any> | FieldReadFunction<any>,
	minWidth?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	unit?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EbkphCategoryKeySpecifier = ('description' | 'id' | 'name' | 'parent' | 'parentId' | EbkphCategoryKeySpecifier)[];
export type EbkphCategoryFieldPolicy = {
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	parent?: FieldPolicy<any> | FieldReadFunction<any>,
	parentId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type FinishOtpLoginResponseKeySpecifier = ('access_token' | 'user' | FinishOtpLoginResponseKeySpecifier)[];
export type FinishOtpLoginResponseFieldPolicy = {
	access_token?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type FinishOtpLoginUserResponseKeySpecifier = ('id' | FinishOtpLoginUserResponseKeySpecifier)[];
export type FinishOtpLoginUserResponseFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MaterialsDepotKeySpecifier = ('assets' | 'buildingComponents' | 'buildingComponentsIds' | 'canton' | 'city' | 'complex' | 'constructionYear' | 'constructionYearExact' | 'contacts' | 'country' | 'createdAt' | 'googleMapsLink' | 'historyNotes' | 'id' | 'interventionDepth' | 'mainImage' | 'mainImageId' | 'materialDepotFulltextSearch' | 'name' | 'notes' | 'phase' | 'postalCode' | 'reUseRating' | 'responsableUser' | 'responsableUserId' | 'searchInterests' | 'shortName' | 'state' | 'street' | 'tasks' | 'timelines' | 'typology' | 'updatedAt' | MaterialsDepotKeySpecifier)[];
export type MaterialsDepotFieldPolicy = {
	assets?: FieldPolicy<any> | FieldReadFunction<any>,
	buildingComponents?: FieldPolicy<any> | FieldReadFunction<any>,
	buildingComponentsIds?: FieldPolicy<any> | FieldReadFunction<any>,
	canton?: FieldPolicy<any> | FieldReadFunction<any>,
	city?: FieldPolicy<any> | FieldReadFunction<any>,
	complex?: FieldPolicy<any> | FieldReadFunction<any>,
	constructionYear?: FieldPolicy<any> | FieldReadFunction<any>,
	constructionYearExact?: FieldPolicy<any> | FieldReadFunction<any>,
	contacts?: FieldPolicy<any> | FieldReadFunction<any>,
	country?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	googleMapsLink?: FieldPolicy<any> | FieldReadFunction<any>,
	historyNotes?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	interventionDepth?: FieldPolicy<any> | FieldReadFunction<any>,
	mainImage?: FieldPolicy<any> | FieldReadFunction<any>,
	mainImageId?: FieldPolicy<any> | FieldReadFunction<any>,
	materialDepotFulltextSearch?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	notes?: FieldPolicy<any> | FieldReadFunction<any>,
	phase?: FieldPolicy<any> | FieldReadFunction<any>,
	postalCode?: FieldPolicy<any> | FieldReadFunction<any>,
	reUseRating?: FieldPolicy<any> | FieldReadFunction<any>,
	responsableUser?: FieldPolicy<any> | FieldReadFunction<any>,
	responsableUserId?: FieldPolicy<any> | FieldReadFunction<any>,
	searchInterests?: FieldPolicy<any> | FieldReadFunction<any>,
	shortName?: FieldPolicy<any> | FieldReadFunction<any>,
	state?: FieldPolicy<any> | FieldReadFunction<any>,
	street?: FieldPolicy<any> | FieldReadFunction<any>,
	tasks?: FieldPolicy<any> | FieldReadFunction<any>,
	timelines?: FieldPolicy<any> | FieldReadFunction<any>,
	typology?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MaterialsDepotAssetReferenceKeySpecifier = ('asset' | 'createdAt' | 'id' | 'tags' | 'updatedAt' | MaterialsDepotAssetReferenceKeySpecifier)[];
export type MaterialsDepotAssetReferenceFieldPolicy = {
	asset?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	tags?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MaterialsDepotTimelineKeySpecifier = ('createdAt' | 'description' | 'endDate' | 'id' | 'startDate' | 'updatedAt' | MaterialsDepotTimelineKeySpecifier)[];
export type MaterialsDepotTimelineFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	endDate?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	startDate?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('acceptSearchRequestInterest' | 'createOneAutocomplete' | 'createOneBuildingComponent' | 'createOneCategory' | 'createOneEbkphCategory' | 'createOneMaterialsDepot' | 'createOneMaterialsDepotTimeline' | 'createOneProject' | 'createOneSearchRequest' | 'createOneSearchRequestInterest' | 'createOneStorageLocation' | 'createOneTask' | 'deleteOneAutocomplete' | 'deleteOneBuildingComponent' | 'deleteOneMaterialsDepot' | 'deleteOneSearchRequestInterest' | 'finishOtpLogin' | 'logout' | 'rejectSearchRequestInterest' | 'triggerOtpLogin' | 'updateOneAutocomplete' | 'updateOneBuildingComponent' | 'updateOneCategory' | 'updateOneEbkphCategory' | 'updateOneMaterialsDepot' | 'updateOneMaterialsDepotTimeline' | 'updateOneProject' | 'updateOneSearchRequest' | 'updateOneSearchRequestInterest' | 'updateOneStorageLocation' | 'updateOneTask' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	acceptSearchRequestInterest?: FieldPolicy<any> | FieldReadFunction<any>,
	createOneAutocomplete?: FieldPolicy<any> | FieldReadFunction<any>,
	createOneBuildingComponent?: FieldPolicy<any> | FieldReadFunction<any>,
	createOneCategory?: FieldPolicy<any> | FieldReadFunction<any>,
	createOneEbkphCategory?: FieldPolicy<any> | FieldReadFunction<any>,
	createOneMaterialsDepot?: FieldPolicy<any> | FieldReadFunction<any>,
	createOneMaterialsDepotTimeline?: FieldPolicy<any> | FieldReadFunction<any>,
	createOneProject?: FieldPolicy<any> | FieldReadFunction<any>,
	createOneSearchRequest?: FieldPolicy<any> | FieldReadFunction<any>,
	createOneSearchRequestInterest?: FieldPolicy<any> | FieldReadFunction<any>,
	createOneStorageLocation?: FieldPolicy<any> | FieldReadFunction<any>,
	createOneTask?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteOneAutocomplete?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteOneBuildingComponent?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteOneMaterialsDepot?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteOneSearchRequestInterest?: FieldPolicy<any> | FieldReadFunction<any>,
	finishOtpLogin?: FieldPolicy<any> | FieldReadFunction<any>,
	logout?: FieldPolicy<any> | FieldReadFunction<any>,
	rejectSearchRequestInterest?: FieldPolicy<any> | FieldReadFunction<any>,
	triggerOtpLogin?: FieldPolicy<any> | FieldReadFunction<any>,
	updateOneAutocomplete?: FieldPolicy<any> | FieldReadFunction<any>,
	updateOneBuildingComponent?: FieldPolicy<any> | FieldReadFunction<any>,
	updateOneCategory?: FieldPolicy<any> | FieldReadFunction<any>,
	updateOneEbkphCategory?: FieldPolicy<any> | FieldReadFunction<any>,
	updateOneMaterialsDepot?: FieldPolicy<any> | FieldReadFunction<any>,
	updateOneMaterialsDepotTimeline?: FieldPolicy<any> | FieldReadFunction<any>,
	updateOneProject?: FieldPolicy<any> | FieldReadFunction<any>,
	updateOneSearchRequest?: FieldPolicy<any> | FieldReadFunction<any>,
	updateOneSearchRequestInterest?: FieldPolicy<any> | FieldReadFunction<any>,
	updateOneStorageLocation?: FieldPolicy<any> | FieldReadFunction<any>,
	updateOneTask?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PostalCodeKeySpecifier = ('canton' | 'description' | 'postalCode' | PostalCodeKeySpecifier)[];
export type PostalCodeFieldPolicy = {
	canton?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	postalCode?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProjectKeySpecifier = ('assets' | 'city' | 'contacts' | 'country' | 'createdAt' | 'id' | 'mainImage' | 'mainImageId' | 'name' | 'notes' | 'phase' | 'postalCode' | 'responsableUserPM' | 'responsableUserSearch' | 'shortName' | 'somehowImportantContactWithoutName' | 'state' | 'street' | 'type' | 'updatedAt' | ProjectKeySpecifier)[];
export type ProjectFieldPolicy = {
	assets?: FieldPolicy<any> | FieldReadFunction<any>,
	city?: FieldPolicy<any> | FieldReadFunction<any>,
	contacts?: FieldPolicy<any> | FieldReadFunction<any>,
	country?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	mainImage?: FieldPolicy<any> | FieldReadFunction<any>,
	mainImageId?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	notes?: FieldPolicy<any> | FieldReadFunction<any>,
	phase?: FieldPolicy<any> | FieldReadFunction<any>,
	postalCode?: FieldPolicy<any> | FieldReadFunction<any>,
	responsableUserPM?: FieldPolicy<any> | FieldReadFunction<any>,
	responsableUserSearch?: FieldPolicy<any> | FieldReadFunction<any>,
	shortName?: FieldPolicy<any> | FieldReadFunction<any>,
	somehowImportantContactWithoutName?: FieldPolicy<any> | FieldReadFunction<any>,
	state?: FieldPolicy<any> | FieldReadFunction<any>,
	street?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProjectAssetReferenceKeySpecifier = ('asset' | 'createdAt' | 'id' | 'tags' | 'updatedAt' | ProjectAssetReferenceKeySpecifier)[];
export type ProjectAssetReferenceFieldPolicy = {
	asset?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	tags?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('allPostalCodes' | 'autocomplete' | 'autocompletes' | 'autocompletesCount' | 'buildingComponent' | 'buildingComponents' | 'buildingComponentsCount' | 'canton' | 'cantonByPostalCodeAndCity' | 'cantons' | 'cantonsCount' | 'categories' | 'categoriesCount' | 'category' | 'contacts' | 'contactsCount' | 'dimensionRanges' | 'dimensionRangesCount' | 'dimensions' | 'dimensionsCount' | 'ebkphCategories' | 'ebkphCategoriesCount' | 'ebkphCategory' | 'materialsDepot' | 'materialsDepotTimeline' | 'materialsDepotTimelines' | 'materialsDepotTimelinesCount' | 'materialsDepots' | 'materialsDepotsCount' | 'me' | 'project' | 'projects' | 'projectsCount' | 'searchRequest' | 'searchRequestInterest' | 'searchRequestInterests' | 'searchRequestInterestsCount' | 'searchRequests' | 'searchRequestsCount' | 'storageLocation' | 'storageLocations' | 'storageLocationsCount' | 'task' | 'tasks' | 'tasksCount' | 'user' | 'users' | 'usersCount' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	allPostalCodes?: FieldPolicy<any> | FieldReadFunction<any>,
	autocomplete?: FieldPolicy<any> | FieldReadFunction<any>,
	autocompletes?: FieldPolicy<any> | FieldReadFunction<any>,
	autocompletesCount?: FieldPolicy<any> | FieldReadFunction<any>,
	buildingComponent?: FieldPolicy<any> | FieldReadFunction<any>,
	buildingComponents?: FieldPolicy<any> | FieldReadFunction<any>,
	buildingComponentsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	canton?: FieldPolicy<any> | FieldReadFunction<any>,
	cantonByPostalCodeAndCity?: FieldPolicy<any> | FieldReadFunction<any>,
	cantons?: FieldPolicy<any> | FieldReadFunction<any>,
	cantonsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	categories?: FieldPolicy<any> | FieldReadFunction<any>,
	categoriesCount?: FieldPolicy<any> | FieldReadFunction<any>,
	category?: FieldPolicy<any> | FieldReadFunction<any>,
	contacts?: FieldPolicy<any> | FieldReadFunction<any>,
	contactsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	dimensionRanges?: FieldPolicy<any> | FieldReadFunction<any>,
	dimensionRangesCount?: FieldPolicy<any> | FieldReadFunction<any>,
	dimensions?: FieldPolicy<any> | FieldReadFunction<any>,
	dimensionsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	ebkphCategories?: FieldPolicy<any> | FieldReadFunction<any>,
	ebkphCategoriesCount?: FieldPolicy<any> | FieldReadFunction<any>,
	ebkphCategory?: FieldPolicy<any> | FieldReadFunction<any>,
	materialsDepot?: FieldPolicy<any> | FieldReadFunction<any>,
	materialsDepotTimeline?: FieldPolicy<any> | FieldReadFunction<any>,
	materialsDepotTimelines?: FieldPolicy<any> | FieldReadFunction<any>,
	materialsDepotTimelinesCount?: FieldPolicy<any> | FieldReadFunction<any>,
	materialsDepots?: FieldPolicy<any> | FieldReadFunction<any>,
	materialsDepotsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	me?: FieldPolicy<any> | FieldReadFunction<any>,
	project?: FieldPolicy<any> | FieldReadFunction<any>,
	projects?: FieldPolicy<any> | FieldReadFunction<any>,
	projectsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	searchRequest?: FieldPolicy<any> | FieldReadFunction<any>,
	searchRequestInterest?: FieldPolicy<any> | FieldReadFunction<any>,
	searchRequestInterests?: FieldPolicy<any> | FieldReadFunction<any>,
	searchRequestInterestsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	searchRequests?: FieldPolicy<any> | FieldReadFunction<any>,
	searchRequestsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	storageLocation?: FieldPolicy<any> | FieldReadFunction<any>,
	storageLocations?: FieldPolicy<any> | FieldReadFunction<any>,
	storageLocationsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	task?: FieldPolicy<any> | FieldReadFunction<any>,
	tasks?: FieldPolicy<any> | FieldReadFunction<any>,
	tasksCount?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	users?: FieldPolicy<any> | FieldReadFunction<any>,
	usersCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ReferenceIdKeySpecifier = ('id' | ReferenceIdKeySpecifier)[];
export type ReferenceIdFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RowMessageKeySpecifier = ('index' | 'message' | RowMessageKeySpecifier)[];
export type RowMessageFieldPolicy = {
	index?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SearchRequestKeySpecifier = ('assets' | 'assignedBuildingComponents' | 'assignedBuildingComponentsCount' | 'budgetInRappens' | 'budgetNotes' | 'buildingComponentDescription' | 'buildingComponentName' | 'category' | 'categoryId' | 'comments' | 'createdAt' | 'deadlineFound' | 'deadlineShipment' | 'dimensionRanges' | 'ebkphCategory' | 'ebkphCategoryId' | 'fallbackLevel' | 'fallbackLevelCO2PerUnit' | 'fallbackLevelCO2Total' | 'fireProtectionNotes' | 'huntingStatusNotes' | 'id' | 'interests' | 'project' | 'projectId' | 'quantity' | 'quantityUnit' | 'reservedBuildingComponentsCount' | 'responsibleUser' | 'responsibleUserId' | 'searchConceptNotes' | 'securityNotes' | 'soundProofNotes' | 'state' | 'updatedAt' | SearchRequestKeySpecifier)[];
export type SearchRequestFieldPolicy = {
	assets?: FieldPolicy<any> | FieldReadFunction<any>,
	assignedBuildingComponents?: FieldPolicy<any> | FieldReadFunction<any>,
	assignedBuildingComponentsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	budgetInRappens?: FieldPolicy<any> | FieldReadFunction<any>,
	budgetNotes?: FieldPolicy<any> | FieldReadFunction<any>,
	buildingComponentDescription?: FieldPolicy<any> | FieldReadFunction<any>,
	buildingComponentName?: FieldPolicy<any> | FieldReadFunction<any>,
	category?: FieldPolicy<any> | FieldReadFunction<any>,
	categoryId?: FieldPolicy<any> | FieldReadFunction<any>,
	comments?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	deadlineFound?: FieldPolicy<any> | FieldReadFunction<any>,
	deadlineShipment?: FieldPolicy<any> | FieldReadFunction<any>,
	dimensionRanges?: FieldPolicy<any> | FieldReadFunction<any>,
	ebkphCategory?: FieldPolicy<any> | FieldReadFunction<any>,
	ebkphCategoryId?: FieldPolicy<any> | FieldReadFunction<any>,
	fallbackLevel?: FieldPolicy<any> | FieldReadFunction<any>,
	fallbackLevelCO2PerUnit?: FieldPolicy<any> | FieldReadFunction<any>,
	fallbackLevelCO2Total?: FieldPolicy<any> | FieldReadFunction<any>,
	fireProtectionNotes?: FieldPolicy<any> | FieldReadFunction<any>,
	huntingStatusNotes?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	interests?: FieldPolicy<any> | FieldReadFunction<any>,
	project?: FieldPolicy<any> | FieldReadFunction<any>,
	projectId?: FieldPolicy<any> | FieldReadFunction<any>,
	quantity?: FieldPolicy<any> | FieldReadFunction<any>,
	quantityUnit?: FieldPolicy<any> | FieldReadFunction<any>,
	reservedBuildingComponentsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	responsibleUser?: FieldPolicy<any> | FieldReadFunction<any>,
	responsibleUserId?: FieldPolicy<any> | FieldReadFunction<any>,
	searchConceptNotes?: FieldPolicy<any> | FieldReadFunction<any>,
	securityNotes?: FieldPolicy<any> | FieldReadFunction<any>,
	soundProofNotes?: FieldPolicy<any> | FieldReadFunction<any>,
	state?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SearchRequestAssetReferenceKeySpecifier = ('asset' | 'createdAt' | 'id' | 'tags' | 'updatedAt' | SearchRequestAssetReferenceKeySpecifier)[];
export type SearchRequestAssetReferenceFieldPolicy = {
	asset?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	tags?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SearchRequestInterestKeySpecifier = ('acceptedAt' | 'buildingComponent' | 'createdAt' | 'id' | 'notes' | 'rejectedAt' | 'rejectionReason' | 'responsibleUser' | 'searchRequest' | 'state' | 'updatedAt' | SearchRequestInterestKeySpecifier)[];
export type SearchRequestInterestFieldPolicy = {
	acceptedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	buildingComponent?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	notes?: FieldPolicy<any> | FieldReadFunction<any>,
	rejectedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	rejectionReason?: FieldPolicy<any> | FieldReadFunction<any>,
	responsibleUser?: FieldPolicy<any> | FieldReadFunction<any>,
	searchRequest?: FieldPolicy<any> | FieldReadFunction<any>,
	state?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StorageLocationKeySpecifier = ('assets' | 'buildingComponents' | 'canton' | 'city' | 'contacts' | 'country' | 'createdAt' | 'googleMapsLink' | 'id' | 'mainImage' | 'mainImageId' | 'name' | 'notes' | 'postalCode' | 'street' | 'updatedAt' | StorageLocationKeySpecifier)[];
export type StorageLocationFieldPolicy = {
	assets?: FieldPolicy<any> | FieldReadFunction<any>,
	buildingComponents?: FieldPolicy<any> | FieldReadFunction<any>,
	canton?: FieldPolicy<any> | FieldReadFunction<any>,
	city?: FieldPolicy<any> | FieldReadFunction<any>,
	contacts?: FieldPolicy<any> | FieldReadFunction<any>,
	country?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	googleMapsLink?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	mainImage?: FieldPolicy<any> | FieldReadFunction<any>,
	mainImageId?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	notes?: FieldPolicy<any> | FieldReadFunction<any>,
	postalCode?: FieldPolicy<any> | FieldReadFunction<any>,
	street?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StorageLocationAssetReferenceKeySpecifier = ('asset' | 'createdAt' | 'id' | 'tags' | 'updatedAt' | StorageLocationAssetReferenceKeySpecifier)[];
export type StorageLocationAssetReferenceFieldPolicy = {
	asset?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	tags?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TaskKeySpecifier = ('closedAt' | 'createdAt' | 'dueDate' | 'id' | 'name' | 'updatedAt' | TaskKeySpecifier)[];
export type TaskFieldPolicy = {
	closedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	dueDate?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('createdAt' | 'email' | 'id' | 'notes' | 'updatedAt' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	notes?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	AppAsset?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AppAssetKeySpecifier | (() => undefined | AppAssetKeySpecifier),
		fields?: AppAssetFieldPolicy,
	},
	AssignedBuildingComponent?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AssignedBuildingComponentKeySpecifier | (() => undefined | AssignedBuildingComponentKeySpecifier),
		fields?: AssignedBuildingComponentFieldPolicy,
	},
	Autocomplete?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AutocompleteKeySpecifier | (() => undefined | AutocompleteKeySpecifier),
		fields?: AutocompleteFieldPolicy,
	},
	BuildingComponent?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BuildingComponentKeySpecifier | (() => undefined | BuildingComponentKeySpecifier),
		fields?: BuildingComponentFieldPolicy,
	},
	BuildingComponentAssetReference?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BuildingComponentAssetReferenceKeySpecifier | (() => undefined | BuildingComponentAssetReferenceKeySpecifier),
		fields?: BuildingComponentAssetReferenceFieldPolicy,
	},
	Canton?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CantonKeySpecifier | (() => undefined | CantonKeySpecifier),
		fields?: CantonFieldPolicy,
	},
	Category?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CategoryKeySpecifier | (() => undefined | CategoryKeySpecifier),
		fields?: CategoryFieldPolicy,
	},
	Contact?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ContactKeySpecifier | (() => undefined | ContactKeySpecifier),
		fields?: ContactFieldPolicy,
	},
	Dimension?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DimensionKeySpecifier | (() => undefined | DimensionKeySpecifier),
		fields?: DimensionFieldPolicy,
	},
	DimensionRange?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DimensionRangeKeySpecifier | (() => undefined | DimensionRangeKeySpecifier),
		fields?: DimensionRangeFieldPolicy,
	},
	EbkphCategory?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EbkphCategoryKeySpecifier | (() => undefined | EbkphCategoryKeySpecifier),
		fields?: EbkphCategoryFieldPolicy,
	},
	FinishOtpLoginResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | FinishOtpLoginResponseKeySpecifier | (() => undefined | FinishOtpLoginResponseKeySpecifier),
		fields?: FinishOtpLoginResponseFieldPolicy,
	},
	FinishOtpLoginUserResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | FinishOtpLoginUserResponseKeySpecifier | (() => undefined | FinishOtpLoginUserResponseKeySpecifier),
		fields?: FinishOtpLoginUserResponseFieldPolicy,
	},
	MaterialsDepot?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MaterialsDepotKeySpecifier | (() => undefined | MaterialsDepotKeySpecifier),
		fields?: MaterialsDepotFieldPolicy,
	},
	MaterialsDepotAssetReference?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MaterialsDepotAssetReferenceKeySpecifier | (() => undefined | MaterialsDepotAssetReferenceKeySpecifier),
		fields?: MaterialsDepotAssetReferenceFieldPolicy,
	},
	MaterialsDepotTimeline?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MaterialsDepotTimelineKeySpecifier | (() => undefined | MaterialsDepotTimelineKeySpecifier),
		fields?: MaterialsDepotTimelineFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	PostalCode?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PostalCodeKeySpecifier | (() => undefined | PostalCodeKeySpecifier),
		fields?: PostalCodeFieldPolicy,
	},
	Project?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProjectKeySpecifier | (() => undefined | ProjectKeySpecifier),
		fields?: ProjectFieldPolicy,
	},
	ProjectAssetReference?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProjectAssetReferenceKeySpecifier | (() => undefined | ProjectAssetReferenceKeySpecifier),
		fields?: ProjectAssetReferenceFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	ReferenceId?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ReferenceIdKeySpecifier | (() => undefined | ReferenceIdKeySpecifier),
		fields?: ReferenceIdFieldPolicy,
	},
	RowMessage?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RowMessageKeySpecifier | (() => undefined | RowMessageKeySpecifier),
		fields?: RowMessageFieldPolicy,
	},
	SearchRequest?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SearchRequestKeySpecifier | (() => undefined | SearchRequestKeySpecifier),
		fields?: SearchRequestFieldPolicy,
	},
	SearchRequestAssetReference?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SearchRequestAssetReferenceKeySpecifier | (() => undefined | SearchRequestAssetReferenceKeySpecifier),
		fields?: SearchRequestAssetReferenceFieldPolicy,
	},
	SearchRequestInterest?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SearchRequestInterestKeySpecifier | (() => undefined | SearchRequestInterestKeySpecifier),
		fields?: SearchRequestInterestFieldPolicy,
	},
	StorageLocation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StorageLocationKeySpecifier | (() => undefined | StorageLocationKeySpecifier),
		fields?: StorageLocationFieldPolicy,
	},
	StorageLocationAssetReference?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StorageLocationAssetReferenceKeySpecifier | (() => undefined | StorageLocationAssetReferenceKeySpecifier),
		fields?: StorageLocationAssetReferenceFieldPolicy,
	},
	Task?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TaskKeySpecifier | (() => undefined | TaskKeySpecifier),
		fields?: TaskFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;
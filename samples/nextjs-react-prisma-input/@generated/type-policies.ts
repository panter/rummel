import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type AddressKeySpecifier = ('address' | 'id' | AddressKeySpecifier)[];
export type AddressFieldPolicy = {
	address?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AutocompleteKeySpecifier = ('id' | 'key' | 'value' | AutocompleteKeySpecifier)[];
export type AutocompleteFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	key?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('createOneAutocomplete' | 'createOnePerson' | 'deleteOneAutocomplete' | 'deleteOnePerson' | 'updateOneAutocomplete' | 'updateOnePerson' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	createOneAutocomplete?: FieldPolicy<any> | FieldReadFunction<any>,
	createOnePerson?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteOneAutocomplete?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteOnePerson?: FieldPolicy<any> | FieldReadFunction<any>,
	updateOneAutocomplete?: FieldPolicy<any> | FieldReadFunction<any>,
	updateOnePerson?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrganisationKeySpecifier = ('description' | 'id' | 'persons' | 'simple' | OrganisationKeySpecifier)[];
export type OrganisationFieldPolicy = {
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	persons?: FieldPolicy<any> | FieldReadFunction<any>,
	simple?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PersonKeySpecifier = ('addresses' | 'id' | 'name' | 'organisation' | PersonKeySpecifier)[];
export type PersonFieldPolicy = {
	addresses?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	organisation?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('autocomplete' | 'autocompletes' | 'autocompletesCount' | 'people' | 'peopleCount' | 'person' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	autocomplete?: FieldPolicy<any> | FieldReadFunction<any>,
	autocompletes?: FieldPolicy<any> | FieldReadFunction<any>,
	autocompletesCount?: FieldPolicy<any> | FieldReadFunction<any>,
	people?: FieldPolicy<any> | FieldReadFunction<any>,
	peopleCount?: FieldPolicy<any> | FieldReadFunction<any>,
	person?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SimpleKeySpecifier = ('id' | 'name' | 'related' | 'secondName' | SimpleKeySpecifier)[];
export type SimpleFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	related?: FieldPolicy<any> | FieldReadFunction<any>,
	secondName?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	Address?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AddressKeySpecifier | (() => undefined | AddressKeySpecifier),
		fields?: AddressFieldPolicy,
	},
	Autocomplete?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AutocompleteKeySpecifier | (() => undefined | AutocompleteKeySpecifier),
		fields?: AutocompleteFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Organisation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrganisationKeySpecifier | (() => undefined | OrganisationKeySpecifier),
		fields?: OrganisationFieldPolicy,
	},
	Person?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PersonKeySpecifier | (() => undefined | PersonKeySpecifier),
		fields?: PersonFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Simple?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SimpleKeySpecifier | (() => undefined | SimpleKeySpecifier),
		fields?: SimpleFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;
import { LinkProps } from 'next/link';

export const ADMIN = '/admin';
export const AUTOCOMPLETE = `${ADMIN}/autocomplete`;
export const CATEGORY = `${ADMIN}/zirkular-categories`;
export const MATERIALS_DEPOT = '/materials-depot';
export const BUILDING_COMPONENT = '/building-component';
export const PROJECT = '/project';
export const SEARCH_REQUEST = '/search-request';
export const SEARCH_REQUEST_INTEREST = '/search-request-interest';
export const STORAGE_LOCATION = '/storage-location';
export const MATCHING = '/matching';

export const gotoListOfMaterialsDepot = (): LinkProps => ({
  href: `${MATERIALS_DEPOT}`,
});

export const gotoCreateNewMaterialsDepot = (): LinkProps => ({
  href: `${MATERIALS_DEPOT}/create`,
});
export const gotoMaterialsDepot = (id: string): LinkProps => ({
  href: `${MATERIALS_DEPOT}/${id}`,
});

export const gotoMaterialsDepotImages = (id: string): LinkProps => ({
  href: `${MATERIALS_DEPOT}/${id}/images`,
});

export const gotoMaterialDepotBuildingComponentsList = (
  materialDepotId: string,
): LinkProps => ({
  href: `${MATERIALS_DEPOT}/${materialDepotId}${BUILDING_COMPONENT}`,
});

export const gotoBuildingComponentsList = (): LinkProps => ({
  href: `${BUILDING_COMPONENT}`,
});
export const gotoBuildingComponent = (
  buildingComponentId: string,
): LinkProps => ({
  href: `${BUILDING_COMPONENT}/${buildingComponentId}`,
});

export const gotoCreateNewBuildingComponentFromMaterialsDepot = (
  materialDepotId: string,
): LinkProps => ({
  href: `${MATERIALS_DEPOT}/${materialDepotId}${BUILDING_COMPONENT}/create`,
});

export const gotoMaterialDepotBuildingComponent = (
  materialDepotId: string,
  buildingComponentId: string,
): LinkProps => ({
  href: `${MATERIALS_DEPOT}/${materialDepotId}${BUILDING_COMPONENT}/${buildingComponentId}`,
});

export const gotoBuildingComponentImages = ({
  buildingComponentId,
  materialsDepotId,
}: {
  buildingComponentId: string;
  materialsDepotId?: string | null;
}): LinkProps =>
  materialsDepotId
    ? {
        href: `${MATERIALS_DEPOT}/${materialsDepotId}${BUILDING_COMPONENT}/${buildingComponentId}/images`,
      }
    : {
        href: `${BUILDING_COMPONENT}/${buildingComponentId}/images`,
      };

export const gotoListOfProjects = (): LinkProps => ({
  href: `${PROJECT}`,
});

export const gotoProject = (projectId: string): LinkProps => ({
  href: `${PROJECT}/${projectId}`,
});

export const gotoProjectImages = (projectId: string): LinkProps => ({
  href: `${PROJECT}/${projectId}/images`,
});

export const gotoCreateNewProject = (): LinkProps => ({
  href: `${PROJECT}/create`,
});

export const gotoAdminListOfMaterialsDepot = (): LinkProps => ({
  href: `${MATERIALS_DEPOT}`,
});

export const gotoListOfBuildingComponents = (): LinkProps => ({
  href: `${BUILDING_COMPONENT}`,
});

export const gotoListOfSearchRequests = (): LinkProps => ({
  href: `${SEARCH_REQUEST}`,
});

export const gotoListOfAutocompletes = (): LinkProps => ({
  href: `${AUTOCOMPLETE}`,
});

export const gotoProjectSearchRequests = (projectId: string): LinkProps => ({
  href: `${PROJECT}/${projectId}${SEARCH_REQUEST}`,
});

export const gotoCreateNewSearchRequestFromProject = (
  projectId: string,
): LinkProps => ({
  href: `${PROJECT}/${projectId}/${SEARCH_REQUEST}/create`,
});

export const gotoProjectSearchRequest = (
  projectId: string,
  searchRequestId: string,
): LinkProps => ({
  href: `${PROJECT}/${projectId}${SEARCH_REQUEST}/${searchRequestId}`,
});

export const gotoListOfSearchRequestInterests = (path?: {
  projectId?: string;
  buildingComponentId?: string;
  materialsDepotId?: string;
  searchRequestId?: string;
}): LinkProps => {
  if (path?.projectId && path?.searchRequestId) {
    return {
      href: `${PROJECT}/${path.projectId}${SEARCH_REQUEST}/${path.searchRequestId}${SEARCH_REQUEST_INTEREST}`,
    };
  } else if (path?.buildingComponentId) {
    return {
      href: `${SEARCH_REQUEST_INTEREST}?buildingComponentId=${path?.buildingComponentId}`,
    };
  } else if (path?.materialsDepotId) {
    return {
      href: `${SEARCH_REQUEST_INTEREST}?materialsDepotId=${path?.materialsDepotId}`,
    };
  } else if (path?.searchRequestId) {
    return {
      href: `${SEARCH_REQUEST_INTEREST}?searchRequestId=${path?.searchRequestId}`,
    };
  } else {
    return {
      href: `${SEARCH_REQUEST_INTEREST}`,
    };
  }
};

export const gotoCreateNewSearchRequestInterest = (defaultValues?: {
  buildingComponentId?: string;
  searchRequestId?: string;
}): LinkProps => {
  const { buildingComponentId, searchRequestId } = defaultValues || {};
  const queryParams = new URLSearchParams();

  if (buildingComponentId) {
    queryParams.append('buildingComponentId', buildingComponentId);
  }
  if (searchRequestId) {
    queryParams.append('searchRequestId', searchRequestId);
  }

  return {
    href: `${SEARCH_REQUEST_INTEREST}/create?${queryParams.toString()}`,
  };
};

export const gotoSearchRequestInterest = (
  interestId: string,
  path?: {
    projectId?: string;
    searchRequestId?: string;
  },
): LinkProps => {
  return {
    href: `${SEARCH_REQUEST_INTEREST}/${interestId}`,
  };
};

export const gotoSearchRequestInterestProject = (
  interestId: string,
  projectId?: string,
): LinkProps => {
  return {
    href: `${SEARCH_REQUEST_INTEREST}/${interestId}${PROJECT}/${projectId}`,
  };
};

export const gotoListOfCategories = (): LinkProps => ({
  href: `${CATEGORY}`,
});

export const gotoListOfStorageLocations = (): LinkProps => ({
  href: `${STORAGE_LOCATION}`,
});

export const gotoStorageLocation = (id: string): LinkProps => ({
  href: `${STORAGE_LOCATION}/${id}`,
});

export const gotoListOfStorageLocation = (): LinkProps => ({
  href: `${STORAGE_LOCATION}`,
});

export const gotoCreateNewStorageLocation = (): LinkProps => ({
  href: `${STORAGE_LOCATION}/create`,
});

export const gotoMatching = (): LinkProps => ({
  href: `${MATCHING}`,
});

export const gotoStorageLocationImages = (id: string): LinkProps => ({
  href: `${STORAGE_LOCATION}/${id}/images`,
});

export const gotoStorageLocationBuildingComponentsList = (
  id: string,
): LinkProps => ({
  href: `${STORAGE_LOCATION}/${id}${BUILDING_COMPONENT}`,
});

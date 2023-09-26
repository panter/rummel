import { CsvSchema } from '@panter/nestjs-utils';
import { SearchRequestInterest } from './search-request-interest.entity';

export const searchRequestInterestCsvSchema: CsvSchema<SearchRequestInterest> =
  {
    searchRequestProjectName: {
      label: 'Projekt',
      serializer: (record) =>
        `${record.searchRequest?.project.name} - ${record.searchRequest?.project.shortName}`,
    },
    searchRequestBuildingComponentEbkphCategory: {
      label: 'EBKPH Kategorie',
      serializer: (record) => record.searchRequest.ebkphCategory?.name,
    },
    searchRequestBuildingComponentName: {
      label: 'Bauteil',
      serializer: (record) => record.searchRequest.buildingComponentName,
    },
    searchRequestBuildingComponentDescription: {
      label: 'Suchanfrage: Bauteil',
      serializer: (record) => record.searchRequest.buildingComponentDescription,
    },
    dimensionRanges: {
      label: 'Abmessungen',
      serializer: (record) =>
        record.searchRequest?.dimensionRanges.getItems().join(', '),
    },
    searchRequestQuantity: {
      label: 'Menge',
      serializer: (record) => record.searchRequest?.quantity?.toString(),
    },
    searchRequestQuantityUnit: {
      label: 'Einheit Menge',
      serializer: (record) => record.searchRequest?.quantityUnit?.toString(),
    },
    responsibleUserEmail: {
      label: 'Verantwortlicher',
      serializer: (record) => record.responsibleUser?.email,
    },
    searchRequestDeadlineFound: {
      label: 'Suchanfrage: Deadline gefunden',
      serializer: 'Date',
    },
    searchRequestDeadlineShipment: {
      label: 'Suchanfrage: Deadline Versand',
      serializer: 'Date',
    },
    createdAt: {
      label: 'Erstellt am',
      serializer: 'Date',
    },
    searchRequestConcept: {
      label: 'Konzept',
      serializer: (record) => record.searchRequest?.searchConceptNotes,
    },
    searchRequestStatusHunting: {
      label: 'Status Bauteiljagd',
      serializer: (record) => record.searchRequest?.huntingStatusNotes,
    },
    searchRequestFallbackLevel: {
      label: 'Rückfallebene',
      serializer: (record) => record.searchRequest?.fallbackLevel,
    },
    // searchRequestCO2Total: {
    //   label: 'CO2 gesamt',
    //   serializer: (record) => record.searchRequest?.co2f?.toString(),
    // },
    // searchRequestCO2PerUnit: {
    //   label: 'CO2 pro Einheit',
    //   serializer: (record) => record.searchRequest?.co2PerUnit?.toString(),
    // },
    searchRequestBudget: {
      label: 'Budget',
      serializer: (record) =>
        record.searchRequest?.budgetInRappens
          ? (record.searchRequest?.budgetInRappens / 100)?.toFixed(2)
          : '',
    },
    searchRequestFireProtection: {
      label: 'Brandschutz',
      serializer: (record) => record.searchRequest?.fireProtectionNotes,
    },
    searchRequestSoundProof: {
      label: 'Schallschutz',
      serializer: (record) => record.searchRequest?.soundProofNotes,
    },
    searchRequestSecurity: {
      label: 'Sicherheit',
      serializer: (record) => record.searchRequest?.securityNotes,
    },
  };

import { CsvSchema } from '@panter/nestjs-utils';
import { SearchRequest } from './search-request.entity';

export const searchRequestCsvSchema: CsvSchema<SearchRequest> = {
  project: {
    label: 'Projekt',
    serializer: ({ project }) => `${project?.name} ${project?.shortName}`,
  },
  state: {
    label: 'Status',
  },
  huntingStatusNotes: {
    label: 'Status Hunting',
  },
  ebpkhCategory: {
    label: 'EBKPH Kategorie',
    serializer: ({ ebkphCategory }) => ebkphCategory?.name,
  },
  ebpkhCategoryId: {
    label: 'eBKPH Kategorie Identification',
    serializer: ({ ebkphCategory }) => ebkphCategory?.description,
  },
  buildingComponentName: {
    label: 'Komponentenname',
  },
  buildingComponentDescription: {
    label: 'Komponentenbeschreibung',
  },
  dimensionRanges: {
    label: 'Abmessungen',
    serializer: ({ dimensionRanges }) => dimensionRanges.getItems()?.toString(),
  },
  quantity: {
    label: 'Anzahl',
  },
  quantityUnit: {
    label: 'Anzahl Unit',
  },
  amountFound: {
    label: 'Menge gefunden',
    serializer: (searchRequest) => {
      return searchRequest.assignedBuildingComponents
        .getItems()
        ?.reduce((acc, curr) => {
          return acc + curr.amount;
        }, 0)
        .toString();
    },
  },
  ammuntReserved: {
    label: 'Menge Reserve',
    serializer: (searchRequest) => {
      return searchRequest.assignedBuildingComponents
        .getItems()
        ?.reduce((acc, curr) => {
          return acc + curr.amountReserved;
        }, 0)
        .toString();
    },
  },
  responsibleUser: {
    label: 'Verantwortlicher',
    serializer: ({ responsibleUser }) => responsibleUser?.email,
  },
  deadlineFound: {
    label: 'Deadline gefunden',
    serializer: 'Date',
  },
  deadlineShipment: {
    label: 'Deadline Lieferung',
    serializer: 'Date',
  },
  comments: {
    label: '',
  },
  createdAt: {
    label: 'Erstellt am',
  },
  searchConceptNotes: {
    label: 'Konzept Suche',
  },
  fallbackLevel: {
    label: 'Rückfallebene',
  },
  fallbackLevelCO2Total: {
    label: 'Rückfallebene gesamt',
  },
  fallbackLevelCO2PerUnit: {
    label: 'Rückfallebene pro Einheit',
  },
  budget: {
    label: 'Budget',
    serializer: ({ budgetInRappens }) =>
      budgetInRappens ? (budgetInRappens / 100)?.toFixed(2) : undefined,
  },
  budgetNotes: {
    label: 'Budget Erläuterung',
  },
  fireProtectionNotes: {
    label: 'Brandschutz',
  },
  soundProofNotes: {
    label: 'Schallschutz',
  },
  securityNotes: {
    label: 'Sicherheit',
  },
  logisticsConceptNotes: {
    label: 'Lagerkonzept',
  },
};

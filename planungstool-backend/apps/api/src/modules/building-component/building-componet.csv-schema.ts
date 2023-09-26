import { CsvSchema } from '@panter/nestjs-utils';
import { BuildingComponent } from './entities/building-component.entity';

export const buildingComponentsCsvSchema: CsvSchema<BuildingComponent> = {
  componentId: {
    label: 'Bauteil-Nr.',
  },
  name: {
    label: 'Name',
  },
  description: {
    label: 'Beschreibung',
  },
  ebkphCategory: {
    label: 'EBKPH Kategorie',
    serializer: (record) =>
      `${record.ebkphCategory?.name} (${record.ebkphCategory?.description})`,
  },
  category: {
    label: 'Kategorie',
    serializer: (record) => record.category?.name,
  },
  quantity: {
    label: 'Menge',
    serializer: (record) =>
      record.quantity
        ? `${record.quantityExact ? '' : '~'}${record.quantity} ${
            record.quantityUnit || ''
          }`
        : '',
  },
  quantitySpare: {
    label: 'Anzahl Reserve',
  },
  quantityNotes: {
    label: 'Menge Beschreibung',
  },
  constructionYear: {
    label: 'Baujahr',
    serializer: (record) =>
      record.constructionYear
        ? `${record.constructionYearExact ? '' : '~'}${record.constructionYear}`
        : '',
  },
  constructionYearNotes: {
    label: 'Baujahr (Notizen)',
  },
  co2Savings: {
    label: 'CO2-Einsparung',
    serializer: (record) =>
      record.co2Savings
        ? `${record.co2SavingsExact ? '' : '~'} ${record.co2Savings}`
        : '',
  },
  condition: {
    label: 'Zustand',
  },
  materialsDepot: {
    label: 'Quellobjekt',
    serializer: (record) => record.materialsDepot?.name,
  },
  co2SavingsExact: {
    label: 'CO2 Einsparung (exakt)',
    serializer: 'Boolean',
  },
  harmfulSubstances: {
    label: 'Schadstoffe',
  },
  reusePotential: {
    label: 'Potenzial ReUse ',
  },
  reusePotentialNotes: {
    label: 'Potenzial ReUse (Notizen)',
  },
  locationInBuilding: {
    label: 'Standort im Gebäude',
  },
  locationInBuildingDetail: {
    label: 'Standort im Gebäude (Detail)',
  },
  showInMatching: {
    label: 'In Matching anzeigen',
    serializer: 'Boolean',
  },
  dimensions: {
    label: 'Masse',
    serializer: (record) =>
      record.dimensions
        .getItems()
        ?.map((dimension) => dimension)
        .join(', \n'),
  },
  dimensionsNotes: {
    label: 'Masse Beschreibung',
  },
  demolitionPhase: {
    label: 'Abbruchphase',
  },
  potentialInterests: {
    label: 'Potenzielles Interesse',
  },
  reusePotentialConclusion: {
    label: 'Fazit Erläuterung Reuse',
  },
  assignedTo: {
    label: 'Einbauort',
    serializer: (record) => record.assignedTo?.buildingComponent?.toString(),
  },
  rebuiltByContact: {
    label: 'Wiedereingebaut durch',
    serializer: (record) =>
      record.contacts
        .getItems()
        .find((c) => c.type === 'Wiedereingebaut durch')
        ?.toString(),
  },
  previousOwnerContact: {
    label: 'Vormalige Eigentümerin',
    serializer: (record) =>
      record.contacts
        .getItems()
        .find(
          (c) =>
            c.type === 'Bauträgerschaft' ||
            c.type === 'Eigentümerin' ||
            c.type === 'Rückbauunternehmen',
        )
        ?.toString(),
  },
  originallyBuiltByContact: {
    label: 'Ausbau durch',
    serializer: (record) =>
      record.contacts
        .getItems()
        .find((c) => c.type === 'Ausbau durch')
        ?.toString(),
  },
  manufacturerContact: {
    label: 'Hersteller:in',
    serializer: (record) =>
      record.contacts
        .getItems()
        .find((c) => c.type === 'Hersteller:in')
        ?.toString(),
  },
  sparePartsNotes: {
    label: 'Ersatzteile',
  },
  warrantyDetails: {
    label: 'Garantie',
  },
  reuseValueDescription: {
    label: 'Wiederbeschaffungswert Beschrieb',
  },
  reuseValuePerUnit: {
    label: 'Wiederbeschaffungswert pro Einheit',
  },
  reuseValueTotal: {
    label: 'Wiederbeschaffungswert gesamt',
  },
  transportDistanceInKm: {
    label: 'Stecke in km',
  },
  transportVehicleName: {
    label: 'Fahrzeug',
  },
  ru1Explanation: {
    label: 'RU1 Begründung',
  },
  ru1PerUnit: {
    label: 'RU1 pro Einheit',
  },
  ru2Explanation: {
    label: 'RU2 Begründung',
  },
  ru2PerUnit: {
    label: 'RU2 pro Einheit',
  },
  ru3Explanation: {
    label: 'RU3 Begründung',
  },
  ru3PerUnit: {
    label: 'RU3 pro Einheit',
  },
  ruPerUnitSum: {
    label: 'ReUse pro Einheit',
  },
  fallbackLevel: {
    label: 'Rückfallebene',
  },
  fallbackLevelCO2PerUnit: {
    label: 'Rückfallebene pro Einheit',
  },
  fallbackLevelCO2Total: {
    label: 'Rückfallebene gesamt',
  },
  co2SavingsPerUnit: {
    label: 'Einsparung pro Einheit',
  },
  ru1Total: {
    label: 'RU1 gesamt',
  },
  ru2Total: {
    label: 'RU2 gesamt',
  },
  ru3Total: {
    label: 'RU3 gesamt',
  },
  ruTotalSum: {
    label: 'ReUse gesamt',
  },
  co2SavingsTotal: {
    label: 'Einsparung gesamt',
  },
  co2Unit: {
    label: 'CO2 Einheit',
  },
  co2QuantityUsed: {
    label: 'CO2 Menge',
  },
  // createdAt: {
  //   label: 'Erstellt am',
  //   hidden: true,
  // },
  // updatedAt: {
  //   label: 'Aktualisiert am',
  //   hidden: true,
  // },
};

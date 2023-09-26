export type BuildingComponentCsvRowKeys = keyof BuildingComponentCsvRow;

export interface BuildingComponentCsvRow {
  'Bauteil-Nr.': string; // componentId
  Name: string; // name
  Beschreibung: string; // description
  Element: string; //  ebkphCategory.name (official category a building component can be assigned to)
  'e BKP-h': string; // ebkphCategory.description (the identification number / letter like (C1.3))
  'BKP Nr.': string; //the identification number / letter like (174.4)
  'BKP- Kategorie': string; // bkpCategory.name
  'Anzahl (Anzahl Anzahl Unit)': string; // string in format "~ 10 Stk."  parsed into (quantityExact: true, quantity: 10, quantityUnit: "Stk.",)
  Reserve: string; // number of spare components
  Baujahr: string; // constructionYear in format "~1950, notes", where ~ indicates that the year is not exact,
  'CO2-Einsparung': string; // co2Savings
  Zustand: string; // condition
  Schadstoffe: string; // hazardousSubstances
  'ReUse Potenzial': string; // reusePotential
  Erläuterung: string; // reusePotentialNotes
  Standort: string; // storageLocation.name
  Verortung: string; // locationInBuilding + locationInBuildingDetail
  Masse: string; // dimension) "(Durchgangsbreite: 90 cm, Dimension 2: 85 cm x 200 cm, Dicke: 4.5 cm)"
  Spezifikation: string; //TBD  properties specific to particular building component
  'Phase Abbruch': string; // TBD: phase of demolition
  'Potenzielles Interesse': string; // TBD: potential interest
  'Masse Beschreibung': string; //dimension description
  'Menge Beschreibung': string; // quantity description
  'Fazit Erläuterung Reuse': string; // conclusion onf reuse potential
  Einbauort: string; // project that building component is assigned to
  'Wiedereingebaut durch': string; // contact to company who will reuse the building component
  Zwischenlagerung: string; // storageLocation.nam,  storageLocation.description
  Quellobjekt: string; // materialsDepot.name
  'Vormalige Eigentümerin': string; // contact to previous owner
  'Ausbau durch': string; // (new) building company contact
  'Hersteller:in / Baujahr': string; // manufacturer + construction year
  Ersatzteile: string; // spare parts available
  Garantie: string; // warranty

  //TODO: some kind of box that I don't understand
  // Treibhausgasbilanzierung (box)
  // "Treibhausgasbilanzierung:
  // für einen Bauteilnutzungszyklus"
  // Wiederbeschaffungswert
  // RU1 - Demontage
  // RU2 - Transport
  // RU3 - Aufbereitung
  // "THG für ReUse Bauteil
  // RU1 + RU2 + RU3"
  // THG für Rückfallebene
  // "Einsparung
  // im Vergleich zur Rückfallebene"

  'Wiederbeschaffungswert Beschrieb': string; // reuse value description
  'Wiederbeschaffungswert pro Einheit': string; // reuse value per unit
  'Wiederbeschaffungswert gesamt': string; // resue value total
  'RU1 Beschrieb': string; // RU1 description
  Strecke: string; // distance of transport route in km
  Fahrzeug: string; // vehicle used for transport
  'RU3 Beschrieb': string; // RU3 description
  Rückfallebene: string; // fallback level
  'RU1 pro Einheit': string; // RU1perUnit // co2 emissions caused by disassembly
  'RU2 pro Einheit': string;
  'RU3 pro Einheit': string;
  'ReUse pro Einheit': string; // sum of RU1, RU2, RU3
  'Rückfallebene pro Einheit': string; // co2 emission of fallback level
  'Einsparung pro Einheit': string; // difference between ReUse and fallback level
  'RU1 gesamt': string; //total co2 emissions caused by disassembly
  'RU2 gesamt': string;
  'RU3 gesamt': string;
  'ReUse gesamt': string;
  'Rückfallebene gesamt': string; //total co2 emission of fallback level
  'Einsparung gesamt': string; // total co2 savings
  'CO2 Einheit': string; // co2 unit used for calculations
  'CO2 Menge': string; // amount of building component used for calculations
}

//bauteilliste
export interface BuildingComponentCsvRow1 {
  Bauteilnummer: string;
  Bauteilname: string;
  Masse: string;
  Kategorie: string;
  Beschreibung: string;
  Anzahl: string;
  'mögliche InteressentInnen': string;
  Aktiv: string;
}

// gebäudescreening and gebäudescreening alt
export interface BuildingComponentCsvRow2 {
  'eBKP-H': string;
  Element: string;
  'Bauteil Nr.': string;
  Bauteil: string;
  Spalte1: string;
  Masse: string;
  'Kategorie (zuklappen!)': string;
  Beschreibung: string;
  Menge: string;
  Einheit: string;
  Baujahr: string;
  'CO2 Einsparung total [kg]': string;
  Zustand: string;
  Schadstoffe: string;
  'Potenzial ReUse': string;
  Erläuterung: string;
  'Verortung im Gebaude': string;
  'Verfügbar für Zirkular': string;
  'mögliche InteressentInnen': string;
  'Interesse intern': string;
}

//for updating building components
export interface BuildingComponentCsvRow3 {
  c: string;
  index: string;
  'BTN + index': string;
  Bauteilname: string;
  aktualisiert: string;
  Bemerkungen: string;
  //TODO
}

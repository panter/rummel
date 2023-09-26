export interface MaterialDepotCsvImportRow {
  'Nr.': string; //ReuseRating
  Name: string; // Material Depot Name
  'Datum Abriss': string; // new timeline with start date
  Adresse: string; // new address and saveto note
  'Google Maps Link': string; //google maps link
  Kanton: string; // new canton
  Gebäudebeschrieb: string; // new description
  PlanerInnen: string; // new contact "Planer:innen"
  Bauträgerschaft: string; // new contact "Bauträgerschaft"
  Historie: string; //history notes
  'Link Historie': string; // add as link to history
  Status: string; // new status
  'To Do / Warten': string; // new task with
  'Link Amtsblatt': string; // add as link to description
  'bis Datum': string; // end date to task
  Person: string; // copy into historic notes
  Column1: string; // copy into historic notes
  _1: string; // copy into historic notes
  _2: string; // copy into historic notes
  _3: string; // copy into historic notes
  ID: string; // use as externalId
}

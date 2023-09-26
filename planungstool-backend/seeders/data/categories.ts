const categories: CategoryRaw[] = [
  {
    name: 'Rohbaumaterialien',
    sortOrder: 10,
  },
  { name: 'Stahl und weiter Metalle', sortOrder: 20 },
  { name: 'Holz und Holzwerkstoffe', sortOrder: 30 },
  { name: 'Natur- und Kunststeine', sortOrder: 40 },
  {
    name: 'Fassadenverkleidungen',
    sortOrder: 50,
    subCategories: [
      { name: 'Fenster', sortOrder: 60 },
      { name: 'Sonnenschutz', sortOrder: 70 },
      { name: 'Aussentüren', sortOrder: 80 },
      { name: 'Innentüren', sortOrder: 90 },
      { name: 'Dämmstoffe', sortOrder: 100 },
    ],
  },
  {
    name: 'Dachziegel',
    sortOrder: 110,
  },
  {
    name: 'Elektroinstallationen und Apparat',
    sortOrder: 120,
    subCategories: [
      { name: 'Leuchten', sortOrder: 130 },
      { name: 'Radiatoren', sortOrder: 140 },
      { name: 'Lüftung', sortOrder: 150 },
    ],
  },
  {
    name: 'Sanitärapparate',
    sortOrder: 160,
    subCategories: [
      { name: 'Warmwassererzeugung', sortOrder: 170 },
      { name: 'Küchen', sortOrder: 180 },
      { name: 'Spiegel- und Spiegelschränke', sortOrder: 190 },
    ],
  },
  {
    name: 'Innere Verglasungen',
    sortOrder: 200,
  },
  {
    name: 'Nasszellengarnituren',
    sortOrder: 210,
    subCategories: [
      { name: 'Bodenbeläge', sortOrder: 220 },
      { name: 'Wandbeläge', sortOrder: 230 },
      { name: 'Deckenbeläge', sortOrder: 240 },
      { name: 'Geländer', sortOrder: 250 },
      { name: 'Treppe', sortOrder: 260 },
      { name: 'Umgebung', sortOrder: 270 },
      { name: 'Briefkasten', sortOrder: 280 },
      { name: 'Beschläge', sortOrder: 290 },
    ],
  },
  {
    name: 'Brandschutzausstattung',
    sortOrder: 300,
  },
  {
    name: 'Baustelleninstallation',
    sortOrder: 310,
    subCategories: [
      { name: 'Möbel', sortOrder: 320 },
      { name: 'Kleinkrams', sortOrder: 330 },
    ],
  },
];

export default categories;

export interface CategoryRaw {
  name: string;
  sortOrder: number;
  subCategories?: CategoryRaw[];
}

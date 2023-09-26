const ebkphCategories: EbkphCategoryRaw[] = [
  {
    name: 'Grundstück',
    description: 'A',
  },
  {
    name: 'Vorbereitungen',
    description: 'B',
  },
  {
    name: 'Konstruktion Gebäude',
    description: 'C',
    subCategories: [
      {
        name: 'Fundament, Bodenplatte',
        description: 'C1',
        subCategories: [
          {
            name: 'Unterbau Fundament, Bodenplatte',
            description: 'C1.1',
          },
          {
            name: 'Fundament',
            description: 'C1.2',
          },
          {
            name: 'Bodenplatte',
            description: 'C1.3',
          },
          {
            name: 'Erdverbundene Treppe, Rampe',
            description: 'C1.4',
          },
          {
            name: 'Erdverbundenes Podest',
            description: 'C1.5',
          },
        ],
      },
      {
        name: 'Wandkonstruktion',
        description: 'C2',
        subCategories: [
          {
            name: 'Aussenwandkonstruktion',
            description: 'C2.1',
          },
          {
            name: 'Innenwandkonstruktion',
            description: 'C2.2',
          },
        ],
      },
      {
        name: 'Stützenkonstruktion',
        description: 'C3',
        subCategories: [
          {
            name: 'Aussenstütze',
            description: 'C3.1',
          },
          {
            name: 'Innenstütze',
            description: 'C3.2',
          },
        ],
      },
      {
        name: 'Decken- und Dachkonstruktion',
        description: 'C4',
        subCategories: [
          {
            name: 'Geschossdecke',
            description: 'C4.1',
          },
          {
            name: 'Innen liegende Treppe, Rampe',
            description: 'C4.2',
          },
          {
            name: 'Innen liegendes Podest',
            description: 'C4.3',
          },
          {
            name: 'Konstruktion Flachdach',
            description: 'C4.4',
          },
          {
            name: 'Konstruktion geneigtes Dach',
            description: 'C4.5',
          },
          {
            name: 'Aussen liegende Treppe, Rampe',
            description: 'C4.6',
          },
          {
            name: 'Aussen liegendes Podest',
            description: 'C4.7',
          },
          {
            name: 'Aussen liegende Konstruktion, Vordach',
            description: 'C4.8',
          },
        ],
      },
    ],
  },
  {
    name: 'Technik Gebäude',
    description: 'D',
    subCategories: [
      {
        name: 'Elektroanlage',
        description: 'D1',
        subCategories: [
          {
            name: 'Anlage Erzeugung Starkstrom',
            description: 'D1.1',
          },
          {
            name: 'Transformierung Starkstrom',
            description: 'D1.2',
          },
          {
            name: 'Speicherung Starkstrom',
            description: 'D1.3',
          },
          {
            name: 'Installation Starkstrom',
            description: 'D1.4',
          },
          {
            name: 'Verbraucher Starkstrom: Leuchten',
            description: 'D1.5',
          },
          {
            name: 'Verbraucher Starkstrom: Elektrogeräte',
            description: 'D1.6',
          },
          {
            name: 'Anlage Erzeugung Schwachstrom',
            description: 'D1.7',
          },
          {
            name: 'Transformierung Schwachstrom',
            description: 'D1.8',
          },
          {
            name: 'Speicherung Schwachstrom',
            description: 'D1.9',
          },
          {
            name: 'Installation Schwachstrom',
            description: 'D1.10',
          },
          {
            name: 'Verbraucher Schwachstrom',
            description: 'D1.11',
          },
        ],
      },
      {
        name: 'Technische Brandschutzanlage',
        description: 'D4',
        subCategories: [
          {
            name: 'Löschgerät',
            description: 'D4.1',
          },
        ],
      },
      {
        name: 'Wärmeanlage',
        description: 'D5',
        subCategories: [
          {
            name: 'Wärmequelle, -senke, Brennstofflager',
            description: 'D5.1',
          },
          {
            name: 'Wärmeerzeugung',
            description: 'D5.2',
          },
          {
            name: 'Wärmespeicherung',
            description: 'D5.3',
          },
          {
            name: 'Wärmeverteilung',
            description: 'D5.4',
          },
          {
            name: 'Wärmeabgabe',
            description: 'D5.5',
          },
        ],
      },
      {
        name: 'Lufttechnische Anlage',
        description: 'D7',
        subCategories: [
          {
            name: 'Aussenluftversorgung, Fortluftführung',
            description: 'D7.1',
          },
          {
            name: 'Luftaufbereitung',
            description: 'D7.2',
          },
          {
            name: 'Luftwärmespeicherung',
            description: 'D7.3',
          },
          {
            name: 'Luftverteilung',
            description: 'D7.4',
          },
          {
            name: 'Luftabgabe',
            description: 'D7.5',
          },
        ],
      },
      {
        name: 'Wassertechnische Anlage',
        description: 'D8',
        subCategories: [
          {
            name: 'Wasserversorgung',
            description: 'D8.1',
          },
          {
            name: 'Wasserbehandlung',
            description: 'D8.2',
          },
          {
            name: 'Wasserspeicherung',
            description: 'D8.3',
          },
          {
            name: 'Wasserverteilung',
            description: 'D8.4',
          },
          {
            name: 'Wasser: Armatur, Apparat',
            description: 'D8.5',
          },
          {
            name: 'Wasser: Installationselement',
            description: 'D8.6',
          },
        ],
      },
      {
        name: 'Beförderungsanlage',
        description: 'D12',
        subCategories: [
          {
            name: 'Personenaufzug',
            description: 'D12.1',
          },
          {
            name: 'Lasten- und Serviceaufzug',
            description: 'D12.2',
          },
        ],
      },
    ],
  },
  {
    name: 'Äussere Wandbekleidung Gebäude',
    description: 'E',
    subCategories: [
      {
        name: 'Äussere Wandbekleidung unter Terrain',
        description: 'E1',
        subCategories: [
          {
            name: 'Wandabdichtung unter Terrain',
            description: 'E1.1',
          },
          {
            name: 'Aussenwärmedämmung unter Terrain',
            description: 'E1.2',
          },
          {
            name: 'Schutzschicht unter Terrain',
            description: 'E1.3',
          },
        ],
      },
      {
        name: 'Äussere Wandbekleidung über Terrain',
        description: 'E2',
        subCategories: [
          {
            name: 'Äussere Beschichtung',
            description: 'E2.1',
          },
          {
            name: 'Aussenwärmedämmsystem',
            description: 'E2.2',
          },
          {
            name: 'Fassadenbekleidung',
            description: 'E2.3',
          },
          {
            name: 'Systemfassade',
            description: 'E2.4',
          },
          {
            name: 'Fassadenbekleidung Unterschicht',
            description: 'E2.5',
          },
          {
            name: 'Aussen liegende Absturzsicherung',
            description: 'E2.6',
          },
        ],
      },
      {
        name: 'Element in Aussenwand',
        description: 'E3',
        subCategories: [
          {
            name: 'Fenster',
            description: 'E3.1',
          },
          {
            name: 'Aussentür',
            description: 'E3.2',
          },
          {
            name: 'Aussentor',
            description: 'E3.3',
          },
          {
            name: 'Sonnenschutz, Wetterschutz',
            description: 'E3.4',
          },
          {
            name: 'Absturzsicherung',
            description: 'E3.5',
          },
        ],
      },
    ],
  },
  {
    name: 'Bedachung Gebäude',
    description: 'F',
    subCategories: [
      {
        name: 'Dachhaut',
        description: 'F1',
        subCategories: [
          {
            name: 'Dachabdichtung unter Terrain',
            description: 'F1.1',
          },
          {
            name: 'Bedachung Flachdach',
            description: 'F1.2',
          },
          {
            name: 'Bedachung Geneigtes Dach',
            description: 'F1.3',
          },
          {
            name: 'Systemdach',
            description: 'F1.4',
          },
        ],
      },
      {
        name: 'Element zu Dach',
        description: 'F2',
        subCategories: [
          {
            name: 'Element zu Flachdach',
            description: 'F2.1',
          },
          {
            name: 'Element zu geneigtem Dach',
            description: 'F2.2',
          },
          {
            name: 'Schutzanlage zu Dach',
            description: 'F2.3',
          },
        ],
      },
    ],
  },
  {
    name: 'Ausbau Gebäude',
    description: 'G',
    subCategories: [
      {
        name: 'Trennwand, Tür, Tor',
        description: 'G1',
        subCategories: [
          {
            name: 'Fest stehende Trennwand',
            description: 'G1.1',
          },
          {
            name: 'Bewegliche Trennwand',
            description: 'G1.2',
          },
          {
            name: 'Schachtfront',
            description: 'G1.3',
          },
          {
            name: 'Innenfenster',
            description: 'G1.4',
          },
          {
            name: 'Innentür',
            description: 'G1.5',
          },
          {
            name: 'Innentor',
            description: 'G1.6',
          },
        ],
      },
      {
        name: 'Bodenbelag',
        description: 'G2',
        subCategories: [
          {
            name: 'Unterkonstruktion zu Bodenbelag',
            description: 'G2.1',
          },
          {
            name: 'Bodenbelag',
            description: 'G2.2',
          },
        ],
      },
      {
        name: 'Wandbekleidung',
        description: 'G3',
        subCategories: [
          {
            name: 'Unterkonstruktion zu Wandbekleidung',
            description: 'G3.1',
          },
          {
            name: 'Wandbekleidung',
            description: 'G3.2',
          },
        ],
      },
      {
        name: 'Deckenbekleidung',
        description: 'G4',
        subCategories: [
          {
            name: 'Unterkonstruktion zu Deckenbekleidung',
            description: 'G4.1',
          },
          {
            name: 'Deckenbekleidung',
            description: 'G4.2',
          },
        ],
      },
      {
        name: 'Einbauten, Schutzeinrichtung zu Ausbau',
        description: 'G5',
        subCategories: [
          {
            name: 'Einbauschrank, Regal, Ablage',
            description: 'G5.1',
          },
          {
            name: 'Einbauküche',
            description: 'G5.2',
          },
          {
            name: 'Innerer Fensterausbau',
            description: 'G5.3',
          },
          {
            name: 'Innerer Abschluss',
            description: 'G5.4',
          },
          {
            name: 'Absturz-, Anprallsicherung',
            description: 'G5.5',
          },
          {
            name: 'Sonderbauteil',
            description: 'G5.6',
          },
          {
            name: 'Kleinbauteil, Schutzraumeinrichtung',
            description: 'G5.7',
          },
        ],
      },
    ],
  },
  {
    name: 'Nutzungsspezifische Anlage Gebäude',
    description: 'H',
    subCategories: [
      {
        name: 'Grossküche',
        description: 'H2',
      },
      {
        name: 'Anlage für Bildung, Kultur',
        description: 'H6',
      },
      {
        name: 'Sportanlage, Freizeitanlage',
        description: 'H7',
      },
    ],
  },
  {
    name: 'Umgebung Gebäude',
    description: 'I',
    subCategories: [
      {
        name: 'Umgebungsbauwerk',
        description: 'I2',
        subCategories: [
          {
            name: 'Böschungsverbau',
            description: 'I2.1',
          },
          {
            name: 'Stützmauer',
            description: 'I2.2',
          },
          {
            name: 'Frei stehende Wand',
            description: 'I2.3',
          },
          {
            name: 'Treppe, Rampe',
            description: 'I2.4',
          },
          {
            name: 'Kleinbauwerk',
            description: 'I2.5',
          },
          {
            name: 'Unterirdisches Bauwerk',
            description: 'I2.6',
          },
          {
            name: 'Absturz-, Anprallsicherung für Umgebung',
            description: 'I2.7',
          },
          {
            name: 'Einfriedung',
            description: 'I2.8',
          },
        ],
      },
      {
        name: 'Hartfläche',
        description: 'I4',
        subCategories: [
          {
            name: 'Fundations-, Tragschicht',
            description: 'I4.1',
          },
          {
            name: 'Einfassung, Abschluss Hartfläche',
            description: 'I4.2',
          },
          {
            name: 'Deckschicht',
            description: 'I4.3',
          },
          {
            name: 'Bodenmarkierung',
            description: 'I4.4',
          },
        ],
      },
      {
        name: 'Ausstattung Umgebung',
        description: 'I6',
        subCategories: [
          {
            name: 'Mobile Ausstattung für Umgebung',
            description: 'I6.1',
          },
          {
            name: 'Fixierte Ausstattung für Umgebung',
            description: 'I6.2',
          },
          {
            name: 'Spiel-, Sportgerät für Umgebung',
            description: 'I6.3',
          },
          {
            name: 'Abfallentsorgungseinrichtung für Umgebung',
            description: 'I6.4',
          },
        ],
      },
    ],
  },
  {
    name: 'Ausstattung Gebäude',
    description: 'J',
    subCategories: [
      {
        name: 'Mobiliar',
        description: 'J1',
        subCategories: [
          {
            name: 'Allgemeines Mobiliar',
            description: 'J1.1',
          },
          {
            name: 'Nutzungsspezifisches Mobiliar',
            description: 'J1.2',
          },
          {
            name: 'Mobile Leuchte',
            description: 'J1.3',
          },
          {
            name: 'Signaletik',
            description: 'J1.4',
          },
        ],
      },
      {
        name: 'Textilien',
        description: 'J3',
        subCategories: [
          {
            name: 'Allgemeine Textilien',
            description: 'J3.1',
          },
          {
            name: 'Nutzungsspezifische Textilien',
            description: 'J3.2',
          },
        ],
      },
      {
        name: 'Kunst am Bau',
        description: 'J4',
        subCategories: [
          {
            name: 'Kunst am Bau',
            description: 'J4.1',
          },
          {
            name: 'Künstlerisch gestaltetes Bauteil',
            description: 'J4.2',
          },
        ],
      },
    ],
  },
  {
    name: 'Planungskosten',
    description: 'V',
  },
  {
    name: 'Nebenkosten zu Erstellung',
    description: 'W',
  },
  {
    name: 'Reserve, Teuerung',
    description: 'Y',
  },
  {
    name: 'Mehrwertsteuer',
    description: 'Z',
  },
];

export default ebkphCategories;

export interface EbkphCategoryRaw {
  name: string;
  description?: string;
  subCategories?: EbkphCategoryRaw[];
}

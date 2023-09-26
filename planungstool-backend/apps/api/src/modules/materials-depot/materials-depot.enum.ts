import { registerEnumType } from '@nestjs/graphql';

export enum MaterialsDepotState {
  draft = 'draft',
  active = 'active',
  closed = 'closed',
}

registerEnumType(MaterialsDepotState, {
  name: 'MaterialsDepotState',
});

export const parseState = (german: string): MaterialsDepotState => {
  switch (german.toLowerCase().trim()) {
    case 'laufend':
    case 'offen':
    case 'warten':
    case 'nichts tun':
    case 'kontaktiert ':
      return MaterialsDepotState.draft;
    case 'abgeschlossen': {
      return MaterialsDepotState.closed;
    }
    default: {
      return MaterialsDepotState.draft;
    }
  }
};

export const parsePhase = (german: string): string | undefined => {
  if (!german) {
    return undefined;
  }

  if (german?.toLowerCase().trim() === 'vermittlung') {
    return 'laufend';
  } else if (german?.toLowerCase().trim() === 'abgeschlossen') {
    return undefined;
  } else {
    return 'kontaktierung';
  }
};

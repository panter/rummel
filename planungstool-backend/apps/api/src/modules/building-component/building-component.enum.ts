import { registerEnumType } from '@nestjs/graphql';

export enum BuildingComponentState {
  draft = 'draft',
  active = 'active',
  closed = 'closed',
}

registerEnumType(BuildingComponentState, {
  name: 'BuildingComponentState',
});

export enum QuantityUnit {
  m = 'm',
  m2 = 'm2',
  m3 = 'm3',
  lfm = 'lfm',
  stk = 'stk',
  kg = 'kg',
}

registerEnumType(QuantityUnit, {
  name: 'QuantityUnit',
});

export const parseQuantityUnit = (german: string): QuantityUnit => {
  switch (german.toLowerCase().trim()) {
    case 'm':
      return QuantityUnit.m;
    case 'm2': {
      return QuantityUnit.m2;
    }
    case 'm3': {
      return QuantityUnit.m3;
    }
    case 'lfm': {
      return QuantityUnit.lfm;
    }
    case 'stk':
    case '.stk': {
      return QuantityUnit.stk;
    }
    case 'kg': {
      return QuantityUnit.kg;
    }
    default: {
      return QuantityUnit.stk;
    }
  }
};

export enum Condition {
  good = 'good',
  fair = 'fair',
  bad = 'bad',
  unknown = 'unknown',
}

export const parseCondition = (german: string): Condition => {
  switch (german.toLowerCase().trim()) {
    case 'gut':
      return Condition.good;
    case 'mittel/schlecht':
    case 'schlecht': {
      return Condition.bad;
    }
    case 'mittel': {
      return Condition.fair;
    }
    default: {
      return Condition.unknown;
    }
  }
};

registerEnumType(Condition, {
  name: 'Condition',
});

export enum ReusePotential {
  good = 'good',
  fair = 'fair',
  bad = 'bad',
  unknown = 'unknown',
}

export const parseReusePotential = (german: string): ReusePotential => {
  switch (german.toLowerCase().trim()) {
    case 'gut':
    case 'hoch':
      return ReusePotential.good;
    case 'mittel/niedrig':
    case 'schlecht': {
      return ReusePotential.bad;
    }
    case 'mittel': {
      return ReusePotential.fair;
    }
    default: {
      return ReusePotential.unknown;
    }
  }
};

registerEnumType(ReusePotential, {
  name: 'ReusePotential',
});

export enum HarmfulSubstances {
  notToExpect = 'notToExpect',
  suspectedPollutant = 'suspectedPollutant',
  pollutant = 'pollutant',
  noAssessment = 'noAssessment',
}

registerEnumType(HarmfulSubstances, {
  name: 'HarmfulSubstances',
});

export enum BuildingComponentPhase {
  inventory = 'inventory',
  meditation = 'meditation',
  clarification = 'clarification',
  disassembly = 'disassembly',
  release = 'release',
  stored = 'stored',
  reused = 'reused',
}

registerEnumType(BuildingComponentPhase, {
  name: 'BuildingComponentPhase',
});

import getConfig from 'next/config';

export enum EnvShort {
  local = 'local',
  test = 'test',
  dev = 'dev',
  review = 'review',
  stage = 'stage',
  prod = 'prod',
}

export class PublicRuntimeConfig {
  private static config: Record<string, any>;

  // noinspection JSUnusedLocalSymbols
  private constructor() {}

  static get<T extends any = string>(
    variableName: string,
    defaultValue?: T,
  ): T | undefined {
    if (!this.config) {
      const { publicRuntimeConfig } = getConfig();
      PublicRuntimeConfig.config = publicRuntimeConfig || {};
    }

    return this.config[variableName] || defaultValue;
  }

  static getOrThrow<T extends any = string>(variableName: string): T {
    const value = this.get<T>(variableName);
    if (!value) {
      throw new Error(`Mandatory env variable '${variableName}' was not found`);
    }
    return value;
  }
}

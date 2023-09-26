import { Injectable, Logger } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { get, has } from 'lodash';

@Injectable()
export class I18n {
  private static instance: I18n;

  private readonly logger = new Logger(I18n.name);
  private readonly language: string;
  private readonly translations!: Record<string, any>;

  constructor(language: string, translations: Record<string, any>) {
    this.language = language;
    this.translations = translations;
  }

  static async Init({
    language = 'de',
    translationFilePath,
  }: {
    language: string;
    translationFilePath: string;
  }) {
    const translations = JSON.parse(
      (await readFile(translationFilePath)).toString('utf-8'),
    );

    this.instance = new I18n(language, translations);
  }

  static get(key: string, context?: Record<string, string>): string {
    let message = this.instance.get(key);
    if (message && context) {
      for (const prop in context) {
        message = message.replaceAll(`{${prop}}`, context[prop]);
      }
    }
    return message;
  }

  get(key: string): string {
    if (!has(this.translations, key)) {
      this.logger.warn(
        `Translation for key '${key}' is missing. Language=${this.language}.`,
      );
    }
    return get(this.translations, key) || key;
  }
}

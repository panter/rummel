import { Logger } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { uniqBy } from 'lodash';
import { Seeder } from '@mikro-orm/seeder';
import { loadJson } from './utils';
import { PostalCode } from '@panter/nestjs-utils';

const lastTechnicalPostcode = 40;

export class PostalCodesSeeder extends Seeder {
  private readonly logger = new Logger(PostalCodesSeeder.name);
  private em!: EntityManager;

  async run(em: EntityManager): Promise<void> {
    this.em = em;
    await this.seedPostalCodes();
  }

  async seedPostalCodes(): Promise<void> {
    const entries: PostalCodeRaw[] = await loadJson('plz_verzeichnis_v2');
    this.logger.log(`Seeding ${entries.length} Swiss postal codes`);

    const all = new Set();
    const duplicates = new Set();
    entries.forEach((row) => {
      if (all.has(row.postleitzahl)) {
        duplicates.add(row.postleitzahl);
      }
      all.add(row.postleitzahl);
    });

    const postcodes = entries
      .filter(
        (row) =>
          row.plz_typ <= lastTechnicalPostcode &&
          !duplicates.has(row.postleitzahl),
      )
      // .map((row) =>  new PostalCode(row.postleitzahl, row.kanton, row.ortbez27));
      .map((row) =>
        this.em.create(PostalCode, {
          postalCode: row.postleitzahl,
          canton: row.kanton,
          description: row.ortbez27,
        }),
      );
    this.em.persist(uniqBy(postcodes, (p) => p.postalCode));
  }
}

interface PostalCodeRaw {
  plz_typ: number;
  postleitzahl: string;
  kanton: string;
  ortbez27: string;
}

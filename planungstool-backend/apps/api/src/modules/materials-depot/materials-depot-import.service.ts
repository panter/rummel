import { Injectable, Logger } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { MaterialsDepot } from './entities/materials-depot.entity';
import { CsvImportReport, setOrAppend } from '@panter/nestjs-utils';
import { MaterialDepotCsvImportRow } from './material-depot-csv-import-row';
import { User } from '../user-identity';
import * as dayjs from 'dayjs';
import { MaterialsDepotTimeline } from '../materials-depot-timeline/materials-depot-timeline.entity';
import { Contact } from '../contact/contact.entity';
import { parseState } from './materials-depot.enum';
import { Task } from '../task/task.entity';
import { UniqueConstraintViolationException } from '@mikro-orm/core';

@Injectable()
export class MaterialsDepotImportService {
  private logger: Logger = new Logger(MaterialsDepotImportService.name);

  private repository: EntityRepository<MaterialsDepot>;

  constructor(private readonly em: EntityManager) {
    this.repository = em.getRepository(MaterialsDepot);
  }

  // @Transactional()
  async import(
    rows: MaterialDepotCsvImportRow[],
    currentUser: User,
  ): Promise<CsvImportReport> {
    const report = new CsvImportReport();

    for (const [index, row] of rows.entries()) {
      const externalId = row['ID'];
      if (externalId) {
        const exists = await this.em.count(MaterialsDepot, {
          externalId: { $eq: externalId },
        });
        if (exists) {
          continue;
        }
      } else {
        //let's ignore eveyrhing without an external id
        continue;
      }

      const name = row.Name || `Lager ${index + 1}`;
      const shortName = `${name.substring(0, 3)}${index + 1}`;
      const materialsDepot = new MaterialsDepot({
        name,
        shortName,
        responsableUser: currentUser,
      });
      materialsDepot.externalId = externalId;

      if (row['Gebäudebeschrieb']) {
        materialsDepot.notes = setOrAppend(
          materialsDepot.notes,
          'Gebäudebeschrieb',
        );
      }
      if (row['Nr.'] && !isNaN(+row['Nr.'])) {
        materialsDepot.reUseRating = +row['Nr.'];
      }
      if (row['Datum Abriss']) {
        const startDatum = dayjs(row['Datum Abriss'], 'DD.MM.YY');
        if (startDatum.isValid()) {
          const timeline = new MaterialsDepotTimeline();
          timeline.startDate = startDatum.toDate();
          timeline.description = 'Abbruch';
          materialsDepot.timelines.add(timeline);
        } else {
          report.errors.push({
            index,
            message: `Invalid 'Datum Abriss' value: ${row['Datum Abriss']}`,
          });
        }
      }
      if (row['Adresse']) {
        materialsDepot.notes = setOrAppend(
          materialsDepot.notes,
          row['Adresse'],
          'Adresse',
        );
      }
      materialsDepot.googleMapsLink = row['Google Maps Link'];
      materialsDepot.canton = row['Kanton'];
      if (row['PlanerInnen']) {
        materialsDepot.contacts.add(
          new Contact({
            type: 'Planer:innen',
            notes: row['PlanerInnen'],
          }),
        );
      }
      if (row['Bauträgerschaft']) {
        materialsDepot.contacts.add(
          new Contact({
            type: 'Bauträgerschaft',
            notes: row['PlanerInnen'],
          }),
        );
      }
      if (row['Historie']) {
        materialsDepot.historyNotes = setOrAppend(
          materialsDepot.historyNotes,
          row['Historie'],
        );
      }
      if (row['Link Historie']) {
        materialsDepot.historyNotes = setOrAppend(
          materialsDepot.historyNotes,
          row['Link Historie'],
          'Link',
        );
      }
      if (row['Status']) {
        materialsDepot.state = parseState(row['Status']);
        materialsDepot.phase = parseState(row['Status']);
      }
      if (row['To Do / Warten']) {
        const task = new Task();
        task.name = row['To Do / Warten'];
        if (row['bis Datum']) {
          const dueDate = dayjs(row['bis Datum'], 'DD.MM.YY');
          if (dueDate.isValid()) {
            task.dueDate = dueDate.toDate();
          } else {
            report.errors.push({
              index,
              message: `Invalid 'bis Datum' value: ${row['bis Datum']}`,
            });
          }
        }
        materialsDepot.tasks.add(task);
      }
      if (row['Person']) {
        materialsDepot.historyNotes = setOrAppend(
          materialsDepot.historyNotes,
          contactMapping[row['Person']],
          'Responsible Person',
        );
      }
      if (row['Column1']) {
        materialsDepot.historyNotes = setOrAppend(
          materialsDepot.historyNotes,
          row['Column1'],
          'Column1',
        );
      }
      if (row['_1']) {
        materialsDepot.historyNotes = setOrAppend(
          materialsDepot.historyNotes,
          row['_1'],
          '_1',
        );
      }
      if (row['_2']) {
        materialsDepot.historyNotes = setOrAppend(
          materialsDepot.historyNotes,
          row['_2'],
          '_2',
        );
      }
      if (row['_3']) {
        materialsDepot.historyNotes = setOrAppend(
          materialsDepot.historyNotes,
          row['_3'],
          '_3',
        );
      }
      try {
        await this.em.persistAndFlush(materialsDepot);
        report.rowsImported++;
      } catch (e) {
        this.logger.error(e);
        if (e instanceof UniqueConstraintViolationException) {
          report.errors.push({
            index,
            message: `Duplicate entry: ${(<any>e).detail}`,
          });
        }
        report.errors.push({
          index,
          message: `Error while importing row: ${index}`,
        });
      }
    }
    return report;
  }
}

const contactMapping: Record<string, string> = {
  lam: 'l.meier@zirkular.net',
  ano: 'a.oefner@zirkular.net',
  reb: 'r.brandmayer@zirkular.net',
  jaa: 'j.amann@zirkular.net',
  pah: 'p.hentschel@zirkular.net',
  dav: 'd.vittani@zirkular.net',
  chb: 'c.bofinger@zirkular.net',
  ald: 'a.doehmen@zirkular.net',
  dag: 'd.gysin@zirkular.net',
  los: 'l.schoenefelder@zirkular.net',
  sep: 's.popp@zirkular.net',
  als: 'a.schorfmann@zirkular.net',
  lud: 'l.diefenbacher@zirkular.net',
};

import { Injectable, Logger } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { BuildingComponent } from './entities/building-component.entity';
import {
  BuildingComponentCsvRow,
  BuildingComponentCsvRow1,
  BuildingComponentCsvRow2,
} from './building-component-csv-row';
import { MaterialsDepot } from '../materials-depot/entities/materials-depot.entity';
import {
  CsvImportReport,
  setOrAppend,
  Transactional,
} from '@panter/nestjs-utils';
import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { Category } from '../category/category.entity';
import {
  HarmfulSubstances,
  parseCondition,
  parseQuantityUnit,
  parseReusePotential,
} from './building-component.enum';
import { EbkphCategory } from '../ebkph-category/ebkph-category.entity';

@Injectable()
export class BuildingComponentImportService {
  private logger: Logger = new Logger(BuildingComponentImportService.name);

  private repository: EntityRepository<BuildingComponent>;

  constructor(private readonly em: EntityManager) {
    this.repository = em.getRepository(BuildingComponent);
  }

  async import1(materialDepotId: string, rows: BuildingComponentCsvRow1[]) {
    const report = new CsvImportReport();

    const materialsDepot = await this.em.findOneOrFail(MaterialsDepot, {
      id: materialDepotId,
    });

    let foundFirstLine = false;
    let firstColumnIndex = 0;
    for (const [index, rawRow] of rows.entries()) {
      if (!foundFirstLine) {
        if (Object.values(rawRow).some((value) => value === 'Bauteilnummer')) {
          foundFirstLine = true;
          firstColumnIndex = Object.values(rawRow).findIndex(
            (value) => value === 'Bauteilnummer',
          );
          continue;
        }
      } else {
        const buildingComponent = new BuildingComponent({ materialsDepot });
        const rawValues = Object.values(rawRow);
        const row: BuildingComponentCsvRow1 = {
          Bauteilnummer: rawValues[firstColumnIndex],
          Bauteilname: rawValues[firstColumnIndex + 1],
          Masse: rawValues[firstColumnIndex + 2],
          Kategorie: rawValues[firstColumnIndex + 3],
          Beschreibung: rawValues[firstColumnIndex + 4],
          Anzahl: rawValues[firstColumnIndex + 5],
          'mögliche InteressentInnen': rawValues[firstColumnIndex + 6],
          Aktiv: rawValues[firstColumnIndex + 7],
        };
        buildingComponent.externalId = row.Bauteilnummer;
        buildingComponent.description = setOrAppend(
          buildingComponent.description,
          row.Bauteilnummer,
          'Bauteilnummer',
        );
        buildingComponent.name = row.Bauteilname;
        buildingComponent.quantityNotes = row.Masse;
        buildingComponent.description = setOrAppend(
          buildingComponent.description,
          row.Beschreibung,
        );
        if (row.Kategorie) {
          const category = await this.em.findOne(Category, {
            name: { $eq: row.Kategorie.trim() },
          });
          if (category) {
            buildingComponent.category = category;
          } else {
            report.warnings.push({
              index,
              message: `Category ${row.Kategorie} not found!`,
            });
          }
        }
        if (row.Anzahl) {
          // parse quantity (regex) from string like "1 Stk. or ~12.2m into 3parts: 1. is exact, 2. quantity, 2. unit
          const regex = /(~?)(\d+(?:[.,]\d{2})?)\s*(\w*)/gm;
          const match = regex.exec(row.Anzahl);
          if (match) {
            buildingComponent.quantityExact = match[1] === '~';
            if (match[2]) {
              buildingComponent.quantity = +match[2]?.replace(',', '.');
            }
            if (match[3]) {
              buildingComponent.quantityUnit = parseQuantityUnit(match[3]);
            }
          }
        }
        if (row['mögliche InteressentInnen']) {
          buildingComponent.potentialInterests =
            row['mögliche InteressentInnen'];
        }
        buildingComponent.showInMatching = row.Aktiv === 'Aktiv';

        try {
          await this.em.persistAndFlush(buildingComponent);
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

        report.rowsImported++;
      }
    }
    return report;
  }

  @Transactional()
  async import(materialDepotId: string, rows: BuildingComponentCsvRow[]) {
    const report = new CsvImportReport();

    const materialsDepot = await this.em.findOneOrFail(MaterialsDepot, {
      id: materialDepotId,
    });

    for (const [index, row] of rows.entries()) {
      const buildingComponent = new BuildingComponent({ materialsDepot });
      // buildingComponent.name = row.Bauteilname;
      // buildingComponent.description = row.Beschreibung;
      // buildingComponent.reusePotential = parseReusePotential(
      //   row['Potenzial ReUse'],
      // );
      // buildingComponent.condition = parseCondition(row.Zustand);
      //
      // if (row.Bauteiltategorie) {
      //   const category = await this.em.findOne(Category, {
      //     name: { $eq: row.Bauteiltategorie.trim() },
      //   });
      //   if (!category) {
      //     this.logger.warn(
      //       `Category with name ${row.Bauteiltategorie} not found!`,
      //     );
      //     report.warnings.push({
      //       index,
      //       message: `Category ${row.Bauteiltategorie} not found!`,
      //     });
      //   } else {
      //     buildingComponent.category = category;
      //   }
      // }
      //
      // if (row.Menge) {
      //   buildingComponent.quantity = +row.Menge;
      // }
      // if (row['Bauteil ID']) {
      //   buildingComponent.componentId = row['Bauteil ID'];
      // }
      // if (row['CO2-Bilanz'] !== undefined) {
      //   buildingComponent.co2Savings = +row['CO2-Bilanz'];
      // }

      report.rowsImported++;
      this.em.persist(buildingComponent);
    }
    return report;
  }

  async import2(materialDepotId: string, rows: BuildingComponentCsvRow2[]) {
    const report = new CsvImportReport();

    const materialsDepot = await this.em.findOneOrFail(MaterialsDepot, {
      id: materialDepotId,
    });
    for (const [index, row] of rows.entries()) {
      const buildingComponent = new BuildingComponent({ materialsDepot });
      buildingComponent.externalId = row['Bauteil Nr.'];
      buildingComponent.description = setOrAppend(
        buildingComponent.description,
        row['Bauteil Nr.'],
        'Bauteilnummer',
      );
      if (row['eBKP-H']) {
        const category = await this.em.findOne(EbkphCategory, {
          description: { $eq: row['eBKP-H'].trim() },
        });
        if (category) {
          buildingComponent.ebkphCategory = category;
        } else {
          report.warnings.push({
            index,
            message: `eBKP-H Category ${row['eBKP-H']} not found!`,
          });
        }
      }
      if (row['Kategorie (zuklappen!)']) {
        const category = await this.em.findOne(Category, {
          name: { $eq: row['Kategorie (zuklappen!)'].trim() },
        });
        if (category) {
          buildingComponent.category = category;
        } else {
          report.warnings.push({
            index,
            message: `Category ${row['Kategorie (zuklappen!)']} not found!`,
          });
        }
      }
      buildingComponent.name = row.Bauteil;
      if (row.Spalte1) {
        buildingComponent.description = setOrAppend(
          buildingComponent.description,
          row.Spalte1,
          'Link',
        );
      }
      if (row.Masse) {
        buildingComponent.dimensionsNotes = row.Masse;
      }
      if (row.Beschreibung) {
        buildingComponent.description = setOrAppend(
          buildingComponent.description,
          row.Beschreibung,
        );
      }
      if (row.Menge) {
        const regex = /(ca\.|>)?\s*(\d+(?:[.,]\d{2})?)/gm;
        const match = regex.exec(row.Menge);
        if (match) {
          buildingComponent.quantityExact =
            match[1] === 'ca.' || match[1] === '>';
          if (match[2]) {
            buildingComponent.quantity = +match[2]?.replace(',', '.');
          }
        }
      }
      if (row.Einheit) {
        buildingComponent.quantityUnit = parseQuantityUnit(row.Einheit);
      }
      if (row.Baujahr) {
        const regex = /(\d{4})/gm;
        const match = regex.exec(row.Baujahr);
        if (match) {
          buildingComponent.constructionYear = +match[1];
        }
      }
      if (
        row['CO2 Einsparung total [kg]'] &&
        !isNaN(+row['CO2 Einsparung total [kg]'])
      ) {
        buildingComponent.co2Savings = +row['CO2 Einsparung total [kg]'];
      }
      if (row.Zustand) {
        const regex =
          /(?:\d\s*-\s*)?(mittel\/schlecht|gut|mittel|schlecht)\s*/gm;
        const match = regex.exec(row.Zustand);
        if (match) {
          buildingComponent.condition = parseCondition(match[1]);
        }
      }
      if (row.Schadstoffe) {
        const regex = /([1-9])\w?/gm;
        const match = regex.exec(row.Schadstoffe);
        if (match) {
          switch (match[1]) {
            case '2':
              buildingComponent.harmfulSubstances =
                HarmfulSubstances.suspectedPollutant;
              break;
            case '3':
              buildingComponent.harmfulSubstances = HarmfulSubstances.pollutant;
              break;
            case '9':
              buildingComponent.harmfulSubstances =
                HarmfulSubstances.noAssessment;
              break;
            default:
              buildingComponent.harmfulSubstances =
                HarmfulSubstances.noAssessment;
          }
        }
      }
      if (row['Potenzial ReUse']) {
        const regex =
          /(?:\d\s*-\s*)?(mittel\/niedrig|gut|mittel|schlecht)\s*\w?/gm;
        const match = regex.exec(row['Potenzial ReUse']);
        if (match) {
          buildingComponent.reusePotential = parseReusePotential(match[1]);
        }
      }
      if (row.Erläuterung) {
        buildingComponent.reusePotentialNotes = row.Erläuterung;
      }
      if (row['Verortung im Gebaude']) {
        buildingComponent.locationInBuilding = row['Verortung im Gebaude'];
      }
      if (row['Verfügbar für Zirkular']) {
        buildingComponent.showInMatching = true;
      }
      if (row['mögliche InteressentInnen']) {
        buildingComponent.potentialInterests = row['mögliche InteressentInnen'];
      }
      if (row['Interesse intern']) {
        buildingComponent.potentialInterests = setOrAppend(
          buildingComponent.potentialInterests,
          row['Interesse intern'],
          'Interesse intern',
        );
      }
      try {
        await this.em.persistAndFlush(buildingComponent);
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

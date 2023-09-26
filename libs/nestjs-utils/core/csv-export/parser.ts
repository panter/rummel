import { Express } from 'express';
import * as Papa from 'papaparse';
import { Readable } from 'stream';

export async function parseCsv<CsvRow>(
  importFile: Express.Multer.File,
): Promise<Papa.ParseResult<CsvRow>> {
  return new Promise((resolve, reject) => {
    Papa.parse(Readable.from(importFile.buffer), {
      header: true,
      complete: (results: Papa.ParseResult<CsvRow>) => {
        resolve(results);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}

export const setOrAppend = (
  value: string | undefined,
  newValue: string | undefined,
  prefix?: string,
) => {
  if (!newValue) {
    return;
  }
  if (!value) {
    return `${prefix ? `${prefix}: ` : ''}${newValue}`;
  }
  if (prefix) {
    return `${value}\n${prefix}: ${newValue}`;
  }
  return `${value}\n${newValue}`;
};

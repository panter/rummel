import { readFile } from 'fs/promises';

export const loadJson = async (fileName: string): Promise<any> =>
  JSON.parse(
    (await readFile(`./seeders/data/${fileName}.json`)).toString('utf-8'),
  );

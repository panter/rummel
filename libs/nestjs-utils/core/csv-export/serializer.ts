import { CsvSchema } from './types';
import { formatDate } from '../../common';

export function serialize<Entity extends object>(
  records: Entity[],
  schema: CsvSchema<Entity>,
) {
  return records.map((record) => {
    const serializedRecord: unknown[] = [];
    for (const key in schema) {
      const column = schema[key];
      const value = record[key as keyof Entity];
      if (!column || column.hidden) {
        continue;
      } else if (column.serializer instanceof Function) {
        serializedRecord.push(column.serializer(record));
      } else if (column.serializer === 'Boolean') {
        serializedRecord.push(value ? 'Ja' : 'Nein');
      } else if (column.serializer === 'Date') {
        serializedRecord.push(formatDate(value));
      } else {
        serializedRecord.push(value);
      }
    }
    return serializedRecord;
  });
}

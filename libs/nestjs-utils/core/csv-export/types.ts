export interface CsvSchemaColumn<Entity extends object> {
  /*
   * Defines the label of the column
   */
  label: string;
  /**
   * Defines a custom serializer for the column value
   */
  serializer?: ((record: Entity) => string | undefined) | 'Boolean' | 'Date';
  /**
   * When set to true, the column will not be exported
   */
  hidden?: boolean;
}

export type CsvSchema<Entity extends object> = Partial<
  Record<string, CsvSchemaColumn<Entity>>
>;

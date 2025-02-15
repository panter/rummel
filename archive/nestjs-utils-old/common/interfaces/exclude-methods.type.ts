export type ExcludeMethods<T> = Pick<
  T,
  { [K in keyof T]: T[K] extends (_: any) => any ? never : K }[keyof T]
>;

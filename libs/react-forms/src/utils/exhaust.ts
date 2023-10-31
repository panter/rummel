// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function exhaust(x: never): never {
  throw new Error('This should never be reached');
}

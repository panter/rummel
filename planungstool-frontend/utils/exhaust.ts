export function exhaust(_x: never): never {
  throw new Error('This should never be reached');
}

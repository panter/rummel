# @rummel/s1-crud

Example NestJS `@panter/crud` application with a PostgreSQL database.

Exposes full CRUD (FindOne, FindMany Connect, Create Update, Delete) endpoints for:

- [Autocomplete](./src/entities/autocomplete.entity.ts)
- [User](./src/entities/person.entity.ts)

## Getting Started

- `yarn`
- `yarn dev --filter=@rummel/s1-crud`
- Open http://localhost:3000/graphql

## Notes

- [nextjs-react-prisma-input](../nextjs-react-prisma-input) uses this sample as a backend.

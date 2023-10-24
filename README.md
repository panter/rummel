# Rummel

This is a monorepo managed by yarn workspaces powered by turborepo.

## Setup

### Start

```bash 
yarn
```

## Structure 

### Libs

Libs are publish to npm and can be used in other projects.

- [Lib Directory:](./libs)

### Samples

Samples are not published to npm and are used to show how to use the libs.
They can be checked out into you project and used as a starting point.

- [Sample Directory:](./samples)

### Demo
To start a demo with `@panter/crud` and `@panter/react-forms` run:

 - have a postgres db running:
   - host: 'localhost',
   - port: 5432,
   - dbName: 's1-crud',
   - password: 'postgres',
   - user: 'postgres',
- `yarn dev --filter=@rummel/s1-crud` -> http://localhost:3000/graphql
- `yarn dev --filter=@rummel/nextjs-react-prisma-input`: http://localhost:4010
- Goto http://localhost:4010

### Packages

This packages are needed to run the yarn workspace. These are not libraries but packages with scripts and chorse
for the workspace.

Packages Directory: [packages](./packages)

## Publish
### Publish Libraries

This repo uses [Changeset](https://github.com/changesets/changesets) and [Changeset Gitlab](https://github.com/un-ts/changesets-gitlab) for changes documentation, changelog generation, and release management. The needed access tokens are stored in the CI/CD variables.

__npm public:__
- [prism-inputs](https://git.panter.ch/rummel/rummel/-/tree/main/libs/prisma-inputs)
- [crud](https://git.panter.ch/rummel/rummel/-/tree/main/libs/crud)


## Notes

- [A patch](https://github.com/ds300/patch-packag) for [Changeset]https://github.com/atlassian/changesets) has been applied because of a [known issue in changeset](https://github.com/changesets/changesets/issues/906). As soon as the issue is fixed, the patch can be removed. -> https://git.panter.ch/rummel/rummel/-/issues/22

## Links
- https://www.notion.so/panterch/Notes-bb32ae412c3949c1961eb1c75cb9f262?pvs=4


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

- Lib Directory: [s1-crud](./libs)
### Samples

Samples are not published to npm and are used to show how to use the libs.
They can be checked out into you project and used as a starting point.

- Sample Directory: [s1-crud](./samples)

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

### Published Libraries

__npm public:__
- [prism-inputs](https://git.panter.ch/rummel/rummel/-/tree/main/libs/prisma-inputs)
- [crud](https://git.panter.ch/rummel/rummel/-/tree/main/libs/crud)

### How to publish a new version of a lib.

[We use the npm package changesets to manage our releases.](https://github.com/changesets/changesets/blob/main/docs/adding-a-changeset.md)

If you want to include you changes in the next release, you have to create a changeset:

- Run the command line script npx changeset or yarn changeset.

- Select the packages you want to include in the changeset using ↑ and ↓ to navigate to packages, and space to select a package. Hit enter when all desired packages are selected.

- You will be prompted to select a bump type for each selected package. Select an appropriate bump type for the changes made. See here for information on semver versioning

- Your final prompt will be to provide a message to go alongside the changeset. This will be written into the changelog when the next release occurs.

## Links
- https://www.notion.so/panterch/Notes-bb32ae412c3949c1961eb1c75cb9f262?pvs=4


## Deprecated Setup infos

## Gitlab CI

Add this to your `.yarnrm.yml` if you need to use the `@rummel` scope.

```
npmScopes:
  rummel:
    npmRegistryServer: https://git.panter.ch/api/v4/projects/1443/packages/npm
    npmAlwaysAuth: true
    npmAuthToken: ${GITLAB_AUTH_TOKEN}

```

### gitlab registry config

To utilize the GitLab registry, ensure you've set up the environment variable named `GITLAB_AUTH_TOKEN`. This variable should be assigned your [GitLab personal access token](https://git.panter.ch/-/profile/personal_access_tokens), which must have the following scopes:

- `read_api`
- `read_registry`
- `write_registry`


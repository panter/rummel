# Rummel

This is a monorepo managed by yarn workspaces powered by turborepo.

## Setup

### Start

```bash 
yarn
```


### Publish

The packages `prisma-inputs` and `crud` are published from our local machines for now.

## Stucture

### Publish Libraries

__npm public:__
- [prism-inputs](https://git.panter.ch/rummel/rummel/-/tree/main/libs/prisma-inputs)
- [crud](https://git.panter.ch/rummel/rummel/-/tree/main/libs/crud)


### Samples

__s1-crud:__
- [s1-crud](https://git.panter.ch/rummel/rummel/-/tree/main/samples/s1-crud)

This small sample shows how to use the `crud` library to create a simple crud application.

- `yarn dev`: starts the dev server on port 3000

### Packages
This packages are needed to run the yarn workspace. These are not libraries but packages with scripts and chorse
for the workspace.


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


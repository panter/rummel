# Rummel

This is a monorepo managed by yarn workspaces powered by turborepo.

## Setup

### gitlab registry config

To utilize the GitLab registry, ensure you've set up the environment variable named `GITLAB_AUTH_TOKEN`. This variable should be assigned your [GitLab personal access token](https://git.panter.ch/-/profile/personal_access_tokens), which must have the following scopes:

- `read_api`
- `read_registry`
- `write_registry`

### Start

```bash 
yarn
```

## Gitlab CI

Add this to your `.yarnrm.yml` if you need to use the `@rummel` scope.

```
npmScopes:
  rummel:
    npmRegistryServer: https://git.panter.ch/api/v4/projects/1443/packages/npm
    npmAlwaysAuth: true
    npmAuthToken: ${GITLAB_AUTH_TOKEN}

```

## Stucture

### Publish Libraries

__npm public:__
- [prism-inputs](https://git.panter.ch/rummel/rummel/-/tree/main/libs/prisma-inputs)
- [crud](https://git.panter.ch/rummel/rummel/-/tree/main/libs/crud)

### Packages
This packages are needed to run the yarn workspace. These are not libraries but packages with scripts and chorse
for the workspace.


## Links
- https://www.notion.so/panterch/Notes-bb32ae412c3949c1961eb1c75cb9f262?pvs=4

import type { Config, DeployConfigCloudRun } from '@catladder/pipeline';

const DEPLOY_BASE: DeployConfigCloudRun = {
  type: 'google-cloudrun',
  projectId: 'rummel',
  region: 'europe-west6',
};

const config: Config = {
  customerName: 'rummel',
  appName: 'rummel',
  components: {
    'prisma-inputs': {
      dir: 'libs/prisma-inputs',
      build: {
        type: 'node',
        buildCommand: 'npx turbo build --filter=./',
        test: {
          command: 'npx turbo test --filter=./',
        },
        lint: {
          command: 'npx turbo lint --filter=./',
        },
        artifactsPaths: ['dist'],
      },
      deploy: false,
    },

    crud: {
      dir: 'libs/crud',
      build: {
        type: 'node',
        buildCommand: 'npx turbo build --filter=./',
        test: {
          command: 'npx turbo test --filter=./',
        },
        lint: {
          command: 'npx turbo lint --filter=./',
        },
      },
      deploy: false,
    },
  },
};

export default config;

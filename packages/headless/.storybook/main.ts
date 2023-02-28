import type { StorybookConfig } from 'storybook-framework-qwik';
import type { UserConfig } from 'vite';

import { mergeConfig } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import { qwikNxVite } from 'qwik-nx/plugins';
import { qwikVite } from '@builder.io/qwik/optimizer';

const config: StorybookConfig = {
  core: {
    builder: '@storybook/builder-vite',
    disableTelemetry: true,
  },
  framework: 'storybook-framework-qwik',
  stories: [
    '../src/**/*.docs.mdx',
    '../src/**/*.stories.tsx',
    '../src/**/*.mdx',
  ],
  addons: ['@storybook/addon-essentials'],
  viteFinal: async (config: UserConfig) => {
    return mergeConfig(config, {
      server: {
        fs: {
          // Allow serving files from the project root
          allow: ['../../'],
        },
      },
      plugins: [
        qwikNxVite(),
        viteTsConfigPaths({
          projects: ['.storybook/tsconfig.json'],
        }),
        qwikVite(),
      ],
    });
  },
};

export default config;

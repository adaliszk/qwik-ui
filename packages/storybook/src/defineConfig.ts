import type { StorybookConfig } from 'storybook-framework-qwik';
import type { UserConfig } from 'vite';

import compileTypescriptPaths from 'vite-tsconfig-paths';
import { qwikVite } from '@builder.io/qwik/optimizer';

export interface CustomConfig extends StorybookConfig {
  /**
   * Configure custom base path to your documentation files
   * @default docs
   */
  docsDir?: string;

  /**
   * Configure custom base path to look stories for
   * @default src
   */
  storiesDir?: string;

  /**
   * Path to your TSConfig file
   * @default tsconfig.json
   */
  tsconfig?: string;

  /**
   * Set watching mode for Vite
   * @default fsevents
   */
  watchMode?: 'fsevents' | 'polling';

  /**
   * Sets the port on which Vite serves the resources
   * This should be the same port you are using with storybook cli!
   *
   * @default 6006
   */
  port?: number;

  /**
   *
   */
  vite?: UserConfig;
}

/**
 * Configure storybook to serve a Qwik project and allow custom overwrites. By default, it will read all of your stories
 * in `docs` and `src` folders, and serve the UI on 6006.
 *
 * Usage:
 * ```typescript
 * // .storybook/main.ts
 * import { defineConfig } from "@qwik-ui/storybook";
 *
 * export default defineConfig();
 * ```
 *
 * @param {StorybookConfig} customConfig
 * @return {StorybookConfig}
 */
export function defineConfig(customConfig?: CustomConfig): StorybookConfig {
  return {
    stories: [
      `${customConfig?.docsDir ?? 'docs'}/**/*.stories.@(js|jsx|ts|tsx)`,
      `${customConfig?.docsDir ?? 'docs'}/**/*.mdx`,
      `${customConfig?.storiesDir ?? 'src'}/**/*.stories.@(js|jsx|ts|tsx)`,
      `${customConfig?.storiesDir ?? 'src'}/**/*.mdx`,
    ],
    framework: {
      name: 'storybook-framework-qwik',
      options: {},
    },
    addons: [
      '@storybook/addon-links',
      '@storybook/addon-essentials',
      '@storybook/addon-storysource',
      '@storybook/addon-a11y',
    ],
    docs: {
      defaultName: 'Overview',
      autodocs: 'tag',
    },
    ...(customConfig ?? {}),
    viteFinal(config: UserConfig) {
      // Extend the custom configuration with the storybook generated one
      config = { ...(customConfig?.vite ?? {}), ...config };

      // Add necessary plugins
      config.plugins?.unshift(
        compileTypescriptPaths({
          projects: [customConfig?.tsconfig ?? 'tsconfig.json'],
        })
      );
      config.plugins?.unshift(qwikVite());

      // Configure the development server
      config.server = customConfig?.vite.server ?? {};
      config.server.port =
        customConfig?.port ?? customConfig?.vite.server?.port ?? 6006;

      // Configure watch mode, and as a default use fsevents
      config.server.watch = { useFsEvents: true };
      if (customConfig?.watchMode == 'polling')
        config.server.watch = { usePolling: true, interval: 3000 };

      return config;
    },
  };
}

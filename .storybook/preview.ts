// noinspection JSUnusedGlobalSymbols

import customTheme from './theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    disabled: true,
    matchers: {
      color: /color|background/i,
      date: /date/i,
    },
  },
  layout: 'centered',
  theme: customTheme,
  docs: {
    theme: customTheme,
  },
  viewMode: 'docs',
  previewTabs: {
    canvas: { hidden: true },
  },
};

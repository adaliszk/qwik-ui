import { addons } from '@storybook/manager-api';
import customTheme from './theme';
import './theme.css';

addons.setConfig({
  theme: customTheme,
  toolbar: {
    title: { hidden: false },
    grid: { hidden: true },
    outline: { hidden: true },
    fullscreen: { hidden: true },
  },
});

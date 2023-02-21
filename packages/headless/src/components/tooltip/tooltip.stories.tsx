// noinspection JSUnusedGlobalSymbols

import { Meta, StoryObj } from 'storybook-framework-qwik';
import { Tooltip, TooltipProps } from './tooltip';

export default {
  title: 'Headless/Tooltip',
} as Meta<TooltipProps>;

export const Primary: StoryObj<TooltipProps> = {
  args: {
    content: 'Hi there',
  },
  render: (args) => (
    <Tooltip {...args}>
      <button>Hello</button>
    </Tooltip>
  ),
};

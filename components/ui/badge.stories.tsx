import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { children: 'PRO' },
};

export const Secondary: Story = {
  args: { children: 'Trial — 12 dias', variant: 'secondary' },
};

export const Outline: Story = {
  args: { children: 'Seguro incluso', variant: 'outline' },
};

export const Destructive: Story = {
  args: { children: 'Acima da capacidade', variant: 'destructive' },
};

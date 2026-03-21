import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './button';
import { Truck, Plus, ArrowRight } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'xs', 'sm', 'lg', 'icon'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: 'Solicitar Cotação' },
};

export const Outline: Story = {
  args: { children: 'Cancelar', variant: 'outline' },
};

export const Secondary: Story = {
  args: { children: 'Adicionar Item', variant: 'secondary' },
};

export const Destructive: Story = {
  args: { children: 'Remover Mudança', variant: 'destructive' },
};

export const WithIcon: Story = {
  args: { children: <><Truck /> Ver Caminhões</> },
};

export const IconOnly: Story = {
  args: { children: <Plus />, size: 'icon' },
};

export const Large: Story = {
  args: { children: <><ArrowRight /> Começar Mudança</>, size: 'lg' },
};

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';
import { Button } from './button';
import { Badge } from './badge';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const CotacaoCard: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>TransMudar Express</CardTitle>
        <CardDescription>São Paulo, SP — Nota 4.8 ⭐</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">R$ 850,00</span>
          <Badge>Seguro incluso</Badge>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Disponível em 25/03/2026 — Caminhão 3/4
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Solicitar</Button>
      </CardFooter>
    </Card>
  ),
};

export const ResumoMudanca: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>Resumo da Carga</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Volume total</span>
          <span className="font-medium">8.5 m³</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Peso estimado</span>
          <span className="font-medium">420 kg</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Ocupação</span>
          <span className="font-medium text-amber-500">72%</span>
        </div>
      </CardContent>
    </Card>
  ),
};

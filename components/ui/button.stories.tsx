import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './button';
import {
  Truck,
  Plus,
  ArrowRight,
  Trash2,
  Download,
  Loader2,
  Mail,
  Check,
  X,
  Search,
  Settings,
  Heart,
  Share2,
  ChevronDown,
  Package,
} from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'Estilo visual do botao',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['default', 'xs', 'sm', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'],
      description: 'Tamanho do botao',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Estado desabilitado',
    },
    asChild: {
      control: 'boolean',
      description: 'Renderiza como elemento filho (Slot)',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      control: 'text',
      description: 'Conteudo do botao',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Componente Button do MudaFacil. Baseado em shadcn/ui com variantes e tamanhos customizados para o design system do produto.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ============================================
// PLAYGROUND
// ============================================
export const Playground: Story = {
  args: {
    children: 'Solicitar Cotacao',
    variant: 'default',
    size: 'default',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Use os controles abaixo para experimentar todas as combinacoes de variant, size, disabled e conteudo.',
      },
    },
  },
};

// ============================================
// TODAS AS VARIANTES
// ============================================
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="default">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'As 6 variantes disponíveis: `default` (primary azul), `secondary`, `destructive`, `outline`, `ghost` e `link`.',
      },
    },
  },
};

// ============================================
// TODOS OS TAMANHOS
// ============================================
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-4">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Os 4 tamanhos de botao com texto: `xs`, `sm`, `default` e `lg`.',
      },
    },
  },
};

// ============================================
// ICON BUTTONS - TODOS OS TAMANHOS
// ============================================
export const IconSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-4">
      <Button size="icon-xs"><Plus /></Button>
      <Button size="icon-sm"><Plus /></Button>
      <Button size="icon"><Plus /></Button>
      <Button size="icon-lg"><Plus /></Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Botoes de icone quadrados: `icon-xs`, `icon-sm`, `icon` e `icon-lg`.',
      },
    },
  },
};

// ============================================
// COM ICONES
// ============================================
export const WithLeadingIcon: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button><Truck /> Ver Caminhoes</Button>
      <Button variant="outline"><Search /> Buscar Itens</Button>
      <Button variant="secondary"><Package /> Catalogo</Button>
      <Button variant="destructive"><Trash2 /> Remover</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Botoes com icone a esquerda do texto. O componente aplica gap automaticamente.',
      },
    },
  },
};

export const WithTrailingIcon: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button>Proxima Etapa <ArrowRight /></Button>
      <Button variant="outline">Download <Download /></Button>
      <Button variant="secondary">Opcoes <ChevronDown /></Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Botoes com icone a direita do texto.',
      },
    },
  },
};

// ============================================
// ESTADOS
// ============================================
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button disabled>Primary</Button>
      <Button variant="secondary" disabled>Secondary</Button>
      <Button variant="destructive" disabled>Destructive</Button>
      <Button variant="outline" disabled>Outline</Button>
      <Button variant="ghost" disabled>Ghost</Button>
      <Button variant="link" disabled>Link</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Todas as variantes no estado `disabled`. Opacidade reduzida e pointer-events desativado.',
      },
    },
  },
};

export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button disabled><Loader2 className="animate-spin" /> Carregando...</Button>
      <Button variant="outline" disabled><Loader2 className="animate-spin" /> Salvando...</Button>
      <Button variant="secondary" disabled><Loader2 className="animate-spin" /> Processando...</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Padrao de loading: combine `disabled` com icone `Loader2` animado.',
      },
    },
  },
};

// ============================================
// ICON BUTTONS COM VARIANTES
// ============================================
export const IconVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="icon" variant="default"><Plus /></Button>
      <Button size="icon" variant="secondary"><Settings /></Button>
      <Button size="icon" variant="outline"><Search /></Button>
      <Button size="icon" variant="destructive"><Trash2 /></Button>
      <Button size="icon" variant="ghost"><Heart /></Button>
      <Button size="icon" variant="ghost"><Share2 /></Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Botoes de icone com diferentes variantes. Ideais para toolbars e acoes compactas.',
      },
    },
  },
};

// ============================================
// CASOS DE USO DO MUDAFACIL
// ============================================
export const ProductExamples: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-3">Acoes principais</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="lg"><ArrowRight /> Planejar Minha Mudanca</Button>
          <Button><Plus /> Nova Mudanca</Button>
          <Button variant="outline"><Mail /> Solicitar Cotacao</Button>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-3">Acoes secundarias</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="secondary"><Package /> Adicionar Item</Button>
          <Button variant="outline"><Truck /> Trocar Caminhao</Button>
          <Button variant="ghost" size="sm"><Settings /> Configuracoes</Button>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-3">Acoes destrutivas</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="destructive"><Trash2 /> Remover Mudanca</Button>
          <Button variant="outline" className="text-destructive hover:text-destructive"><X /> Cancelar Cotacao</Button>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-3">Estados de feedback</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button disabled><Loader2 className="animate-spin" /> Salvando carga...</Button>
          <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50"><Check /> Salvo com sucesso</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Exemplos reais de como os botoes sao usados dentro do MudaFacil, agrupados por tipo de acao.',
      },
    },
  },
};

// ============================================
// FULL WIDTH
// ============================================
export const FullWidth: Story = {
  render: () => (
    <div className="max-w-sm space-y-3">
      <Button className="w-full">Comecar Gratuitamente</Button>
      <Button variant="outline" className="w-full">Ja tenho uma conta</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Botoes com largura total. Usado em modais, formularios e telas de login.',
      },
    },
  },
};

// ============================================
// MATRIX: VARIANTE x TAMANHO
// ============================================
export const VariantSizeMatrix: Story = {
  render: () => {
    const variants = ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'] as const;
    const sizes = ['xs', 'sm', 'default', 'lg'] as const;

    return (
      <div className="overflow-x-auto">
        <table className="border-collapse">
          <thead>
            <tr>
              <th className="p-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide border-b">
                Variant / Size
              </th>
              {sizes.map((size) => (
                <th key={size} className="p-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wide border-b">
                  {size}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {variants.map((variant) => (
              <tr key={variant}>
                <td className="p-3 text-sm font-mono text-muted-foreground border-b">{variant}</td>
                {sizes.map((size) => (
                  <td key={size} className="p-3 text-center border-b">
                    <Button variant={variant} size={size}>
                      Label
                    </Button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Matriz completa de todas as combinacoes de variante x tamanho. Referencia visual do design system.',
      },
    },
  },
};

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta = {
  title: 'Foundations/Colors',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Tokens de cor do MudaFacil. Todos definidos como CSS custom properties em `globals.css`. Alterar os valores la atualiza automaticamente o site, o dashboard e o Storybook.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// ============================================
// HELPER COMPONENT
// ============================================
function ColorSwatch({
  name,
  cssVar,
  hex,
  desc,
  textClass = 'text-foreground',
}: {
  name: string;
  cssVar: string;
  hex: string;
  desc: string;
  textClass?: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div
        className="w-16 h-16 rounded-lg border shadow-sm shrink-0"
        style={{ backgroundColor: `var(${cssVar})` }}
      />
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground">{name}</p>
        <p className="text-xs font-mono text-muted-foreground">{cssVar}</p>
        <p className="text-xs font-mono text-muted-foreground">{hex}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

function ColorPair({
  name,
  bgVar,
  fgVar,
  bgHex,
  fgHex,
  desc,
}: {
  name: string;
  bgVar: string;
  fgVar: string;
  bgHex: string;
  fgHex: string;
  desc: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div
        className="w-16 h-16 rounded-lg border shadow-sm shrink-0 flex items-center justify-center text-xs font-semibold"
        style={{
          backgroundColor: `var(${bgVar})`,
          color: `var(${fgVar})`,
        }}
      >
        Aa
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground">{name}</p>
        <p className="text-xs font-mono text-muted-foreground">bg: {bgVar} ({bgHex})</p>
        <p className="text-xs font-mono text-muted-foreground">fg: {fgVar} ({fgHex})</p>
        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

// ============================================
// BRAND COLORS
// ============================================
export const BrandColors: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Cores da Marca</h3>
        <p className="text-sm text-muted-foreground mb-6">
          As tres cores fundamentais do MudaFacil: laranja marca, fundo neutro e azul marinho profundo.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="w-full h-24 rounded-xl shadow-md" style={{ backgroundColor: '#F37021' }} />
            <div>
              <p className="text-sm font-semibold">Primary — Laranja Marca</p>
              <p className="text-xs font-mono text-muted-foreground">#F37021</p>
              <p className="text-xs text-muted-foreground mt-1">CTAs, links, destaques, botoes principais</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="w-full h-24 rounded-xl border shadow-md" style={{ backgroundColor: '#F8FAFC' }} />
            <div>
              <p className="text-sm font-semibold">Background — Cinza Neutro</p>
              <p className="text-xs font-mono text-muted-foreground">#F8FAFC</p>
              <p className="text-xs text-muted-foreground mt-1">Fundo de paginas, secoes alternadas</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="w-full h-24 rounded-xl shadow-md" style={{ backgroundColor: '#1B1660' }} />
            <div>
              <p className="text-sm font-semibold">Navy — Azul Marinho Profundo</p>
              <p className="text-xs font-mono text-muted-foreground">#1B1660</p>
              <p className="text-xs text-muted-foreground mt-1">Badges, kickers, selo "Popular", destaques escuros</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'As 3 cores de marca do MudaFacil definidas no CLAUDE.md: Primary #F37021, Background #F8FAFC, Navy #1B1660.',
      },
    },
  },
};

// ============================================
// PRIMARY PALETTE
// ============================================
export const PrimaryPalette: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Escala Primary (Laranja)</h3>
      <p className="text-sm text-muted-foreground">
        Usada em CTAs, links, barras de progresso e elementos interativos.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { name: 'Primary / 5%', bg: '#F370210D', hex: '#F37021/5%', usage: 'Hover backgrounds' },
          { name: 'Primary / 10%', bg: '#F370211A', hex: '#F37021/10%', usage: 'Icone backgrounds' },
          { name: 'Primary / 20%', bg: '#F3702133', hex: '#F37021/20%', usage: 'Canvas items' },
          { name: 'Primary / 30%', bg: '#F370214D', hex: '#F37021/30%', usage: 'Borders dashed' },
          { name: 'Primary', bg: '#F37021', hex: '#F37021', usage: 'Botoes, links' },
          { name: 'Primary Hover', bg: '#D85E1A', hex: '#D85E1A', usage: 'Hover de CTAs' },
          { name: 'Orange Dark Text', bg: '#9A4510', hex: '#9A4510', usage: 'Texto sobre bg laranja claro' },
          { name: 'Primary Foreground', bg: '#FFFFFF', hex: '#FFFFFF', usage: 'Texto sobre primary' },
        ].map((c) => (
          <div key={c.name} className="space-y-2">
            <div
              className="w-full h-16 rounded-lg border shadow-sm"
              style={{ backgroundColor: c.bg }}
            />
            <p className="text-xs font-semibold text-foreground">{c.name}</p>
            <p className="text-xs font-mono text-muted-foreground">{c.hex}</p>
            <p className="text-xs text-muted-foreground">{c.usage}</p>
          </div>
        ))}
      </div>
    </div>
  ),
};

// ============================================
// SEMANTIC TOKENS
// ============================================
export const SemanticTokens: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Tokens Semanticos</h3>
      <p className="text-sm text-muted-foreground">
        CSS custom properties que mudam automaticamente entre light e dark mode.
        Usar estes tokens garante consistencia em todo o produto.
      </p>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Backgrounds</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ColorSwatch name="Background" cssVar="--background" hex="#F8FAFC" desc="Fundo principal de paginas" />
          <ColorSwatch name="Card" cssVar="--card" hex="#FFFFFF" desc="Fundo de cards e paineis" />
          <ColorSwatch name="Popover" cssVar="--popover" hex="#FFFFFF" desc="Fundo de dropdowns e tooltips" />
          <ColorSwatch name="Muted" cssVar="--muted" hex="#F5F5F5" desc="Fundo de areas secundarias, inputs inativos" />
          <ColorSwatch name="Secondary" cssVar="--secondary" hex="#F5F5F5" desc="Fundo de botoes secondary" />
          <ColorSwatch name="Accent" cssVar="--accent" hex="oklch(0.96 0.02 60)" desc="Fundo sutil para hover de ghost/outline" />
        </div>
      </div>

      <div className="space-y-3 mt-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Textos</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ColorSwatch name="Foreground" cssVar="--foreground" hex="#1A1A1A" desc="Texto principal, headings" />
          <ColorSwatch name="Muted Foreground" cssVar="--muted-foreground" hex="#737373" desc="Texto secundario, descricoes" />
          <ColorSwatch name="Card Foreground" cssVar="--card-foreground" hex="#1A1A1A" desc="Texto dentro de cards" />
          <ColorSwatch name="Accent Foreground" cssVar="--accent-foreground" hex="#1A1A1A" desc="Texto sobre fundo accent" />
        </div>
      </div>

      <div className="space-y-3 mt-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Bordas & Inputs</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ColorSwatch name="Border" cssVar="--border" hex="#E5E5E5" desc="Bordas de cards, divisores" />
          <ColorSwatch name="Input" cssVar="--input" hex="#E5E5E5" desc="Bordas de inputs e selects" />
          <ColorSwatch name="Ring" cssVar="--ring" hex="#A3A3A3" desc="Focus ring de elementos interativos" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tokens semanticos do design system. Sao CSS custom properties que adaptam entre light/dark mode.',
      },
    },
  },
};

// ============================================
// CTA & INTERACTION COLORS
// ============================================
export const CTAColors: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Cores de CTA & Interacao</h3>
      <p className="text-sm text-muted-foreground">
        Cores usadas em botoes, links e elementos interativos do produto.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <ColorPair
          name="CTA Primary"
          bgVar="--primary"
          fgVar="--primary-foreground"
          bgHex="#F37021"
          fgHex="#FFFFFF"
          desc="Botao principal: Planejar Mudanca, Comecar Gratis"
        />
        <ColorPair
          name="CTA Secondary"
          bgVar="--secondary"
          fgVar="--secondary-foreground"
          bgHex="#F5F5F5"
          fgHex="#333333"
          desc="Botao secundario: Adicionar Item, Catalogo"
        />
        <ColorPair
          name="CTA Destructive"
          bgVar="--destructive"
          fgVar="--primary-foreground"
          bgHex="#DC2626"
          fgHex="#FFFFFF"
          desc="Botao destrutivo: Remover Mudanca, Cancelar"
        />
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-lg border-2 shadow-sm shrink-0 flex items-center justify-center text-xs font-semibold"
            style={{
              backgroundColor: 'transparent',
              borderColor: 'var(--border)',
              color: 'var(--foreground)',
            }}
          >
            Aa
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">CTA Outline</p>
            <p className="text-xs font-mono text-muted-foreground">bg: transparent</p>
            <p className="text-xs font-mono text-muted-foreground">border: --border (#E5E5E5)</p>
            <p className="text-xs text-muted-foreground mt-0.5">Botao outline: Ver Precos, Cancelar</p>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Em contexto</p>
        <div className="flex flex-wrap gap-3">
          <button className="bg-primary text-primary-foreground font-medium py-2 px-4 rounded-md text-sm">
            Planejar Mudanca
          </button>
          <button className="bg-secondary text-secondary-foreground font-medium py-2 px-4 rounded-md text-sm">
            Adicionar Item
          </button>
          <button className="bg-destructive text-white font-medium py-2 px-4 rounded-md text-sm">
            Remover
          </button>
          <button className="border border-border bg-background text-foreground font-medium py-2 px-4 rounded-md text-sm">
            Ver Precos
          </button>
          <button className="text-primary font-medium py-2 px-4 text-sm underline underline-offset-4">
            Saiba mais
          </button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Cores de Call to Action com pares bg/fg corretos. Mostra como cada variante de botao aparece.',
      },
    },
  },
};

// ============================================
// FEEDBACK & STATUS
// ============================================
export const FeedbackColors: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Cores de Feedback & Status</h3>
      <p className="text-sm text-muted-foreground">
        Cores usadas para comunicar estados, alertas e feedback ao usuario.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          {
            name: 'Sucesso',
            bg: '#22c55e',
            bgLight: '#22c55e1A',
            border: '#22c55e66',
            text: '#15803d',
            usage: 'Mudanca confirmada, item salvo',
            sample: 'Carga salva com sucesso',
          },
          {
            name: 'Alerta / Navy',
            bg: '#1B1660',
            bgLight: '#1B16601A',
            border: '#1B166066',
            text: '#1B1660',
            usage: 'Trial expirando, capacidade alta',
            sample: 'Ocupacao acima de 80%',
          },
          {
            name: 'Erro / Destructive',
            bg: '#DC2626',
            bgLight: '#DC26261A',
            border: '#DC262666',
            text: '#991b1b',
            usage: 'Erro, capacidade excedida, remocao',
            sample: 'Capacidade do caminhao excedida',
          },
          {
            name: 'Informacao / Primary',
            bg: '#F37021',
            bgLight: '#F370211A',
            border: '#F3702166',
            text: '#9A4510',
            usage: 'Dica, progresso, ocupacao normal',
            sample: '3 cotacoes disponiveis',
          },
        ].map((c) => (
          <div key={c.name} className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg shadow-sm" style={{ backgroundColor: c.bg }} />
              <div>
                <p className="text-sm font-semibold text-foreground">{c.name}</p>
                <p className="text-xs font-mono text-muted-foreground">{c.bg}</p>
              </div>
            </div>
            <div
              className="rounded-lg px-4 py-3 text-sm font-medium"
              style={{
                backgroundColor: c.bgLight,
                borderLeft: `3px solid ${c.bg}`,
                color: c.text,
              }}
            >
              {c.sample}
            </div>
            <p className="text-xs text-muted-foreground">{c.usage}</p>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Cores de feedback: sucesso (verde), alerta (navy), erro (vermelho) e informacao (laranja). Mostradas em contexto de banner.',
      },
    },
  },
};

// ============================================
// CHART COLORS
// ============================================
export const ChartColors: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Cores de Graficos</h3>
      <p className="text-sm text-muted-foreground">
        Paleta para visualizacoes de dados, graficos e barras de progresso.
      </p>
      <div className="grid grid-cols-5 gap-4">
        {[
          { name: 'Chart 1', cssVar: '--chart-1', desc: 'Cor principal de graficos' },
          { name: 'Chart 2', cssVar: '--chart-2', desc: 'Segunda serie' },
          { name: 'Chart 3', cssVar: '--chart-3', desc: 'Terceira serie' },
          { name: 'Chart 4', cssVar: '--chart-4', desc: 'Quarta serie' },
          { name: 'Chart 5', cssVar: '--chart-5', desc: 'Quinta serie' },
        ].map((c) => (
          <div key={c.name} className="space-y-2 text-center">
            <div
              className="w-full h-20 rounded-lg shadow-sm"
              style={{ backgroundColor: `var(${c.cssVar})` }}
            />
            <p className="text-xs font-semibold text-foreground">{c.name}</p>
            <p className="text-xs font-mono text-muted-foreground">{c.cssVar}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Em contexto — Barra de ocupacao</p>
        <div className="max-w-md space-y-3">
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Caminhao 3/4 — 68%</span>
              <span className="font-semibold text-primary">Normal</span>
            </div>
            <div className="h-3 w-full rounded-full bg-muted">
              <div className="h-3 rounded-full bg-primary" style={{ width: '68%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Caminhao HR — 85%</span>
              <span className="font-semibold" style={{ color: '#1B1660' }}>Atencao</span>
            </div>
            <div className="h-3 w-full rounded-full bg-muted">
              <div className="h-3 rounded-full" style={{ width: '85%', backgroundColor: '#1B1660' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Fiorino — 112%</span>
              <span className="font-semibold text-destructive">Excedido</span>
            </div>
            <div className="h-3 w-full rounded-full bg-muted">
              <div className="h-3 rounded-full bg-destructive" style={{ width: '100%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Cores de graficos (chart-1 a chart-5) e exemplo de barras de ocupacao com estados normal, atencao e excedido.',
      },
    },
  },
};

// ============================================
// SIDEBAR COLORS
// ============================================
export const SidebarColors: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Cores da Sidebar</h3>
      <p className="text-sm text-muted-foreground">
        Tokens especificos para a sidebar do dashboard.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ColorSwatch name="Sidebar Background" cssVar="--sidebar" hex="#FAFAFA" desc="Fundo da sidebar" />
        <ColorSwatch name="Sidebar Foreground" cssVar="--sidebar-foreground" hex="#1A1A1A" desc="Texto da sidebar" />
        <ColorSwatch name="Sidebar Primary" cssVar="--sidebar-primary" hex="#333333" desc="Item ativo" />
        <ColorSwatch name="Sidebar Accent" cssVar="--sidebar-accent" hex="#F5F5F5" desc="Hover em itens" />
        <ColorSwatch name="Sidebar Border" cssVar="--sidebar-border" hex="#E5E5E5" desc="Divisores da sidebar" />
        <ColorSwatch name="Sidebar Ring" cssVar="--sidebar-ring" hex="#A3A3A3" desc="Focus ring sidebar" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tokens dedicados a sidebar do dashboard, isolados para permitir customizacao independente.',
      },
    },
  },
};

// ============================================
// HARDCODED COLORS (LANDING PAGE)
// ============================================
export const LandingPageColors: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Cores Hardcoded — Landing Page</h3>
      <p className="text-sm text-muted-foreground">
        Cores usadas diretamente na landing page com valores hex. Derivadas da paleta principal.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { name: 'Primary', hex: '#F37021', usage: 'CTAs, icones, links' },
          { name: 'Primary Hover', hex: '#D85E1A', usage: 'Hover de botoes' },
          { name: 'Orange Dark Text', hex: '#9A4510', usage: 'Texto em bg laranja claro' },
          { name: 'Primary Text', hex: '#FFFFFF', usage: 'Texto em botoes primary' },
          { name: 'Navy', hex: '#1B1660', usage: 'Badges, kickers, selo Popular' },
          { name: 'Navy Light', hex: '#2A2578', usage: 'Hover de elementos navy' },
          { name: 'Background', hex: '#F8FAFC', usage: 'Fundo de secoes' },
          { name: 'Surface', hex: '#FFFFFF', usage: 'Cards, paineis, inputs' },
          { name: 'Success', hex: '#22c55e', usage: 'Confirmacao, salvo' },
          { name: 'Gray 50', hex: '#F9FAFB', usage: 'Backgrounds alternativos' },
          { name: 'Gray 400', hex: '#9CA3AF', usage: 'Icones inativos' },
          { name: 'Gray 600', hex: '#4B5563', usage: 'Texto body' },
          { name: 'Gray 900', hex: '#111827', usage: 'Headings' },
          { name: 'Red 400', hex: '#F87171', usage: 'Browser dot' },
          { name: 'Yellow 400', hex: '#FACC15', usage: 'Browser dot' },
          { name: 'Green 400', hex: '#4ADE80', usage: 'Browser dot' },
        ].map((c) => (
          <div key={c.name} className="space-y-2">
            <div
              className="w-full h-14 rounded-lg border shadow-sm"
              style={{ backgroundColor: c.hex }}
            />
            <p className="text-xs font-semibold text-foreground">{c.name}</p>
            <p className="text-xs font-mono text-muted-foreground">{c.hex}</p>
            <p className="text-xs text-muted-foreground">{c.usage}</p>
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Todas as cores usadas na landing page, incluindo variantes de gray do Tailwind e cores de apoio.',
      },
    },
  },
};

// ============================================
// FULL TOKEN MAP
// ============================================
export const FullTokenMap: Story = {
  render: () => {
    const tokens = [
      { section: 'Backgrounds', items: [
        { token: '--background', role: 'Fundo de pagina' },
        { token: '--card', role: 'Fundo de cards' },
        { token: '--popover', role: 'Fundo de popovers' },
        { token: '--muted', role: 'Fundo muted' },
        { token: '--secondary', role: 'Fundo secondary' },
        { token: '--accent', role: 'Fundo accent' },
        { token: '--destructive', role: 'Fundo destructive' },
        { token: '--primary', role: 'Fundo primary' },
      ]},
      { section: 'Foregrounds', items: [
        { token: '--foreground', role: 'Texto principal' },
        { token: '--card-foreground', role: 'Texto em cards' },
        { token: '--popover-foreground', role: 'Texto em popovers' },
        { token: '--muted-foreground', role: 'Texto secundario' },
        { token: '--secondary-foreground', role: 'Texto em botao secondary' },
        { token: '--accent-foreground', role: 'Texto sobre accent' },
        { token: '--primary-foreground', role: 'Texto sobre primary' },
      ]},
      { section: 'Bordas & UI', items: [
        { token: '--border', role: 'Bordas de elementos' },
        { token: '--input', role: 'Bordas de inputs' },
        { token: '--ring', role: 'Focus ring' },
      ]},
    ];

    return (
      <div className="space-y-8">
        <h3 className="text-lg font-semibold text-foreground">Mapa Completo de Tokens</h3>
        <p className="text-sm text-muted-foreground">
          Todos os CSS custom properties com amostra visual ao vivo. O que voce ve aqui e exatamente o que esta no produto.
        </p>

        {tokens.map((section) => (
          <div key={section.section}>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
              {section.section}
            </p>
            <div className="border rounded-lg overflow-hidden">
              {section.items.map((item, i) => (
                <div
                  key={item.token}
                  className={`flex items-center gap-4 px-4 py-3 ${i > 0 ? 'border-t' : ''}`}
                >
                  <div
                    className="w-10 h-10 rounded-md border shadow-sm shrink-0"
                    style={{ backgroundColor: `var(${item.token})` }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-mono text-foreground">{item.token}</p>
                  </div>
                  <p className="text-xs text-muted-foreground text-right">{item.role}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Mapa completo de todos os tokens CSS com swatches ao vivo. Reflete exatamente os valores atuais do globals.css.',
      },
    },
  },
};

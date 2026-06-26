# PRD — Montra

Documento canónico do projeto. PT-PT. Última revisão fecha decisões de produto e arquitetura antes do primeiro código.

Estado: decisões fechadas. Pronto para scaffold.

---

## 1. O que é

A Montra é uma máquina de demos de redesign para outbound. Metes o URL de um site, e a app devolve 3 versões redesenhadas desse site, cada uma num estilo diferente. O objetivo é o golpe de vista: a pessoa que recebe a demo para à primeira e pensa "é isto que eu quero".

Ferramenta interna do Vitor (VVarelAI). Não é produto para clientes na v1. Serve para chegar a leads frios com algo já feito na mão e abrir conversa.

Inspiração de UI: o Recast (Hassan / @nutlope), que faz "redesign your site six ways" com GLM-5.2. A Montra adapta a experiência para três saídas fixas e ortogonais. O backend é próprio.

---

## 2. Quem usa e como

Operador único: o Vitor. Corre no VPS Contabo (Nuremberg, headless, sem GPU). Acesso visual a partir do Mac via túnel Cloudflare. Padrão já em uso noutros projetos.

Fluxo de uso típico:
1. Vitor mete um URL de um lead (ex: um restaurante, um barbeiro, um canalizador com site fraco).
2. A Montra extrai conteúdo, imagens, screenshot e pistas fracas de marca. Não assume o design system visual do site original.
3. Vitor vê o design system, aprova ou ajusta.
4. A Montra gera as 3 versões.
5. Vitor vê as 3, escolhe, e usa a melhor para abrir conversa com o lead (distribuição à mão, fora da app).

Volume esperado: dezenas de leads. Pragmatismo e velocidade acima de tudo.

---

## 3. O fluxo, fase a fase

### Fase 1 — Input
- Campo principal: URL do site a redesenhar. Caminho principal.
- Campo alternativo: descrição em texto livre, para quando não há site. Caminho secundário.
- Toggle de tipo (Website / Web app), como no Recast.
- Botão "Gerar".

### Fase 2 — Extração (FireCrawl)
- A partir do URL, a FireCrawl extrai:
  - Conteúdo em markdown limpo (textos, estrutura, secções).
  - URLs das imagens existentes no site.
  - Design system do site antigo: cores, tipografia, espaçamento (na medida do que for extraível).
- Também se guarda um screenshot do site antigo, para comparação.

### Fase 3 — Design systems (vista própria)
- A vista de design system aparece antes das 3 janelas. Pensar num separador em baixo, navegável como páginas (referência mental: separadores de Excel).
- Mostra **3 sistemas**, um por janela: paleta de cores, tipografia, espaçamento.
- O Vitor pode:
  - Ajustar cada sistema antes de gerar.
  - Usar o design system extraído do site antigo apenas como referência, não como prisão.
- Cada janela tem o seu próprio design system aprovado. Não é decorativo: é a camada que garante intenção visual por slot, em vez de todas as versões herdarem o aspeto do site antigo.

### Fase 4 — Geração (GLM-5.2 via OpenCode Zen)
- Só depois do design system aprovado, o GLM-5.2 gera as 3 versões.
- As 3 correm e aparecem quando ficam prontas.
- Sem streaming de código ao vivo. Loading simples (três pontos ou animação leve). O Vitor não quer ver código, quer ver o resultado.
- Cada versão é HTML renderizado.

### Fase 5 — Resultado (grid das 3)
- As 3 versões num grid 3x1, como o Recast.
- Cada janela mostra a versão renderizada.
- Atalhos de teclado 1 a 3 para selecionar/inspecionar uma janela.
- Fundo creme, minimalista, na linha do Recast.

### Fase 6 — Fotos (GPT Image 2 via fal)
- Onde as fotos do site antigo são fracas (quase sempre, em sites de PME), o GPT Image 2 gera versões melhores.
- Modelo: GPT Image 2, acedido via fal (`openai/gpt-image-2` para gerar do zero, `openai/gpt-image-2/edit` para melhorar fotos existentes). Uma só integração, com a FAL_KEY já existente.
- Estratégia de fotos na v1: golpe de vista, não perfeição. As fotos só precisam de impressionar à primeira. Qualidade fina (4K, edição cuidada) fica para quando o cliente já disse sim.
- Caminho preferido: edit a partir das fotos reais deles (não fugir do conteúdo do negócio). Text-to-image como recurso quando não há foto aproveitável.

### Fase 7 — Dashboard (trabalhos recentes)
- Vista de trabalhos recentes. Cada lead processado fica acessível.
- Cada trabalho representado por um screenshot do grid dos 3 (leve, não os HTMLs vivos).
- Clicável para abrir a pasta do lead.
- Função dupla: o Vitor volta a trabalhos antigos, e usa-os como portfolio (mostrar a outro lead, ao colega dev, retirar uma imagem). A máquina alimenta-se a si própria: mais leads processados = mais portfolio.

---

## 4. O sistema de regras (o coração do controlo)

O GLM não é deixado à solta. Quatro camadas guiam cada geração, e somam-se. As skills de prompt por slot são uma quinta camada de ofício, configurada por slot:

**Camada 1 — Design system Montra do slot.** Cores, tipografia e espaçamento vêm do trio Montra. O site original dá conteúdo e pistas fracas de identidade, não a direção visual principal.

**Camada 2 — Regra global (.md).** O gosto de fundo do Vitor. Princípios de design, o que sempre fazer, o que nunca fazer. Um ficheiro .md, editável. Aplica-se a todas as 3 janelas.

**Camada 3 — Regra de slot (.md, x3).** Cada uma das 3 janelas tem a sua regra de estilo num .md próprio. Slot 1 Minimalista Premium, slot 2 Editorial de Marca, slot 3 Conversao Direta. Editáveis: o Vitor abre o .md e muda o estilo do slot quando quiser.

**Contrato visual (`DESIGN.md`).** Fonte canónica dos três estilos: nomes,
paletas, tipografia, layout e critérios de uso. `rules/global.md` e
`rules/slots/slot-N.md` continuam a ser a camada operacional de prompt lida a
cada geração.

Estilos v1:
1. Minimalista Premium.
2. Editorial de Marca.
3. Conversao Direta.

A soma das camadas é o que o GLM recebe para gerar cada janela:
```
design system do slot + regra global + regra do slot + skills do slot = prompt de geração daquela janela
```

### Prompt por janela (ajuste fino)
- Cada janela tem um campo onde o Vitor escreve um prompt e regenera **só aquela janela**.
- Caso de uso: o Vitor vê uma versão de que gosta, quer afinar ("este, mas com mais verde", "muda o header"), e refaz só aquele slot.
- Regenera apenas a janela visada. As outras 2 ficam intactas, não se regeneram, não gastam tokens.
- O prompt soma-se à regra do slot (mantém o estilo, afina por cima). Não a substitui.

### Editabilidade (princípio agent-native)
- As regras vivem como .md no repo. Ficheiros como interface.
- Muda o .md da regra global → mudam os 3.
- Muda o .md de um slot → muda só esse slot na próxima geração.
- Escreve um prompt numa janela → refaz só essa, na hora.
- O Vitor controla o design todo sem tocar no código da app.

### Export por janela
- A janela escolhida tem ação de export.
- O export junta: HTML da versão, design system aprovado daquela aba, contrato
  visual do slot, regra global, regra do slot, skills do slot, prompt específico e dados de
  origem disponíveis.
- Objetivo: a versão escolhida sai com o seu contexto, para ser reutilizada,
  revista por agente ou entregue a outro fluxo sem perder intenção visual.

---

## 5. Stack técnica

| Camada | Ferramenta | Notas |
|---|---|---|
| Frontend | Clone do UI do Recast | Grid 3x1, creme, minimalista, atalhos 1-3, loading simples. Next.js. |
| Extração | FireCrawl | API gerida (free tier para a v1). Markdown + imagens + design system + screenshot. |
| Geração de sites | GLM-5.2 via OpenCode Zen | API HTTP direta (`opencode.ai/zen`, compatível com OpenAI), key própria `OPENCODE_GO_API_KEY`. Não passa pelo Hermes. |
| Geração de fotos | GPT Image 2 via fal | `openai/gpt-image-2` e `openai/gpt-image-2/edit`. FAL_KEY existente. |
| Persistência | Ficheiros no disco | Uma pasta por lead. HTMLs dos 3 + screenshot do grid. |
| Infra | VPS Contabo (Nuremberg) | Headless. Acesso via túnel Cloudflare para o Mac. |

---

## 6. Persistência e estrutura de dados

- Cada lead = uma pasta no disco do VPS.
- Dentro de cada pasta:
  - Os 3 HTMLs gerados.
  - Screenshot do grid dos 3 (para o dashboard, leve).
  - O design system usado (para reaproveitamento).
  - Opcional: o conteúdo extraído pela FireCrawl.
- Reaproveitamento: o Vitor pode voltar a uma pasta de um lead parecido (ex: outro canalizador) e partir do trabalho já feito, sem regenerar do zero.
- Dashboard lê os screenshots das pastas recentes. Sem interface de histórico elaborada na v1; a pasta é a fonte de verdade.

---

## 7. Custo (consciência de run)

A Montra dispara gerações pagas. Registo dos custos para vigilância:

- **GLM-5.2:** custo por geração x 3 versões x nº de leads. O grosso do custo.
- **GPT Image 2 (fal):** de ~0,01 USD/imagem (baixa qualidade, 1024x768) a ~0,41 USD/imagem (alta, 4K). Para demos, qualidade média chega. Multiplica por nº de fotos por site e por nº de leads.
- **FireCrawl:** 1 crédito por scrape. Free tier (1.000 créditos one-time) chega para a v1.

Princípio de custo na v1: qualidade média nas fotos (golpe de vista, não 4K), free tier na FireCrawl, e atenção ao volume de gerações GLM.

---

## 8. Relação com o sistema maior (resolvido — sem dependência de runtime)

**Não há delegation-gate a resolver.** A app chama o GLM-5.2 diretamente pela API HTTP do OpenCode Zen (`opencode.ai/zen`, endpoint compatível com OpenAI), com chave própria (`OPENCODE_GO_API_KEY`). Não passa pelo agente Hermes, logo não dispara o delegation-gate dele.

As três integrações — FireCrawl, GLM (OpenCode Zen) e fal — são APIs HTTP independentes, cada uma com a sua key. Nenhum agente está no caminho de runtime da app.

O Hermes só aparece noutro sentido, não-runtime: como convénio de quem **escreve** o código (Secção 10). Os dois não se confundem.

---

## 9. Escopo

### Dentro da v1
- Input por URL (principal) e por texto (alternativo).
- Extração de conteúdo, imagens, screenshot e pistas fracas de marca (FireCrawl).
- Vista de design system, com aprovação/ajuste.
- Geração das 3 versões (GLM-5.2), governadas por design system Montra + regra global + regra de slot + skills do slot.
- Sistema de regras: regra global .md + 3 regras de slot .md, editáveis.
- Prompt por janela, regenera só aquela.
- Fotos via GPT Image 2 (fal), com golpe de vista como prioridade.
- Persistência em pasta por lead.
- Dashboard de trabalhos recentes (screenshots).
- Atalhos de teclado 1-3.
- Loading simples, sem streaming.

### Fora da v1
- Passo de Claude a fazer uma versão-mãe antes do GLM. Cortado: o GLM faz as 3 direto, como o Recast prova ser suficiente. Reabrir só se as 3 saírem sem direção.
- Streaming de código ao vivo nos 3 painéis. Cortado por peso. Reabrir nunca, provavelmente.
- Distribuição automática para o lead (mandar link, tirar print automático). Resolve-se à mão fora da app.
- Interface de histórico elaborada. A pasta chega.
- Qualidade fina de fotos (4K, edição cuidada). Só quando o cliente diz sim.
- Qualquer ligação a CRM, faturação, ou ao mundo da Lume/Twenty. A Montra é uma ilha.

---

## 10. Onde vive (agent-native)

- Repo próprio: `projects/prisma`.
- STATUS.md no Atlas vault, como os outros projetos.
- Regras como .md dentro do repo (regra global + 3 de slot). Ficheiros como interface.
- Divisão de trabalho do pipeline Vitor: Claude Code escreve a estrutura, os .md, o plano. O código a sério é construído pelo Hermes (GPT-5.5 autor, DeepSeek arquitetura). Regra mantida: nunca o mesmo modelo autor e revisor.

---

## 11. Decisões fechadas (registo)

- Nome: **Montra**. Uma entrada (URL), três saídas (versões). Alinha com Lume, Hermes, Atlas.
- Só GLM-5.2 gera as 3. Sem Claude-mãe.
- URL é o caminho principal. Texto é alternativa.
- Design systems por slot primeiro, aprovados, e só então geração. O sistema extraído do URL serve de referência, mas as 3 versões não devem ficar presas ao aspeto antigo.
- Camadas de regra: design system + global + slot + skills do slot. Somam-se.
- Prompt por janela regenera só aquela janela. Soma-se à regra do slot.
- Regras de slot editáveis (.md).
- Fotos: GPT Image 2 via fal. Edit a partir das reais, text-to-image como recurso. Golpe de vista, não perfeição.
- Persistência: pasta por lead no disco. Dashboard por screenshot.
- Sem streaming. Loading simples.
- Distribuição ao lead à mão, fora da app.
- PT-PT em tudo.

---

## 12. Pendentes antes de correr em volume

1. Confirmar a qualidade/custo das fotos por geração (Secção 7).

(O antigo pendente do delegation-gate foi resolvido — ver Secção 8: a app não depende do Hermes em runtime, chama o OpenCode Zen direto.)

# Regra Global

Esta regra aplica-se a todas as janelas. Soma-se ao design system do slot e
a regra especifica do slot.

## Objetivo

Gerar uma demo de redesign que pare o lead nos primeiros 3 segundos. O resultado
tem de parecer uma proposta concreta para o negocio real, nao uma landing
generica.

## Base obrigatoria

- Usar o conteudo real extraido pela FireCrawl como materia-prima.
- Reescrever textos fracos quando isso melhora clareza e venda, mas sem inventar
  factos, moradas, premios, numeros, reviews ou servicos que nao existam no
  conteudo.
- Manter o negocio reconhecivel: nome, oferta, categoria, localidade e tom.
- O site antigo serve de referencia de conteudo, nao de referencia visual.
- Respeitar o design system do slot. Se houver conflito entre site antigo e
  design system do slot, ganha o design system do slot.

## Estrutura minima

- Primeiro viewport forte: proposta clara, prova ou contexto, CTA visivel.
- Secao de oferta ou servicos.
- Secao de prova: equipa, processo, anos, reviews, galeria, clientes, localizacao
  ou qualquer sinal real disponivel.
- Secao final com CTA.
- Mobile primeiro. O resultado tem de funcionar num telemovel.

## Imagens

- Usar URLs de imagens extraidas quando existirem e fizerem sentido.
- Quando uma imagem real for fraca, manter a intencao e marcar com
  `<!-- PHOTO:descricao concreta -->`.
- Nunca usar stock generico sem relacao com o negocio.
- Nao deixar imagens partidas, fundos vazios ou placeholders visiveis.

## Escrita

- PT-PT.
- Copy especifico, curto e comercial.
- Evitar slogans vagos como "solucoes inovadoras", "qualidade superior",
  "experiencia unica", "servico de excelencia".
- CTAs com verbo e objeto: "Marcar consulta", "Pedir orcamento",
  "Reservar mesa", "Ver servicos".

## Layout e qualidade

- Hierarquia forte: o utilizador deve perceber em 5 segundos o que e o negocio,
  porque interessa e o que fazer a seguir.
- Evitar grelhas de cards identicas sem ritmo.
- Evitar hero enorme sem conteudo util abaixo.
- Evitar texto pequeno demais, baixo contraste ou blocos densos.
- Nao usar lorem ipsum, placeholders ou texto de framework.
- Nao incluir explicacoes sobre o redesign, prompts, codigo ou IA.

## Saida tecnica

- Devolver um unico HTML completo, self-contained e renderizavel.
- CSS dentro de `<style>` ou inline.
- Sem build, sem dependencias locais.
- CDNs de fontes sao permitidas quando ajudam o estilo.
- Resposta final: apenas HTML. Sem markdown fences e sem comentarios fora do HTML.

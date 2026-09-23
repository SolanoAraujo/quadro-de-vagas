# Quadro de Vagas

Página de vagas de tecnologia com filtros, feita com **HTML, CSS e JavaScript puro** (sem frameworks ou bibliotecas).

🔗 **Demo:** https://solanoaraujo.github.io/quadro-de-vagas/

> As vagas e empresas são fictícias e foram criadas apenas para este projeto de portfólio.

## O que a página faz

- Lista 14 vagas fictícias de tecnologia.
- Filtra por **área**, **cidade** e **modalidade** (remoto, híbrido ou presencial).
- Permite buscar por palavra-chave, ignorando acentos e maiúsculas (ex.: "sao paulo" encontra "São Paulo").
- Combina os filtros entre si e atualiza o contador de vagas a cada mudança.
- Mostra uma mensagem quando nenhuma vaga é encontrada, com botão para limpar os filtros.
- Layout responsivo, com foco visível no teclado e contador anunciado por leitores de tela (`aria-live`).

## Tecnologias e conceitos praticados

- **HTML5 semântico:** `header`, `main`, `aside`, `section`, `footer`, `label` ligado a cada campo.
- **CSS3:** Grid, Flexbox, variáveis CSS, `position: sticky` e media queries.
- **JavaScript:** manipulação do DOM (`createElement`, `appendChild`, `replaceChildren`), eventos (`input`, `change`, `click`, `submit`), `filter`, `map`, `Set` e normalização de texto.

## Como rodar

Baixe os arquivos e abra o `index.html` no navegador. Não precisa instalar nada.

## Estrutura

```
quadro-de-vagas/
├── index.html   # estrutura da página
├── style.css    # estilos e layout responsivo
└── script.js    # dados das vagas, filtros e renderização
```

## Ideias de melhoria

- Salvar os filtros na URL para compartilhar uma busca.
- Ordenar as vagas por data ou por nível.
- Adicionar filtro por nível (estágio, júnior, pleno, sênior).
- Guardar vagas favoritas no `localStorage`.

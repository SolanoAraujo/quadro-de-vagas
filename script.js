/* ==========================================================
   Quadro de Vagas
   Lista de vagas fictícias com filtros por texto, área,
   cidade e modalidade. JavaScript puro (sem bibliotecas).
   ========================================================== */

/* ---------- 1. Dados ---------- */
// Cada vaga é um objeto. "dias" indica há quantos dias ela foi publicada.
const vagas = [
  {
    titulo: "Desenvolvedor Front-End Júnior",
    empresa: "Atlas Sistemas",
    cidade: "Rio de Janeiro",
    area: "Front-end",
    modalidade: "Remoto",
    nivel: "Júnior",
    dias: 1,
    descricao: "Apoio na manutenção de telas e componentes de um sistema web, com HTML, CSS e JavaScript."
  },
  {
    titulo: "Desenvolvedor React Pleno",
    empresa: "Nimbus Digital",
    cidade: "São Paulo",
    area: "Front-end",
    modalidade: "Híbrido",
    nivel: "Pleno",
    dias: 3,
    descricao: "Criação de novas funcionalidades em uma plataforma de pagamentos, com foco em desempenho e acessibilidade."
  },
  {
    titulo: "Estágio em Desenvolvimento Web",
    empresa: "Praia Vermelha Tech",
    cidade: "Rio de Janeiro",
    area: "Front-end",
    modalidade: "Presencial",
    nivel: "Estágio",
    dias: 5,
    descricao: "Acompanhamento do time de produto, correções simples de interface e testes básicos em navegadores."
  },
  {
    titulo: "Desenvolvedor Back-End Node.js",
    empresa: "Cais Software",
    cidade: "Curitiba",
    area: "Back-end",
    modalidade: "Remoto",
    nivel: "Pleno",
    dias: 2,
    descricao: "Desenvolvimento de APIs REST e integração com serviços de terceiros."
  },
  {
    titulo: "Desenvolvedor Back-End Júnior",
    empresa: "Vale do Sol Sistemas",
    cidade: "Belo Horizonte",
    area: "Back-end",
    modalidade: "Híbrido",
    nivel: "Júnior",
    dias: 6,
    descricao: "Manutenção de rotinas de um sistema de gestão e apoio na escrita de documentação técnica."
  },
  {
    titulo: "Analista de Dados Júnior",
    empresa: "Bússola Analytics",
    cidade: "São Paulo",
    area: "Dados",
    modalidade: "Remoto",
    nivel: "Júnior",
    dias: 4,
    descricao: "Construção de relatórios e painéis a partir de bases de dados de vendas."
  },
  {
    titulo: "Cientista de Dados Sênior",
    empresa: "Farol Inteligência",
    cidade: "Recife",
    area: "Dados",
    modalidade: "Remoto",
    nivel: "Sênior",
    dias: 9,
    descricao: "Modelagem estatística e criação de modelos preditivos para o setor de logística."
  },
  {
    titulo: "Designer de Produto",
    empresa: "Nimbus Digital",
    cidade: "São Paulo",
    area: "Design",
    modalidade: "Híbrido",
    nivel: "Pleno",
    dias: 7,
    descricao: "Desenho de fluxos e protótipos no Figma, em parceria com desenvolvedores e pesquisa com usuários."
  },
  {
    titulo: "Designer de Interface Júnior",
    empresa: "Estúdio Maré",
    cidade: "Porto Alegre",
    area: "Design",
    modalidade: "Remoto",
    nivel: "Júnior",
    dias: 2,
    descricao: "Criação de telas para aplicativos e manutenção do sistema de design da empresa."
  },
  {
    titulo: "Analista de Suporte Técnico",
    empresa: "Atlas Sistemas",
    cidade: "Rio de Janeiro",
    area: "Suporte e QA",
    modalidade: "Presencial",
    nivel: "Júnior",
    dias: 8,
    descricao: "Atendimento a clientes, registro de chamados e acompanhamento das demandas com o time de tecnologia."
  },
  {
    titulo: "Analista de Testes (QA) Pleno",
    empresa: "Cais Software",
    cidade: "Curitiba",
    area: "Suporte e QA",
    modalidade: "Remoto",
    nivel: "Pleno",
    dias: 10,
    descricao: "Elaboração de casos de teste, execução de testes manuais e automação de testes de regressão."
  },
  {
    titulo: "Estágio em Suporte e Testes",
    empresa: "Vale do Sol Sistemas",
    cidade: "Belo Horizonte",
    area: "Suporte e QA",
    modalidade: "Híbrido",
    nivel: "Estágio",
    dias: 0,
    descricao: "Apoio ao time de qualidade na execução de testes e no registro de falhas encontradas."
  },
  {
    titulo: "Gerente de Produto",
    empresa: "Farol Inteligência",
    cidade: "Recife",
    area: "Produto",
    modalidade: "Híbrido",
    nivel: "Sênior",
    dias: 12,
    descricao: "Definição de prioridades, acompanhamento de métricas e alinhamento entre negócio e tecnologia."
  },
  {
    titulo: "Analista de Produto Júnior",
    empresa: "Praia Vermelha Tech",
    cidade: "Rio de Janeiro",
    area: "Produto",
    modalidade: "Remoto",
    nivel: "Júnior",
    dias: 3,
    descricao: "Organização do backlog, escrita de requisitos e acompanhamento das entregas do time."
  }
];

/* ---------- 2. Referências aos elementos da página ---------- */
const campoBusca = document.getElementById("busca");
const campoArea = document.getElementById("area");
const campoCidade = document.getElementById("cidade");
const campoModalidade = document.getElementById("modalidade");

const listaVagas = document.getElementById("lista-vagas");
const contadorNumero = document.getElementById("contador-numero");
const contadorTexto = document.getElementById("contador-texto");
const blocoVazio = document.getElementById("vazio");

const formFiltros = document.getElementById("form-filtros");
const botaoLimpar = document.getElementById("limpar");
const botaoLimparVazio = document.getElementById("limpar-vazio");

/* ---------- 3. Funções auxiliares ---------- */

// Remove acentos e deixa tudo em minúsculas, para que
// "sao paulo" encontre "São Paulo" na busca.
function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// Devolve uma lista sem valores repetidos, em ordem alfabética.
function valoresUnicos(campo) {
  const valores = vagas.map((vaga) => vaga[campo]);
  return [...new Set(valores)].sort((a, b) => a.localeCompare(b, "pt-BR"));
}

// Preenche um <select> com as opções encontradas nos dados.
function preencherSelect(select, valores) {
  valores.forEach((valor) => {
    const opcao = document.createElement("option");
    opcao.value = valor;
    opcao.textContent = valor;
    select.appendChild(opcao);
  });
}

// Cria um elemento com classe e texto (evita repetir código).
function criarElemento(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto) elemento.textContent = texto;
  return elemento;
}

function textoDePublicacao(dias) {
  if (dias === 0) return "Publicada hoje";
  if (dias === 1) return "Publicada há 1 dia";
  return `Publicada há ${dias} dias`;
}

/* ---------- 4. Montagem do HTML de cada vaga ---------- */
function criarItemVaga(vaga) {
  const item = criarElemento("li", "vaga");

  // Título e data
  const cabecalho = criarElemento("div", "vaga__cabecalho");
  cabecalho.appendChild(criarElemento("h3", "vaga__titulo", vaga.titulo));
  cabecalho.appendChild(criarElemento("span", "vaga__data", textoDePublicacao(vaga.dias)));
  item.appendChild(cabecalho);

  // Empresa e cidade
  const empresa = criarElemento("p", "vaga__empresa");
  const nomeEmpresa = criarElemento("strong", null, vaga.empresa);
  empresa.appendChild(nomeEmpresa);
  empresa.appendChild(document.createTextNode(` em ${vaga.cidade}`));
  item.appendChild(empresa);

  // Descrição
  item.appendChild(criarElemento("p", "vaga__descricao", vaga.descricao));

  // Etiquetas (área, modalidade e nível)
  const tags = criarElemento("ul", "vaga__tags");
  tags.setAttribute("aria-label", "Detalhes da vaga");
  [
    { texto: vaga.area, classe: "tag tag--area" },
    { texto: vaga.modalidade, classe: "tag" },
    { texto: vaga.nivel, classe: "tag" }
  ].forEach((info) => {
    tags.appendChild(criarElemento("li", info.classe, info.texto));
  });
  item.appendChild(tags);

  return item;
}

/* ---------- 5. Filtro ---------- */

// Lê os valores atuais dos campos e devolve só as vagas que combinam.
function filtrarVagas() {
  const busca = normalizar(campoBusca.value.trim());
  const area = campoArea.value;
  const cidade = campoCidade.value;
  const modalidade = campoModalidade.value;

  return vagas.filter((vaga) => {
    const combinaBusca =
      busca === "" ||
      normalizar(vaga.titulo).includes(busca) ||
      normalizar(vaga.empresa).includes(busca) ||
      normalizar(vaga.descricao).includes(busca);

    const combinaArea = area === "" || vaga.area === area;
    const combinaCidade = cidade === "" || vaga.cidade === cidade;
    const combinaModalidade = modalidade === "" || vaga.modalidade === modalidade;

    return combinaBusca && combinaArea && combinaCidade && combinaModalidade;
  });
}

/* ---------- 6. Exibição na tela ---------- */
function atualizarTela() {
  const resultado = filtrarVagas();

  // Esvazia a lista e adiciona as vagas filtradas
  listaVagas.replaceChildren();
  resultado.forEach((vaga) => {
    listaVagas.appendChild(criarItemVaga(vaga));
  });

  // Atualiza o contador
  contadorNumero.textContent = resultado.length;
  contadorTexto.textContent = resultado.length === 1 ? "vaga encontrada" : "vagas encontradas";

  // Mostra a mensagem de "nenhuma vaga" só quando necessário
  blocoVazio.hidden = resultado.length !== 0;
}

function limparFiltros() {
  formFiltros.reset();
  atualizarTela();
  campoBusca.focus();
}

/* ---------- 7. Eventos ---------- */
campoBusca.addEventListener("input", atualizarTela);
campoArea.addEventListener("change", atualizarTela);
campoCidade.addEventListener("change", atualizarTela);
campoModalidade.addEventListener("change", atualizarTela);

botaoLimpar.addEventListener("click", limparFiltros);
botaoLimparVazio.addEventListener("click", limparFiltros);

// Evita que apertar Enter na busca recarregue a página
formFiltros.addEventListener("submit", (evento) => evento.preventDefault());

/* ---------- 8. Início ---------- */
preencherSelect(campoArea, valoresUnicos("area"));
preencherSelect(campoCidade, valoresUnicos("cidade"));
preencherSelect(campoModalidade, valoresUnicos("modalidade"));
atualizarTela();

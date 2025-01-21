// Dados temporários (simulando um banco de dados)
let estoque = JSON.parse(localStorage.getItem('estoque')) || [];
let servicos = JSON.parse(localStorage.getItem('servicos')) || [];
let financeiro = JSON.parse(localStorage.getItem('financeiro')) || [];
let rh = JSON.parse(localStorage.getItem('rh')) || [];
let eventosCalendario = JSON.parse(localStorage.getItem('eventosCalendario')) || [];

// Função para formatar valores (aceita . ou , como separador decimal)
function formatarValor(valor) {
    // Substitui vírgula por ponto e converte para número
    const valorNumerico = parseFloat(valor.replace(',', '.'));
    return isNaN(valorNumerico) ? 0 : valorNumerico;
  }
  
  // Função para exibir valores no formato monetário (R$)
  function exibirValorMonetario(valor) {
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
  }
// Função para salvar dados no localStorage
function salvarDados() {
  localStorage.setItem('estoque', JSON.stringify(estoque));
  localStorage.setItem('servicos', JSON.stringify(servicos));
  localStorage.setItem('financeiro', JSON.stringify(financeiro));
  localStorage.setItem('rh', JSON.stringify(rh));
  localStorage.setItem('eventosCalendario', JSON.stringify(eventosCalendario));
}

// Seletores
const formEstoque = document.getElementById('formEstoque');
const tabelaEstoque = document.getElementById('tabelaEstoque').getElementsByTagName('tbody')[0];
const formServicos = document.getElementById('formServicos');
const tabelaServicos = document.getElementById('tabelaServicos').getElementsByTagName('tbody')[0];
const formFinanceiro = document.getElementById('formFinanceiro');
const tabelaReceitas = document.getElementById('tabelaReceitas').getElementsByTagName('tbody')[0];
const tabelaDespesas = document.getElementById('tabelaDespesas').getElementsByTagName('tbody')[0];
const formRH = document.getElementById('formRH');
const tabelaRH = document.getElementById('tabelaRH').getElementsByTagName('tbody')[0];

// Função para renderizar a tabela de estoque
function renderizarEstoque() {
  tabelaEstoque.innerHTML = '';
  estoque.forEach((item, index) => {
    const row = tabelaEstoque.insertRow();
    row.classList.add('fade-in');

    const cellProduto = row.insertCell();
    cellProduto.textContent = item.produto;

    const cellQuantidade = row.insertCell();
    cellQuantidade.textContent = item.quantidade;

    const cellAcoes = row.insertCell();
    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.className = 'bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded';
    btnExcluir.onclick = () => excluirEstoque(index);
    cellAcoes.appendChild(btnExcluir);
  });
}

// Função para incluir estoque
formEstoque.addEventListener('submit', (e) => {
  e.preventDefault();
  const produto = document.getElementById('produto').value;
  const quantidade = document.getElementById('quantidade').value;

  if (produto && quantidade) {
    estoque.push({ produto, quantidade });
    renderizarEstoque();
    formEstoque.reset();
    salvarDados();
  }
});

// Função para excluir estoque
function excluirEstoque(index) {
  estoque.splice(index, 1);
  renderizarEstoque();
  salvarDados();
}

// Função para renderizar a tabela de serviços
function renderizarServicos() {
  tabelaServicos.innerHTML = '';
  servicos.forEach((item, index) => {
    const row = tabelaServicos.insertRow();
    row.classList.add('fade-in');

    const cellServico = row.insertCell();
    cellServico.textContent = item.servico;

    const cellData = row.insertCell();
    cellData.textContent = item.data;

    const cellAcoes = row.insertCell();
    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.className = 'bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded';
    btnExcluir.onclick = () => excluirServico(index);
    cellAcoes.appendChild(btnExcluir);
  });
}

// Função para incluir serviços
formServicos.addEventListener('submit', (e) => {
  e.preventDefault();
  const servico = document.getElementById('servico').value;
  const dataServico = document.getElementById('dataServico').value;

  if (servico && dataServico) {
    servicos.push({ servico, data: dataServico });
    renderizarServicos();
    formServicos.reset();
    salvarDados();
  }
});

// Função para excluir serviços
function excluirServico(index) {
  servicos.splice(index, 1);
  renderizarServicos();
  salvarDados();
}

// Função para incluir financeiro
formFinanceiro.addEventListener('submit', (e) => {
    e.preventDefault();
    const descricao = document.getElementById('descricaoFinanceiro').value;
    const valor = formatarValor(document.getElementById('valorFinanceiro').value); // Formata o valor
    const data = document.getElementById('dataFinanceiro').value;
    const categoria = document.getElementById('categoriaFinanceiro').value;
  
    if (descricao && valor && data && categoria) {
      financeiro.push({ descricao, valor, data, categoria });
      renderizarFinanceiro();
      formFinanceiro.reset();
      salvarDados();
    }
  });
  
  // Função para renderizar as tabelas de Receitas e Despesas
  function renderizarFinanceiro() {
    tabelaReceitas.innerHTML = '';
    tabelaDespesas.innerHTML = '';
  
    financeiro.forEach((item, index) => {
      const row = (item.categoria === 'receita' ? tabelaReceitas : tabelaDespesas).insertRow();
      row.classList.add('fade-in');
  
      const cellDescricao = row.insertCell();
      cellDescricao.textContent = item.descricao;
  
      const cellValor = row.insertCell();
      cellValor.textContent = exibirValorMonetario(item.valor); // Exibe o valor formatado
  
      const cellData = row.insertCell();
      cellData.textContent = item.data;
  
      const cellAcoes = row.insertCell();
      const btnExcluir = document.createElement('button');
      btnExcluir.textContent = 'Excluir';
      btnExcluir.className = 'bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded';
      btnExcluir.onclick = () => excluirFinanceiro(index);
      cellAcoes.appendChild(btnExcluir);
    });
  
    atualizarDashboard();
  }

// Função para incluir financeiro
formFinanceiro.addEventListener('submit', (e) => {
  e.preventDefault();
  const descricao = document.getElementById('descricaoFinanceiro').value;
  const valor = parseFloat(document.getElementById('valorFinanceiro').value);
  const data = document.getElementById('dataFinanceiro').value;
  const categoria = document.getElementById('categoriaFinanceiro').value;

  if (descricao && valor && data && categoria) {
    financeiro.push({ descricao, valor, data, categoria });
    renderizarFinanceiro();
    formFinanceiro.reset();
    salvarDados();
  }
});

// Função para excluir financeiro
function excluirFinanceiro(index) {
  financeiro.splice(index, 1);
  renderizarFinanceiro();
  salvarDados();
}

// Função para calcular o status de férias
function calcularFerias(dataAdmissao) {
  const hoje = new Date();
  const admissao = new Date(dataAdmissao);
  const diffAnos = hoje.getFullYear() - admissao.getFullYear();
  return diffAnos >= 1 ? 'Pendente' : 'Não Disponível';
}

// Função para renderizar a tabela de RH
function renderizarRH() {
  tabelaRH.innerHTML = '';
  rh.forEach((item, index) => {
    const row = tabelaRH.insertRow();
    row.classList.add('fade-in');

    const cellNome = row.insertCell();
    cellNome.textContent = item.nome;

    const cellCargo = row.insertCell();
    cellCargo.textContent = item.cargo;

    const cellSalario = row.insertCell();
    cellSalario.textContent = `R$ ${item.salario.toFixed(2)}`;

    const cellDataAdmissao = row.insertCell();
    cellDataAdmissao.textContent = item.dataAdmissao;

    const cellFerias = row.insertCell();
    cellFerias.textContent = calcularFerias(item.dataAdmissao);

    const cellStatus = row.insertCell();
    cellStatus.textContent = item.status;

    const cellAcoes = row.insertCell();
    const btnAlterarStatus = document.createElement('button');
    btnAlterarStatus.textContent = item.status === 'ativo' ? 'Desativar' : 'Ativar';
    btnAlterarStatus.className = 'bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded';
    btnAlterarStatus.onclick = () => alterarStatusRH(index);
    cellAcoes.appendChild(btnAlterarStatus);
  });

  atualizarDashboard();
}

// Função para incluir RH
formRH.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('nomeRH').value;
  const cargo = document.getElementById('cargoRH').value;
  const salario = parseFloat(document.getElementById('salarioRH').value);
  const dataAdmissao = document.getElementById('dataAdmissaoRH').value;
  const status = document.getElementById('statusRH').value;

  if (nome && cargo && salario && dataAdmissao && status) {
    rh.push({ nome, cargo, salario, dataAdmissao, status });
    renderizarRH();
    formRH.reset();
    salvarDados();
  }
});

// Função para alterar o status do funcionário
function alterarStatusRH(index) {
  rh[index].status = rh[index].status === 'ativo' ? 'desativado' : 'ativo';
  renderizarRH();
  salvarDados();
}

// Função para atualizar o Dashboard
function atualizarDashboard() {
  const totalReceitas = financeiro
    .filter((item) => item.categoria === 'receita')
    .reduce((total, item) => total + item.valor, 0);

  const totalDespesas = financeiro
    .filter((item) => item.categoria === 'despesa')
    .reduce((total, item) => total + item.valor, 0);

  const saldoAtual = totalReceitas - totalDespesas;

  const totalAtivos = rh.filter((item) => item.status === 'ativo').length;
  const totalDesativados = rh.filter((item) => item.status === 'desativado').length;

  document.getElementById('totalReceitas').textContent = `R$ ${totalReceitas.toFixed(2)}`;
  document.getElementById('totalDespesas').textContent = `R$ ${totalDespesas.toFixed(2)}`;
  document.getElementById('saldoAtual').textContent = `R$ ${saldoAtual.toFixed(2)}`;
  document.getElementById('totalAtivos').textContent = totalAtivos;
  document.getElementById('totalDesativados').textContent = totalDesativados;
}

// Função para buscar o valor do Dólar
async function buscarDolar() {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL');
    const data = await response.json();
    const valorDolar = parseFloat(data.USDBRL.bid).toFixed(2);
    document.getElementById('valorDolar').textContent = `R$ ${valorDolar}`;
  } catch (error) {
    document.getElementById('valorDolar').textContent = 'Erro ao carregar';
  }
}

// Função para gerar resumo mensal
function gerarResumoMensal() {
  const listaMeses = document.getElementById('listaMeses');
  const detalhesMes = document.getElementById('detalhesMes');
  const meses = {};

  // Agrupar dados por mês
  financeiro.forEach((item) => {
    const mes = item.data.split('-')[1]; // Extrair o mês (formato YYYY-MM-DD)
    if (!meses[mes]) meses[mes] = { receitas: 0, despesas: 0 };
    if (item.categoria === 'receita') meses[mes].receitas += item.valor;
    else meses[mes].despesas += item.valor;
  });

  // Exibir lista de meses
  listaMeses.innerHTML = '';
  Object.keys(meses).forEach((mes) => {
    const botaoMes = document.createElement('button');
    botaoMes.textContent = `Mês ${mes}`;
    botaoMes.className = 'bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2';
    botaoMes.onclick = () => mostrarDetalhesMes(mes, meses[mes]);
    listaMeses.appendChild(botaoMes);
  });

  // Exibir detalhes do mês selecionado
  function mostrarDetalhesMes(mes, dados) {
    detalhesMes.innerHTML = `
      <h3 class="text-lg font-bold mb-2">Resumo do Mês ${mes}</h3>
      <p><strong>Receitas:</strong> R$ ${dados.receitas.toFixed(2)}</p>
      <p><strong>Despesas:</strong> R$ ${dados.despesas.toFixed(2)}</p>
      <p><strong>Saldo:</strong> R$ ${(dados.receitas - dados.despesas).toFixed(2)}</p>
    `;
  }
}

// Alternar entre abas
document.querySelectorAll('aside a').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('.content-section').forEach((section) => {
      section.classList.add('hidden');
    });
    document.querySelector(link.getAttribute('href')).classList.remove('hidden');

    if (link.getAttribute('href') === '#resumoMensal') {
      gerarResumoMensal();
    }
  });
});

// Alternar tema
const temas = ['escuro', 'claro', 'neon'];
let temaAtual = localStorage.getItem('tema') || 'escuro';

function aplicarTema(tema) {
  document.body.className = tema;
  localStorage.setItem('tema', tema);
}

document.getElementById('toggleTema').addEventListener('click', () => {
  temaAtual = temas[(temas.indexOf(temaAtual) + 1) % temas.length];
  aplicarTema(temaAtual);
});

// Aplicar tema ao carregar a página
aplicarTema(temaAtual);

// Inicialização do Calendário
document.addEventListener('DOMContentLoaded', () => {
  const calendarEl = document.getElementById('calendarioContainer');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth', // Visualização inicial: mês
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    events: eventosCalendario, // Carrega eventos do localStorage
    editable: true, // Permite editar eventos
    eventDrop: (info) => {
      // Atualiza a data do evento ao arrastar e soltar
      const evento = eventosCalendario.find((e) => e.id === info.event.id);
      if (evento) {
        evento.start = info.event.startStr;
        salvarDados();
      }
    },
    eventClick: (info) => {
      // Abre um modal para editar o evento ao clicar
      const novoTitulo = prompt('Editar título do evento:', info.event.title);
      if (novoTitulo) {
        info.event.setProp('title', novoTitulo);
        const evento = eventosCalendario.find((e) => e.id === info.event.id);
        if (evento) {
          evento.title = novoTitulo;
          salvarDados();
        }
      }
    },
    dateClick: (info) => {
      // Adiciona um novo evento ao clicar em uma data
      const titulo = prompt('Digite o título do evento:');
      if (titulo) {
        const novoEvento = {
          id: Date.now().toString(),
          title: titulo,
          start: info.dateStr,
          allDay: true, // Evento de dia inteiro
        };
        calendar.addEvent(novoEvento);
        eventosCalendario.push(novoEvento);
        salvarDados();
      }
    },
  });
  calendar.render();
});

// Renderizar tabelas ao carregar a página
renderizarEstoque();
renderizarServicos();
renderizarFinanceiro();
renderizarRH();
atualizarDashboard();
buscarDolar();
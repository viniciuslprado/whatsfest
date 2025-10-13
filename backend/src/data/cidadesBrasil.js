// Lista fixa de cidades brasileiras para autocomplete
// Lista estática
const cidadesEstaticas = [
  { nome: 'São Paulo', estado: 'SP' },
  { nome: 'Rio de Janeiro', estado: 'RJ' },
  { nome: 'Belo Horizonte', estado: 'MG' },
  { nome: 'Curitiba', estado: 'PR' },
  { nome: 'Porto Alegre', estado: 'RS' },
  { nome: 'Salvador', estado: 'BA' },
  { nome: 'Brasília', estado: 'DF' },
  { nome: 'Fortaleza', estado: 'CE' },
  { nome: 'Recife', estado: 'PE' },
  { nome: 'Manaus', estado: 'AM' },
  { nome: 'Campinas', estado: 'SP' },
  { nome: 'Goiânia', estado: 'GO' },
  { nome: 'Belém', estado: 'PA' },
  { nome: 'Florianópolis', estado: 'SC' },
  { nome: 'Vitória', estado: 'ES' },
  { nome: 'Natal', estado: 'RN' },
  { nome: 'João Pessoa', estado: 'PB' },
  { nome: 'Maceió', estado: 'AL' },
  { nome: 'São Luís', estado: 'MA' },
  { nome: 'Teresina', estado: 'PI' },
  { nome: 'Franca', estado: 'SP' },
];

// Função para buscar cidades do Brasil via IBGE API
const fetchCidadesIBGE = async () => {
  const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
  const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/municipios';
  const response = await fetch(url);
  if (!response.ok) throw new Error('Erro ao buscar cidades do IBGE');
  const data = await response.json();
  // Retorna no formato [{ nome, estado }]
  return data.map(c => ({ nome: c.nome, estado: c.microrregiao.mesorregiao.UF.sigla }));
};

module.exports = {
  cidadesEstaticas,
  fetchCidadesIBGE,
};

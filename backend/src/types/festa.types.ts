// Interfaces para tipagem das festas
export interface IFesta {
  id: number;
  nome: string;
  dataHora: string; // ISO 8601 string
  cidade: string;
  local?: string;
  urlImagemFlyer?: string;
  linkVendas?: string;
  descricaoCurta?: string;
  destaque: boolean;
  criadoEm?: Date;
  atualizadoEm?: Date;
}

export interface ICreateFestaRequest {
  nome: string;
  dataHora: string;
  cidade: string;
  local?: string;
  urlImagemFlyer?: string;
  linkVendas?: string;
  descricaoCurta?: string;
  destaque: boolean;
}

export interface IUpdateFestaRequest extends Partial<ICreateFestaRequest> {
  id?: number;
}

export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  error?: string;
}

export interface IListFestaResponse extends IApiResponse<IFesta[]> {}
export interface ISingleFestaResponse extends IApiResponse<IFesta> {}

// Tipos para parâmetros de rota
export interface IFestaParams {
  id: string;
}

// Enum para status de resposta
export enum ResponseStatus {
  SUCCESS = 'success',
  ERROR = 'error'
}
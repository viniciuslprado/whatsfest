// Interfaces para tipagem das festas
export interface IFesta {
  id: number;
  nome: string;
  data?: string; // Data no formato ISO (YYYY-MM-DD)
  horaInicio?: string; // Horário de início (HH:mm)
  horaFim?: string; // Horário de fim (HH:mm)
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
  data?: string | null;
  horaInicio?: string | null;
  horaFim?: string | null;
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
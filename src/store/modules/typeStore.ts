export interface Recado {
  id: string;
  description: string;
  detail: string;
  check: boolean
}

export interface RecadoData {
  idUser: string,
  idRecado?:string
  description: string;
  detail: string;
  check: boolean
}

export interface KeyData {
  idUser: string,
  key: string
}

export interface ArquivadosData {
  idUser: string,
  key: boolean
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  recados: Recado[];
}

export interface ResponseAPI {
  success: boolean;
  message: string;
  data: any;
}

export type newUserRequest = Omit<User, 'id' | 'recados'>


export interface Horario {
  hora: string;
  segunda: string;
  terca: string;
  quarta: string;
  quinta: string;
  sexta: string;
  disponivelSegunda: boolean;
  disponivelTerca: boolean;
  disponivelQuarta: boolean;
  disponivelQuinta: boolean;
  disponivelSexta: boolean;
  [key: string]: string | boolean;
}

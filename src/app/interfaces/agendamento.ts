import { Militar } from './militar';

export interface Agendamento {
  data: string;
  hora: string;
  diaSemana: string;
  militar: Militar;
}


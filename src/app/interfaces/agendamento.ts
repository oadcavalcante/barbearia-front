import { Militar } from './militar';

export interface Agendamento {
  id?: number;
  data: string;
  hora: string;
  diaSemana: string;
  militar: Militar;
  disponivel: boolean;
}

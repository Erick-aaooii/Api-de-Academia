export interface Exercicio {
  id: number;
  treinoId: number;
  nome: string;
  series: number;
  repeticoes: number;
  carga?: number;
}

// DTO para criar exercício (request)
export interface CreateExercicioDto {
  treinoId: number;
  nome: string;
  series: number;
  repeticoes: number;
  carga?: number;
}

// DTO para resposta (response)
export interface ExercicioResponseDto extends Exercicio {}

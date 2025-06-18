export interface Matricula {
  id: number;
  alunoId: number;
  planoId: number;
  dataMatricula: Date;
  dataValidade: Date;
  ativo: boolean;
  observacoes?: string;
}

// DTO para criar uma matrícula (request)
export interface CreateMatriculaDto {
  alunoId: number;
  planoId: number;
  dataMatricula: Date | string;
  dataValidade: Date | string;
  ativo: boolean;
  observacoes?: string;
}

// DTO para resposta (response)
export interface MatriculaResponseDto extends Matricula {}
export interface Aluno {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  dataNascimento: Date;
  endereco?: string;
  tiposTreinoIds: number[];
}

// DTO para criar um aluno (request)
export interface CreateAlunoDto {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  dataNascimento: Date | string;
  endereco?: string;
  tiposTreinoIds: number[];
}

// DTO para resposta (response)
export interface AlunoResponseDto extends Aluno {}

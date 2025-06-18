export interface Plano {
  id: number;
  tipo: "Mensal" | "Anual";
  descricao?: string;
  preco: number;
  duracaoDias: number;
}

export interface CreatePlanoDto {
  tipo: "Mensal" | "Anual";
  descricao?: string;
  preco: number;
  duracaoDias: number;
}

export interface PlanoResponseDto extends Plano {}

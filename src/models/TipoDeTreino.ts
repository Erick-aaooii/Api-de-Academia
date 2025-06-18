export interface TipodeTreino {
  id: number;
  tipo:
    | "Hipertrofia"
    | "Natação"
    | "Muay Thai"
    | "Funcional"
    | "Pilates"
    | "Crossfit"
    | "Cardio"
    | "Yoga"
    | "Zumba"
    | "Boxe"
    | "Spinning"
    | "Alongamento"
    | "Treinamento Funcional"
    | "Calistenia";
  descricao?: string;
}

export interface CreateTipodeTreinoDto {
  tipo:
    | "Hipertrofia"
    | "Natação"
    | "Muay Thai"
    | "Funcional"
    | "Pilates"
    | "Crossfit"
    | "Cardio"
    | "Yoga"
    | "Zumba"
    | "Boxe"
    | "Spinning"
    | "Alongamento"
    | "Treinamento Funcional"
    | "Calistenia";
  descricao?: string;
}

export interface TipodeTreinoResponseDto extends TipodeTreino {}

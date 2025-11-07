export interface Grade {
  subject: string;
  score: number | null;
}

export enum StudentStatus {
  Aprovado = 'Aprovado',
  Recuperacao = 'Recuperação',
  Reprovado = 'Reprovado',
  Indefinido = 'Indefinido'
}

export interface Student {
  id: string;
  name: string;
  grades: Grade[];
  attendance: number | null;
  classroomId: string;
}

export interface Classroom {
  id: string;
  name: string;
}

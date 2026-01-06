export type Statistieken = {
  totaalWoorden: number;
  totaalJuist: number;
  totaalOnjuist: number;
  dagelijks: Record<string, DagStatistieken>;
};

export type DagStatistieken = {
  juist: number;
  onjuist: number;
};

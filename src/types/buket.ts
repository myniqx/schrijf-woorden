export type Woord = {
  id: string;
  origineel: string;
  vertaling?: string;
  juistAantal: number;
  onjuistAantal: number;
  moeilijkheidsgraad: number;
  laatsteTest: string;
  volgendeHerhaling: string;
};

export type Buket = {
  id: string;
  naam: string;
  aanmaakDatum: string;
  laatsteOefening: string;
  woorden: Woord[];
};

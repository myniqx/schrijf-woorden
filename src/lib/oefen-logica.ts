import type { Woord } from "@/types";

function shuffle<T>(array: T[]): T[] {
  const kopie = [...array];
  for (let i = kopie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [kopie[i], kopie[j]] = [kopie[j], kopie[i]];
  }
  return kopie;
}

function berekenPrioriteit(woord: Woord): number {
  let score = 0;

  score += woord.onjuistAantal * 3;
  score += woord.moeilijkheidsgraad * 2;

  if (new Date(woord.volgendeHerhaling) < new Date()) {
    score += 5;
  }

  if (woord.juistAantal > woord.onjuistAantal) {
    score -= woord.juistAantal;
  }

  return Math.max(0, score);
}

export function selecteerWoorden(woorden: Woord[], aantal = 20): Woord[] {
  if (woorden.length === 0) return [];
  if (woorden.length <= aantal) return shuffle(woorden);

  const gescoreerdWoorden = woorden.map((woord) => ({
    woord,
    score: berekenPrioriteit(woord),
  }));

  gescoreerdWoorden.sort((a, b) => b.score - a.score);

  const geselecteerd = gescoreerdWoorden
    .slice(0, aantal)
    .map((item) => item.woord);

  return shuffle(geselecteerd);
}

export function controleerAntwoord(invoer: string, verwacht: string): boolean {
  return invoer.trim().toLowerCase() === verwacht.trim().toLowerCase();
}

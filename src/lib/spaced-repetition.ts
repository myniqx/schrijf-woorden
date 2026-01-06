import type { Woord } from "@/types";

export function berekenVolgendeHerhaling(woord: Woord, juist: boolean): string {
  const nu = new Date();
  let interval: number;

  if (juist) {
    const successReeks = woord.juistAantal - woord.onjuistAantal;
    interval = Math.min(30, 2 ** successReeks);
  } else {
    interval = 1;
  }

  nu.setDate(nu.getDate() + interval);
  return nu.toISOString();
}

export function updateMoeilijkheidsgraad(woord: Woord, juist: boolean): number {
  const huidig = woord.moeilijkheidsgraad;

  if (juist) {
    return Math.max(0, huidig - 1);
  }

  return Math.min(10, huidig + 2);
}

export function updateWoordNaOefening(woord: Woord, juist: boolean): Woord {
  return {
    ...woord,
    juistAantal: juist ? woord.juistAantal + 1 : woord.juistAantal,
    onjuistAantal: juist ? woord.onjuistAantal : woord.onjuistAantal + 1,
    moeilijkheidsgraad: updateMoeilijkheidsgraad(woord, juist),
    laatsteTest: new Date().toISOString(),
    volgendeHerhaling: berekenVolgendeHerhaling(woord, juist),
  };
}

import type { Buket, Woord } from "@/types";
import { OPSLAG_SLEUTELS, ophalen, opslaan } from "./lokale-opslag";
import { parseWoord } from "./woord-parser";

export function genereerId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function haalBuketsOp(): Buket[] {
  return ophalen<Buket[]>(OPSLAG_SLEUTELS.BUKETS, []);
}

export function haalBuketOp(id: string): Buket | undefined {
  const bukets = haalBuketsOp();
  return bukets.find((buket) => buket.id === id);
}

export function maakWoord(tekst: string): Woord {
  const { origineel, vertaling } = parseWoord(tekst);
  const nu = new Date().toISOString();

  return {
    id: genereerId(),
    origineel,
    vertaling,
    juistAantal: 0,
    onjuistAantal: 0,
    moeilijkheidsgraad: 5,
    laatsteTest: nu,
    volgendeHerhaling: nu,
  };
}

export function maakBuket(naam: string, woordenTekst: string[]): Buket {
  const nu = new Date().toISOString();
  const woorden = woordenTekst.map((tekst) => maakWoord(tekst));

  return {
    id: genereerId(),
    naam,
    aanmaakDatum: nu,
    laatsteOefening: nu,
    woorden,
  };
}

export function opslaanBuket(buket: Buket): void {
  const bukets = haalBuketsOp();
  const bestaandeIndex = bukets.findIndex((b) => b.id === buket.id);

  if (bestaandeIndex >= 0) {
    bukets[bestaandeIndex] = buket;
  } else {
    bukets.push(buket);
  }

  opslaan(OPSLAG_SLEUTELS.BUKETS, bukets);
}

export function verwijderBuket(id: string): void {
  const bukets = haalBuketsOp();
  const gefilterdebukets = bukets.filter((buket) => buket.id !== id);
  opslaan(OPSLAG_SLEUTELS.BUKETS, gefilterdebukets);
}

export function updateWoordStatistieken(
  buketId: string,
  woordId: string,
  juist: boolean
): void {
  const buket = haalBuketOp(buketId);
  if (!buket) return;

  const woord = buket.woorden.find((w) => w.id === woordId);
  if (!woord) return;

  if (juist) {
    woord.juistAantal++;
  } else {
    woord.onjuistAantal++;
  }

  woord.laatsteTest = new Date().toISOString();
  buket.laatsteOefening = new Date().toISOString();

  opslaanBuket(buket);
}

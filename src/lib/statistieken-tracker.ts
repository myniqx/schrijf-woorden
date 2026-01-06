import type { Statistieken } from "@/types";
import { OPSLAG_SLEUTELS, ophalen, opslaan } from "./lokale-opslag";

function geefVandaagSleutel(): string {
  return new Date().toISOString().split("T")[0];
}

export function haalStatistiekenOp(): Statistieken {
  return ophalen<Statistieken>(OPSLAG_SLEUTELS.STATISTIEKEN, {
    totaalWoorden: 0,
    totaalJuist: 0,
    totaalOnjuist: 0,
    dagelijks: {},
  });
}

export function updateStatistieken(juist: boolean): void {
  const statistieken = haalStatistiekenOp();
  const vandaag = geefVandaagSleutel();

  if (juist) {
    statistieken.totaalJuist++;
  } else {
    statistieken.totaalOnjuist++;
  }

  if (!statistieken.dagelijks[vandaag]) {
    statistieken.dagelijks[vandaag] = { juist: 0, onjuist: 0 };
  }

  if (juist) {
    statistieken.dagelijks[vandaag].juist++;
  } else {
    statistieken.dagelijks[vandaag].onjuist++;
  }

  opslaan(OPSLAG_SLEUTELS.STATISTIEKEN, statistieken);
}

export function geefDagStatistieken(datum: string) {
  const statistieken = haalStatistiekenOp();
  return statistieken.dagelijks[datum] || { juist: 0, onjuist: 0 };
}

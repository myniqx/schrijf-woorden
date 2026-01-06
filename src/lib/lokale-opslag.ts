const OPSLAG_SLEUTELS = {
  BUKETS: "schrijf-woorden-bukets",
  STATISTIEKEN: "schrijf-woorden-statistieken",
} as const;

export function opslaan<T>(sleutel: string, waarde: T): void {
  try {
    const json = JSON.stringify(waarde);
    localStorage.setItem(sleutel, json);
  } catch (fout) {
    console.error("Fout bij opslaan naar LocalStorage:", fout);
  }
}

export function ophalen<T>(sleutel: string, standaardWaarde: T): T {
  try {
    const item = localStorage.getItem(sleutel);
    if (!item) return standaardWaarde;
    return JSON.parse(item) as T;
  } catch (fout) {
    console.error("Fout bij ophalen uit LocalStorage:", fout);
    return standaardWaarde;
  }
}

export function verwijderen(sleutel: string): void {
  try {
    localStorage.removeItem(sleutel);
  } catch (fout) {
    console.error("Fout bij verwijderen uit LocalStorage:", fout);
  }
}

export function wisAlles(): void {
  try {
    Object.values(OPSLAG_SLEUTELS).forEach((sleutel) => {
      localStorage.removeItem(sleutel);
    });
  } catch (fout) {
    console.error("Fout bij wissen van LocalStorage:", fout);
  }
}

export { OPSLAG_SLEUTELS };

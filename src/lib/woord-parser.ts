export function formateerTekst(invoer: string): string[] {
  const regels = invoer
    .split("\n")
    .map((regel) => regel.trim())
    .filter((regel) => regel.length > 0);

  const geformatteerd: string[] = [];

  for (const regel of regels) {
    if (regel.includes(":")) {
      const [woord, vertaling] = regel.split(":").map((s) => s.trim());
      if (woord && vertaling) {
        geformatteerd.push(`${woord}: ${vertaling}`);
      }
    } else {
      const woorden = regel
        .replace(/[.,!?;:()""'']/g, "")
        .split(/\s+/)
        .filter((w) => w.length > 0);

      geformatteerd.push(...woorden);
    }
  }

  return geformatteerd;
}

export function parseWoord(tekst: string): {
  origineel: string;
  vertaling?: string;
} {
  if (tekst.includes(":")) {
    const [origineel, vertaling] = tekst.split(":").map((s) => s.trim());
    return { origineel, vertaling };
  }

  return { origineel: tekst.trim() };
}

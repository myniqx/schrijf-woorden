export function parseHtmlTabel(html: string): string[] {
  const resultaat: string[] = [];

  const trRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  const trMatches = html.matchAll(trRegex);

  for (const trMatch of trMatches) {
    const trInhoud = trMatch[1];

    const tdRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
    const tdMatches = Array.from(trInhoud.matchAll(tdRegex));

    if (tdMatches.length >= 3) {
      const td2Inhoud = tdMatches[1][1];
      const td3Inhoud = tdMatches[2][1];

      const woord = td2Inhoud
        .replace(/<[^>]+>/g, "")
        .trim();

      const vertaling = td3Inhoud
        .replace(/<[^>]+>/g, "")
        .trim();

      if (woord && vertaling) {
        resultaat.push(`${woord}: ${vertaling}`);
      }
    }
  }

  return resultaat;
}

export function formateerTekst(invoer: string): string[] {
  const regels = invoer
    .split("\n")
    .map((regel) => regel.trim())
    .filter((regel) => regel.length > 0);

  const geformatteerd: string[] = [];

  if (invoer.includes("<tr") && invoer.includes("<td")) {
    return parseHtmlTabel(invoer);
  }

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

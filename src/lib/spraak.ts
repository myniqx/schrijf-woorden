export function spreekUit(tekst: string, taal = "nl-NL"): void {
  if (!("speechSynthesis" in window)) {
    console.error("Browser ondersteunt geen spraaksynthese");
    return;
  }

  window.speechSynthesis.cancel();

  const uitspraak = new SpeechSynthesisUtterance(tekst);
  uitspraak.lang = taal;
  uitspraak.rate = 0.85;
  uitspraak.pitch = 1;
  uitspraak.volume = 1;

  window.speechSynthesis.speak(uitspraak);
}

export function haalBeschikbareStemmenOp(): SpeechSynthesisVoice[] {
  if (!("speechSynthesis" in window)) {
    return [];
  }
  return window.speechSynthesis.getVoices();
}

export function zoekHollandcaStem(): SpeechSynthesisVoice | undefined {
  const stemmen = haalBeschikbareStemmenOp();
  return stemmen.find((stem) => stem.lang.startsWith("nl"));
}

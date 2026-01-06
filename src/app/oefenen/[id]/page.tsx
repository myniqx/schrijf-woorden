"use client";

import { Volume2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SpecialeKarakters } from "@/components/SpecialeKarakters";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { haalBuketOp, opslaanBuket } from "@/lib/buket-beheer";
import { controleerAntwoord, selecteerWoorden } from "@/lib/oefen-logica";
import { updateWoordNaOefening } from "@/lib/spaced-repetition";
import { spreekUit } from "@/lib/spraak";
import { updateStatistieken } from "@/lib/statistieken-tracker";
import type { Buket, Woord } from "@/types";
import { OefenModus } from "@/types";

export default function Oefenen() {
  const router = useRouter();
  const params = useParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const [buket, setBuket] = useState<Buket | null>(null);
  const [geselecteerdeWoorden, setGeselecteerdeWoorden] = useState<Woord[]>([]);
  const [huidigeIndex, setHuidigeIndex] = useState(0);
  const [invoer, setInvoer] = useState("");
  const [modus, setModus] = useState<OefenModus>(OefenModus.HetzelfdeSchrijven);
  const [juisteAntwoorden, setJuisteAntwoorden] = useState(0);
  const [onjuisteAntwoorden, setOnjuisteAntwoorden] = useState(0);
  const [toonVertaling, setToonVertaling] = useState(false);
  const [toonWoord, setToonWoord] = useState(true);
  const [feedback, setFeedback] = useState<"juist" | "onjuist" | null>(null);

  useEffect(() => {
    const id = params.id as string;
    const gevondenBuket = haalBuketOp(id);
    if (gevondenBuket) {
      setBuket(gevondenBuket);
      const woorden = selecteerWoorden(gevondenBuket.woorden, 20);
      setGeselecteerdeWoorden(woorden);
    } else {
      router.push("/");
    }
  }, [params.id, router]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [huidigeIndex]);

  useEffect(() => {
    if (modus === OefenModus.UitGeheugenSchrijven) {
      setToonWoord(true);
      const timer = setTimeout(() => {
        setToonWoord(false);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setToonWoord(true);
    }
  }, [huidigeIndex, modus]);

  const huidigWoord = geselecteerdeWoorden[huidigeIndex];
  const isKlaar = huidigeIndex >= geselecteerdeWoorden.length;

  const geefWeerTeGeven = (): string => {
    if (!huidigWoord) return "";

    if (modus === OefenModus.HetzelfdeSchrijven) {
      return huidigWoord.origineel;
    } else if (modus === OefenModus.VertalingSchrijven) {
      return huidigWoord.vertaling || huidigWoord.origineel;
    } else if (modus === OefenModus.UitGeheugenSchrijven) {
      return toonWoord ? huidigWoord.origineel : "???";
    }

    return "";
  };

  const geefVerwachtAntwoord = (): string => {
    if (!huidigWoord) return "";

    if (modus === OefenModus.VertalingSchrijven) {
      return huidigWoord.origineel;
    }

    return huidigWoord.origineel;
  };

  const handleInvoerWijziging = (waarde: string) => {
    setInvoer(waarde);

    const verwacht = geefVerwachtAntwoord();
    if (controleerAntwoord(waarde, verwacht)) {
      handleJuist();
    }
  };

  const handleJuist = () => {
    if (!buket || !huidigWoord) return;

    setFeedback("juist");
    setJuisteAntwoorden((prev) => prev + 1);
    updateStatistieken(true);

    const bijgewerktWoord = updateWoordNaOefening(huidigWoord, true);
    const bijgewerkteBuket: Buket = {
      ...buket,
      woorden: buket.woorden.map((w) =>
        w.id === bijgewerktWoord.id ? bijgewerktWoord : w,
      ),
      laatsteOefening: new Date().toISOString(),
    };

    opslaanBuket(bijgewerkteBuket);
    setBuket(bijgewerkteBuket);

    setTimeout(() => {
      setInvoer("");
      setToonVertaling(false);
      setFeedback(null);
      setHuidigeIndex((prev) => prev + 1);
    }, 500);
  };

  const handleOverslaan = () => {
    if (!buket || !huidigWoord) return;

    setFeedback("onjuist");
    setOnjuisteAntwoorden((prev) => prev + 1);
    updateStatistieken(false);

    const bijgewerktWoord = updateWoordNaOefening(huidigWoord, false);
    const bijgewerkteBuket: Buket = {
      ...buket,
      woorden: buket.woorden.map((w) =>
        w.id === bijgewerktWoord.id ? bijgewerktWoord : w,
      ),
    };

    opslaanBuket(bijgewerkteBuket);
    setBuket(bijgewerkteBuket);

    setTimeout(() => {
      setInvoer("");
      setToonVertaling(false);
      setFeedback(null);
      setHuidigeIndex((prev) => prev + 1);
    }, 500);
  };

  const voegKarakterToe = (karakter: string) => {
    const nieuweInvoer = invoer + karakter;
    setInvoer(nieuweInvoer);
    handleInvoerWijziging(nieuweInvoer);
    inputRef.current?.focus();
  };

  if (!buket) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Laden...</p>
      </div>
    );
  }

  if (isKlaar) {
    const percentage = Math.round(
      (juisteAntwoorden / (juisteAntwoorden + onjuisteAntwoorden)) * 100,
    );

    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950 flex items-center justify-center">
        <Card className="max-w-lg w-full">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              Sessie Voltooid! 🎉
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-2">
              <p className="text-4xl font-bold text-green-600">{percentage}%</p>
              <p className="text-muted-foreground">
                {juisteAntwoorden} juist, {onjuisteAntwoorden} onjuist
              </p>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => router.push("/")} className="flex-1">
                Terug naar Home
              </Button>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="flex-1"
              >
                Opnieuw Oefenen
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">{buket.naam}</h1>
          <div className="text-sm text-muted-foreground">
            {huidigeIndex + 1} / {geselecteerdeWoorden.length}
          </div>
        </div>

        <div className="mb-6 flex gap-2">
          <Button
            size="sm"
            variant={
              modus === OefenModus.HetzelfdeSchrijven ? "default" : "outline"
            }
            onClick={() => setModus(OefenModus.HetzelfdeSchrijven)}
          >
            1. Hetzelfde schrijven
          </Button>
          <Button
            size="sm"
            variant={
              modus === OefenModus.VertalingSchrijven ? "default" : "outline"
            }
            onClick={() => setModus(OefenModus.VertalingSchrijven)}
          >
            2. Vertaling schrijven
          </Button>
          <Button
            size="sm"
            variant={
              modus === OefenModus.UitGeheugenSchrijven ? "default" : "outline"
            }
            onClick={() => setModus(OefenModus.UitGeheugenSchrijven)}
          >
            3. Uit geheugen schrijven
          </Button>
        </div>

        <Card
          className={`mb-6 transition-colors ${
            feedback === "juist"
              ? "border-green-500 bg-green-50 dark:bg-green-950"
              : feedback === "onjuist"
                ? "border-red-500 bg-red-50 dark:bg-red-950"
                : ""
          }`}
        >
          <CardHeader className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => spreekUit(huidigWoord?.origineel || "")}
              className="absolute right-4 top-4"
              title="Luister naar uitspraak"
            >
              <Volume2 className="h-5 w-5" />
            </Button>
            <CardTitle className="text-center text-4xl font-mono">
              {geefWeerTeGeven()}
              {modus === OefenModus.VertalingSchrijven &&
                huidigWoord?.vertaling && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2"
                    onMouseDown={() => setToonVertaling(true)}
                    onMouseUp={() => setToonVertaling(false)}
                    onMouseLeave={() => setToonVertaling(false)}
                    title="Toon antwoord"
                  >
                    ?
                  </Button>
                )}
            </CardTitle>
            {toonVertaling && modus === OefenModus.VertalingSchrijven && (
              <p className="text-center text-muted-foreground">
                {huidigWoord?.origineel}
              </p>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <SpecialeKarakters voegKarakterToe={voegKarakterToe} />
            <Input
              ref={inputRef}
              value={invoer}
              onChange={(e) => handleInvoerWijziging(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleOverslaan();
                }
              }}
              placeholder="Type het woord..."
              className="text-2xl text-center font-mono h-16"
            />
            <div className="flex gap-2">
              <Button
                onClick={handleOverslaan}
                variant="outline"
                className="flex-1"
              >
                Overslaan (Enter)
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between text-sm text-muted-foreground">
          <span>✓ Juist: {juisteAntwoorden}</span>
          <span>✗ Onjuist: {onjuisteAntwoorden}</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import type { FC } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formateerTekst } from "@/lib/woord-parser";

type BuketFormulierProps = {
  initieleNaam?: string;
  initialeTekst?: string;
  opslaanActie: (naam: string, woordenTekst: string[]) => void;
  annulerenActie: () => void;
};

export const BuketFormulier: FC<BuketFormulierProps> = ({
  initieleNaam = "",
  initialeTekst = "",
  opslaanActie,
  annulerenActie,
}) => {
  const [naam, setNaam] = useState(initieleNaam);
  const [tekst, setTekst] = useState(initialeTekst);
  const [geformatteerdeTekst, setGeformatteerdeTekst] = useState("");

  const handleFormatteren = () => {
    const geformatteerd = formateerTekst(tekst);
    setGeformatteerdeTekst(geformatteerd.join("\n"));
  };

  const handleOpslaan = () => {
    if (!naam.trim()) {
      alert("Voer een naam in voor de buket");
      return;
    }

    const teGebruikenTekst = geformatteerdeTekst || tekst;
    if (!teGebruikenTekst.trim()) {
      alert("Voer woorden in");
      return;
    }

    const woorden = teGebruikenTekst
      .split("\n")
      .map((regel) => regel.trim())
      .filter((regel) => regel.length > 0);

    if (woorden.length === 0) {
      alert("Geen geldige woorden gevonden");
      return;
    }

    opslaanActie(naam, woorden);
  };

  const weergaveTekst = geformatteerdeTekst || tekst;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Buket Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="naam" className="text-sm font-medium">
            Buket Naam
          </label>
          <Input
            id="naam"
            value={naam}
            onChange={(e) => setNaam(e.target.value)}
            placeholder="bijv. Nederlandse Werkwoorden"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="woorden" className="text-sm font-medium">
            Woorden
          </label>
          <p className="text-xs text-muted-foreground">
            Formaat: "woord: vertaling" of gewoon tekst plakken
          </p>
          <Textarea
            id="woorden"
            value={weergaveTekst}
            onChange={(e) => {
              setTekst(e.target.value);
              setGeformatteerdeTekst("");
            }}
            placeholder="huis: house&#10;kat: cat&#10;&#10;of plak gewoon een paragraaf tekst..."
            rows={15}
            className="font-mono text-sm"
          />
        </div>

        <div className="flex gap-3">
          <Button onClick={handleFormatteren} variant="outline" type="button">
            Formatteren
          </Button>
          <Button onClick={handleOpslaan} className="flex-1" type="button">
            Opslaan
          </Button>
          <Button onClick={annulerenActie} variant="ghost" type="button">
            Annuleren
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

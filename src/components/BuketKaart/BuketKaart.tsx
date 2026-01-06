"use client";

import type { FC } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Buket } from "@/types";

type BuketKaartProps = {
  buket: Buket;
  verwijderenActie: (id: string) => void;
};

export const BuketKaart: FC<BuketKaartProps> = ({ buket, verwijderenActie }) => {
  const woordenAantal = buket.woorden.length;
  const laatsteOefening = new Date(buket.laatsteOefening).toLocaleDateString(
    "nl-NL"
  );

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{buket.naam}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground space-y-1">
          <p>
            <span className="font-medium">Woorden:</span> {woordenAantal}
          </p>
          <p>
            <span className="font-medium">Laatste oefening:</span>{" "}
            {laatsteOefening}
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild className="flex-1">
            <Link href={`/oefenen/${buket.id}`}>Oefenen</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/buket-bewerken/${buket.id}`}>Bewerken</Link>
          </Button>
          <Button
            variant="destructive"
            onClick={() => verwijderenActie(buket.id)}
          >
            Verwijderen
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

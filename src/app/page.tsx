"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BuketKaart } from "@/components/BuketKaart";
import { haalBuketsOp, verwijderBuket } from "@/lib/buket-beheer";
import type { Buket } from "@/types";

export default function Home() {
  const [bukets, setBukets] = useState<Buket[]>([]);

  useEffect(() => {
    setBukets(haalBuketsOp());
  }, []);

  const handleVerwijderen = (id: string) => {
    if (confirm("Weet je zeker dat je deze buket wilt verwijderen?")) {
      verwijderBuket(id);
      setBukets(haalBuketsOp());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Schrijf Woorden
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Leer Nederlands woorden door te typen
          </p>
          <Button asChild size="lg">
            <Link href="/buket-toevoegen">+ Nieuwe Buket</Link>
          </Button>
        </header>

        {bukets.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground mb-4">
              Nog geen bukets aangemaakt
            </p>
            <p className="text-muted-foreground">
              Klik op "Nieuwe Buket" om te beginnen
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bukets.map((buket) => (
              <BuketKaart
                key={buket.id}
                buket={buket}
                verwijderenActie={handleVerwijderen}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

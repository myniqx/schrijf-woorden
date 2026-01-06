"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { BuketFormulier } from "@/components/BuketFormulier";
import { haalBuketOp, opslaanBuket, maakWoord } from "@/lib/buket-beheer";
import type { Buket } from "@/types";

export default function BuketBewerken() {
  const router = useRouter();
  const params = useParams();
  const [buket, setBuket] = useState<Buket | null>(null);

  useEffect(() => {
    const id = params.id as string;
    const gevondenBuket = haalBuketOp(id);
    if (gevondenBuket) {
      setBuket(gevondenBuket);
    } else {
      router.push("/");
    }
  }, [params.id, router]);

  const handleOpslaan = (naam: string, woordenTekst: string[]) => {
    if (!buket) return;

    const bijgewerkteWoorden = woordenTekst.map((tekst) => maakWoord(tekst));

    const bijgewerkteBuket: Buket = {
      ...buket,
      naam,
      woorden: bijgewerkteWoorden,
    };

    opslaanBuket(bijgewerkteBuket);
    router.push("/");
  };

  const handleAnnuleren = () => {
    router.push("/");
  };

  if (!buket) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Laden...</p>
      </div>
    );
  }

  const initialeTekst = buket.woorden
    .map((woord) =>
      woord.vertaling
        ? `${woord.origineel}: ${woord.vertaling}`
        : woord.origineel
    )
    .join("\n");

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Buket Bewerken</h1>
        <BuketFormulier
          initieleNaam={buket.naam}
          initialeTekst={initialeTekst}
          opslaanActie={handleOpslaan}
          annulerenActie={handleAnnuleren}
        />
      </div>
    </div>
  );
}

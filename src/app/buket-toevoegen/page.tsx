"use client";

import { useRouter } from "next/navigation";
import { BuketFormulier } from "@/components/BuketFormulier";
import { maakBuket, opslaanBuket } from "@/lib/buket-beheer";

export default function BuketToevoegen() {
  const router = useRouter();

  const handleOpslaan = (naam: string, woordenTekst: string[]) => {
    const nieuweBuket = maakBuket(naam, woordenTekst);
    opslaanBuket(nieuweBuket);
    router.push("/");
  };

  const handleAnnuleren = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Nieuwe Buket Toevoegen</h1>
        <BuketFormulier
          opslaanActie={handleOpslaan}
          annulerenActie={handleAnnuleren}
        />
      </div>
    </div>
  );
}

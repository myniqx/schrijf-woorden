import type { FC } from "react";
import { Button } from "@/components/ui/button";

type SpecialeKaraktersProps = {
  voegKarakterToe: (karakter: string) => void;
};

const HOLLANDSE_KARAKTERS = ["ë", "ï", "ö", "ü", "é", "è", "á", "ó", "ñ"];

export const SpecialeKarakters: FC<SpecialeKaraktersProps> = ({
  voegKarakterToe,
}) => {
  return (
    <div className="flex flex-wrap gap-2 p-4 bg-muted/50 rounded-lg">
      <span className="text-sm text-muted-foreground self-center mr-2">
        Speciale karakters:
      </span>
      {HOLLANDSE_KARAKTERS.map((karakter) => (
        <Button
          key={karakter}
          variant="outline"
          size="sm"
          onClick={() => voegKarakterToe(karakter)}
          className="w-10 h-10 p-0 font-mono text-lg"
          type="button"
        >
          {karakter}
        </Button>
      ))}
    </div>
  );
};

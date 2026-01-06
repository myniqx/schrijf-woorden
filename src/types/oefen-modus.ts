export enum OefenModus {
  HetzelfdeSchrijven = 1,
  VertalingSchrijven = 2,
  UitGeheugenSchrijven = 3,
}

export type OefenSessie = {
  buketId: string;
  geselecteerdeWoorden: import("./buket").Woord[];
  huidigeIndex: number;
  juisteAntwoorden: number;
  onjuisteAntwoorden: number;
  modus: OefenModus;
};

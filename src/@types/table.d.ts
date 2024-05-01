import { SimulationParameters } from "./simulation";

export type Column = {
  id: keyof SimulationParameters;
  align: "right" | "center" | "left";
  disablePadding: boolean;
  label: string;
  tooltip: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
};

export type Order = "asc" | "desc";

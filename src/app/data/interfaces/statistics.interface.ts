import { IGeneral } from "./general.interface";

export interface IStatistics {
  general: IGeneral;
  programas: IRoot[];
  facultades: IRoot[];
  grupos: IRoot[];
}

export interface IRoot {
  general: IGeneral;
}

export interface IGeneric {
  id: IRoot;
}


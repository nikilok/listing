export interface MedalByCountry {
  code: CountryCode;
  gold: number;
  silver: number;
  bronze: number;
}

export type MedalsData = MedalByCountry[];

export type CountryCode = 
  | "USA" 
  | "NOR" 
  | "RUS" 
  | "NED" 
  | "FRA" 
  | "SWE" 
  | "ITA" 
  | "CAN" 
  | "SUI" 
  | "BLR" 
  | "GER" 
  | "AUT" 
  | "CHN";

export type MedalType = "gold" | "silver" | "bronze";

export interface MedalStats {
  totalMedals: number;
  totalGold: number;
  totalSilver: number;
  totalBronze: number;
}

export interface MedalByCountry {
  code: CountryCode
  gold: number
  silver: number
  bronze: number
}

export interface MedalByCountryWithTotal extends MedalByCountry {
  total: number
}

export type MedalsData = MedalByCountry[]

export type MedalsDataWithTotal = MedalByCountryWithTotal[]

export type CountryCode =
  | 'USA'
  | 'NOR'
  | 'RUS'
  | 'NED'
  | 'FRA'
  | 'SWE'
  | 'ITA'
  | 'CAN'
  | 'SUI'
  | 'BLR'
  | 'GER'
  | 'AUT'
  | 'CHN'

export type MedalType = 'gold' | 'silver' | 'bronze'

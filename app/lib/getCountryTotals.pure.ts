import type { MedalsData, MedalsDataWithTotal } from '../types/medals'

export function getCountryTotalsPure(data: MedalsData): MedalsDataWithTotal {
  return data.map(country => ({
    ...country,
    gold: country.gold || 0,
    silver: country.silver || 0,
    bronze: country.bronze || 0,
    total: (country.gold || 0) + (country.silver || 0) + (country.bronze || 0),
  }))
}

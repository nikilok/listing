import type { MedalsData, MedalsDataWithTotal } from '../types/medals';

// Compute Totals for the given data
export function getCountryTotals(data: MedalsData): MedalsDataWithTotal {
  return data.map(country => ({
    ...country,
    total: country.gold + country.silver + country.bronze
  }));
}

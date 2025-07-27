"use server"

import type { MedalsData, MedalsDataWithTotal } from '../types/medals';

// Compute Totals for the given data 
export async function getCountryTotals(data: MedalsData): Promise<MedalsDataWithTotal> {
  return data.map(country => ({
    ...country,
    total: country.gold + country.silver + country.bronze
  }));
}

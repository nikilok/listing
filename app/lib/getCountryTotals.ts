"use server"

import type { MedalsData, MedalsDataWithTotal } from '../types/medals';
import { getCountryTotalsPure } from './getCountryTotals.pure';

// Server Action wrapper for the pure function
export async function getCountryTotals(data: MedalsData): Promise<MedalsDataWithTotal> {
  return getCountryTotalsPure(data);
}

"use client";

import { useQuery } from '@tanstack/react-query';
import type { MedalsDataWithTotal } from '../types/medals';
import type { Columns } from '../lib/SortingUtils';

type SortedDataResponse = Record<Columns, MedalsDataWithTotal>;

async function fetchSortedData(): Promise<SortedDataResponse> {
  const response = await fetch('/api/sortData');
  if (!response.ok) {
    throw new Error('Failed to fetch sorted data');
  }
  return response.json();
}

export function useSortData() {
  return useQuery<SortedDataResponse>({
    queryKey: ['sortData'],
    queryFn: fetchSortedData,
  });
}

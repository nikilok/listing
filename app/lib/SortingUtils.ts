import type { MedalsDataWithTotal } from '../types/medals';

export type Columns = 'total' | 'gold' | 'silver' | 'bronze';

// sort in descending order.
export function sortByColumn(data: MedalsDataWithTotal, column: Columns): MedalsDataWithTotal {
  return [...data].sort((a, b) => {
    return b[column] - a[column];
  });
}

// getTies for a given column
export function getTies(data: MedalsDataWithTotal, column: Columns): Map<number, MedalsDataWithTotal> {
  const tiesMap = new Map<number, MedalsDataWithTotal>();
  
  // Group countries by their column value
  const valueGroups = new Map<number, MedalsDataWithTotal>();
  
  data.forEach(country => {
    const value = country[column];
    if (!valueGroups.has(value)) {
      valueGroups.set(value, []);
    }
    valueGroups.get(value)!.push(country);
  });
  
  // Only keep groups that have more than one country (ties)
  valueGroups.forEach((countries, value) => {
    if (countries.length > 1) {
      tiesMap.set(value, countries);
    }
  });
  
  return tiesMap;
}

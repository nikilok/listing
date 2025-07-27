import type { MedalsDataWithTotal } from '../types/medals';

export type Columns = 'total' | 'gold' | 'silver' | 'bronze';

// sort in descending order.
export function sortByColumn(data: MedalsDataWithTotal, column: Columns): MedalsDataWithTotal {
  return [...data].sort((a, b) => {
    return b[column] - a[column];
  });
}

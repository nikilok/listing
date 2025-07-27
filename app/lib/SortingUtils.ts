import type { MedalsDataWithTotal } from "../types/medals";

export type Columns = "total" | "gold" | "silver" | "bronze";

// sort in descending order.
export function sortByColumn(
  data: MedalsDataWithTotal,
  column: Columns
): MedalsDataWithTotal {
  return [...data].sort((a, b) => {
    return b[column] - a[column];
  });
}

// getTies for a given column
export function getTies(
  data: MedalsDataWithTotal,
  column: Columns
): Map<number, MedalsDataWithTotal> {
  const tiesMap = new Map<number, MedalsDataWithTotal>();

  // Group countries by their column value
  const valueGroups = new Map<number, MedalsDataWithTotal>();

  data.forEach((country) => {
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

// getRanksByColumn returns the results by column
export function getRanksByColumn(
  data: MedalsDataWithTotal,
  column: Columns
): MedalsDataWithTotal {
  let sortedData = sortByColumn(data, column);
  const ties = getTies(sortedData, column);

  // return early if there are no ties
  if (ties.size === 0) {
    return sortedData;
  }

  // Apply tie-breaking rules
  const result: MedalsDataWithTotal = [];
  const processedCountries = new Set<string>();

  sortedData.forEach((row) => {
    // Skip if a country is already processed
    if (processedCountries.has(row.code)) {
      return;
    }

    const primaryValue = row[column];

    // Check if this value has ties
    if (ties.has(primaryValue)) {
      const tiedCountries = ties.get(primaryValue)!;

      // Apply tie-breaking rules based on primary column
      let sortedTiedCountries: MedalsDataWithTotal;

      switch (column) {
        case "total":
          // Ties broken by most gold
          sortedTiedCountries = sortByColumn(tiedCountries, "gold");
          break;
        case "gold":
          // Ties broken by most silver
          sortedTiedCountries = sortByColumn(tiedCountries, "silver");
          break;
        case "silver":
          // Ties broken by most gold
          sortedTiedCountries = sortByColumn(tiedCountries, "gold");
          break;
        case "bronze":
          // Ties broken by most gold
          sortedTiedCountries = sortByColumn(tiedCountries, "gold");
          break;
      }

      result.push(...sortedTiedCountries);

      // Mark all tied countries as processed so they are not reprocessed (we check this at the start)
      tiedCountries.forEach((c) => processedCountries.add(c.code));
    } else {
      // No tie, add the country as is
      result.push(row);
      processedCountries.add(row.code);
    }
  });

  return result;
}

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

// Advanced tie-breaking function that handles cascading ties
function breakTies(
  tiedCountries: MedalsDataWithTotal,
  primaryColumn: Columns
): MedalsDataWithTotal {
  // Define tie-breaking hierarchy based on Olympic standards
  const getTieBreakingOrder = (column: Columns): Columns[] => {
    switch (column) {
      case "total":
        return ["gold", "silver", "bronze"];
      case "gold":
        return ["silver", "bronze"];
      case "silver":
        return ["gold", "bronze"];
      case "bronze":
        return ["gold", "silver"];
    }
  };

  const tieBreakOrder = getTieBreakingOrder(primaryColumn);
  
  // Recursive function to sort with cascading tie-breaking
  function sortWithCascadingTieBreaking(
    countries: MedalsDataWithTotal,
    breakingColumns: Columns[]
  ): MedalsDataWithTotal {
    if (countries.length <= 1 || breakingColumns.length === 0) {
      return countries;
    }

    const [currentColumn, ...remainingColumns] = breakingColumns;
    
    // Sort by current tie-breaking column
    const sorted = sortByColumn(countries, currentColumn);
    
    // Group by current column value to find sub-ties
    const groups = new Map<number, MedalsDataWithTotal>();
    sorted.forEach((country) => {
      const value = country[currentColumn];
      if (!groups.has(value)) {
        groups.set(value, []);
      }
      groups.get(value)!.push(country);
    });

    // Recursively break ties within each group
    const result: MedalsDataWithTotal = [];
    for (const [value, group] of groups) {
      if (group.length > 1) {
        // Still tied, use next tie-breaking column
        const subSorted = sortWithCascadingTieBreaking(group, remainingColumns);
        result.push(...subSorted);
      } else {
        // No tie in this group
        result.push(...group);
      }
    }

    return result;
  }

  return sortWithCascadingTieBreaking(tiedCountries, tieBreakOrder);
}

// getRanksByColumn returns the results by column
export function getRanksByColumn(
  data: MedalsDataWithTotal,
  column: Columns
): MedalsDataWithTotal {
  const sortedData = sortByColumn(data, column);
  const ties = getTies(sortedData, column);

  // return early if there are no ties
  if (ties.size === 0) {
    return sortedData;
  }

  // Apply advanced tie-breaking rules
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

      // Apply cascading tie-breaking rules
      const sortedTiedCountries = breakTies(tiedCountries, column);

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

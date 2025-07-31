"use client";

import Flag from "./Flag";
import type { MedalsDataWithTotal } from "../types/medals";
import { useSearchParams } from "next/navigation";
import { useSortData } from "../hooks/useSortData";
import { useEffect, useState } from "react";
import type { Columns } from "../lib/SortingUtils";

interface MedalsTableProps {
  data: MedalsDataWithTotal;
  initialSort: Columns;
}

export default function MedalsTable({
  data: serverData,
  initialSort,
}: MedalsTableProps) {
  const searchParams = useSearchParams();

  // Local state for current sort to avoid server round-trips
  const [currentSort, setCurrentSort] = useState<Columns>(
    (searchParams.get("sort") as Columns) || initialSort
  );

  const { data: clientData, error } = useSortData();

  // State to track if we should use client data
  const [useClientData, setUseClientData] = useState(false);
  const [displayData, setDisplayData] = useState(serverData);

  const handleSortClick = (column: Columns) => {
    if (clientData) {
      const url = new URL(window.location.href);
      url.searchParams.set("sort", column);
      window.history.replaceState({}, "", url.toString());

      setCurrentSort(column);
      setUseClientData(true);
      setDisplayData(clientData[column]);
    } else {
      // Fallback to server request if no client data - force full page reload
      window.location.href = `/?sort=${column}`;
    }
  }; 

  useEffect(() => {
    if (clientData && useClientData) {
      setDisplayData(clientData[currentSort]);
    }
  }, [clientData, useClientData, currentSort]);

  // Show error state
  if (useClientData && error) {
    return (
      <div className="w-full sm:max-w-4xl sm:mx-auto overflow-x-auto">
        <div className="text-center py-8 text-red-600">
          <p>Error loading sorted data. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full sm:max-w-4xl sm:mx-auto overflow-x-auto">
      <table className="w-full min-w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 border-b-2 border-gray-200">
            <th className="text-left py-3 px-2 sm:py-4 sm:px-3 font-semibold text-gray-700 w-8 sm:w-16 text-xs sm:text-base"></th>
            <th className="text-left py-3 px-3 sm:py-4 sm:px-6 font-semibold text-gray-700 text-xs sm:text-base"></th>
            <th className="text-center py-3 px-1 sm:py-4 sm:px-4 font-semibold text-yellow-600">
              <div className="flex justify-center">
                <button
                  onClick={() => handleSortClick("gold")}
                  className={`hover:scale-110 transition-transform cursor-pointer p-1 ${
                    currentSort === "gold"
                      ? "ring-2 ring-yellow-400 rounded-full"
                      : ""
                  }`}
                  title="Sort by Gold medals"
                >
                  <div className="w-4 h-4 sm:w-6 sm:h-6 bg-yellow-500 rounded-full"></div>
                </button>
              </div>
            </th>
            <th className="text-center py-3 px-1 sm:py-4 sm:px-4 font-semibold text-gray-500">
              <div className="flex justify-center">
                <button
                  onClick={() => handleSortClick("silver")}
                  className={`hover:scale-110 transition-transform cursor-pointer p-1 ${
                    currentSort === "silver"
                      ? "ring-2 ring-gray-400 rounded-full"
                      : ""
                  }`}
                  title="Sort by Silver medals"
                >
                  <div className="w-4 h-4 sm:w-6 sm:h-6 bg-gray-400 rounded-full"></div>
                </button>
              </div>
            </th>
            <th className="text-center py-3 px-1 sm:py-4 sm:px-4 font-semibold text-yellow-800">
              <div className="flex justify-center">
                <button
                  onClick={() => handleSortClick("bronze")}
                  className={`hover:scale-110 transition-transform cursor-pointer p-1 ${
                    currentSort === "bronze"
                      ? "ring-2 ring-yellow-800 rounded-full"
                      : ""
                  }`}
                  title="Sort by Bronze medals"
                >
                  <div className="w-4 h-4 sm:w-6 sm:h-6 bg-yellow-800 rounded-full"></div>
                </button>
              </div>
            </th>
            <th className="text-center py-3 px-2 sm:py-4 sm:px-6 font-semibold text-gray-700 text-xs sm:text-base">
              <button
                onClick={() => handleSortClick("total")}
                className={`hover:text-blue-600 transition-colors cursor-pointer px-2 py-1 rounded ${
                  currentSort === "total"
                    ? "text-blue-600 font-bold bg-blue-100"
                    : ""
                }`}
                title="Sort by Total medals"
              >
                TOTAL
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {displayData.map((country, index) => (
            <tr
              key={country.code}
              className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 px-2 sm:py-4 sm:px-3 text-gray-600 font-medium text-center text-sm sm:text-base">
                {index + 1}
              </td>
              <td className="py-3 px-3 sm:py-4 sm:px-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Flag countryCode={country.code} />
                  <span className="font-semibold text-gray-800 text-sm sm:text-base">
                    {country.code}
                  </span>
                </div>
              </td>
              <td className="text-center py-3 px-1 sm:py-4 sm:px-4 font-bold text-sm sm:text-lg text-yellow-600">
                {country.gold}
              </td>
              <td className="text-center py-3 px-1 sm:py-4 sm:px-4 font-bold text-sm sm:text-lg text-gray-600">
                {country.silver}
              </td>
              <td className="text-center py-3 px-1 sm:py-4 sm:px-4 font-bold text-sm sm:text-lg text-yellow-800">
                {country.bronze}
              </td>
              <td className="text-center py-3 px-2 sm:py-4 sm:px-6 font-bold text-lg sm:text-xl text-gray-800">
                {country.total}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

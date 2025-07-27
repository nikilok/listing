"use client";

import Flag from "./Flag";
import type { MedalsDataWithTotal } from "../types/medals";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface MedalsTableProps {
  data: MedalsDataWithTotal;
}

export default function MedalsTable({ data }: MedalsTableProps) {
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "gold";

  return (
    <div className="w-full max-w-4xl mx-auto overflow-x-auto">
      <table className="w-full min-w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 border-b-2 border-gray-200">
            <th className="text-left py-3 px-2 sm:py-4 sm:px-3 font-semibold text-gray-700 w-8 sm:w-16 text-xs sm:text-base"></th>
            <th className="text-left py-3 px-3 sm:py-4 sm:px-6 font-semibold text-gray-700 text-xs sm:text-base"></th>
            <th className="text-center py-3 px-1 sm:py-4 sm:px-4 font-semibold text-yellow-600">
              <Link
                href="/?sort=gold"
                className={`block hover:scale-110 transition-transform cursor-pointer ${
                  currentSort === "gold"
                    ? "ring-2 ring-yellow-400 ring-offset-2 rounded-full"
                    : ""
                }`}
                title="Sort by Gold medals"
              >
                <div className="w-4 h-4 sm:w-6 sm:h-6 bg-yellow-500 rounded-full mx-auto"></div>
              </Link>
            </th>
            <th className="text-center py-3 px-1 sm:py-4 sm:px-4 font-semibold text-gray-500">
              <Link
                href="/?sort=silver"
                className={`block hover:scale-110 transition-transform cursor-pointer ${
                  currentSort === "silver"
                    ? "ring-2 ring-gray-400 ring-offset-2 rounded-full"
                    : ""
                }`}
                title="Sort by Silver medals"
              >
                <div className="w-4 h-4 sm:w-6 sm:h-6 bg-gray-400 rounded-full mx-auto"></div>
              </Link>
            </th>
            <th className="text-center py-3 px-1 sm:py-4 sm:px-4 font-semibold text-yellow-800">
              <Link
                href="/?sort=bronze"
                className={`block hover:scale-110 transition-transform cursor-pointer ${
                  currentSort === "bronze"
                    ? "ring-2 ring-yellow-800 ring-offset-2 rounded-full"
                    : ""
                }`}
                title="Sort by Bronze medals"
              >
                <div className="w-4 h-4 sm:w-6 sm:h-6 bg-yellow-800 rounded-full mx-auto"></div>
              </Link>
            </th>
            <th className="text-center py-3 px-2 sm:py-4 sm:px-6 font-semibold text-gray-700 text-xs sm:text-base">
              <Link
                href="/?sort=total"
                className={`hover:text-blue-600 transition-colors cursor-pointer ${
                  currentSort === "total"
                    ? "text-blue-600 font-bold underline"
                    : ""
                }`}
                title="Sort by Total medals"
              >
                TOTAL
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((country, index) => (
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

import medalsDataJson from "./lib/medals.json";
import { getCountryTotals } from "./lib/getCountryTotals";
import type { MedalsData } from "./types/medals";
import MedalsTable from "./components/MedalsTable";
import { getRanksByColumn } from "./lib/SortingUtils";

export default async function Home() {
  const medalsData = medalsDataJson as MedalsData;
  const medalsDataWithTotals = await getCountryTotals(medalsData);

  const top10SortedData = getRanksByColumn(medalsDataWithTotals, 'gold').slice(0, 10)
  return (
    <div className="font-sans min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Olympics Medal Rankings
      </h1>

      <MedalsTable data={top10SortedData} />
    </div>
  );
}

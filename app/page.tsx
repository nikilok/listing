import medalsDataJson from "./lib/medals.json";
import { getCountryTotals } from "./lib/getCountryTotals";
import type { MedalsData } from "./types/medals";
import MedalsTable from "./components/MedalsTable";
import { getRanksByColumn, type Columns } from "./lib/SortingUtils";

type SearchParams = {
  sort?: string;
};

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const medalsData = medalsDataJson as MedalsData;
  const medalsDataWithTotals = await getCountryTotals(medalsData);

  // Get sort parameter from URL, default to 'gold' if not provided or invalid
  const sortParam = searchParams.sort;
  const validColumns: Columns[] = ['gold', 'silver', 'bronze', 'total'];
  const sortColumn: Columns = validColumns.includes(sortParam as Columns) 
    ? (sortParam as Columns) 
    : 'gold';

  const top10SortedData = getRanksByColumn(medalsDataWithTotals, sortColumn).slice(0, 10);
  return (
    <div className="font-sans min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Olympics Medal Rankings
      </h1>

      <MedalsTable data={top10SortedData} />
    </div>
  );
}

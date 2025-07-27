import medalsDataJson from './lib/medals.json';
import { getCountryTotals } from './lib/getCountryTotals';
import type { MedalsData } from './types/medals';
import FlagsGrid from './components/FlagsGrid';
import MedalsTable from './components/MedalsTable';

export default async function Home() {
  const medalsData = medalsDataJson as MedalsData;
  const medalsDataWithTotals = await getCountryTotals(medalsData);
  
  const sortedData = [...medalsDataWithTotals]

  return (
    <div className="font-sans min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Olympics Medal Rankings</h1>
      
      {/* Table View */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-6 text-center">Medal Table</h2>
        <MedalsTable data={sortedData} />
      </div>
    </div>
  );
}

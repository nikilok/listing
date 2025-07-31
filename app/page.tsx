import MedalsTable from './components/MedalsTable'
import { getCountryTotals } from './lib/getCountryTotals'
import medalsDataJson from './lib/medals.json'
import { type Columns, getRanksByColumn } from './lib/SortingUtils'
import type { MedalsData } from './types/medals'

type SearchParams = {
  sort?: string
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const medalsData = medalsDataJson as MedalsData
  const medalsDataWithTotals = await getCountryTotals(medalsData)

  const params = await searchParams
  const sortParam = params.sort
  const validColumns: Columns[] = ['gold', 'silver', 'bronze', 'total']
  const sortColumn: Columns = validColumns.includes(sortParam as Columns)
    ? (sortParam as Columns)
    : 'gold'

  const top10SortedData = getRanksByColumn(
    medalsDataWithTotals,
    sortColumn
  ).slice(0, 10)
  return (
    <div className="font-sans min-h-screen px-0 py-4 sm:p-8">
      <h1 className="text-3xl font-bold mb-4 sm:mb-8 text-center px-4 sm:px-0">
        Olympics Medal Rankings
      </h1>

      <MedalsTable data={top10SortedData} initialSort={sortColumn} />
    </div>
  )
}

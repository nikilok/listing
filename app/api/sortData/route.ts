import { NextResponse } from 'next/server'
import { getCountryTotalsPure } from '../../lib/getCountryTotals.pure'
import medalsDataJson from '../../lib/medals.json'
import type { Columns } from '../../lib/SortingUtils'
import { getRanksByColumn } from '../../lib/SortingUtils'
import type { MedalsData, MedalsDataWithTotal } from '../../types/medals'

const TOP_COUNTRIES_LIMIT = 10

export async function GET() {
  try {
    const medalsData = medalsDataJson as MedalsData
    const medalsDataWithTotals = getCountryTotalsPure(medalsData)

    // Pre-sort data for all columns and take top countries
    const sortedData: Record<Columns, MedalsDataWithTotal> = {
      gold: getRanksByColumn(medalsDataWithTotals, 'gold').slice(
        0,
        TOP_COUNTRIES_LIMIT
      ),
      silver: getRanksByColumn(medalsDataWithTotals, 'silver').slice(
        0,
        TOP_COUNTRIES_LIMIT
      ),
      bronze: getRanksByColumn(medalsDataWithTotals, 'bronze').slice(
        0,
        TOP_COUNTRIES_LIMIT
      ),
      total: getRanksByColumn(medalsDataWithTotals, 'total').slice(
        0,
        TOP_COUNTRIES_LIMIT
      ),
    }

    return NextResponse.json(sortedData)
  } catch (error) {
    console.error('Error generating sorted data:', error)
    return NextResponse.json(
      { error: 'Failed to generate sorted data' },
      { status: 500 }
    )
  }
}

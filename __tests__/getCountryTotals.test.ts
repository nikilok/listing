import { getCountryTotalsPure } from '../app/lib/getCountryTotals.pure'
import type { MedalsData, MedalsDataWithTotal } from '../app/types/medals'

describe('getCountryTotals', () => {
  it('should calculate total medals correctly for a single country', () => {
    const mockData: MedalsData = [
      {
        code: 'USA',
        gold: 5,
        silver: 3,
        bronze: 2,
      },
    ]

    const result = getCountryTotalsPure(mockData)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual({
      code: 'USA',
      gold: 5,
      silver: 3,
      bronze: 2,
      total: 10,
    })
  })

  it('should calculate total medals correctly for multiple countries', () => {
    const mockData: MedalsData = [
      {
        code: 'USA',
        gold: 9,
        silver: 7,
        bronze: 12,
      },
      {
        code: 'NOR',
        gold: 11,
        silver: 5,
        bronze: 10,
      },
      {
        code: 'GER',
        gold: 8,
        silver: 6,
        bronze: 5,
      },
    ]

    const result = getCountryTotalsPure(mockData)

    expect(result).toHaveLength(3)

    // Check USA
    expect(result[0]).toEqual({
      code: 'USA',
      gold: 9,
      silver: 7,
      bronze: 12,
      total: 28,
    })

    // Check Norway
    expect(result[1]).toEqual({
      code: 'NOR',
      gold: 11,
      silver: 5,
      bronze: 10,
      total: 26,
    })

    // Check Germany
    expect(result[2]).toEqual({
      code: 'GER',
      gold: 8,
      silver: 6,
      bronze: 5,
      total: 19,
    })
  })

  it('should handle countries with zero medals', () => {
    const mockData: MedalsData = [
      {
        code: 'ITA',
        gold: 0,
        silver: 0,
        bronze: 0,
      },
    ]

    const result = getCountryTotalsPure(mockData)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual({
      code: 'ITA',
      gold: 0,
      silver: 0,
      bronze: 0,
      total: 0,
    })
  })

  it('should handle empty data array', () => {
    const mockData: MedalsData = []

    const result = getCountryTotalsPure(mockData)

    expect(result).toHaveLength(0)
    expect(result).toEqual([])
  })

  it('should not mutate the original data', () => {
    const mockData: MedalsData = [
      {
        code: 'CAN',
        gold: 10,
        silver: 10,
        bronze: 5,
      },
    ]

    const originalData = JSON.parse(JSON.stringify(mockData)) // Deep copy
    const result = getCountryTotalsPure(mockData)

    // Original data should remain unchanged
    expect(mockData).toEqual(originalData)

    // Result should have the total property
    expect(result[0]).toHaveProperty('total', 25)
    expect(mockData[0]).not.toHaveProperty('total')
  })

  it('should handle large medal counts', () => {
    const mockData: MedalsData = [
      {
        code: 'CHN',
        gold: 999,
        silver: 888,
        bronze: 777,
      },
    ]

    const result = getCountryTotalsPure(mockData)

    expect(result[0]).toEqual({
      code: 'CHN',
      gold: 999,
      silver: 888,
      bronze: 777,
      total: 2664,
    })
  })

  it('should handle missing medal properties by defaulting to 0', () => {
    // Note: TypeScript won't allow this normally, but we're testing runtime behavior
    const mockData = [
      {
        code: 'FRA',
        // gold is missing
        silver: 5,
        bronze: 3,
      },
      {
        code: 'SPA',
        gold: 2,
        // silver is missing
        bronze: 1,
      },
      {
        code: 'ITA',
        gold: 4,
        silver: 2,
        // bronze is missing
      },
    ] as unknown as MedalsData

    const result = getCountryTotalsPure(mockData)

    expect(result).toHaveLength(3)

    // France: missing gold should default to 0
    expect(result[0]).toEqual({
      code: 'FRA',
      gold: 0,
      silver: 5,
      bronze: 3,
      total: 8,
    })

    // Spain: missing silver should default to 0
    expect(result[1]).toEqual({
      code: 'SPA',
      gold: 2,
      silver: 0,
      bronze: 1,
      total: 3,
    })

    // Italy: missing bronze should default to 0
    expect(result[2]).toEqual({
      code: 'ITA',
      gold: 4,
      silver: 2,
      bronze: 0,
      total: 6,
    })
  })
})

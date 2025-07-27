import { sortByColumn, getTies } from '../app/lib/SortingUtils';
import type { MedalsDataWithTotal } from '../app/types/medals';

describe('SortingUtils', () => {
  const mockData: MedalsDataWithTotal = [
    {
      code: 'USA',
      gold: 9,
      silver: 7,
      bronze: 12,
      total: 28
    },
    {
      code: 'RUS',
      gold: 13,
      silver: 11,
      bronze: 9,
      total: 33
    },
    {
      code: 'NOR',
      gold: 11,
      silver: 5,
      bronze: 10,
      total: 26
    },
    {
      code: 'GER',
      gold: 8,
      silver: 6,
      bronze: 5,
      total: 19
    },
    {
      code: 'FRA',
      gold: 4,
      silver: 4,
      bronze: 7,
      total: 15
    }
  ];

  describe('sortByColumn', () => {
    it('should sort by total medals in descending order', () => {
      const result = sortByColumn(mockData, 'total');

      expect(result).toHaveLength(5);
      expect(result[0].code).toBe('RUS'); // 33 total
      expect(result[1].code).toBe('USA'); // 28 total
      expect(result[2].code).toBe('NOR'); // 26 total
      expect(result[3].code).toBe('GER'); // 19 total
      expect(result[4].code).toBe('FRA'); // 15 total

      // Verify total values are in descending order
      expect(result[0].total).toBe(33);
      expect(result[1].total).toBe(28);
      expect(result[2].total).toBe(26);
      expect(result[3].total).toBe(19);
      expect(result[4].total).toBe(15);
    });

    it('should sort by gold medals in descending order', () => {
      const result = sortByColumn(mockData, 'gold');

      expect(result).toHaveLength(5);
      expect(result[0].code).toBe('RUS'); // 13 gold
      expect(result[1].code).toBe('NOR'); // 11 gold
      expect(result[2].code).toBe('USA'); // 9 gold
      expect(result[3].code).toBe('GER'); // 8 gold
      expect(result[4].code).toBe('FRA'); // 4 gold

      // Verify gold values are in descending order
      expect(result[0].gold).toBe(13);
      expect(result[1].gold).toBe(11);
      expect(result[2].gold).toBe(9);
      expect(result[3].gold).toBe(8);
      expect(result[4].gold).toBe(4);
    });

    it('should sort by silver medals in descending order', () => {
      const result = sortByColumn(mockData, 'silver');

      expect(result).toHaveLength(5);
      expect(result[0].code).toBe('RUS'); // 11 silver
      expect(result[1].code).toBe('USA'); // 7 silver
      expect(result[2].code).toBe('GER'); // 6 silver
      expect(result[3].code).toBe('NOR'); // 5 silver
      expect(result[4].code).toBe('FRA'); // 4 silver

      // Verify silver values are in descending order
      expect(result[0].silver).toBe(11);
      expect(result[1].silver).toBe(7);
      expect(result[2].silver).toBe(6);
      expect(result[3].silver).toBe(5);
      expect(result[4].silver).toBe(4);
    });

    it('should sort by bronze medals in descending order', () => {
      const result = sortByColumn(mockData, 'bronze');

      expect(result).toHaveLength(5);
      expect(result[0].code).toBe('USA'); // 12 bronze
      expect(result[1].code).toBe('NOR'); // 10 bronze
      expect(result[2].code).toBe('RUS'); // 9 bronze
      expect(result[3].code).toBe('FRA'); // 7 bronze
      expect(result[4].code).toBe('GER'); // 5 bronze

      // Verify bronze values are in descending order
      expect(result[0].bronze).toBe(12);
      expect(result[1].bronze).toBe(10);
      expect(result[2].bronze).toBe(9);
      expect(result[3].bronze).toBe(7);
      expect(result[4].bronze).toBe(5);
    });

    it('should handle empty data array', () => {
      const emptyData: MedalsDataWithTotal = [];
      const result = sortByColumn(emptyData, 'total');

      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });
  });

  describe('getTies', () => {
    const mockDataWithTies: MedalsDataWithTotal = [
      {
        code: 'USA',
        gold: 9,
        silver: 7,
        bronze: 12,
        total: 28
      },
      {
        code: 'CHN',
        gold: 9, // Tie with USA in gold
        silver: 5,
        bronze: 14,
        total: 28 // Tie with USA in total
      },
      {
        code: 'GER',
        gold: 8,
        silver: 7, // Tie with USA in silver
        bronze: 13,
        total: 28 // Tie with USA and CHN in total
      },
      {
        code: 'FRA',
        gold: 4,
        silver: 4,
        bronze: 7,
        total: 15
      },
      {
        code: 'ITA',
        gold: 4, // Tie with FRA in gold
        silver: 4, // Tie with FRA in silver
        bronze: 7, // Tie with FRA in bronze
        total: 15 // Tie with FRA in total
      }
    ];

    it('should identify ties in total column correctly', () => {
      const result = getTies(mockDataWithTies, 'total');

      expect(result.size).toBe(2);
      
      // Check tie for total = 28 (USA, CHN, GER)
      expect(result.has(28)).toBe(true);
      const totalTie28 = result.get(28)!;
      expect(totalTie28).toHaveLength(3);
      expect(totalTie28.map(c => c.code)).toEqual(expect.arrayContaining(['USA', 'CHN', 'GER']));

      // Check tie for total = 15 (FRA, ITA)
      expect(result.has(15)).toBe(true);
      const totalTie15 = result.get(15)!;
      expect(totalTie15).toHaveLength(2);
      expect(totalTie15.map(c => c.code)).toEqual(expect.arrayContaining(['FRA', 'ITA']));
    });

    it('should identify ties in gold column correctly', () => {
      const result = getTies(mockDataWithTies, 'gold');

      expect(result.size).toBe(2);
      
      // Check tie for gold = 9 (USA, CHN)
      expect(result.has(9)).toBe(true);
      const goldTie9 = result.get(9)!;
      expect(goldTie9).toHaveLength(2);
      expect(goldTie9.map(c => c.code)).toEqual(expect.arrayContaining(['USA', 'CHN']));

      // Check tie for gold = 4 (FRA, ITA)
      expect(result.has(4)).toBe(true);
      const goldTie4 = result.get(4)!;
      expect(goldTie4).toHaveLength(2);
      expect(goldTie4.map(c => c.code)).toEqual(expect.arrayContaining(['FRA', 'ITA']));
    });

    it('should identify ties in silver column correctly', () => {
      const result = getTies(mockDataWithTies, 'silver');

      expect(result.size).toBe(2);
      
      // Check tie for silver = 7 (USA, GER)
      expect(result.has(7)).toBe(true);
      const silverTie7 = result.get(7)!;
      expect(silverTie7).toHaveLength(2);
      expect(silverTie7.map(c => c.code)).toEqual(expect.arrayContaining(['USA', 'GER']));

      // Check tie for silver = 4 (FRA, ITA)
      expect(result.has(4)).toBe(true);
      const silverTie4 = result.get(4)!;
      expect(silverTie4).toHaveLength(2);
      expect(silverTie4.map(c => c.code)).toEqual(expect.arrayContaining(['FRA', 'ITA']));
    });

    it('should identify ties in bronze column correctly', () => {
      const result = getTies(mockDataWithTies, 'bronze');

      expect(result.size).toBe(1);
      
      // Check tie for bronze = 7 (FRA, ITA)
      expect(result.has(7)).toBe(true);
      const bronzeTie7 = result.get(7)!;
      expect(bronzeTie7).toHaveLength(2);
      expect(bronzeTie7.map(c => c.code)).toEqual(expect.arrayContaining(['FRA', 'ITA']));
    });

    it('should return empty map when no ties exist', () => {
      const dataWithoutTies: MedalsDataWithTotal = [
        {
          code: 'USA',
          gold: 9,
          silver: 7,
          bronze: 12,
          total: 28
        },
        {
          code: 'CHN',
          gold: 8,
          silver: 6,
          bronze: 11,
          total: 25
        },
        {
          code: 'GER',
          gold: 7,
          silver: 5,
          bronze: 10,
          total: 22
        }
      ];

      const result = getTies(dataWithoutTies, 'total');
      expect(result.size).toBe(0);
    });

    it('should handle empty data array', () => {
      const emptyData: MedalsDataWithTotal = [];
      const result = getTies(emptyData, 'total');

      expect(result.size).toBe(0);
    });

    it('should handle single country data', () => {
      const singleCountryData: MedalsDataWithTotal = [
        {
          code: 'USA',
          gold: 9,
          silver: 7,
          bronze: 12,
          total: 28
        }
      ];

      const result = getTies(singleCountryData, 'total');
      expect(result.size).toBe(0);
    });
  });
});

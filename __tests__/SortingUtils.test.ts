import { sortByColumn } from '../app/lib/SortingUtils';
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
});

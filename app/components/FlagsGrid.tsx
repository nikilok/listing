/**
 * This is only a sample component testing the flags usage
 */
import medalsData from '../lib/medals.json';
import Flag from './Flag';

export default function FlagsGrid() {
  return (
    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 max-w-4xl mx-auto">
      {medalsData.map((country) => (
        <div key={country.code} className="flex flex-col items-center p-4 border rounded-lg hover:shadow-lg transition-shadow">
          <Flag countryCode={country.code} />
          <span className="text-sm font-semibold mt-2">{country.code}</span>
          <div className="text-xs text-gray-600 mt-1">
            <div>🥇 {country.gold}</div>
            <div>🥈 {country.silver}</div>
            <div>🥉 {country.bronze}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

import '../flags.css';
import type { CountryCode } from '../types/medals';

interface FlagProps {
  countryCode: CountryCode;
  className?: string;
  title?: string;
}

export default function Flag({ countryCode, className = '', title }: FlagProps) {
  return (
    <div 
      className={`flag ${countryCode} ${className}`} 
      title={title || `${countryCode} Flag`}
    />
  );
}

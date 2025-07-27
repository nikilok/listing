import '../flags.css';

interface FlagProps {
  countryCode: string;
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

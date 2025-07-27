import FlagsGrid from './components/FlagsGrid';

export default function Home() {
  return (
    <div className="font-sans min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-8 text-center">Country Flags</h1>
      <FlagsGrid />
    </div>
  );
}

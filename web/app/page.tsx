import QRScanner from './components/QRScanner';

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <p className="text-base font-medium text-zinc-800 -mt-4 text-center">Scan a QR code to load your game</p>
      <QRScanner />
    </div>
  );
}

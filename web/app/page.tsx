import GameSelector from './components/GameSelector';

export default function Home() {
  return (
    <>
      <p className="text-base font-medium text-zinc-800 -mt-4">Scan a QR code to load your game</p>
      <GameSelector />
    </>
  );
}

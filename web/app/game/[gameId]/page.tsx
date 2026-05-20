import GameContent from '@/app/components/GameContent';
import Link from 'next/link';

function formatSlug(slug: string) {
  return slug.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
}

export default async function GamePage({ params }: { params: Promise<{ gameId: string }> }) {
  const { gameId } = await params;

  return (
    <>
      <nav className="text-sm font-medium text-black/60 -mt-2">
        <Link href="/" className="hover:text-black transition-colors">
          Games
        </Link>
        <span className="mx-1">›</span>
        <span className="text-black/80">{formatSlug(gameId)}</span>
      </nav>
      <GameContent gameId={gameId} />
    </>
  );
}

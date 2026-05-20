import ExpansionDetail from '@/app/components/ExpansionDetail';
import Link from 'next/link';

function formatSlug(slug: string) {
  return slug.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
}

export default async function ExpansionPage({
  params,
}: {
  params: Promise<{ gameId: string; expansionId: string }>;
}) {
  const { gameId, expansionId } = await params;

  return (
    <>
      <nav className="text-sm font-medium text-black/60 -mt-2">
        <Link href="/" className="hover:text-black transition-colors">
          Games
        </Link>
        <span className="mx-1">›</span>
        <Link href={`/game/${gameId}`} className="hover:text-black transition-colors">
          {formatSlug(gameId)}
        </Link>
        <span className="mx-1">›</span>
        <span className="text-black/80">{formatSlug(expansionId)}</span>
      </nav>
      <ExpansionDetail gameId={gameId} expansionId={expansionId} gameName={formatSlug(gameId)} />
    </>
  );
}

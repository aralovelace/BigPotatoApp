import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function ScanPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const { code } = await searchParams;

  if (code) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/content/scan?code=${encodeURIComponent(code)}`,
      { cache: 'no-store' }
    );
    if (res.ok) {
      const { gameId } = await res.json();
      redirect(`/game/${gameId}`);
    }
  }

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-sm">
      <p className="text-base font-semibold text-black">Game not found</p>
      <p className="text-base text-black/60 mt-1">
        {code
          ? "We couldn't match the code on your box. It may be from an older print run."
          : 'No QR code provided.'}
      </p>
      <Link
        href="/"
        className="inline-block mt-4 text-base font-medium text-black/60 hover:text-black transition-colors"
      >
        ← Back to the homepage
      </Link>
    </div>
  );
}

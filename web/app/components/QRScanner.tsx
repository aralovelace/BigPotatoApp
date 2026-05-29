'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import QrScanner from 'qr-scanner';

type State = 'idle' | 'scanning' | 'error';


export default function QRScanner() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);
  const [state, setState] = useState<State>('idle');
  const [pasteValue, setPasteValue] = useState('');

  function submitPaste() {
    const trimmed = pasteValue.trim();
    if (!trimmed) return;
    router.push(`/scan?code=${encodeURIComponent(trimmed)}`);
  }

  function stopScan() {
    scannerRef.current?.stop();
    scannerRef.current?.destroy();
    scannerRef.current = null;
    setState('idle');
  }

  useEffect(() => {
    if (state !== 'scanning' || !videoRef.current) return;

    const scanner = new QrScanner(
      videoRef.current,
      (result) => {
        scanner.stop();
        router.push(`/scan?code=${encodeURIComponent(result.data)}`);
      },
      { highlightScanRegion: true }
    );

    scanner.start().catch(() => setState('error'));
    scannerRef.current = scanner;

    return () => {
      scanner.stop();
      scanner.destroy();
    };
  }, [state, router]);

  if (state === 'scanning') {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-xl overflow-hidden bg-black">
          <video ref={videoRef} className="w-full h-full object-cover" />
        </div>
        <button
          onClick={stopScan}
          className="text-sm font-medium text-black/60 hover:text-black transition-colors"
        >
          Cancel
        </button>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-xl border-2 border-dashed border-red-300 flex items-center justify-center">
          <p className="text-xs font-medium text-red-400 text-center px-2">Camera unavailable</p>
        </div>
        <p className="text-sm font-medium text-black/60 text-center">
          Camera access was denied. Use the list below instead.
        </p>
        <button
          onClick={() => setState('idle')}
          className="text-sm font-medium text-black/60 hover:text-black transition-colors"
        >
          Dismiss
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <button onClick={() => setState('scanning')} className="flex flex-col items-center gap-3 w-full group">
        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-xl border-2 border-dashed border-black/30 group-hover:border-black flex items-center justify-center transition-colors">
          <div className="grid grid-cols-3 gap-1 sm:gap-1.5 p-2 sm:p-3">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-6 h-6 sm:w-8 sm:h-8 rounded-sm bg-black/20" />
            ))}
          </div>
        </div>
        <p className="text-sm font-medium text-black/90 text-center">
          Tap to scan the QR code on your box
        </p>
      </button>

      <div className="flex gap-2 w-full">
        <input
          type="text"
          value={pasteValue}
          onChange={(e) => setPasteValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submitPaste()}
          placeholder="No camera? Paste the QR code link here"
          className="flex-1 rounded-xl border border-black/20 px-4 py-2.5 text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-black transition-colors"
        />
        <button
          onClick={submitPaste}
          disabled={!pasteValue.trim()}
          className="rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-30 transition-opacity"
        >
          Go
        </button>
      </div>
    </div>
  );
}

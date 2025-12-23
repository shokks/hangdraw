'use client';

import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-stone-50/80 backdrop-blur-sm border-b border-stone-200/50">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image 
            src="/logo.svg" 
            alt="HangDraw" 
            width={32} 
            height={32}
            className="rounded-lg"
          />
          <span className="font-display font-bold text-stone-800 group-hover:text-orange-600 transition-colors">
            HangDraw
          </span>
        </Link>
      </div>
    </header>
  );
}

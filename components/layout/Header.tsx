'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { User, X } from 'lucide-react';

export function Header() {
  const [playerName, setPlayerName] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // Read initial name
    const name = sessionStorage.getItem('hangdraw-player-name');
    setPlayerName(name);

    // Listen for name changes (custom event from other components)
    const handleNameChange = () => {
      const updatedName = sessionStorage.getItem('hangdraw-player-name');
      setPlayerName(updatedName);
    };

    window.addEventListener('hangdraw-name-changed', handleNameChange);
    return () => window.removeEventListener('hangdraw-name-changed', handleNameChange);
  }, []);

  const handleRemoveName = () => {
    sessionStorage.removeItem('hangdraw-player-name');
    setPlayerName(null);
    setShowMenu(false);
    window.location.reload();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-stone-50/80 backdrop-blur-sm border-b border-stone-200/50">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 h-12 sm:h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group">
          <Image 
            src="/logo.svg" 
            alt="HangDraw" 
            width={28} 
            height={28}
            className="rounded-lg sm:w-8 sm:h-8"
          />
          <span className="font-display font-bold text-sm sm:text-base text-stone-800 group-hover:text-orange-600 transition-colors">
            HangDraw
          </span>
        </Link>

        {/* Player name */}
        {playerName && (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 transition-colors"
            >
              <User className="w-3.5 h-3.5 text-stone-500" />
              <span className="text-xs sm:text-sm font-medium text-stone-700">{playerName}</span>
            </button>
            
            {showMenu && (
              <>
                <div className="fixed inset-0" onClick={() => setShowMenu(false)} />
                <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-stone-200 overflow-hidden animate-fade-in">
                  <button
                    onClick={handleRemoveName}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-stone-600 hover:bg-stone-50 w-full"
                  >
                    <X className="w-4 h-4" />
                    Change name
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

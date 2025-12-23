import Link from 'next/link';

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-stone-50/80 backdrop-blur-sm border-t border-stone-200/50">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 h-10 sm:h-12 flex items-center justify-center gap-2">
        <span className="text-xs text-stone-400">created by</span>
        <Link 
          href="https://twitter.com/5aikat" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-stone-600 hover:text-orange-600 transition-colors"
        >
          <img 
            src="https://unavatar.io/twitter/5aikat" 
            alt="@5aikat"
            className="w-5 h-5 rounded-full"
          />
          <span className="font-medium">@5aikat</span>
        </Link>
      </div>
    </footer>
  );
}

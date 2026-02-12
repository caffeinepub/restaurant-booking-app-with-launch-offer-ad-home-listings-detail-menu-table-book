import { Home, Film } from 'lucide-react';

interface BottomNavProps {
  currentTab: 'home' | 'reels';
  onTabChange: (tab: 'home' | 'reels') => void;
}

export default function BottomNav({ currentTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-around px-4">
        <button
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center justify-center gap-1 px-6 py-2 transition-colors ${
            currentTab === 'home'
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Home className="h-6 w-6" />
          <span className="text-xs font-medium">Home</span>
        </button>
        <button
          onClick={() => onTabChange('reels')}
          className={`flex flex-col items-center justify-center gap-1 px-6 py-2 transition-colors ${
            currentTab === 'reels'
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Film className="h-6 w-6" />
          <span className="text-xs font-medium">Reels</span>
        </button>
      </div>
    </nav>
  );
}

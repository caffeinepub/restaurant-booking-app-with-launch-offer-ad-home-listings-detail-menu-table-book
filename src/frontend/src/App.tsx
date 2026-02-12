import { useState, useEffect } from 'react';
import { useActor } from './hooks/useActor';
import { Home, Film } from 'lucide-react';
import HomeTab from './pages/HomeTab';
import ReelsTab from './pages/ReelsTab';
import RestaurantDetailPage from './pages/RestaurantDetailPage';
import LaunchOfferAd from './components/LaunchOfferAd';
import BottomNav from './components/BottomNav';

type View = 'home' | 'reels' | 'detail';

function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'reels'>('home');
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<bigint | null>(null);
  const [showOfferAd, setShowOfferAd] = useState(false);
  const { actor } = useActor();

  useEffect(() => {
    // Check if offer ad has been shown this session
    const adShown = sessionStorage.getItem('offerAdShown');
    if (!adShown) {
      setShowOfferAd(true);
    }
  }, []);

  useEffect(() => {
    // Initialize backend data on mount
    if (actor) {
      actor.initializeData().catch(console.error);
    }
  }, [actor]);

  const handleCloseAd = () => {
    setShowOfferAd(false);
    sessionStorage.setItem('offerAdShown', 'true');
  };

  const handleRestaurantClick = (id: bigint) => {
    setSelectedRestaurantId(id);
    setCurrentView('detail');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setCurrentTab('home');
    setSelectedRestaurantId(null);
  };

  const handleTabChange = (tab: 'home' | 'reels') => {
    setCurrentTab(tab);
    setCurrentView(tab);
    setSelectedRestaurantId(null);
  };

  const getAssetPath = (path: string) => {
    const base = (window as any).ASSET_BASE || '';
    return base ? `${base}${path}` : path;
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {showOfferAd && <LaunchOfferAd onClose={handleCloseAd} />}
      
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <img 
              src={getAssetPath("/assets/generated/app-logo.dim_512x512.png")}
              alt="App Logo" 
              className="h-10 w-10 rounded-lg"
            />
            <h1 className="text-xl font-bold text-foreground">TableBook</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {currentView === 'home' && (
          <HomeTab onRestaurantClick={handleRestaurantClick} />
        )}
        {currentView === 'reels' && <ReelsTab />}
        {currentView === 'detail' && selectedRestaurantId && (
          <RestaurantDetailPage 
            restaurantId={selectedRestaurantId} 
            onBack={handleBackToHome}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav currentTab={currentTab} onTabChange={handleTabChange} />
    </div>
  );
}

export default App;

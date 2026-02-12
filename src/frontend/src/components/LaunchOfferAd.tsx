import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LaunchOfferAdProps {
  onClose: () => void;
}

export default function LaunchOfferAd({ onClose }: LaunchOfferAdProps) {
  const getAssetPath = (path: string) => {
    const base = (window as any).ASSET_BASE || '';
    return base ? `${base}${path}` : path;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative mx-4 max-w-2xl w-full overflow-hidden rounded-2xl bg-card shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-background/80 p-2 text-foreground backdrop-blur transition-colors hover:bg-background"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="relative">
          <img
            src={getAssetPath("/assets/generated/offer-banner.dim_1200x600.png")}
            alt="Special Offer"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="p-8 space-y-4">
          <div className="flex items-center gap-3">
            <img 
              src={getAssetPath("/assets/generated/app-logo.dim_512x512.png")}
              alt="Logo" 
              className="h-12 w-12 rounded-lg"
            />
            <div>
              <h2 className="text-2xl font-bold text-foreground">Welcome to TableBook!</h2>
              <p className="text-sm text-muted-foreground">Your dining companion</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-primary">🎉 Special Launch Offer</h3>
            <p className="text-lg text-foreground">
              Get <span className="font-bold text-primary">20% OFF</span> your first booking at any of our partner restaurants!
            </p>
            <p className="text-sm text-muted-foreground">
              Book a table today and enjoy exclusive dining experiences at the finest restaurants in town.
            </p>
          </div>

          <Button 
            onClick={onClose}
            className="w-full"
            size="lg"
          >
            Explore Restaurants
          </Button>
        </div>
      </div>
    </div>
  );
}

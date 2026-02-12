import { useReels } from '../hooks/useQueries';
import ReelPlayer from '../components/ReelPlayer';
import { Skeleton } from '@/components/ui/skeleton';

export default function ReelsTab() {
  const { data: reels, isLoading, error } = useReels();

  const getAssetPath = (path: string) => {
    const base = (window as any).ASSET_BASE || '';
    return base ? `${base}${path}` : path;
  };

  if (isLoading) {
    return (
      <div className="container px-4 py-6 space-y-6">
        {[1, 2].map((i) => (
          <Skeleton key={i} className="w-full aspect-[9/16] max-h-[70vh] rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="container px-4 py-12 text-center">
        <p className="text-destructive">Failed to load reels. Please try again.</p>
      </div>
    );
  }

  if (!reels || reels.length === 0) {
    return (
      <div className="container px-4 py-12 text-center space-y-6">
        <img
          src={getAssetPath("/assets/generated/empty-reels.dim_800x600.png")}
          alt="No reels"
          className="mx-auto max-w-md w-full rounded-lg"
        />
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">No Reels Available</h2>
          <p className="text-muted-foreground">Check back soon for exciting restaurant videos!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Restaurant Reels</h2>
        <p className="text-muted-foreground">Discover amazing dining experiences</p>
      </div>
      
      <div className="space-y-6 max-w-md mx-auto">
        {reels.map((reel) => (
          <ReelPlayer key={reel.id.toString()} reel={reel} />
        ))}
      </div>
    </div>
  );
}

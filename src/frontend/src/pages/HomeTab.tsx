import { useRestaurants } from '../hooks/useQueries';
import RestaurantCard from '../components/RestaurantCard';
import { Skeleton } from '@/components/ui/skeleton';

interface HomeTabProps {
  onRestaurantClick: (id: bigint) => void;
}

export default function HomeTab({ onRestaurantClick }: HomeTabProps) {
  const { data: restaurants, isLoading, error } = useRestaurants();

  const getAssetPath = (path: string) => {
    const base = (window as any).ASSET_BASE || '';
    return base ? `${base}${path}` : path;
  };

  if (isLoading) {
    return (
      <div className="container px-4 py-6 space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-32 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="container px-4 py-12 text-center">
        <p className="text-destructive">Failed to load restaurants. Please try again.</p>
      </div>
    );
  }

  if (!restaurants || restaurants.length === 0) {
    return (
      <div className="container px-4 py-12 text-center space-y-6">
        <img
          src={getAssetPath("/assets/generated/empty-restaurants.dim_800x600.png")}
          alt="No restaurants"
          className="mx-auto max-w-md w-full rounded-lg"
        />
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">No Restaurants Available</h2>
          <p className="text-muted-foreground">Check back soon for new dining options!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Discover Restaurants</h2>
        <p className="text-muted-foreground">Find your next dining experience</p>
      </div>
      
      <div className="space-y-4">
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id.toString()}
            restaurant={restaurant}
            onClick={() => onRestaurantClick(restaurant.id)}
          />
        ))}
      </div>
    </div>
  );
}

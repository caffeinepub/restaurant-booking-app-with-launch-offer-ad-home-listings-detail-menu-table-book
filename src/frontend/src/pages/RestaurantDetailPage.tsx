import { useState } from 'react';
import { ArrowLeft, MapPin, Calendar } from 'lucide-react';
import { useRestaurantDetails, useCreateBooking } from '../hooks/useQueries';
import MenuList from '../components/MenuList';
import BookingForm, { type BookingData } from '../components/BookingForm';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface RestaurantDetailPageProps {
  restaurantId: bigint;
  onBack: () => void;
}

export default function RestaurantDetailPage({ restaurantId, onBack }: RestaurantDetailPageProps) {
  const { data: restaurant, isLoading, error } = useRestaurantDetails(restaurantId);
  const createBooking = useCreateBooking();
  const [showBookingForm, setShowBookingForm] = useState(false);

  const handleBookingSubmit = async (data: BookingData) => {
    try {
      // Combine date and time into a timestamp
      const dateTime = new Date(`${data.date}T${data.time}`).getTime();
      const dateTimeNanos = BigInt(dateTime) * BigInt(1_000_000); // Convert to nanoseconds

      const bookingId = await createBooking.mutateAsync({
        restaurantId,
        customerName: data.customerName,
        dateTime: dateTimeNanos,
        partySize: BigInt(data.partySize)
      });

      if (bookingId && bookingId > 0n) {
        toast.success('Booking Confirmed!', {
          description: `Your table at ${restaurant?.name} has been reserved. Booking ID: ${bookingId.toString()}`
        });
        setShowBookingForm(false);
      } else {
        toast.error('Booking Failed', {
          description: 'Unable to create booking. Please try again.'
        });
      }
    } catch (err) {
      toast.error('Booking Failed', {
        description: 'An error occurred. Please try again.'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container px-4 py-6 space-y-6">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="container px-4 py-12 text-center">
        <p className="text-destructive mb-4">Failed to load restaurant details.</p>
        <Button onClick={onBack}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="container px-4 py-6 space-y-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      {/* Restaurant Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-center w-full h-48 bg-muted rounded-xl">
          <span className="text-8xl">🍽️</span>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{restaurant.name}</h1>
          <p className="text-muted-foreground mb-3">{restaurant.description}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{restaurant.address}</span>
          </div>
        </div>

        {/* Book Table Button */}
        <Button
          onClick={() => setShowBookingForm(true)}
          size="lg"
          className="w-full gap-2"
        >
          <Calendar className="h-5 w-5" />
          Book a Table
        </Button>
      </div>

      {/* Menu Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Menu</h2>
        <MenuList items={restaurant.menu} />
      </div>

      {/* Booking Form Dialog */}
      <Dialog open={showBookingForm} onOpenChange={setShowBookingForm}>
        <DialogContent className="max-w-lg">
          <BookingForm
            restaurantId={restaurantId}
            restaurantName={restaurant.name}
            onSubmit={handleBookingSubmit}
            onCancel={() => setShowBookingForm(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

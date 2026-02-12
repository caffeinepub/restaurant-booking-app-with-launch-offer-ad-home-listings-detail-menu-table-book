import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Restaurant, Reel } from '../backend';

export function useRestaurants() {
  const { actor, isFetching } = useActor();

  return useQuery<Restaurant[]>({
    queryKey: ['restaurants'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRestaurants();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRestaurantDetails(id: bigint) {
  const { actor, isFetching } = useActor();

  return useQuery<Restaurant | null>({
    queryKey: ['restaurant', id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getRestaurantDetails(id);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useReels() {
  const { actor, isFetching } = useActor();

  return useQuery<Reel[]>({
    queryKey: ['reels'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllReels();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      restaurantId,
      customerName,
      dateTime,
      partySize
    }: {
      restaurantId: bigint;
      customerName: string;
      dateTime: bigint;
      partySize: bigint;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.createBooking(restaurantId, customerName, dateTime, partySize);
    },
    onSuccess: () => {
      // Optionally invalidate queries if needed
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

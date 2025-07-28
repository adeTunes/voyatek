import { useQuery } from '@tanstack/react-query';
import { searchFlights, searchHotels, searchActivities } from '../api/bookingApi';

export function useFlightsSearch(params: Record<string, any>) {
  return useQuery(['flights', params], () => searchFlights(params), { enabled: !!params });
}

export function useHotelsSearch(params: Record<string, any>) {
  return useQuery(['hotels', params], () => searchHotels(params), { enabled: !!params });
}

export function useActivitiesSearch(params: Record<string, any>) {
  return useQuery(['activities', params], () => searchActivities(params), { enabled: !!params });
}

import api from '../api/rapidApi';

export async function searchFlights(params: Record<string, any>) {
  const { data } = await api.get('/flights/search', { params });
  return data;
}

export async function searchHotels(params: Record<string, any>) {
  const { data } = await api.get('/hotels/search', { params });
  return data;
}

export async function searchActivities(params: Record<string, any>) {
  const { data } = await api.get('/attractions/search', { params });
  return data;
}

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://booking-com15.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '',
    'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com',
  },
});

export default api;

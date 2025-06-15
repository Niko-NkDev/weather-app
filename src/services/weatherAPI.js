// src/services/weatherAPI.js
import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

console.log("API Key:", API_KEY);

export const getWeatherByCity = async (city) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
        lang: 'es',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Ciudad no encontrada o error en la API');
  }
};

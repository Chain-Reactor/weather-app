const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_WEATHER_API_URL;

export const weatherApi = {
  async getForecastWithLocation(location: string, days: number = 7) {
    try {
      const response = await fetch(
        `${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=${days}&aqi=no`
      );
      
      if (!response.ok) {
        throw new Error('Weather data fetch failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  },

  async getForecastWithCoordinates(longitude: number, latitude: number, days: number = 7) {
    try {
      const response = await fetch(
        `${BASE_URL}/forecast.json?key=${API_KEY}&q=${longitude},${latitude}&days=${days}&aqi=no`
      );

      if (!response.ok) {
        throw new Error('Weather data fetch failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  },

  async getHistoryWithLocation(location: string, date: string) {
    try {
      const response = await fetch(
        `${BASE_URL}/history.json?key=${API_KEY}&q=${location}&dt=${date}`
      );

      if (!response.ok) {
        throw new Error('Weather data fetch failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  },

  async getHistoryWithCoordinates(longitude: number, latitude: number, date: string) {
    try {
      const response = await fetch(
        `${BASE_URL}/history.json?key=${API_KEY}&q=${longitude},${latitude}&dt=${date}`
      );

      if (!response.ok) {
        throw new Error('Weather data fetch failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }
}; 
import { useState, useCallback } from 'react';
import { weatherApi } from '../services/weatherApi';

export const useWeather = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherWithLocation = useCallback(async (location: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await weatherApi.getForecastWithLocation(location);
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWeatherWithCoordinates = useCallback(async (longitude: number, latitude: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await weatherApi.getForecastWithCoordinates(longitude, latitude);
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWeatherWithLocationAndDate = useCallback(async (location: string, date: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await weatherApi.getHistoryWithLocation(location, date);
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWeatherWithCoordinatesAndDate = useCallback(async (longitude: number, latitude: number, date: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await weatherApi.getHistoryWithCoordinates(longitude, latitude, date);
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  }, []);

  return { weatherData, loading, error, fetchWeatherWithLocation, fetchWeatherWithCoordinates, fetchWeatherWithLocationAndDate, fetchWeatherWithCoordinatesAndDate };
}; 

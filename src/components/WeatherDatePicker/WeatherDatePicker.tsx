import { useState, useEffect } from 'react';
import { WeatherCard } from '../WeatherCard/WeatherCard';
import { WeatherData } from '../../types/weather';
import styles from './WeatherDatePicker.module.css';

interface WeatherDatePickerProps {
  data: WeatherData;
}

export const WeatherDatePicker = ({ data }: WeatherDatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedDayWeather, setSelectedDayWeather] = useState<any>(null);

  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 6);
  const maxDateString = maxDate.toISOString().split('T')[0];

  const findWeatherForDate = (date: string) => {
    const dayData = data.forecast.forecastday.find(day => day.date === date);

    if (!dayData) {
      setSelectedDayWeather(null);
      return;
    }

    setSelectedDayWeather({
      date: dayData.date,
      maxTemp: dayData.day.maxtemp_c,
      minTemp: dayData.day.mintemp_c,
      avgTemp: dayData.day.avgtemp_c,
      condition: dayData.day.condition,
      humidity: dayData.day.avghumidity,
      windSpeed: dayData.day.maxwind_kph,
      precipitation: dayData.day.totalprecip_mm,
      hourlyForecast: dayData.hour,
      location: data.location
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setSelectedDate(date);
    findWeatherForDate(date);
  };

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderHourlyForecast = (hourlyForecast: any[]) => {
    return hourlyForecast.map((hour, index) => (
      index % 3 === 0 && (
        <div key={hour.time} className={styles.hourlyItem}>
          <div>
            {new Date(hour.time).getHours()}:00
          </div>
          <img 
            src={hour.condition.icon} 
            alt={hour.condition.text}
            className={hour.condition.icon}
          />
          <div>
            {Math.round(hour.temp_c)}°C
          </div>
        </div>
      )
    ));
  };

  useEffect(() => {
    setSelectedDate(today);
    findWeatherForDate(today);
  }, [data]);

  if (!data) return null;

  return (
    <div className={styles.container}>
      <div className={styles.datePickerContainer}>
        <label htmlFor="date">Select Date:</label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          min={today}
          max={maxDateString}
          onChange={handleDateChange}
          className={styles.dateInput}
        />
      </div>

      {!selectedDayWeather && (
        <div className={styles.noData}>
          <p>No weather data available for selected date</p>
        </div>
      )}

      {selectedDayWeather && (
        <div className={styles.weatherContent}>
          <div className={styles.locationInfo}>
            <h2>{selectedDayWeather.location.name}</h2>
            <p>{selectedDayWeather.location.country}</p>
          </div>

          <div className={styles.mainWeather}>
            <WeatherCard
              date={formatDate(selectedDayWeather.date)}
              temp={selectedDayWeather.avgTemp}
              condition={selectedDayWeather.condition.text}
              icon={selectedDayWeather.condition.icon}
              isDetailed
              details={{
                humidity: selectedDayWeather.humidity,
                wind: selectedDayWeather.windSpeed,
                precipitation: selectedDayWeather.precipitation
              }}
            />
          </div>

          <div className={styles.tempRange}>
            <div className={styles.tempItem}>
              <span>Min</span>
              <span>{selectedDayWeather.minTemp}°C</span>
            </div>
            <div className={styles.tempItem}>
              <span>Max</span>
              <span>{selectedDayWeather.maxTemp}°C</span>
            </div>
          </div>

          <div className={styles.hourlyGrid}>
            {renderHourlyForecast(selectedDayWeather.hourlyForecast)}
          </div>
        </div>
      )}
    </div>
  );
};
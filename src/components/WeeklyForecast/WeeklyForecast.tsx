import { WeatherCard } from '../WeatherCard/WeatherCard';
import { WeatherData } from '../../types/weather';
import styles from './WeeklyForecast.module.css';

interface WeeklyForecastProps {
  data: WeatherData;
}

export const WeeklyForecast = ({ data }: WeeklyForecastProps) => {
  return (
    <div className={styles.container}>
      {data.forecast.forecastday.map((day) => (
        <WeatherCard
          key={day.date}
          date={new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
          temp={day.day.avgtemp_c}
          condition={day.day.condition.text}
          icon={day.day.condition.icon}
        />
      ))}
    </div>
  );
}; 
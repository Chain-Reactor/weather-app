import { WeatherCard } from '../WeatherCard/WeatherCard';
import { WeatherData } from '../../types/weather';
import styles from './DailyForecast.module.css';

interface todayForecastProps {
  data: WeatherData;
}

export const TodayForecast = ({ data }: todayForecastProps) => {
  const today = data.forecast.forecastday[0];

  return (
    <div className={styles.container}>
        <div className={styles.locationInfo}>
          <h2>{data.location.name}</h2>
          <p>{data.location.country}</p>
        </div>
        <WeatherCard
          date={new Date(today.date).toLocaleDateString('en-US', { 
            weekday: 'long',
            month: 'long',
            day: 'numeric'
          })}
          temp={today.day.avgtemp_c}
          condition={today.day.condition.text}
          icon={today.day.condition.icon}
          isDetailed
          details={{
            humidity: today.day.avghumidity,
            wind: today.day.maxwind_kph,
            precipitation: today.day.totalprecip_mm
          }}
        />

        <div className={styles.tempRange}>
          <div className={styles.tempItem}>
            <span>Min</span>
            <span>{today.day.mintemp_c}°C</span>
          </div>
          <div className={styles.tempItem}>
            <span>Max</span>
            <span>{today.day.maxtemp_c}°C</span>
          </div>
        </div>
        
        <div className={styles.hourlyGrid}>
          {today.hour.map((hour, index) => (
            index % 3 === 0 && (
              <div key={hour.time} className={styles.hourlyItem}>
                <div>{new Date(hour.time).getHours()}:00</div>
                <img src={hour.condition.icon} alt={hour.condition.text} />
                <div>{hour.temp_c}°C</div>
              </div>
            )
          ))}
        </div>
    </div>
  );
}; 
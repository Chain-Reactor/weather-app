import styles from './WeatherCard.module.css';

interface WeatherCardProps {
  date: string;
  temp: number;
  condition: string;
  icon: string;
  isDetailed?: boolean;
  details?: {
    humidity: number;
    wind: number;
    precipitation: number;
  };
}

export const WeatherCard = ({
  date,
  temp,
  condition,
  icon,
  isDetailed,
  details
}: WeatherCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.date}>{date}</div>
      <img 
        src={icon} 
        alt={condition}
        className={styles.icon}
      />
      <div className={styles.temp}>{temp}°C</div>
      <div className={styles.condition}>{condition}</div>
      
      {isDetailed && details && (
        <div className={styles.details}>
          <div>Humidity: {details.humidity}%</div>
          <div>Wind: {details.wind} km/h</div>
          <div>Precipitation: {details.precipitation}mm</div>
        </div>
      )}
    </div>
  );
}; 
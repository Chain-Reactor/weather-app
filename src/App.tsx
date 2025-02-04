import { useState } from 'react';
import { SearchBar } from './components/SearchBar/SearchBar';
import { WeeklyForecast } from './components/WeeklyForecast/WeeklyForecast';
import { TodayForecast } from './components/DailyForecast/DailyForecast';
import { useWeather } from './hooks/useWeather';
import { WeatherDatePicker } from './components/WeatherDatePicker/WeatherDatePicker';
import './App.css';

function App() {
  const [view, setView] = useState<'weekly' | 'today' | 'picker'>('weekly');
  const { weatherData, loading, error, fetchWeatherWithLocation, fetchWeatherWithCoordinates } = useWeather();
  const [isLocation, setIsLocation] = useState(true);
  return (
    <div className="app">
      <header>
        <h1>Weather Forecast</h1>
        {
            <SearchBar 
              onSearch={(location: string, longitude: number, latitude: number) =>
                isLocation
                  ? fetchWeatherWithLocation(location)
                  : fetchWeatherWithCoordinates(longitude, latitude)
              }
              isLocation={isLocation}
              setIsLocation={setIsLocation}
            />
        }
      </header>
      <nav>
        <button 
          onClick={() => setView('weekly')}
          className={view === 'weekly' ? 'active' : ''}
        >
          Weekly
        </button>
        <button 
          onClick={() => setView('today')}
          className={view === 'today' ? 'active' : ''}
        >
          Today
        </button>
        <button 
          onClick={() => setView('picker')}
          className={view === 'picker' ? 'active' : ''}
        >
          Date Picker
        </button>
      </nav>

      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      
      {weatherData && (
        <>
          {view === 'weekly' && <WeeklyForecast data={weatherData} />}
          {view === 'today' && <TodayForecast data={weatherData} />}
          {view === 'picker' && <WeatherDatePicker data={weatherData} />}
        </>
      )}
    </div>
  );
}

export default App;
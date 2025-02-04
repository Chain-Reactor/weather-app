import { useState, FormEvent } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (location: string, longitude: number, latitude: number, selectedDate: string) => void;
  isLocation: boolean;
  setIsLocation: (isLocation: boolean) => void;
}

export const SearchBar = ({ onSearch, isLocation, setIsLocation }: SearchBarProps) => {
  const [location, setLocation] = useState('');
  const [longitude, setLongitude] = useState<number>(0);
  const [latitude, setLatitude] = useState<number>(0);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isLocation) {
      if (location.trim()) {
        onSearch(location.trim(), 0, 0, '');
        return;
      }
    } else {
      if (longitude && latitude) {
        onSearch('', longitude, latitude, '');
        return;
      }
    }
  };

  return (
    <>
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      {isLocation ? (
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city name"
          className={styles.input}
        />
      ) : (
        <div className={styles.coordinatesContainer}>
          <input
            type="number"
            step="any"
            value={longitude}
            onChange={(e) => setLongitude(parseFloat(e.target.value) || 0)}
            placeholder="Enter Longitude"
            className={styles.input}
          />
          <input
            type="number"
            step="any"
            value={latitude}
            onChange={(e) => setLatitude(parseFloat(e.target.value) || 0)}
            placeholder="Latitude"
            className={styles.input}
          />
        </div>
      )}
      <button type="submit" className={styles.button}>
        Search
      </button>
    </form>
    <div className={styles.radioContainer}>
      <div className={styles.radio}> 
        <input
          type="radio"
          id="location"
          name="searchType"
          checked={isLocation}
          onChange={() => setIsLocation(true)}
          className={styles.radio}
        />
        <label htmlFor="location">Location</label>
      </div>
      <div className={styles.radio}>
        <input
          type="radio"
          id="coordinates"
          name="searchType"
          checked={!isLocation}
          onChange={() => setIsLocation(false)}
          className={styles.radio}
        />
        <label htmlFor="coordinates">Coordinates</label>
      </div>
    </div>
    </>
  );
}; 
import React, { useEffect, useState } from 'react';
import { ISearchInputProps } from '../../interfaces';
import { useDebounce } from '../../hooks';
import { useDispatch } from 'react-redux';
import { setSearchQuery, toggleEnergySensorsFilter, toggleCriticalStatusFilter } from '../../redux/reducers/assets';
import styles from './style.module.scss';
export const SearchInput = ({ searchedValue }: ISearchInputProps) => {
  const [search, setSearch] = useState(searchedValue || '');
  const [filterEnergy, setFilterEnergy] = useState(false);
  const [filterCritical, setFilterCritical] = useState(false);
  const debouncedValue = useDebounce(search, 500);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchQuery(debouncedValue));
  }, [debouncedValue, dispatch]);

  const handleEnergyFilterToggle = () => { 
    setFilterEnergy(!filterEnergy);
    dispatch(toggleEnergySensorsFilter());
  };

  const handleCriticalFilterToggle = () => {
    setFilterCritical(!filterCritical);
    dispatch(toggleCriticalStatusFilter());
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Search components/assets/locations..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      
      <div>
        <label>
          <input
            type="checkbox"
            checked={filterEnergy}
            onChange={handleEnergyFilterToggle}
          />
          Energy Sensors
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={filterCritical}
            onChange={handleCriticalFilterToggle}
          />
          Critical Sensor Status
        </label>
      </div>
    </div>
  );
};

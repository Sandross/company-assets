import React from 'react';
import { ISearchInputProps } from '../../interfaces';
import { useDebounce } from '../../hooks';

export const SearchInput = ({searchedValue}: ISearchInputProps) => {
  const debouncedValue = useDebounce(searchedValue, 500);
  console.log(debouncedValue);
  return (
    <div>
        
      
    </div>
  );
};

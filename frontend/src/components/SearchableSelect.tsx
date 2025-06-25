import React, { useState, useEffect, useRef } from 'react';
import { useDebounce } from '../hooks/useDebounce';

/**
 * Props for the SearchableSelect component.
 * It's generic to allow searching for different types of data (e.g., customers, vehicles).
 */
interface SearchableSelectProps<T> {
  placeholder: string;
  onSearch: (query: string) => Promise<T[]>;
  onSelect: (item: T | null) => void;
  renderOption: (item: T) => React.ReactNode;
  getOptionLabel: (item: T) => string;
  initialValue?: T | null;
  disabled?: boolean;
  // A key can be used to force the component to re-mount and reset its state
  key?: string | number;
}

export function SearchableSelect<T extends { id: any }>({
  placeholder,
  onSearch,
  onSelect,
  renderOption,
  getOptionLabel,
  initialValue = null,
  disabled = false,
}: SearchableSelectProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<T[]>([]);
  const [selectedItem, setSelectedItem] = useState<T | null>(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Set initial text if a value is provided
  useEffect(() => {
    if (initialValue) {
      setSelectedItem(initialValue);
      setSearchTerm(getOptionLabel(initialValue));
    } else {
        setSearchTerm('');
    }
  }, [initialValue, getOptionLabel]);

  // Effect to handle clicks outside the component to close the dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  // Effect to trigger the search when the debounced search term changes
  useEffect(() => {
    if (debouncedSearchTerm && (!selectedItem || searchTerm !== getOptionLabel(selectedItem))) {
      setIsLoading(true);
      onSearch(debouncedSearchTerm)
        .then((data) => {
          setResults(data);
          setIsLoading(false);
          setIsOpen(true);
        })
        .catch(() => setIsLoading(false));
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [debouncedSearchTerm, getOptionLabel, onSearch, searchTerm, selectedItem]);

  // Handler for selecting an item from the results
  const handleSelect = (item: T) => {
    setSelectedItem(item);
    setSearchTerm(getOptionLabel(item));
    onSelect(item);
    setIsOpen(false);
    setResults([]);
  };

  // Handler for input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    // If the user starts typing, clear the previous selection
    if (selectedItem && newSearchTerm !== getOptionLabel(selectedItem)) {
      setSelectedItem(null);
      onSelect(null);
    }
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <input
        type="text"
        placeholder={placeholder}
        className="input input-bordered w-full"
        value={searchTerm}
        onChange={handleInputChange}
        onClick={() => setIsOpen(true)}
        disabled={disabled}
      />
      {isLoading && <span className="absolute right-3 top-1/2 -translate-y-1/2 loading loading-spinner loading-sm"></span>}
      
      {isOpen && results.length > 0 && (
        <ul className="absolute z-10 w-full bg-base-100 shadow-lg rounded-md mt-1 max-h-60 overflow-y-auto border">
          {results.map((item) => (
            <li
              key={item.id}
              className="p-2 hover:bg-base-200 cursor-pointer"
              onClick={() => handleSelect(item)}
            >
              {renderOption(item)}
            </li>
          ))}
        </ul>
      )}
       {isOpen && results.length === 0 && searchTerm && !isLoading && !selectedItem && (
         <div className="absolute z-10 w-full bg-base-100 shadow-lg rounded-md mt-1 p-2 border">
           No results found.
         </div>
       )}
    </div>
  );
}

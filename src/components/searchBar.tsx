import React, { useState } from "react";
import { useWeather } from "../context/weatherContext";

const SearchInput: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { setCity, cleanError } = useWeather();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      cleanError(); 
      setCity(searchTerm);
      setSearchTerm("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter city name..."
        className="search-input"
      />
      <button type="submit" className="search-button">Search</button>
    </form>
  );
};

export default SearchInput;

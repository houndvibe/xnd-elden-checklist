import React, { useState } from "react";
import { Input, AutoComplete } from "antd";
import type { AutoCompleteProps } from "antd";

const { Search } = Input;

type SuggestionOption = {
  value: string;
  label: React.ReactNode;
};

const SearchWithSuggestions = () => {
  const [options, setOptions] = useState<SuggestionOption[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const handleSearch = (value: string): void => {
    // Здесь обычно бы запрос к API для выполнения поиска
    console.log("Searching for:", value);
    // Ваша логика поиска
  };

  const handleChange = (value: string): void => {
    setSearchText(value);

    // Имитация получения подсказок (в реальном приложении здесь был бы API-запрос)
    const mockSuggestions = generateMockSuggestions(value);

    setOptions(
      mockSuggestions.map((suggestion) => ({
        value: suggestion,
        label: <div>{suggestion}</div>,
      }))
    );
  };

  // Функция для генерации тестовых подсказок
  const generateMockSuggestions = (query: string): string[] => {
    if (!query) return [];

    const mockData = [
      "Apple",
      "Banana",
      "Cherry",
      "Date",
      "Elderberry",
      "Fig",
      "Grape",
      "Honeydew",
    ];

    return mockData.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
  };

  const onSelect: AutoCompleteProps["onSelect"] = (value: string) => {
    setSearchText(value);
    handleSearch(value);
  };

  const onSearchChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    handleChange(e.target.value);
  };

  return (
    <AutoComplete
      options={options}
      onSelect={onSelect}
      onSearch={handleChange}
      value={searchText}
      style={{ width: "100%" }}
    >
      <Search
        placeholder="Поиск..."
        onSearch={handleSearch}
        onChange={onSearchChange}
      />
    </AutoComplete>
  );
};

export default SearchWithSuggestions;

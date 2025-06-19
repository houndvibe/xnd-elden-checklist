import React, { useState } from "react";
import { Input, AutoComplete, Image, Flex } from "antd";
import type { AutoCompleteProps } from "antd";

import { Collection } from "../../../store/collectionSlice";
import { Item, ItemSubCategoryMap } from "../../../global-types";
import { useNavigate } from "react-router-dom";
import { flattenCollectionItems } from "../../../lib/utils/search";
import { useAppDispatch } from "../../../store/typedDispatch";
import { setGlobalSearchItem } from "../../../store/serviceSlice";
import { itemsData } from "../../../data";

const { Search } = Input;

type SuggestionOption = {
  value: string;
  label: React.ReactNode;
};

const SearchWithSuggestions = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [options, setOptions] = useState<SuggestionOption[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const handleSearch = (value: string): void => {
    for (const category in itemsData) {
      for (const subcategory in itemsData[category as keyof Collection]) {
        const subject = (
          itemsData[category as keyof Collection][
            subcategory as keyof ItemSubCategoryMap
          ] as Item[]
        ).find((item: Item) => {
          return item.name.toLocaleLowerCase() === value.toLocaleLowerCase();
        });

        if (subject) {
          dispatch(setGlobalSearchItem(subject.name));
          navigate(`/${subject.type}?open=${subject.subcategory}`);
        }
      }
    }
  };

  const handleChange = (value: string): void => {
    setSearchText(value);

    setOptions(
      generateSuggestions(value).map((suggestion: Item) => ({
        value: suggestion.name,
        label: (
          <Flex justify="space-between">
            {suggestion.name}{" "}
            <Image
              height={20}
              src={`./images/${suggestion.type}/${suggestion.subcategory}/${suggestion.name}.png`}
            />
          </Flex>
        ),
      }))
    );
  };

  const generateSuggestions = (query: string): Item[] => {
    if (!query) return [];

    const itemsFlatMap = flattenCollectionItems(itemsData);

    const filtered = Object.values(
      itemsFlatMap
        .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
        .reduce((acc, item) => {
          if (!acc[item.name]) {
            acc[item.name] = item;
          }
          return acc;
        }, {} as Record<string, (typeof itemsFlatMap)[0]>)
    );

    return filtered;
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

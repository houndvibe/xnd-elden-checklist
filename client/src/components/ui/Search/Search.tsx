import React, { useState } from "react";
import { Input, AutoComplete, Image, Flex } from "antd";
import type { AutoCompleteProps } from "antd";

import { Collection } from "../../../store/collectionSlice";
import { Item, ItemSubCategoryMap } from "../../../global-types";
import { useNavigate } from "react-router-dom";
import { flattenCollectionItems } from "../../../lib/utils/search";
import { useAppDispatch } from "../../../store/typedDispatch";
import {
  setGlobalSearchItem,
  setGlobalSearchSet,
} from "../../../store/serviceSlice";
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
    const searchValue = value.toLocaleLowerCase();

    for (const category in itemsData) {
      const subcategories = itemsData[category as keyof Collection];

      for (const subcategory in subcategories) {
        const items = subcategories[
          subcategory as keyof ItemSubCategoryMap
        ] as Item[];

        for (const item of items) {
          // Прямая проверка имени
          if (item.name.toLocaleLowerCase() === searchValue) {
            dispatch(setGlobalSearchItem(item.name));
            navigate(`/${item.type}?open=${encodeURIComponent(subcategory)}`);
            return;
          }

          // Проверка по items у ArmourSet
          if ("items" in item && Array.isArray(item.items)) {
            for (const child of item.items) {
              if (child.name.toLocaleLowerCase() === searchValue) {
                dispatch(setGlobalSearchSet(item.name));
                dispatch(setGlobalSearchItem(child.name));
                navigate(
                  `/${child.type}?open=${encodeURIComponent(subcategory)}`
                );
                return;
              }

              // Проверка по children у ArmourPiece внутри items
              if ("children" in child && Array.isArray(child.children)) {
                for (const grandChild of child.children) {
                  if (grandChild.name.toLocaleLowerCase() === searchValue) {
                    dispatch(setGlobalSearchSet(item.name));
                    dispatch(setGlobalSearchItem(grandChild.name));
                    navigate(
                      `/${grandChild.type}?open=${encodeURIComponent(
                        subcategory
                      )}`
                    );
                    return;
                  }
                }
              }
            }
          }

          // Проверка по children у ArmourPiece напрямую (если это не set, а просто piece)
          if ("children" in item && Array.isArray(item.children)) {
            for (const child of item.children) {
              if (child.name.toLocaleLowerCase() === searchValue) {
                dispatch(setGlobalSearchItem(child.name));
                navigate(
                  `/${child.type}?open=${encodeURIComponent(subcategory)}`
                );
                return;
              }
            }
          }
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

import React, { useState } from "react";
import { Input, AutoComplete, Image, Flex } from "antd";
import type { AutoCompleteProps } from "antd";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../../store/typedDispatch";
import {
  setGlobalSearchItem,
  setGlobalSearchSet,
} from "../../../store/serviceSlice";
import { t } from "../../../i18n";
import { itemsData } from "../../../data";
import { Collection } from "../../../store/collectionSlice";
import { Item, ItemSubCategoryMap } from "../../../global-types";
import { flattenCollectionItems } from "../../../lib/utils/search";

const { Search } = Input;

type SuggestionOption = {
  value: string;
  label: React.ReactNode;
};

const navigateToItem = (
  name: string,
  dispatch: ReturnType<typeof useAppDispatch>,
  navigate: ReturnType<typeof useNavigate>
) => {
  const searchValue = name.toLowerCase();

  for (const category in itemsData) {
    const subcategories = itemsData[category as keyof Collection];

    for (const subcategory in subcategories) {
      const items = subcategories[
        subcategory as keyof ItemSubCategoryMap
      ] as Item[];

      for (const item of items) {
        if (item.name.toLowerCase() === searchValue) {
          dispatch(setGlobalSearchItem(item.name));
          navigate(`/${item.type}?open=${encodeURIComponent(subcategory)}`);
          return;
        }

        if ("items" in item && Array.isArray(item.items)) {
          for (const child of item.items) {
            if (child.name.toLowerCase() === searchValue) {
              dispatch(setGlobalSearchSet(item.name));
              dispatch(setGlobalSearchItem(child.name));
              navigate(
                `/${child.type}?open=${encodeURIComponent(subcategory)}`
              );
              return;
            }

            if ("children" in child && Array.isArray(child.children)) {
              for (const grandChild of child.children) {
                if (grandChild.name.toLowerCase() === searchValue) {
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

        if ("children" in item && Array.isArray(item.children)) {
          for (const child of item.children) {
            if (child.name.toLowerCase() === searchValue) {
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

const generateSuggestions = (query: string): Item[] => {
  if (!query) return [];

  const itemsFlatMap = flattenCollectionItems(itemsData);
  const uniqueByName = itemsFlatMap.reduce((acc, item) => {
    if (!acc[item.name]) acc[item.name] = item;
    return acc;
  }, {} as Record<string, Item>);

  return Object.values(uniqueByName).filter((item) => {
    const translated = t(item.type, item.name).toLowerCase();
    return translated.includes(query.toLowerCase());
  });
};

const SearchWithSuggestions = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [options, setOptions] = useState<SuggestionOption[]>([]);
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchText(value);

    const suggestions = generateSuggestions(value).map((item) => ({
      value: item.name,
      label: (
        <Flex justify="space-between">
          {t(item.type, item.name)}
          <Image
            height={20}
            preview={false}
            src={`./images/${item.type}/${item.subcategory}/${item.name}.png`}
          />
        </Flex>
      ),
    }));

    setOptions(suggestions);
  };

  const handleSelect: AutoCompleteProps["onSelect"] = (value) => {
    setSearchText(value);
    navigateToItem(value, dispatch, navigate);
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    handleSearchChange(e.target.value);
  };

  const handleSubmit = (value: string) => {
    navigateToItem(value, dispatch, navigate);
  };

  return (
    <AutoComplete
      options={options}
      value={searchText}
      onSearch={handleSearchChange}
      onSelect={handleSelect}
      style={{ width: "100%" }}
    >
      <Search
        placeholder={t("misc", "Search...")}
        onSearch={handleSubmit}
        onChange={handleInputChange}
      />
    </AutoComplete>
  );
};

export default SearchWithSuggestions;

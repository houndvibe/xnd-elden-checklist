import React, { useState, useEffect } from "react";
import { Input, AutoComplete, Image, Flex } from "antd";
import type { AutoCompleteProps } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Search.module.scss";
import { useAppDispatch } from "../../../store/typedDispatch";
import { t } from "../../../i18n";
import { itemsData } from "../../../data";
import { Item } from "../../../global-types";
import {
  flattenCollectionItems,
  navigateToItem,
  scrollToSearchTarget,
} from "../../../lib/utils/search";

const { Search } = Input;

type SuggestionOption = {
  value: string;
  label: React.ReactNode;
  displayText: string;
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
  const location = useLocation();

  const [options, setOptions] = useState<SuggestionOption[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const openParam = new URLSearchParams(location.search).get("open");
    if (openParam) {
      setTimeout(() => scrollToSearchTarget(), 500);
    }
  }, [location.search]);

  const handleSearchChange = (value: string) => {
    setSearchText(value);

    const suggestions = generateSuggestions(value).map((item) => {
      const translatedText = t(item.type, item.name);
      return {
        value: item.name,
        displayText: translatedText,
        label: (
          <Flex justify="space-between">
            {translatedText}
            <Image
              height={20}
              preview={false}
              src={
                item.subcategory === "bellBearings"
                  ? `./images/toolsAndBellBearings/bellBearings/CommonBellBearing.png`
                  : item.subcategory === "cookbooks"
                  ? `./images/craft/cookbooks/Nomadic Warrior's Cookbook.png`
                  : item.subcategory === "maps"
                  ? `./images/infoItems/maps/Map Liurnia, North.png`
                  : item.subcategory === "notes"
                  ? `./images/infoItems/notes/Note The Preceptor's Secret.png`
                  : `./images/${item.type}/${item.subcategory}/${item.name}.png`
              }
            />
          </Flex>
        ),
      };
    });

    setOptions(suggestions);
  };

  const handleSelect: AutoCompleteProps["onSelect"] = (value, option) => {
    setSearchText((option as SuggestionOption).displayText);
    navigateToItem(value, dispatch, navigate);
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    handleSearchChange(e.target.value);
  };

  const handleSubmit = (value: string) => {
    const matchingOption = options.find(
      (option) => option.displayText.toLowerCase() === value.toLowerCase()
    );

    if (matchingOption) {
      navigateToItem(matchingOption.value, dispatch, navigate);
    } else {
      if (options.length > 0) {
        navigateToItem(options[0].value, dispatch, navigate);
        setSearchText(options[0].displayText);
      } else {
        navigateToItem(value, dispatch, navigate);
      }
    }
  };

  return (
    <Flex className={styles.searchWrapper}>
      <AutoComplete
        options={options}
        value={searchText}
        onSearch={handleSearchChange}
        onSelect={handleSelect}
        style={{ minWidth: 400 }}
      >
        <Search
          placeholder={t("misc", "Search...")}
          onSearch={handleSubmit}
          onChange={handleInputChange}
        />
      </AutoComplete>
    </Flex>
  );
};

export default SearchWithSuggestions;

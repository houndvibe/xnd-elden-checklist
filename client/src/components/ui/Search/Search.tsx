import React, { useState, useEffect } from "react";
import { Input, AutoComplete, Image, Flex } from "antd";
import type { AutoCompleteProps } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Search.module.scss";
import { useAppDispatch, useAppSelector } from "../../../store/typedDispatch";
import { t } from "../../../i18n";
import { itemsData } from "../../../data";
import { Item } from "../../../global-types";
import {
  flattenCollectionItems,
  navigateToItem,
  scrollToSearchTarget,
} from "../../../lib/utils/search";
import { normalizeText, truncateString } from "../../../lib/utils/misc";

const { Search } = Input;

type SuggestionOption = {
  value: string;
  label: React.ReactNode;
  displayText: string;
};

const SearchWithSuggestions = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [options, setOptions] = useState<SuggestionOption[]>([]);
  const [searchText, setSearchText] = useState("");

  const { altArmor, checkDlc, checkedSubcategories, loosable } = useAppSelector(
    (state) => state.settings
  );

  useEffect(() => {
    const openParam = new URLSearchParams(location.search).get("open");
    if (openParam) {
      setTimeout(() => scrollToSearchTarget(), 500);
    }
  }, [location.search]);

  const generateSuggestions = (query: string): Item[] => {
    if (!query) return [];

    const itemsFlatMap = flattenCollectionItems(
      itemsData,
      altArmor,
      checkDlc,
      loosable,
      checkedSubcategories
    );
    const uniqueByName = itemsFlatMap.reduce((acc, item) => {
      if (!acc[item.name]) acc[item.name] = item;
      return acc;
    }, {} as Record<string, Item>);

    return Object.values(uniqueByName).filter((item) => {
      const translated = normalizeText(t(item.type, item.name));
      return translated.includes(normalizeText(query));
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchText(value);

    const suggestions = generateSuggestions(value).map((item) => {
      const translatedText = truncateString(t(item.type, item.name), 35);
      return {
        value: item.name,
        displayText: translatedText,
        label: (
          <Flex justify="space-between">
            {translatedText}
            <Image
              height={40}
              width={40}
              preview={false}
              src={
                item.subcategory === "bellBearings"
                  ? `./images_resized/toolsAndBellBearings/bellBearings/CommonBellBearing.png`
                  : item.subcategory === "cookbooks"
                  ? `./images_resized/craft/cookbooks/Nomadic Warrior's Cookbook.png`
                  : item.subcategory === "maps"
                  ? `./images_resized/infoItems/maps/Map Liurnia, North.png`
                  : item.subcategory === "notes"
                  ? `./images_resized/infoItems/notes/Note The Preceptor's Secret.png`
                  : `./images_resized/${item.type}/${item.subcategory}/${item.name}.png`
              }
            />
          </Flex>
        ),
      };
    });

    setOptions(suggestions);
  };

  const handleSelect: AutoCompleteProps["onSelect"] = (
    value /* , option */
  ) => {
    /*   setSearchText((option as SuggestionOption).displayText); */
    setSearchText("");
    navigateToItem(value, dispatch, navigate);
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    handleSearchChange(e.target.value);
  };

  const handleSubmit = (value: string) => {
    const normalizedValue = normalizeText(value);
    const matchingOption = options.find(
      (option) => normalizeText(option.displayText) === normalizedValue
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

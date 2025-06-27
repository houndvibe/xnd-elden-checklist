import { Flex, Input, Select } from "antd";
import { ItemCategory } from "../../global-types";
import { APP_PALETTE, itemCategories } from "../../lib/consts";
import CategorySidebar from "./CategorySidebar";
import ItemsGrid from "./ItemsGrid";

import { useNavigate, useParams } from "react-router-dom";
import { t } from "../../i18n";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/typedDispatch";
import { setFastcheckSize } from "../../store/settingsSlice";
const { Option } = Select;

export default function FastCheck() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const fastcheckSize = useAppSelector((state) => state.settings.fastcheckSize);

  const [searchValue, setSearchValue] = useState("");

  const { tabKey } = useParams<{ tabKey?: ItemCategory }>();

  const handelChangeCategory = (categoryName: ItemCategory) => {
    navigate(`/${categoryName}`);
  };

  return (
    <Flex gap={20}>
      <CategorySidebar
        categories={itemCategories}
        selectedCategory={tabKey!}
        onCategorySelect={handelChangeCategory}
      />
      <Flex vertical gap={10}>
        <Flex gap={12} wrap="wrap">
          <Select
            defaultValue={fastcheckSize}
            style={{ width: 140 }}
            onChange={(v) => dispatch(setFastcheckSize(v))}
          >
            <Option value={40}>{t("misc", "Small")}</Option>
            <Option value={60}>{t("misc", "Medium")}</Option>
            <Option value={130}>{t("misc", "Big")}</Option>
            <Option value={180}>{t("misc", "Large")}</Option>
          </Select>
          <Input
            allowClear
            placeholder={t("misc", "Filter by name...")}
            style={{
              width: 240,
              color: APP_PALETTE.text,
              fontSize: 16,
            }}
            value={searchValue}
            size="small"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Flex>

        <ItemsGrid
          selectedCategory={tabKey!}
          imgSize={fastcheckSize}
          searchValue={searchValue}
        />
      </Flex>
    </Flex>
  );
}

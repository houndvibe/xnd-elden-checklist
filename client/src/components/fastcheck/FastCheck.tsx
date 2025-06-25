import { Flex, Input, Select } from "antd";
import { ItemCategory } from "../../global-types";
import { itemCategories } from "../../lib/consts";
import CategorySidebar from "./CategorySidebar";
import ItemsGrid from "./ItemsGrid";

import styles from "./FastCheck.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { t } from "../../i18n";
import { useState } from "react";
const { Option } = Select;
export default function FastCheck() {
  const navigate = useNavigate();

  const [imgSize, setImgSize] = useState(60);
  const [searchValue, setSearchValue] = useState("");

  const { tabKey } = useParams<{ tabKey?: ItemCategory }>();

  const handelChangeCategory = (categoryName: ItemCategory) => {
    navigate(`/${categoryName}`);
  };

  return (
    <div className={styles.fastCheck}>
      <Flex gap={20}>
        <CategorySidebar
          categories={itemCategories}
          selectedCategory={tabKey!}
          onCategorySelect={handelChangeCategory}
        />
        <Flex vertical>
          <Flex gap={12} wrap="wrap">
            <Select
              defaultValue={imgSize}
              style={{ width: 140 }}
              onChange={setImgSize}
            >
              <Option value={40}>{t("misc", "Small")}</Option>
              <Option value={60}>{t("misc", "Medium")}</Option>
              <Option value={130}>{t("misc", "Big")}</Option>
              <Option value={180}>{t("misc", "Large")}</Option>
            </Select>

            <Input
              allowClear
              placeholder={t("misc", "Filter by name...")}
              style={{ width: 240 }}
              value={searchValue}
              size="small"
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Flex>
          <ItemsGrid
            selectedCategory={tabKey!}
            imgSize={imgSize}
            searchValue={searchValue}
          />
        </Flex>
      </Flex>
    </div>
  );
}

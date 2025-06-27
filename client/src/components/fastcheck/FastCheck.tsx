import { Flex, Input, Select } from "antd";
import { ItemCategory } from "../../global-types";
import { APP_PALETTE, itemCategories } from "../../lib/consts";
import CategorySidebar from "./CategorySidebar";
import ItemsGrid from "./ItemsGrid";

import { useNavigate, useParams } from "react-router-dom";
import { t } from "../../i18n";
import { useAppDispatch, useAppSelector } from "../../store/typedDispatch";
import { setFastcheckSize } from "../../store/settingsSlice";
import { setGlobalSearchItem } from "../../store/serviceSlice";
const { Option } = Select;

export default function FastCheck() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const fastcheckSize = useAppSelector((state) => state.settings.fastcheckSize);
  const globalSearchItem = useAppSelector(
    (state) => state.service.globalSearchItem
  );

  const { tabKey } = useParams<{ tabKey?: ItemCategory }>();

  const handelChangeCategory = (categoryName: ItemCategory) => {
    navigate(`/${categoryName}`);
  };
  const val = globalSearchItem ? t(tabKey!, globalSearchItem) : "";

  return (
    <Flex gap={20} style={{ width: "100%" }}>
      <div style={{ flexBasis: "10%", flexShrink: 0 }}>
        <CategorySidebar
          categories={itemCategories}
          selectedCategory={tabKey!}
          onCategorySelect={handelChangeCategory}
        />
      </div>

      <Flex vertical gap={10} style={{ flex: 1 }}>
        <Flex gap={12} wrap="wrap">
          <Select
            defaultValue={fastcheckSize}
            style={{ width: 70 }}
            onChange={(v) => dispatch(setFastcheckSize(v))}
          >
            <Option value={40}>{t("misc", "S")}</Option>
            <Option value={92}>{t("misc", "M")}</Option>
            <Option value={130}>{t("misc", "L")}</Option>
            <Option value={210}>{t("misc", "XL")}</Option>
          </Select>
          <Input
            allowClear
            placeholder={t("misc", "Filter by name...")}
            style={{
              width: 240,
              color: APP_PALETTE.text,
              fontSize: 16,
            }}
            onClear={() => dispatch(setGlobalSearchItem(null))}
            value={val}
            size="small"
            onChange={(e) => dispatch(setGlobalSearchItem(e.target.value))}
          />
        </Flex>

        <ItemsGrid
          selectedCategory={tabKey!}
          imgSize={fastcheckSize}
          searchValue={val}
        />
      </Flex>
    </Flex>
  );
}

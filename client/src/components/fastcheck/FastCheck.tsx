import { Checkbox, Flex, Input, Select } from "antd";
import { ItemCategory } from "../../global-types";
import { APP_PALETTE, itemCategories } from "../../lib/consts";
import CategorySidebar from "./CategorySidebar";
import ItemsGrid from "./ItemsGrid";

import { useNavigate, useParams } from "react-router-dom";
import { t } from "../../i18n";
import { useAppDispatch, useAppSelector } from "../../store/typedDispatch";
import { setFastcheckSize } from "../../store/settingsSlice";
import { setGlobalSearchItem } from "../../store/serviceSlice";
import { getCategoryStats } from "../../lib/utils/stats";
import { Collection } from "../../store/collectionSlice";
import { useState } from "react";

export interface ArmorFilter {
  chest: boolean;
  helm: boolean;
  gloves: boolean;
  boots: boolean;
}
const { Option } = Select;

export default function FastCheck() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const fastcheckSize = useAppSelector((state) => state.settings.fastcheckSize);
  const globalSearchItem = useAppSelector(
    (state) => state.service.globalSearchItem
  );

  const collection = useAppSelector((state) => state.collection.collectionData);

  const { tabKey } = useParams<{ tabKey?: ItemCategory }>();

  const currentCategory = collection[`${tabKey}Data` as keyof Collection];

  const { total, collected, percentage } = getCategoryStats(currentCategory);

  const handelChangeCategory = (categoryName: ItemCategory) => {
    navigate(`/${categoryName}`);
    dispatch(setGlobalSearchItem(null));
  };
  const val = globalSearchItem ? t(tabKey!, globalSearchItem) : "";

  const [pieceTypeFilters, setPieceTypeFilters] = useState<ArmorFilter>({
    chest: true,
    helm: true,
    gloves: true,
    boots: true,
  });

  const handlePieceTypeFilterChange = (
    pieceType: "helm" | "gloves" | "chest" | "boots",
    checked: boolean
  ) => {
    const newFilters = { ...pieceTypeFilters };
    newFilters[pieceType] = checked;
    setPieceTypeFilters(newFilters);
  };

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
        <Flex justify="space-between">
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

            <span
              style={{ color: APP_PALETTE.textPrimary }}
            >{`${collected}/${total} (${percentage}) %`}</span>
          </Flex>

          {tabKey === "armour" && (
            <Flex>
              <Checkbox
                checked={pieceTypeFilters.helm}
                onChange={(e) =>
                  handlePieceTypeFilterChange("helm", e.target.checked)
                }
              >
                {t("misc", "Head")}
              </Checkbox>
              <Checkbox
                checked={pieceTypeFilters.chest}
                onChange={(e) =>
                  handlePieceTypeFilterChange("chest", e.target.checked)
                }
              >
                {t("misc", "Body")}
              </Checkbox>
              <Checkbox
                checked={pieceTypeFilters.gloves}
                onChange={(e) =>
                  handlePieceTypeFilterChange("gloves", e.target.checked)
                }
              >
                {t("misc", "Hands")}
              </Checkbox>
              <Checkbox
                checked={pieceTypeFilters.boots}
                onChange={(e) =>
                  handlePieceTypeFilterChange("boots", e.target.checked)
                }
              >
                {t("misc", "Legs")}
              </Checkbox>
            </Flex>
          )}
        </Flex>

        <ItemsGrid
          selectedCategory={tabKey!}
          imgSize={fastcheckSize}
          searchValue={val}
          pieceTypeFilters={pieceTypeFilters}
        />
      </Flex>
    </Flex>
  );
}

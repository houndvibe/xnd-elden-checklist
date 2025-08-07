import { Checkbox, Flex, Input, Select } from "antd";
import { ItemCategory, ItemSubCategoryMap } from "../../global-types";
import {
  APP_PALETTE,
  FASTCHECK_SIZE_L,
  FASTCHECK_SIZE_M,
  FASTCHECK_SIZE_S,
  FASTCHECK_SIZE_XL,
  itemCategories,
} from "../../lib/consts";
import CategorySidebar from "./CategorySidebar";
import ItemsGrid from "./ItemsGrid";

import { useNavigate, useParams } from "react-router-dom";
import { t } from "../../i18n";
import { useAppDispatch, useAppSelector } from "../../store/typedDispatch";
import { setFastcheckSize, setMissedOnly } from "../../store/settingsSlice";
import { setGlobalSearchItem } from "../../store/serviceSlice";
import { getCategoryStats } from "../../lib/utils/stats";
import { Collection } from "../../store/collectionSlice";
import { useState } from "react";
import { normalizeText } from "../../lib/utils/misc";

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

  const { checkDlc, missedOnly, checkedSubcategories, altArmor, loosable } =
    useAppSelector((state) => state.settings);

  const { tabKey } = useParams<{ tabKey?: ItemCategory }>();

  const currentCategory = collection[`${tabKey}Data` as keyof Collection];

  // Оставляем только включённые подкатегории
  const filteredData: Partial<ItemSubCategoryMap> = Object.fromEntries(
    Object.entries(currentCategory).filter(([subcategory]) =>
      checkedSubcategories.includes(subcategory)
    )
  );

  const { total, collected, percentage } = getCategoryStats(
    filteredData,
    checkDlc,
    altArmor,
    loosable
  );

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
              <Option value={FASTCHECK_SIZE_S}>{t("misc", "S")}</Option>
              <Option value={FASTCHECK_SIZE_M}>{t("misc", "M")}</Option>
              <Option value={FASTCHECK_SIZE_L}>{t("misc", "L")}</Option>
              <Option value={FASTCHECK_SIZE_XL}>{t("misc", "XL")}</Option>
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
              onChange={(e) =>
                dispatch(setGlobalSearchItem(normalizeText(e.target.value)))
              }
            />

            <span
              style={{
                color:
                  collected == total
                    ? APP_PALETTE.textHighlighted
                    : APP_PALETTE.textPrimary,
              }}
            >{`${collected}/${total} (${percentage}) %`}</span>
            <Checkbox
              checked={missedOnly}
              onChange={() => dispatch(setMissedOnly())}
            >
              {t("misc", "Missed only")}
            </Checkbox>
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

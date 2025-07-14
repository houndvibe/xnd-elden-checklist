import { useState } from "react";
import { Checkbox, Col, Row, Button, Flex } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";

import { t } from "../../../i18n";
import { toTitleCaseFromCamel, trimDataSuffix } from "../../../lib/utils/misc";
import { useAppDispatch, useAppSelector } from "../../../store/typedDispatch";
import {
  toggleCategoryChecked,
  toggleCategoryOpen,
  toggleSubcategoryChecked,
  setAllCategoriesChecked,
  setAllSubcategoriesChecked,
} from "../../../store/settingsSlice";

export default function CategoriesWidget() {
  const [allOpen, setAllOpen] = useState(false);

  const cllection = useAppSelector((state) => state.collection.collectionData);
  const dispatch = useAppDispatch();
  const { checkedCategories, checkedSubcategories, openCategories } =
    useAppSelector((s) => s.settings);

  const categories = Object.entries(cllection);
  const chunkSize = 6;
  const chunks = [];
  for (let i = 0; i < categories.length; i += chunkSize) {
    chunks.push(categories.slice(i, i + chunkSize));
  }

  const handleSelectAll = () => {
    const allCategories = categories.map(([category]) =>
      trimDataSuffix(category)
    );
    const allSubcategories = categories.flatMap(([, subcats]) =>
      Object.keys(subcats)
    );

    dispatch(setAllCategoriesChecked(allCategories));
    dispatch(setAllSubcategoriesChecked(allSubcategories));
  };

  const handleSelectNone = () => {
    dispatch(setAllCategoriesChecked([]));
    dispatch(setAllSubcategoriesChecked([]));
  };

  return (
    <>
      <div
        style={{
          cursor: "pointer",
          userSelect: "none",
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 8,
        }}
      >
        <div
          onClick={() => setAllOpen((prev) => !prev)}
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          {allOpen ? <CaretUpOutlined /> : <CaretDownOutlined />}
          <span>{t("misc", "What should we count?")}</span>
        </div>

        <Flex align="center" gap={10}>
          <Button size="small" onClick={handleSelectAll}>
            {t("misc", "Check all")}
          </Button>
          |
          <Button size="small" onClick={handleSelectNone}>
            {t("misc", "Uncheck all")}
          </Button>
        </Flex>
      </div>

      {allOpen && (
        <Row gutter={[24, 16]} align="top">
          {chunks.map((chunk, colIndex) => (
            <Col key={colIndex}>
              {chunk.map(([category, subcats]) => {
                const trimmedCategory = trimDataSuffix(category);
                const isChecked = checkedCategories.includes(trimmedCategory);
                const isOpen = openCategories.includes(category);
                const subkeys = Object.keys(subcats);

                return (
                  <div key={category}>
                    <div
                      style={{
                        cursor: "pointer",
                        userSelect: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <Checkbox
                        checked={isChecked}
                        onChange={() =>
                          dispatch(toggleCategoryChecked({ category, subkeys }))
                        }
                      />
                      <span
                        onClick={() => dispatch(toggleCategoryOpen(category))}
                      >
                        {isOpen ? <CaretUpOutlined /> : <CaretDownOutlined />}
                        <span>
                          {t("misc", toTitleCaseFromCamel(trimmedCategory))}
                        </span>
                      </span>
                    </div>

                    {isOpen && (
                      <div
                        style={{
                          paddingLeft: 24,
                          display: "flex",
                          flexDirection: "column",
                          gap: 4,
                        }}
                      >
                        {subkeys.map((sub) => (
                          <Checkbox
                            key={sub}
                            checked={checkedSubcategories.includes(sub)}
                            onChange={() =>
                              dispatch(toggleSubcategoryChecked(sub))
                            }
                          >
                            {t("misc", toTitleCaseFromCamel(sub))}
                          </Checkbox>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}

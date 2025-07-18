import { useEffect, useState } from "react";
import { Checkbox, Col, Row, Button, Flex } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";

import { t } from "../../../i18n";
import { toTitleCaseFromCamel, trimDataSuffix } from "../../../lib/utils/misc";
import { useAppDispatch, useAppSelector } from "../../../store/typedDispatch";
import {
  toggleCategoryOpen,
  setAllCategoriesChecked,
  setAllSubcategoriesChecked,
  setCheckDlc,
  setAltArmor,
} from "../../../store/settingsSlice";
import { useNavigate } from "react-router-dom";

export default function CategoriesWidget() {
  const [allOpen, setAllOpen] = useState(false);
  const navigate = useNavigate();
  const cllection = useAppSelector((state) => state.collection.collectionData);
  const dispatch = useAppDispatch();
  const {
    checkedCategories,
    checkedSubcategories,
    openCategories,
    checkDlc,
    altArmor,
  } = useAppSelector((s) => s.settings);

  const [localCheckedCategories, setLocalCheckedCategories] = useState<
    string[]
  >([]);
  const [localCheckedSubcategories, setLocalCheckedSubcategories] = useState<
    string[]
  >([]);
  const [localCheckDlc, setLocalCheckDlc] = useState(false);
  const [localAltArmor, setLocalAltArmor] = useState(true);

  useEffect(() => {
    setLocalCheckedCategories(checkedCategories);
    setLocalCheckedSubcategories(checkedSubcategories);
    setLocalCheckDlc(checkDlc);
    setLocalAltArmor(altArmor);
  }, [checkedCategories, checkedSubcategories, checkDlc, altArmor]);

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

    setLocalCheckedCategories(allCategories);
    setLocalCheckedSubcategories(allSubcategories);
  };

  const handleSelectNone = () => {
    setLocalCheckedCategories([]);
    setLocalCheckedSubcategories([]);
  };

  const toggleLocalCategory = (category: string, subkeys: string[]) => {
    const trimmed = trimDataSuffix(category);
    const isChecked = localCheckedCategories.includes(trimmed);
    if (isChecked) {
      setLocalCheckedCategories((prev) => prev.filter((c) => c !== trimmed));
      setLocalCheckedSubcategories((prev) =>
        prev.filter((s) => !subkeys.includes(s))
      );
    } else {
      setLocalCheckedCategories((prev) => [...prev, trimmed]);
      setLocalCheckedSubcategories((prev) => [
        ...new Set([...prev, ...subkeys]),
      ]);
    }
  };

  const toggleLocalSubcategory = (subcategory: string) => {
    const isChecked = localCheckedSubcategories.includes(subcategory);
    setLocalCheckedSubcategories((prev) =>
      isChecked ? prev.filter((s) => s !== subcategory) : [...prev, subcategory]
    );
  };

  const handleSave = () => {
    if (localCheckDlc !== checkDlc) {
      dispatch(setCheckDlc());
    }
    if (localAltArmor !== altArmor) {
      dispatch(setAltArmor());
    }
    dispatch(setAllCategoriesChecked(localCheckedCategories));
    dispatch(setAllSubcategoriesChecked(localCheckedSubcategories));
    navigate("/");
  };

  const isUnchanged =
    localCheckDlc === checkDlc &&
    localAltArmor === altArmor &&
    JSON.stringify(localCheckedCategories) ===
      JSON.stringify(checkedCategories) &&
    JSON.stringify(localCheckedSubcategories) ===
      JSON.stringify(checkedSubcategories);

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
          |
          <Flex align="center" gap={8}>
            <Checkbox
              checked={localCheckDlc}
              onChange={(e) => setLocalCheckDlc(e.target.checked)}
            >
              {t("misc", "DLC")}
            </Checkbox>
            <Checkbox
              checked={localAltArmor}
              onChange={(e) => setLocalAltArmor(e.target.checked)}
            >
              {t("misc", "Alt.Armor")}
            </Checkbox>
            <Button size="small" onClick={handleSave} disabled={isUnchanged}>
              {t("misc", "Apply changes")}
            </Button>
          </Flex>
        </Flex>
      </div>

      {allOpen && (
        <Row gutter={[24, 16]} align="top">
          {chunks.map((chunk, colIndex) => (
            <Col key={colIndex}>
              {chunk.map(([category, subcats]) => {
                const trimmedCategory = trimDataSuffix(category);
                const isChecked =
                  localCheckedCategories.includes(trimmedCategory);
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
                        onChange={() => toggleLocalCategory(category, subkeys)}
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
                            checked={localCheckedSubcategories.includes(sub)}
                            onChange={() => toggleLocalSubcategory(sub)}
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

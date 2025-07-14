import { Checkbox, Flex } from "antd";

import { t } from "../../../i18n";
import { toTitleCaseFromCamel, trimDataSuffix } from "../../../lib/utils/misc";
import { useAppDispatch, useAppSelector } from "../../../store/typedDispatch";
import {
  toggleCategoryChecked,
  toggleCategoryOpen,
  toggleSubcategoryChecked,
} from "../../../store/settingsSlice";

import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";

export default function CategoriesWidget() {
  const cllection = useAppSelector((state) => state.collection.collectionData);
  const dispatch = useAppDispatch();
  const { checkedCategories, checkedSubcategories, openCategories } =
    useAppSelector((s) => s.settings);

  return (
    <Flex vertical gap={12}>
      {Object.keys(cllection).map((category) => {
        const isChecked = checkedCategories.includes(trimDataSuffix(category));
        const isOpen = openCategories.includes(category);
        //@ts-ignore
        const subkeys = Object.keys(cllection[category]);

        return (
          <Flex vertical key={category}>
            <Flex align="center" gap={8}>
              <span
                onClick={() => dispatch(toggleCategoryOpen(category))}
                style={{ cursor: "pointer", userSelect: "none" }}
              >
                {isOpen ? <CaretUpOutlined /> : <CaretDownOutlined />}
                <span>
                  {t("misc", toTitleCaseFromCamel(trimDataSuffix(category)))}
                </span>
              </span>

              <Checkbox
                checked={isChecked}
                onChange={() =>
                  dispatch(toggleCategoryChecked({ category, subkeys }))
                }
              />
            </Flex>

            {isOpen && (
              <Flex vertical gap={4} style={{ paddingLeft: 24 }}>
                {subkeys.map((sub) => (
                  <Checkbox
                    key={sub}
                    checked={checkedSubcategories.includes(sub)}
                    onChange={() => dispatch(toggleSubcategoryChecked(sub))}
                  >
                    {t("misc", toTitleCaseFromCamel(sub))}
                  </Checkbox>
                ))}
              </Flex>
            )}
          </Flex>
        );
      })}
    </Flex>
  );
}

import { Radio, Flex } from "antd";
import type { RadioChangeEvent } from "antd";
import { setLanguage, t } from "../../../i18n";

type Lang = "ru" | "en";

export default function LangWidget() {
  const handleLangChange = (e: RadioChangeEvent) => {
    const lang = e.target.value as Lang;
    setLanguage(lang);
  };

  const storedLang = localStorage.getItem("xnd.lang") as Lang | null;

  return (
    <Flex gap={6} align="center">
      <span>{t("misc", "Lang")}:</span>
      <Radio.Group
        size="small"
        defaultValue={storedLang ?? "en"}
        onChange={handleLangChange}
        buttonStyle="solid"
      >
        <Radio.Button value="en">EN</Radio.Button>
        <Radio.Button value="ru">RU</Radio.Button>
      </Radio.Group>
    </Flex>
  );
}

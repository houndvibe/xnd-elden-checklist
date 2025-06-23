import { Radio, Flex } from "antd";
import type { RadioChangeEvent } from "antd";
import { Language, setLanguage, t } from "../../../i18n";
import { useAppSelector } from "../../../store/typedDispatch";

export default function LangWidget() {
  const currentLang = useAppSelector((state) => state.settings.lang);

  const handleLangChange = (e: RadioChangeEvent) => {
    const lang = e.target.value as Language;
    setLanguage(lang);
  };

  return (
    <Flex gap={6} align="center">
      <span>{t("misc", "Lang")}:</span>
      <Radio.Group
        size="small"
        value={currentLang}
        onChange={handleLangChange}
        buttonStyle="solid"
      >
        <Radio.Button value="en">EN</Radio.Button>
        <Radio.Button value="ru">RU</Radio.Button>
      </Radio.Group>
    </Flex>
  );
}

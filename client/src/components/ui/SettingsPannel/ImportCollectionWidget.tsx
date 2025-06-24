import { Button, Flex, Input, message } from "antd";
import { useState } from "react";
import { t } from "../../../i18n";

export default function ImportCollectionWidget() {
  const [inputValue, setInputValue] = useState("");

  const [messageApi, contextHolder] = message.useMessage();

  const handleImport = () => {
    if (!inputValue.trim()) {
      messageApi.error(t("misc", "Input is empty!"));
      return;
    }

    try {
      let parsed = inputValue;

      while (typeof parsed === "string") {
        parsed = JSON.parse(parsed);
      }

      if (typeof parsed !== "object" || parsed === null) {
        messageApi.error(t("misc", "Wrong format"));
      }

      localStorage.setItem(
        "XnDEldenCompendium.collection",
        JSON.stringify(parsed)
      );
      window.location.reload();
    } catch (e) {
      console.error(e);
      message.error(t("misc", "Wrong format"));
    }
  };

  const exportData = () => {
    const data = localStorage.getItem("XnDEldenCompendium.collection");
    messageApi.info(t("misc", "Your progress data saved to clipboard!"));
    if (data) {
      navigator.clipboard.writeText(data);
    }
  };

  return (
    <Flex gap={10} align="center">
      {contextHolder}
      <Input
        size="small"
        placeholder={t("misc", "Paste Your Progress Data") + "..."}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button onClick={handleImport} size="small">
        {t("misc", "Import")}
      </Button>
      <span>|</span>
      <Button onClick={exportData} size="small">
        {t("misc", "Export progress")}
      </Button>
    </Flex>
  );
}

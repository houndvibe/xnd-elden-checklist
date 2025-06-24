import { Button, Flex, message } from "antd";
import { t } from "../../../i18n";
import LZString from "lz-string";

export default function ImportCollectionWidget() {
  const [messageApi, contextHolder] = message.useMessage();

  const handleImport = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();

      if (!clipboardText.trim()) {
        messageApi.error(t("misc", "Clipboard is empty!"));
        return;
      }

      let dataToProcess = clipboardText;

      try {
        const decompressed = LZString.decompressFromBase64(clipboardText);
        if (decompressed) {
          dataToProcess = decompressed;
        }
      } catch {
        console.log(
          "Decompression failed, trying to parse as uncompressed data"
        );
      }

      let parsed = dataToProcess;

      while (typeof parsed === "string") {
        parsed = JSON.parse(parsed);
      }

      if (typeof parsed !== "object" || parsed === null) {
        messageApi.error(t("misc", "Wrong format"));
        return;
      }

      localStorage.setItem(
        "XnDEldenCompendium.collection",
        JSON.stringify(parsed)
      );

      messageApi.success(t("misc", "Data imported successfully!"));
      window.location.reload();
    } catch (e) {
      console.error(e);
      if (e instanceof DOMException && e.name === "NotAllowedError") {
        messageApi.error(
          t(
            "misc",
            "Access to clipboard denied. Please allow clipboard access."
          )
        );
      } else {
        messageApi.error(t("misc", "Wrong format"));
      }
    }
  };

  const exportData = () => {
    const data = localStorage.getItem("XnDEldenCompendium.collection");
    messageApi.info(t("misc", "Your progress data saved to clipboard!"));
    if (data) {
      const compressedData = LZString.compressToBase64(data);
      navigator.clipboard.writeText(compressedData);
    }
  };

  return (
    <Flex gap={10} align="center">
      {contextHolder}
      <Button onClick={exportData} size="small">
        {t("misc", "Export progress")}
      </Button>
      <span>|</span>
      <Button onClick={handleImport} size="small">
        {t("misc", "Import from clipboard")}
      </Button>
    </Flex>
  );
}

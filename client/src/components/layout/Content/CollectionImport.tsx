import { Button, Flex, Input, message } from "antd";
import { useState } from "react";

export default function ImportCollection() {
  const [inputValue, setInputValue] = useState("");

  const [messageApi, contextHolder] = message.useMessage();

  const handleImport = () => {
    if (!inputValue.trim()) {
      messageApi.error("Input is empty!");
      return;
    }

    try {
      let parsed = inputValue;

      while (typeof parsed === "string") {
        parsed = JSON.parse(parsed);
      }

      if (typeof parsed !== "object" || parsed === null) {
        messageApi.error("Wrong format");
      }

      localStorage.setItem("xnd.collection", JSON.stringify(parsed));
      window.location.reload();
    } catch (e) {
      console.error(e);
      message.error("Wrong format");
    }
  };

  const exportData = () => {
    const data = localStorage.getItem("xnd.collection");
    messageApi.info("Your progress data saved to clipboard!");
    if (data) {
      navigator.clipboard.writeText(data);
    }
  };

  return (
    <Flex gap={10} align="center">
      {contextHolder}
      <Input
        size="small"
        placeholder="JSON..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button onClick={handleImport} size="small">
        import progress
      </Button>
      <span>|</span>
      <Button onClick={exportData} size="small">
        export progress
      </Button>
    </Flex>
  );
}

import { Button, Checkbox, Flex, Modal, message } from "antd";
import { t } from "../../../i18n";
import { useState } from "react";
import {
  LOCALSTORAGE_COLLECTION_KEY,
  LOCALSTORAGE_SETTINGS_KEY,
  LOCALSTORAGE_CHECKPOINTS_KEY,
  APP_PALETTE,
} from "../../../lib/consts";

export default function ClearProgressWidget() {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [options, setOptions] = useState({
    clearProgress: false,
    resetSettings: false,
    clearCheckpoints: false,
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setOptions({
      clearProgress: false,
      resetSettings: false,
      clearCheckpoints: false,
    });
  };

  const handleConfirm = () => {
    if (options.clearProgress) {
      localStorage.removeItem(LOCALSTORAGE_COLLECTION_KEY);
    }

    if (options.resetSettings) {
      localStorage.removeItem(LOCALSTORAGE_SETTINGS_KEY);
    }

    if (options.clearCheckpoints) {
      localStorage.removeItem(LOCALSTORAGE_CHECKPOINTS_KEY);
    }

    messageApi.success(t("misc", "Selected data has been cleared"));
    setIsModalOpen(false);

    // Reload the page to apply changes
    if (
      options.clearProgress ||
      options.resetSettings ||
      options.clearCheckpoints
    ) {
      window.location.reload();
    }
  };

  const handleCheckboxChange = (key: keyof typeof options) => {
    setOptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      {contextHolder}
      <Button onClick={showModal} size="small" danger>
        {t("misc", "Clear data")}
      </Button>

      <Modal
        title={t("misc", "Clear data")}
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleConfirm}
        okButtonProps={{
          style: {
            background: APP_PALETTE.bgDark,
            border: "1px solid red",
          },
          danger: true,
          disabled:
            !options.clearProgress &&
            !options.resetSettings &&
            !options.clearCheckpoints,
        }}
        okText={t("misc", "Clear selected data")}
        cancelText={t("misc", "Cancel")}
      >
        <Flex vertical gap={10}>
          <Checkbox
            checked={options.clearProgress}
            onChange={() => handleCheckboxChange("clearProgress")}
          >
            {t("misc", "Clear collection progress")}
          </Checkbox>

          <Checkbox
            checked={options.resetSettings}
            onChange={() => handleCheckboxChange("resetSettings")}
          >
            {t("misc", "Reset settings")}
          </Checkbox>

          <Checkbox
            checked={options.clearCheckpoints}
            onChange={() => handleCheckboxChange("clearCheckpoints")}
          >
            {t("misc", "Clear checkpoints")}
          </Checkbox>
        </Flex>
      </Modal>
    </>
  );
}

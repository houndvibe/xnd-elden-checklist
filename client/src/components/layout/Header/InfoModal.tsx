import { useState } from "react";
import { Divider, Modal, Space, Typography, Switch, Flex, Image } from "antd";
import styles from "./InfoModal.module.scss";
import { useAppSelector } from "../../../store/typedDispatch";

const { Paragraph, Text, Title, Link } = Typography;

interface Props {
  isOpen: boolean;
  onCancel: () => void;
}

export default function InfoModal({ isOpen, onCancel }: Props) {
  const { showWelcome } = useAppSelector((state) => state.settings);
  const [lang, setLang] = useState<"en" | "ru">("en");

  const isRussian = lang === "ru";
  const isElectron = !!window.electronAPI;

  const handleLangSwitch = (checked: boolean) => {
    setLang(checked ? "ru" : "en");
  };

  return (
    <Modal
      title={
        <Flex gap={20}>
          <span>
            {showWelcome
              ? isRussian
                ? "Добро пожаловать!"
                : "Welcome!"
              : isRussian
              ? "Инфо"
              : "Info"}
          </span>
          {" | "}
          <div className={styles.langSwitch}>
            <Switch
              checked={isRussian}
              onChange={handleLangSwitch}
              checkedChildren="RU"
              unCheckedChildren="EN"
            />
          </div>
        </Flex>
      }
      open={isOpen}
      onCancel={onCancel}
      footer={null}
      className={styles.helpModal}
    >
      <Typography>
        <Title level={4}>
          <span className="info-title-text">
            {isRussian
              ? "Спасибо что воспользовались Elden Compendium!"
              : "Thank You for Using The Elden Compendium!"}
          </span>
        </Title>
        <Paragraph>
          {isRussian
            ? "Надеюсь, этот инструмент поможет вам собрать абсолютно все предметы в Elden Ring — включая DLC контент."
            : "I hope this tool helps you collect every single item in Elden Ring — including all DLC content."}
        </Paragraph>

        <Divider />

        {!isElectron && (
          <>
            <Title level={5}>
              <Flex align="center" gap={10}>
                <Image src={"assets/icons/important.png"} width={30} />
                <>{isRussian ? "Важная информация" : "Important Information"}</>
              </Flex>
            </Title>

            <Paragraph>
              {isRussian
                ? `Данные приложения хранятся в вашем браузере. При очистке истории или кэша они будут удалены. Чтобы не потерять прогресс, регулярно экспортируйте свой прогресс. (инструкцция в FAQ)`
                : "Your progress is stored in your browser. Clearing history or cache will erase it. Please export your data regularly to avoid losing progress. (instructions in FAQ)"}{" "}
              <br />
              {/*       {isRussian
                ? "Не удаляйте следующие ключи:"
                : "Do not delete the following keys:"} */}
            </Paragraph>
            {/*             <Paragraph>
              <Text code>XnDEldenCompendium.collection</Text> —{" "}
              {isRussian
                ? "содержит данные о собранных предметах."
                : "contains all collected item data."}
              <br />
              <Text code>XnDEldenCompendium.settings</Text> —{" "}
              {isRussian
                ? "содержит ваши личные настройки."
                : "contains your personal preferences."}
              <br />
              <Text code>XnDEldenCompendium.checkpoints</Text> —{" "}
              {isRussian
                ? "содержит чекпоинты."
                : "contains your checkpoints data."}
            </Paragraph>
            <Paragraph>
              {isRussian
                ? "Очистка истории браузера или удаление этих ключей приведёт к потере прогресса! Поэтому не забывайте делать Экспорт данных."
                : "Clearing your browser history or removing these keys will result in loss of progress! Don’t forget to export your data before doing so."}
            </Paragraph> */}
            <Divider />
          </>
        )}

        <Title level={5}>
          <Flex align="center" gap={10}>
            <Image src={"assets/icons/contacts.png"} width={50} />

            <span className="info-title-text">
              {isRussian ? "Контакты и поддержка" : "Contact & Support"}
            </span>
          </Flex>
        </Title>

        <Paragraph>
          {isRussian
            ? "Есть вопросы или баги? Пишите на"
            : "Got questions, feedback, or bug reports?"}{" "}
          <Link href="mailto:houndvibe@gmail.com">houndvibe@gmail.com</Link>.
          <br />
          {isRussian ? "Подписывайтесь на меня:" : "Stay connected on:"}{" "}
          <Space>
            <Link href="https://www.youtube.com/" target="_blank">
              YouTube
            </Link>
          </Space>
          <br />
          {isRussian
            ? "Поддержать проект можно здесь:"
            : "Support the project here:"}{" "}
          <Space>
            <Link href="https://boosty.to/your_boosty" target="_blank">
              Boosty
            </Link>
            {" | "}
            <Link href="https://patreon.com/your_patreon" target="_blank">
              Patreon
            </Link>
          </Space>
        </Paragraph>

        <Divider />

        <Title level={5}>
          <Flex align="center" gap={10}>
            <>
              <Image src={"assets/icons/faq.png"} width={50} />
            </>
            <span className="info-title-text">
              {isRussian
                ? "Часто задаваемые вопросы (FAQ)"
                : "Frequently Asked Questions (FAQ)"}
            </span>
          </Flex>
        </Title>

        <Paragraph>
          <br />
          <Text strong>
            {isRussian
              ? "⬤ Как сделать экспорт прогресса?"
              : "⬤ How do I export my progress?"}
          </Text>
          <br />
          <br />
          {isRussian
            ? '- Откройте настройки (иконка шестерёнки вверху справа) и нажмите "Export progress". Данные скопируются в буфер. Затем, после очистки историии бразуера или хранилища вставьте строку в поле импорта и нажмите "Import progress".'
            : '- Open the settings (gear icon in the top right) and click "Export progress". The data will be copied to the clipboard. Then, after clearing your browser history or storage, paste the string into the import field and click "Import progress".'}
        </Paragraph>
      </Typography>
    </Modal>
  );
}

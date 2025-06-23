import { useState } from "react";
import { Divider, Modal, Space, Typography, Switch, Flex, Image } from "antd";
import styles from "./InfoModal.module.scss";
import { useAppSelector } from "../../../store/typedDispatch";

import faq from "../../../assets/icons/faq.png";
/* import important from "../../../assets/icons/important.png"; */
import contacts from "../../../assets/icons/contacts.png";
const { Paragraph, Text, Title, Link } = Typography;

interface Props {
  isOpen: boolean;
  onCancel: () => void;
}

export default function InfoModal({ isOpen, onCancel }: Props) {
  const { showWelcome } = useAppSelector((state) => state.settings);
  const [lang, setLang] = useState<"en" | "ru">("en");

  const isRussian = lang === "ru";
  /*   const isElectron = !!window.electronAPI; */

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

        {/*  {!isElectron && (
          <>
            <Title level={5}>
              <Flex align="center" gap={10}>
                <>
                  <Image src={important} width={30} />
                </>
                <>{isRussian ? "Важная информация" : "Important Information"}</>
              </Flex>
            </Title>
            <Paragraph>
              {isRussian
                ? "Приложение сохраняет ваш прогресс в"
                : "This app saves your progress using your browser's"}{" "}
              <Text code>Local Storage</Text>.
            </Paragraph>
            <Paragraph>
              <Title level={5} style={{ margin: 0 }}>
                {isRussian
                  ? "Не удаляйте следующие ключи:"
                  : "Do not delete the following keys:"}
              </Title>
              <br />
              <Text code>XnDEldenCompendium.collection</Text> —{" "}
              {isRussian
                ? "содержит данные о собранных предметах."
                : "contains all collected item data."}
              <br />
              <Text code>XnDEldenCompendium.settings</Text> —{" "}
              {isRussian
                ? "содержит ваши личные настройки."
                : "contains your personal preferences."}
            </Paragraph>
            <Paragraph>
              {isRussian
                ? "Очистка хранилища браузера или удаление этих ключей приведёт к потере прогресса!"
                : "Clearing your browser storage or removing these keys will reset your progress!"}
            </Paragraph>
            <Divider />
          </>
        )}
 */}
        <Title level={5}>
          <Flex align="center" gap={10}>
            <Image src={contacts} width={50} />

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
              <Image src={faq} width={50} />
            </>
            <span className="info-title-text">
              {isRussian
                ? "Часто задаваемые вопросы (FAQ)"
                : "Frequently Asked Questions (FAQ)"}
            </span>
          </Flex>
        </Title>

        <Paragraph>
          <Text strong>
            {isRussian
              ? "⬤ Вышла новая версия приложения - как мне перенести в нее данные?"
              : "⬤ A new version of the app is out — how do I transfer my data?"}
          </Text>
          <br />
          {isRussian
            ? '- Откройте настройки (иконка шестерёнки вверху справа) и нажмите "Export progress". Затем в новой версии приложения вставьте строку в поле импорта и нажмите "Import progress".'
            : '- Open settings (gear icon in the top right) and click "Export progress". Then, in the new version of the app, paste the string into the import field and click "Import progress".'}
        </Paragraph>
      </Typography>
    </Modal>
  );
}

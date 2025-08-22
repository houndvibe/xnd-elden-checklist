import { useState } from "react";
import { Divider, Modal, Space, Typography, Switch, Flex, Image } from "antd";
import styles from "./InfoModal.module.scss";
import { useAppSelector } from "../../../store/typedDispatch";
import {
  BOOSTY_LINK,
  CURRENT_APP_VERSION,
  YOUTUBE_LINK,
} from "../../../lib/consts";

const { Paragraph, Text, Title, Link } = Typography;

interface Props {
  isOpen: boolean;
  onCancel: () => void;
}

export default function InfoModal({ isOpen, onCancel }: Props) {
  const { showWelcome, lang: appLang } = useAppSelector(
    (state) => state.settings
  );

  const [lang, setLang] = useState<"en" | "ru">(appLang);

  const isRussian = lang === "ru";
  const isElectron = !!window.electronAPI;

  const handleLangSwitch = (checked: boolean) => {
    setLang(checked ? "ru" : "en");
  };

  return (
    <Modal
      width={700}
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
          <br />
          {isRussian
            ? `На данный момент ${CURRENT_APP_VERSION} приложение находится в фазе бета-тестирования. Оно стабильно и функционирует на 100%, однако некоторые предметы и категории по прежнему могут подвергнуться изменениям`
            : `${CURRENT_APP_VERSION} — The application is currently in beta. It is stable and fully functional, but some items and categories may still be subject to change.`}
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
                ? `Данные приложения хранятся в localStorage вашего браузера.`
                : "The application's data is stored in your browser's localStorage."}
              <br />
            </Paragraph>
            <Paragraph>
              <Text code>XnDEldenCompendium.collection</Text> —{" "}
              {isRussian
                ? "содержит данные о собранных предметах."
                : "contains data about collected items."}
              <br />
              <Text code>XnDEldenCompendium.settings</Text> —{" "}
              {isRussian
                ? "содержит ваши личные настройки."
                : "contains your personal settings."}
              <br />
              <Text code>XnDEldenCompendium.checkpoints</Text> —{" "}
              {isRussian ? "содержит чекпоинты." : "contains your checkpoints."}
            </Paragraph>
            <Paragraph>
              {isRussian
                ? "Полная очистка истории браузера или удаление этих ключей приведёт к потере прогресса! Поэтому либо снимайте галочку 'Файлы Cookie и данные сайтов' при очистке браузера, либо не забывайте делать экспорт прогресса (FAQ). "
                : "Clearing your browser history or deleting these keys will result in loss of progress! Either uncheck 'Cookies and site data' when clearing your browser, or make sure to export your progress in advance (FAQ)."}
            </Paragraph>
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
            <Link href={YOUTUBE_LINK} target="_blank">
              YouTube
            </Link>
          </Space>
          <br />
          {isRussian
            ? "Поддержать проект можно здесь:"
            : "Support the project here:"}{" "}
          <Space>
            <Link href={BOOSTY_LINK} target="_blank" rel="noopener noreferrer">
              Boosty
            </Link>
            {/*   {" | "}
            <Link href={PATREON_LINK} target="_blank">
              Patreon
            </Link> */}
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
              ? "⬤ Я впервые открыл приложение, а там общий прогресс коллекции 0/0 и при попытке открыть 'Что считаем?' белый экран. Как пофиксить?"
              : "⬤ I opened the app for the first time, and the genereal stats shows 0/0. When I try to open 'What should we count?', I get a white screen. How can I fix this?"}
          </Text>
          <br />
          <br />
          {isRussian
            ? "- Такое иногда случается при первом запуске. Откройте настройки и нажмите красную кнопку ОЧИСТИТЬ ДАННЫЕ. Проставьте все галочки и подтвердите действие."
            : '- This sometimes happens on the first launch. Open the settings and click the red "CLEAR DATA" button. Check all the boxes and confirm the action.'}
        </Paragraph>
        <Paragraph>
          <br />
          <Text strong>
            {isRussian
              ? "⬤ Я впервые открыл приложение, а там всё уже заполнено на 100%. Почему? И как сбросить?"
              : "⬤ I just opened the app and everything is already 100% complete. Why? How do I reset it?"}
          </Text>
          <br />
          <br />
          {isRussian
            ? "- Такое иногда случается при первом запуске. Откройте настройки и нажмите красную кнопку ОЧИСТИТЬ ДАННЫЕ. Проставьте все галочки и подтвердите действие."
            : '- This sometimes happens on the first launch. Open the settings and click the red "CLEAR DATA" button. Check all the boxes and confirm the action.'}
        </Paragraph>

        <Paragraph>
          <br />
          <Text strong>
            {isRussian
              ? "⬤ Как сделать экспорт/импорт прогресса?"
              : "⬤ How do I export/import my progress?"}
          </Text>
          <br />
          <br />
          {isRussian
            ? '- Откройте настройки (иконка шестерёнки вверху справа) и нажмите "Экспорт прогресса". Данные скопируются в буфер. Затем, после очистки историии бразуера или хранилища нажмите "Импорт прогресса". Коллекция будет восстановлена. Если вы хотите восттановить коллекцию из заранее сохраненного текстового файла - просто скопируйте запись из файла и нажмите "Импорт прогресса"'
            : '- Open the settings (gear icon in the top right) and click "Export Progress". The data will be copied to your clipboard. Then, after clearing your browser history or storage, click "Import Progress" — your collection will be restored. If you want to restore your collection from a previously saved text file, simply copy the saved entry and click "Import Progress".'}
        </Paragraph>
      </Typography>
    </Modal>
  );
}

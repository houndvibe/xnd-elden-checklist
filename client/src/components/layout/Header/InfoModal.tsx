import { useState } from "react";
import { Divider, Modal, Space, Typography, Switch, Flex, Image } from "antd";
import styles from "./InfoModal.module.scss";
import { useAppSelector } from "../../../store/typedDispatch";

import faq from "../../../../public/images/icons/faq.png";
import important from "../../../../public/images/icons/important.png";
import contacts from "../../../../public/images/icons/contacts.png";
const { Paragraph, Text, Title, Link } = Typography;

interface Props {
  isOpen: boolean;
  onCancel: () => void;
}

export default function InfoModal({ isOpen, onCancel }: Props) {
  const { showWelcome } = useAppSelector((state) => state.settings);
  const [lang, setLang] = useState<"en" | "ru">("en");

  const isRussian = lang === "ru";

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
          {isRussian
            ? "Спасибо за использование приложения!"
            : "Thank You for Using the App!"}
        </Title>
        <Paragraph>
          {isRussian
            ? "Надеюсь, этот инструмент поможет вам собрать абсолютно все предметы в Elden Ring — включая дополнения."
            : "I hope this tool helps you collect every single item in Elden Ring — including all DLC content."}
        </Paragraph>

        <Divider />

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
          <Title level={5}>
            {isRussian
              ? "Не удаляйте следующие ключи:"
              : "Do not delete the following keys:"}
          </Title>
          <br />
          <Text code>xnd.collection</Text> —{" "}
          {isRussian
            ? "содержит данные о собранных предметах."
            : "contains all collected item data."}
          <br />
          <Text code>xnd.settings</Text> —{" "}
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

        <Title level={5}>
          <Flex align="center" gap={10}>
            <>
              <Image src={contacts} width={50} />
            </>
            <>{isRussian ? "Контакты и поддержка" : "Contact & Support"}</>
          </Flex>
        </Title>

        <Paragraph>
          {isRussian
            ? "Есть вопросы или баги? Пишите на"
            : "Got questions, feedback, or bug reports? Reach out via"}{" "}
          <Link href="mailto:houndvibe@gmail.com">houndvibe@gmail.com</Link>.
        </Paragraph>
        <Paragraph>
          {isRussian ? "Подписывайтесь на меня:" : "Stay connected on:"}{" "}
          <Space>
            <Link href="https://www.youtube.com/" target="_blank">
              YouTube
            </Link>
          </Space>
        </Paragraph>
        <Paragraph>
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
            <>
              {isRussian
                ? "Часто задаваемые вопросы (FAQ)"
                : "Frequently Asked Questions (FAQ)"}
            </>
          </Flex>
        </Title>
        <Paragraph>
          <Text strong>
            {isRussian
              ? "Есть ли в приложении другие языки кроме английского?"
              : "Are there other languages available besides English?"}
          </Text>
          <br />
          {isRussian
            ? "На данный момент нет. Возможно, они появятся в будущих обновлениях."
            : "Not at the moment. More languages may be added in future updates."}
        </Paragraph>
      </Typography>
    </Modal>
  );
}

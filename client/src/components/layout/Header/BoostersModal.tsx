import { Modal, List, Typography, Flex, Switch } from "antd";
import styles from "./BoostersModal.module.scss";
import { useState } from "react";

const { Title, Text, Link, Paragraph } = Typography;

interface Booster {
  name: string;
  avatar?: string;
  tier?: string;
  message?: string;
}

const boosters: Booster[] = [
  { name: "Godrick", message: "Мегахорош!!!!" },
  { name: "Stas", message: "Удачи с развитем проекта" },
  { name: "MrX", message: "Всей деревней ждем чеклист по DS3" },
];

interface BoostersModalProps {
  open: boolean;
  onClose: () => void;
}

export default function BoostersModal({ open, onClose }: BoostersModalProps) {
  const [lang, setLang] = useState<"en" | "ru">("en");
  const isRussian = lang === "ru";

  const isElectron = !!window.electronAPI;

  const handleLangSwitch = (checked: boolean) => {
    setLang(checked ? "ru" : "en");
  };

  return (
    <Modal
      closable={false}
      open={open}
      onCancel={onClose}
      footer={null}
      width={700}
      title={
        <Flex gap={20} align="center" justify="space-between">
          <Flex gap={20}>
            <span>{isRussian ? "Список Бустеров" : "Boosters List"}</span>
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
          <Flex justify="center" gap={16}>
            <Link href="https://boosty.to/xnd" target="_blank">
              Boosty
            </Link>
            {" | "}
            <Link href="https://patreon.com/your_patreon" target="_blank">
              Patreon
            </Link>
          </Flex>
        </Flex>
      }
      className={styles.boostersModal}
    >
      <Typography>
        <Title level={4}>
          <Flex align="center" gap={10}>
            <span className="booster-title-text">
              {isRussian ? "Благодарности!" : "Acknowledgements!"}
            </span>
          </Flex>
        </Title>

        <Paragraph>
          {isRussian
            ? "Эти люди поддержали проект и помогли ему стать лучше. Огромное спасибо!"
            : "These people supported the project and helped make it better. Thank you so much!"}
        </Paragraph>
        {isElectron &&
          (isRussian
            ? "( В десктоп версии этот список обновляется только с крупными патчами )"
            : "( In the desktop version, this list is only updated with major patches. )")}

        <List
          itemLayout="horizontal"
          dataSource={boosters}
          renderItem={(booster) => (
            <List.Item>
              <List.Item.Meta
                title={<Text strong>{"• " + booster.name}</Text>}
                description={
                  <>
                    <Text>{booster.tier}</Text>
                    {booster.message && (
                      <Text type="secondary">{booster.message}</Text>
                    )}
                  </>
                }
              />
            </List.Item>
          )}
        />
      </Typography>
    </Modal>
  );
}

import { Flex, Image, Modal, Switch } from "antd";
import thumb from "../../../../public/assets/last_vid_thumb.png";
import { LAST_VIDEO_LINK } from "../../../lib/consts";
import Link from "antd/es/typography/Link";
import { useState } from "react";

import styles from "./Header.module.scss";
import { useAppSelector } from "../../../store/typedDispatch";
interface BoostersModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LastVideoModal({ open, onClose }: BoostersModalProps) {
  const { lang: appLang } = useAppSelector((state) => state.settings);

  const [lang, setLang] = useState<"en" | "ru">(appLang);
  const isRussian = lang === "ru";

  const handleLangSwitch = (checked: boolean) => {
    setLang(checked ? "ru" : "en");
  };

  return (
    <Modal
      centered
      closable={true}
      open={open}
      onCancel={onClose}
      footer={null}
      width={700}
      title={
        <Flex align="center" gap={20}>
          <>
            <Switch
              checked={isRussian}
              onChange={handleLangSwitch}
              checkedChildren="RU"
              unCheckedChildren="EN"
            />
          </>
          {isRussian
            ? "Не забудь чекнуть мое последнее видео:"
            : "Don’t forget to check out my latest video:"}
        </Flex>
      }
    >
      <Link
        href={LAST_VIDEO_LINK}
        target="_blank"
        className={styles.videoThumb}
      >
        <Image src={thumb} preview={false} />
      </Link>
    </Modal>
  );
}

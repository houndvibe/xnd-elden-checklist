import { Card, ConfigProvider, Flex, Image, Progress, Tooltip } from "antd";
import { NavLink, useNavigate } from "react-router-dom";

import {
  APP_PALETTE,
  PROGRESSBAR_COLORS,
  TRUNCATE_LIMITS,
} from "../../lib/consts";
import { getSubCategoryStats } from "../../lib/utils/stats";
import { toTitleCaseFromCamel, truncateString } from "../../lib/utils/misc";

import type { ItemCategory, ItemSubCategoryMap } from "../../global-types";

import styles from "./Dashboard.module.scss";
import { t } from "../../i18n";

import icon from "../../../public/assets/dlc-icon.png";
import { isTablet } from "react-device-detect";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/typedDispatch";
interface DashboardWidgetProps {
  dataType: ItemCategory;
  data: {
    total: number;
    collected: number;
    percentage: number;
  };
  subData: Partial<ItemSubCategoryMap>;
  mode: boolean;
}

export default function DashboardWidget({
  dataType,
  data,
  subData,
  mode,
}: DashboardWidgetProps) {
  const navigate = useNavigate();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { checkDlc, altArmor, loosable } = useAppSelector(
    (state) => state.settings
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderProgress = () => (
    <Flex
      vertical
      align="center"
      justify="flex-start"
      style={{ padding: "1rem 0" }}
      flex={1}
    >
      <Progress
        type="dashboard"
        percent={data.percentage}
        strokeColor={PROGRESSBAR_COLORS}
        format={(percent) =>
          percent === 100 ? (
            <Image src={icon} height={80} width={80} preview={false} />
          ) : (
            `${percent}%`
          )
        }
      />
      <span style={{ fontSize: 20 }}>{`${data.collected}/${data.total}`}</span>
    </Flex>
  );

  const renderLinearProgress = () => (
    <Flex vertical gap={10} style={{ marginBottom: 20 }}>
      <Flex justify="space-between" align="center">
        <span
          style={{ fontSize: 16 }}
        >{`${data.collected}/${data.total}`}</span>
      </Flex>
      <Progress
        percent={data.percentage}
        strokeColor={PROGRESSBAR_COLORS}
        showInfo={true}
        format={(percent) =>
          percent === 100 ? (
            <span
              style={{ display: "inline-flex", alignItems: "center", gap: 4 }}
            >
              <Image src={icon} height={16} width={16} preview={false} />
              {`${percent}%`}
            </span>
          ) : (
            `${percent}%`
          )
        }
      />
    </Flex>
  );

  console.log(altArmor);

  const renderSubcategoryList = () => (
    <Flex vertical gap={20} flex={3}>
      {Object.entries(subData).map(([subclassName, subItems]) => {
        const stats = getSubCategoryStats(
          subItems,
          checkDlc,
          altArmor,
          loosable
        );
        const title = t("misc", toTitleCaseFromCamel(subclassName));
        const truncateTitle = truncateString(title, TRUNCATE_LIMITS.DASHBOARD);

        return (
          <NavLink
            key={subclassName}
            to={`/${dataType}?open=${subclassName}`}
            onClick={(e) => e.stopPropagation()}
            className={styles.link}
          >
            <Flex gap={10} justify="flex-end">
              <span>
                <Tooltip title={title}> {truncateTitle}</Tooltip>
              </span>
              <span>{`${stats.collected}/${stats.total}`}</span>
              <Progress
                style={{ width: 200 }}
                percent={stats.percentage}
                strokeColor={PROGRESSBAR_COLORS}
              />
            </Flex>
          </NavLink>
        );
      })}
    </Flex>
  );

  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            headerBg: APP_PALETTE.bgLight,
            headerFontSize: 16,
          },
        },
      }}
    >
      <Card
        className={`${styles.widget} ${styles[mode ? "full" : "compact"]}`}
        title={
          <div style={{ textAlign: mode ? "start" : "center" }}>
            {t("misc", toTitleCaseFromCamel(dataType))}
          </div>
        }
        onClick={() => navigate(`/${dataType}`)}
      >
        {(isTablet && mode) || (mode && windowWidth <= 1200) ? (
          <Flex vertical>
            {renderLinearProgress()}
            {mode && renderSubcategoryList()}
          </Flex>
        ) : (
          <Flex>
            {renderProgress()}
            {mode && renderSubcategoryList()}
          </Flex>
        )}
      </Card>
    </ConfigProvider>
  );
}

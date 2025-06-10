import { Card, ConfigProvider, Flex, Image, Progress } from "antd";
import type { ItemCategory, ItemSubCategoryMap } from "../../global-types";
import { toTitleCaseFromCamel } from "../../lib/utils/converters";
import { APP_PALETTE, PROGRESSBAR_COLORS } from "../../lib/consts";
import { getSubCategoryStats } from "../../lib/utils/stats";
import { truncateText } from "../../lib/utils/misc";
import logoIcon from "../../assets/dlc-icon.png";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.scss";

export default function DashboardWidget({
  dataType,
  data,
  subData,
  mode,
}: {
  dataType: ItemCategory;
  data: {
    total: number;
    collected: number;
    percentage: number;
  };
  subData: ItemSubCategoryMap;
  mode: boolean;
}) {
  const navigate = useNavigate();
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
        title={
          <div style={{ textAlign: mode ? "start" : "center" }}>
            {mode
              ? toTitleCaseFromCamel(dataType)
              : truncateText(toTitleCaseFromCamel(dataType), 12)}
          </div>
        }
        className={`${styles.widget} ${styles[mode ? "full" : "compact"]}`}
        onClick={() => navigate(`/${dataType}`)}
      >
        <Flex>
          <Flex
            vertical
            flex={1}
            align="center"
            justify="center"
            style={{ padding: "1rem 0" }}
          >
            <Progress
              type="dashboard"
              percent={data.percentage}
              strokeColor={PROGRESSBAR_COLORS}
              format={(percent) => {
                if (percent === 100) {
                  return <Image src={logoIcon} height={80} />;
                }
                return percent + "%";
              }}
            />
            <span style={{ fontSize: 20 }}>
              {data.collected + "/" + data.total}
            </span>
          </Flex>
          {mode ? (
            <Flex vertical gap={20} flex={3}>
              {Object.entries(subData).map(([subclassName, subItems]) => {
                const stats = getSubCategoryStats(subItems);

                return (
                  <NavLink
                    key={subclassName}
                    to={`/${dataType}?open=${subclassName}`}
                    onClick={(e) => e.stopPropagation()}
                    className={styles.link}
                  >
                    <Flex key={subclassName} gap={10} justify="flex-end">
                      <span>
                        {truncateText(toTitleCaseFromCamel(subclassName))}
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
          ) : null}
        </Flex>
      </Card>
    </ConfigProvider>
  );
}

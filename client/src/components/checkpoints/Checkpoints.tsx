import { useState, useMemo } from "react";
import {
  Button,
  Card,
  Input,
  List,
  Typography,
  Flex,
  Popconfirm,
  Divider,
  Empty,
  Tag,
  Tooltip,
  Modal,
  Table,
  Tabs,
} from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  InfoCircleOutlined,
  LineChartOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../store/typedDispatch";
import {
  addCheckpoint,
  removeCheckpoint,
  clearAllCheckpoints,
  CheckpointDiff,
} from "../../store/checkpointsSlice";
import { getCategoryStats } from "../../lib/utils/stats";
import { APP_PALETTE, itemCategories } from "../../lib/consts";
import styles from "./Checkpoints.module.scss";
import { formatDate, toTitleCaseFromCamel } from "../../lib/utils/misc";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { t } from "../../i18n";

export default function Checkpoints() {
  const dispatch = useAppDispatch();
  const [checkpointName, setCheckpointName] = useState("");
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<string | null>(
    null
  );
  const [diffModalVisible, setDiffModalVisible] = useState(false);
  const [diffData, setDiffData] = useState<CheckpointDiff[]>([]);
  const [showCharts, setShowCharts] = useState(false);

  const checkpoints = useAppSelector((state) => state.checkpoints.checkpoints);
  const currentCollection = useAppSelector(
    (state) => state.collection.collectionData
  );
  const { checkDlc } = useAppSelector((state) => state.settings);

  // Подготовка данных для графиков
  const chartData = useMemo(() => {
    // Сортируем чекпоинты по дате
    const sortedCheckpoints = [...checkpoints].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return sortedCheckpoints.map((checkpoint) => {
      const data: Record<string, any> = {
        name: checkpoint.name,
        date: formatDate(new Date(checkpoint?.date)),
        timestamp: new Date(checkpoint.date).getTime(),
      };

      // Добавляем статистику по каждой категории
      itemCategories.forEach((category) => {
        const categoryKey =
          `${category}Data` as keyof typeof checkpoint.collectionData;
        const categoryData = checkpoint.collectionData[categoryKey];
        const stats = getCategoryStats(categoryData, checkDlc);
        data[category] = stats.collected;
        data[`${category}Percentage`] = stats.percentage;
      });

      // Добавляем общую статистику
      let totalCollected = 0;
      let totalItems = 0;

      itemCategories.forEach((category) => {
        const categoryKey =
          `${category}Data` as keyof typeof checkpoint.collectionData;
        const categoryData = checkpoint.collectionData[categoryKey];
        const stats = getCategoryStats(categoryData, checkDlc);
        totalCollected += stats.collected;
        totalItems += stats.total;
      });

      data.total = totalCollected;
      data.totalPercentage = Number(
        ((totalCollected / totalItems) * 100).toFixed(2)
      );

      return data;
    });
  }, [checkpoints]);

  // Добавляем текущее состояние коллекции в данные графика
  const fullChartData = useMemo(() => {
    if (chartData.length === 0) return [];

    const currentData: Record<string, any> = {
      name: t("misc", "Current"),
      date: formatDate(new Date()),
      timestamp: new Date().getTime(),
    };

    // Добавляем статистику по каждой категории
    itemCategories.forEach((category) => {
      const categoryKey = `${category}Data` as keyof typeof currentCollection;
      const categoryData = currentCollection[categoryKey];
      const stats = getCategoryStats(categoryData, checkDlc);
      currentData[category] = stats.collected;
      currentData[`${category}Percentage`] = stats.percentage;
    });

    // Добавляем общую статистику
    let totalCollected = 0;
    let totalItems = 0;

    itemCategories.forEach((category) => {
      const categoryKey = `${category}Data` as keyof typeof currentCollection;
      const categoryData = currentCollection[categoryKey];
      const stats = getCategoryStats(categoryData, checkDlc);
      totalCollected += stats.collected;
      totalItems += stats.total;
    });

    currentData.total = totalCollected;
    currentData.totalPercentage = Number(
      ((totalCollected / totalItems) * 100).toFixed(2)
    );

    return [...chartData, currentData];
  }, [chartData, currentCollection]);

  const handleAddCheckpoint = () => {
    if (!checkpointName.trim()) return;

    dispatch(
      addCheckpoint({
        name: checkpointName,
        collectionData: currentCollection,
      })
    );

    setCheckpointName("");
  };

  const handleRemoveCheckpoint = (id: string) => {
    dispatch(removeCheckpoint(id));
  };

  const handleClearAll = () => {
    dispatch(clearAllCheckpoints());
  };

  const calculateDiff = (checkpointId: string) => {
    const checkpoint = checkpoints.find((cp) => cp.id === checkpointId);
    if (!checkpoint) return;

    const diffs: CheckpointDiff[] = [];

    itemCategories.forEach((category) => {
      const categoryKey = `${category}Data` as keyof typeof currentCollection;

      const currentData = currentCollection[categoryKey];
      const checkpointData = checkpoint.collectionData[categoryKey];

      const currentStats = getCategoryStats(currentData, checkDlc);
      const checkpointStats = getCategoryStats(checkpointData, checkDlc);

      diffs.push({
        categoryName: t("misc", category),
        prevCount: checkpointStats.collected,
        currentCount: currentStats.collected,
        diff: currentStats.collected - checkpointStats.collected,
      });
    });

    setDiffData(diffs);
    setSelectedCheckpoint(checkpointId);
    setDiffModalVisible(true);
  };

  const columns = [
    {
      title: t("misc", "Category"),
      dataIndex: "categoryName",
      key: "categoryName",
      width: "70%",
      render: (value: string) => t("misc", toTitleCaseFromCamel(value)),
    },
    {
      title: t("misc", "Previous"),
      dataIndex: "prevCount",
      key: "prevCount",
      width: "10%",
    },
    {
      title: t("misc", "Current"),
      dataIndex: "currentCount",
      key: "currentCount",
      width: "10%",
    },
    {
      title: t("misc", "Difference"),
      dataIndex: "diff",
      key: "diff",
      width: "10%",
      render: (diff: number) => (
        <Tag color={diff > 0 ? "success" : diff < 0 ? "error" : "default"}>
          {diff > 0 ? `+${diff}` : diff}
        </Tag>
      ),
    },
  ];

  const totalDiff = diffData.reduce((sum, item) => sum + item.diff, 0);

  // Генерируем цвета для линий графика
  const getLineColor = (index: number) => {
    const colors = [
      "#8884d8",
      "#82ca9d",
      "#ffc658",
      "#ff8042",
      "#0088FE",
      "#00C49F",
      "#FFBB28",
      "#FF8042",
      "#a4de6c",
      "#d0ed57",
      "#b19cd9",
      "#f6a6b2",
      "#67b7dc",
      "#8a5ac9",
      "#e8b339",
      "#aa7714",
      "#6b4226",
    ];
    return colors[index % colors.length];
  };

  const renderCharts = () => {
    if (fullChartData.length <= 1) {
      return (
        <Empty
          description={t("misc", "Need at least one checkpoint to show charts")}
        />
      );
    }

    return (
      <Card>
        <Tabs defaultActiveKey="total">
          <Tabs.TabPane tab={t("misc", "Total Progress")} key="total">
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={fullChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <RechartsTooltip
                  shared={false}
                  wrapperStyle={{ zIndex: 1000 }}
                  formatter={(value, name) => [
                    value,
                    t("misc", name.toString()),
                  ]}
                  labelFormatter={(label) => {
                    const item = fullChartData.find((d) => d.name === label);
                    return item ? item.date : label;
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="totalPercentage"
                  name={t("misc", "Collection completion %")}
                  stroke={APP_PALETTE.textHighlighted}
                  fill={APP_PALETTE.textHighlighted}
                  activeDot={{ r: 8 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Tabs.TabPane>

          {/*           <Tabs.TabPane tab={t("misc", "Items Count")} key="items">
            <ResponsiveContainer width="100%" height={600}>
              <LineChart data={fullChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <RechartsTooltip
                  shared={false}
                  wrapperStyle={{ zIndex: 1000 }}
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const item = fullChartData.find((d) => d.name === label);
                      const dateLabel = item ? item.date : label;

                      return (
                        <div
                          style={{
                            backgroundColor: "#141414",
                            border: `1px solid #aa7714`,
                            padding: "20px",
                            borderRadius: "20px",
                          }}
                        >
                          <p
                            style={{
                              margin: "0 0 10px 0",
                              color: "#e8b339",
                              fontFamily: "Cinzel",
                            }}
                          >
                            {dateLabel}
                          </p>
                          {payload.map((entry, index) => (
                            <p
                              key={`item-${index}`}
                              style={{
                                color: entry.color,
                                margin: "5px 0",
                                fontFamily: "Cinzel",
                              }}
                            >
                              {t(
                                "misc",
                                toTitleCaseFromCamel(
                                  entry.name
                                    .toString()
                                    .replace("Percentage", "")
                                )
                              )}
                              : {entry.value}
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                <Legend />

                {itemCategories.map((category, index) => (
                  <Line
                    key={category}
                    type="monotone"
                    dataKey={category}
                    name={t(
                      "misc",
                      toTitleCaseFromCamel(
                        category.toString().replace("Percentage", "")
                      )
                    )}
                    stroke={getLineColor(index)}
                    activeDot={{ r: 8 }}
                  />
                ))}
                <Line
                  type="monotone"
                  dataKey="total"
                  name={t("misc", "Total")}
                  stroke="#ff0000"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Tabs.TabPane>
 */}
          <Tabs.TabPane tab={t("misc", "Completion %")} key="percentage">
            <ResponsiveContainer width="100%" height={600}>
              <LineChart data={fullChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis domain={[0, 100]} />
                <RechartsTooltip
                  shared={false}
                  wrapperStyle={{ zIndex: 1000 }}
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const item = fullChartData.find((d) => d.name === label);
                      const dateLabel = item ? item.date : label;

                      return (
                        <div
                          style={{
                            backgroundColor: "#141414",
                            border: "1px solid #aa7714",
                            padding: "20px",
                            borderRadius: "20px",
                          }}
                        >
                          <p
                            style={{
                              margin: "0 0 10px 0",
                              color: "#e8b339",
                              fontFamily: "Cinzel",
                            }}
                          >
                            {dateLabel}
                          </p>
                          {payload.map((entry, index) => (
                            <p
                              key={`item-${index}`}
                              style={{
                                color: entry.color,
                                margin: "5px 0",
                                fontFamily: "Cinzel",
                              }}
                            >
                              {t(
                                "misc",
                                toTitleCaseFromCamel(
                                  entry.name
                                    .toString()
                                    .replace("Percentage", "")
                                )
                              )}
                              : {entry.value}%
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend
                  formatter={(value) => value.replace("Percentage", " %")}
                />
                {itemCategories.map((category, index) => (
                  <Line
                    key={category}
                    type="monotone"
                    dataKey={`${category}Percentage`}
                    name={t(
                      "misc",
                      toTitleCaseFromCamel(
                        category.toString().replace("Percentage", "")
                      )
                    )}
                    stroke={getLineColor(index)}
                    activeDot={{ r: 8 }}
                  />
                ))}
                <Line
                  type="monotone"
                  dataKey="totalPercentage"
                  name={t("misc", "Total %")}
                  stroke="#ff0000"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Tabs.TabPane>
        </Tabs>
      </Card>
    );
  };

  return (
    <Flex vertical gap={20}>
      <Card title={t("misc", "Checkpoints")} className={styles.bg}>
        <Typography.Paragraph className={styles.title}>
          {t(
            "misc",
            "Checkpoints allow you to track your collection progress over time. Create a checkpoint to save your current collection state."
          )}
        </Typography.Paragraph>

        <Flex gap={10}>
          <Input
            placeholder={t("misc", "Checkpoint name")}
            value={checkpointName}
            onChange={(e) => setCheckpointName(e.target.value)}
            onPressEnter={handleAddCheckpoint}
          />
          <Button
            className={styles.btn}
            icon={<PlusOutlined />}
            onClick={handleAddCheckpoint}
          >
            {t("misc", "Create Checkpoint")}
          </Button>

          {checkpoints.length > 0 && (
            <Button
              className={styles.btn}
              icon={showCharts ? <UpOutlined /> : <LineChartOutlined />}
              onClick={() => setShowCharts(!showCharts)}
            >
              {showCharts ? t("misc", "Hide Charts") : t("misc", "Show Charts")}
            </Button>
          )}
        </Flex>

        <Divider />

        {/* Отображаем графики над списком чекпоинтов, если showCharts = true */}
        {showCharts && checkpoints.length > 0 && renderCharts()}

        {checkpoints.length === 0 ? (
          <Empty description={t("misc", "No checkpoints yet")} />
        ) : (
          <>
            <List
              dataSource={checkpoints}
              renderItem={(checkpoint) => (
                <List.Item
                  actions={[
                    <Button
                      key="info"
                      type="text"
                      icon={<InfoCircleOutlined />}
                      onClick={() => calculateDiff(checkpoint.id)}
                    />,
                    <Popconfirm
                      key="delete"
                      title={t(
                        "misc",
                        "Are you sure you want to delete this checkpoint?"
                      )}
                      onConfirm={() => handleRemoveCheckpoint(checkpoint.id)}
                      okText={t("misc", "Yes")}
                      cancelText={t("misc", "No")}
                      okButtonProps={{ className: styles.dangerButton }}
                      cancelButtonProps={{ className: styles.cancelButton }}
                    >
                      <Button type="text" danger icon={<DeleteOutlined />} />
                    </Popconfirm>,
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <span className={styles.itemTitle}>
                        {checkpoint.name}
                      </span>
                    }
                    description={
                      <span className={styles.itemDesc}>
                        {formatDate(checkpoint?.date || "")}
                      </span>
                    }
                  />
                </List.Item>
              )}
            />

            <Divider />

            <Flex justify="end">
              <Popconfirm
                title={t(
                  "misc",
                  "Are you sure you want to delete all checkpoints?"
                )}
                onConfirm={handleClearAll}
                okText={t("misc", "Yes")}
                cancelText={t("misc", "No")}
                okButtonProps={{ className: styles.dangerButton }}
                cancelButtonProps={{ className: styles.cancelButton }}
              >
                <Button danger className={styles.dangerButton}>
                  {t("misc", "Clear All")}
                </Button>
              </Popconfirm>
            </Flex>
          </>
        )}
      </Card>

      <Modal
        bodyStyle={{ maxHeight: "85vh", overflow: "auto" }}
        title={
          <Flex align="center" gap={10}>
            <span>{t("misc", "Progress Comparison")}</span>
            {selectedCheckpoint && (
              <Tooltip title={t("misc", "Checkpoint date")}>
                <Tag>
                  {formatDate(
                    checkpoints.find((cp) => cp?.id === selectedCheckpoint)
                      ?.date || ""
                  )}
                </Tag>
              </Tooltip>
            )}
          </Flex>
        }
        open={diffModalVisible}
        onCancel={() => setDiffModalVisible(false)}
        footer={false}
        height={300}
        width={800}
      >
        <Table
          dataSource={diffData}
          columns={columns}
          pagination={false}
          rowKey="categoryName"
          summary={() => (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>
                  <strong>{t("misc", "Total")}</strong>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1}></Table.Summary.Cell>
                <Table.Summary.Cell index={2}></Table.Summary.Cell>
                <Table.Summary.Cell index={3}>
                  <Tag
                    color={
                      totalDiff > 0
                        ? "success"
                        : totalDiff < 0
                        ? "error"
                        : "default"
                    }
                  >
                    {totalDiff > 0 ? `+${totalDiff}` : totalDiff}
                  </Tag>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />
      </Modal>
    </Flex>
  );
}

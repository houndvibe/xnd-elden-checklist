import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/typedDispatch";
import { ThunderboltTwoTone } from "@ant-design/icons";
import Link from "antd/es/typography/Link";
import styles from "./SubCategoryContent.module.scss";
import { getNextSortStep, smartNameSort } from "../../../lib/utils/sorters";
import { APP_PALETTE } from "../../../lib/consts";
import { toggleTalismanCollected } from "../../../store/collectionSlice";
import { getStoreAction } from "../../../store/actions";
import { setGlobalSearchItem } from "../../../store/serviceSlice";
import type { SortOrder } from "antd/es/table/interface";
import type {
  Item,
  ItemSubCategory,
  TalismansSubCategoryMap,
} from "../../../global-types";
import {
  Table as AntdTable,
  Checkbox,
  ConfigProvider,
  Flex,
  Image,
  Tooltip,
  type TableProps,
} from "antd";
import {
  isLegendaryItem,
  isMultiVersionTalisman,
  truncateString,
} from "../../../lib/utils/misc";
import CustomTableTitle from "./CustomTableTitle";
import { t } from "../../../i18n";
import icon from "../../../../public/assets/dlc-icon.png";
import { isTablet } from "react-device-detect";

interface Props {
  setHoveredItemName: React.Dispatch<React.SetStateAction<string>>;
  dataSource: Item[];
  subcategory: ItemSubCategory;
}

export default function Table({
  setHoveredItemName,
  dataSource,
  subcategory,
}: Props) {
  const dispatch = useAppDispatch();
  const { globalSearchItem } = useAppSelector((state) => state.service);

  const [sortStep, setSortStep] = useState(0);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  //debounce
  const handleMouseEnter = (record: Item) => {
    if (record.name === globalSearchItem) {
      dispatch(setGlobalSearchItem(null));
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredItemName("");
      setHoveredItemName(record.name);
    }, 50);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    if (globalSearchItem) {
      setHoveredItemName(globalSearchItem);
    }
  }, [globalSearchItem]);

  const renderNameCell = (value: string, record: Item) => {
    const getLink = (type: "link" | "legendary" | "") =>
      isTablet ? (
        <div className={styles[type]}>
          {truncateString(t(record.type, value), 30)}
        </div>
      ) : (
        <Link
          href={record.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles[type]}>{t(record.type, value)}</div>
        </Link>
      );

    return (
      <Flex gap={10}>
        {isLegendaryItem(record) ? (
          <>
            <Tooltip title="Legendary Item">
              <ThunderboltTwoTone twoToneColor={APP_PALETTE.textPrimary} />
            </Tooltip>
            {getLink("legendary")}
          </>
        ) : (
          getLink(isTablet ? "" : "link")
        )}
        {record.dlc && (
          <Tooltip title="Shadow of the Erdtree Dlc content">
            <Image preview={false} src={icon} height={20} width={20} />
          </Tooltip>
        )}
      </Flex>
    );
  };

  const renderCollectedCell = (_: boolean, record: Item) =>
    isMultiVersionTalisman(record) ? (
      <Flex vertical gap={1}>
        {record.versions.map((item) => (
          <Flex key={item.tier} align="center" gap={4}>
            <Checkbox
              checked={item.collected}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(
                  toggleTalismanCollected({
                    subcategory: subcategory as keyof TalismansSubCategoryMap,
                    name: record.name,
                    tier: item.tier,
                  })
                );
              }}
            />
            {item.legendary ? (
              <>
                <div className={styles.legendary}>
                  {item.tier > 0 && `+${item.tier}`}
                </div>
                <Tooltip title="Legendary Item">
                  <ThunderboltTwoTone twoToneColor={APP_PALETTE.textPrimary} />
                </Tooltip>
              </>
            ) : (
              item.tier > 0 && `+${item.tier}`
            )}
            {item.dlc && (
              <Tooltip title="Shadow of the Erdtree Dlc content">
                <Image src={icon} height={20} width={20} preview={false} />
              </Tooltip>
            )}
          </Flex>
        ))}
      </Flex>
    ) : (
      <Flex gap={5} align="baseline">
        <Checkbox
          checked={record.collected}
          onClick={(e) => {
            e.stopPropagation();
            getStoreAction({
              name: record.name,
              category: record.type,
              subcategory,
              dispatch,
            });
          }}
        />
      </Flex>
    );

  const columns: TableProps<Item>["columns"] = [
    {
      title: <CustomTableTitle title={"name"} />,
      dataIndex: "name",
      key: "name",
      width: "85%",
      sortOrder: sortColumn === "name" ? "ascend" : null,
      sorter: (a, b) => smartNameSort(sortStep, a, b),
      render: renderNameCell,
    },
    {
      title: <CustomTableTitle title={"collected"} />,
      dataIndex: "collected",
      key: "collected",
      sortOrder: sortColumn === "collected" ? sortOrder : null,
      sorter: (a, b) =>
        a.collected === b.collected ? 0 : a.collected ? -1 : 1,
      render: renderCollectedCell,
    },
  ];

  const handleTableChange: TableProps<Item>["onChange"] = (
    _pagination,
    _filters,
    sorter
  ) => {
    const sortObj = Array.isArray(sorter) ? sorter[0] : sorter;

    switch (sortObj.columnKey) {
      case "name":
        setSortStep((prev) => getNextSortStep(dataSource, prev));
        setSortColumn("name");
        setSortOrder("ascend");
        break;
      case "collected":
        setSortStep(0);
        setSortColumn("collected");
        setSortOrder(sortObj.order ?? null);
        break;
      default:
        setSortStep(0);
        setSortColumn(null);
        setSortOrder(null);
    }
  };

  return (
    <ConfigProvider
      locale={{
        locale: "custom",
        Table: {},
      }}
    >
      <AntdTable
        className={styles.table}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        size="small"
        rowKey="name"
        rowClassName={(record) => {
          if (record.name === globalSearchItem) return "row-searchTarget";
          if (record.collected) return "row-collected";
          return "row-missing";
        }}
        onChange={handleTableChange}
        onRow={(record) => ({
          onMouseEnter: () => handleMouseEnter(record),
          onMouseLeave: handleMouseLeave,
          onClick: () =>
            isMultiVersionTalisman(record) || isTablet
              ? null
              : getStoreAction({
                  name: record.name,
                  category: record.type,
                  subcategory,
                  dispatch,
                }),
        })}
      />
    </ConfigProvider>
  );
}

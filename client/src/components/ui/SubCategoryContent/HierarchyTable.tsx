import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/typedDispatch";
import Link from "antd/es/typography/Link";
import { getStoreAction } from "../../../store/actions";
import { getNextSortStep, smartNameSort } from "../../../lib/utils/sorters";
import { useEffect } from "react";
import styles from "./SubCategoryContent.module.scss";
import type { Item, ItemSubCategory } from "../../../global-types";
import {
  Table as AntdTable,
  Checkbox,
  Flex,
  Image,
  Tooltip,
  type TableProps,
} from "antd";
import {
  setGlobalSearchItem,
  setGlobalSearchSet,
} from "../../../store/serviceSlice";
import CustomTableTitle from "./CustomTableTitle";
import { t } from "../../../i18n";

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
  const { globalSearchItem, globalSearchSet } = useAppSelector(
    (state) => state.service
  );

  const [sortStep, setSortStep] = useState(0);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"ascend" | "descend" | null>(null);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    if (globalSearchSet && !expandedKeys.includes(globalSearchSet)) {
      setExpandedKeys((prev) => [...prev, globalSearchSet]);
    }
  }, [globalSearchSet, expandedKeys]);

  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  //debounce
  const handleMouseEnter = (record: Item) => {
    if (record.name === globalSearchItem) {
      dispatch(setGlobalSearchItem(null));
      dispatch(setGlobalSearchSet(null));
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
    return (
      <Flex gap={10}>
        <Link
          href={record.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.link}>{t(record.type, value)}</div>
        </Link>
        {record.dlc && (
          <Tooltip title="Shadow of the Erdtree Dlc content">
            <Image
              preview={false}
              src={"../../../../public/assets/dlc-icon.png"}
              height={20}
            />
          </Tooltip>
        )}
      </Flex>
    );
  };

  const renderCollectedCell = (_: boolean, record: Item) => (
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
      width: "90%",
      sortOrder: sortColumn === "name" ? "ascend" : null,
      sorter: (a, b) => smartNameSort(sortStep, a, b),
      render: renderNameCell,
    },
    {
      title: <CustomTableTitle title={"collected"} />,
      dataIndex: "collected",
      key: "collected",
      width: "60%",
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
    <AntdTable
      className={styles.table}
      columns={columns}
      dataSource={dataSource}
      rowKey={(item) => item.name}
      onChange={handleTableChange}
      expandable={{
        expandedRowKeys: expandedKeys,
        onExpandedRowsChange: (keys) => {
          setExpandedKeys([...keys]);
        },
        expandedRowRender: (record) => {
          if ("items" in record) {
            const parts = Object.entries(record.items)
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              .filter(([_, piece]) => piece !== null)
              .map(([partName, piece]) => ({
                key: `${record.name}-${partName}`,
                ...piece!,
              }));
            return (
              <AntdTable
                expandable={{
                  defaultExpandAllRows: true,
                }}
                showHeader={false}
                columns={columns}
                dataSource={parts}
                pagination={false}
                rowKey={(item) => item.name}
                rowClassName={(record) => {
                  if (record.name === globalSearchItem)
                    return "row-searchTarget";
                  if (record.collected) return "row-collected";
                  return "row-missing";
                }}
                onRow={(record) => ({
                  onMouseEnter: () => handleMouseEnter(record),
                  onMouseLeave: handleMouseLeave,
                  onClick: () => {
                    getStoreAction({
                      name: record.name,
                      category: record.type,
                      subcategory,
                      dispatch,
                    });
                  },
                })}
              />
            );
          }
          return null;
        },
      }}
      pagination={false}
      size="small"
      rowClassName={(record) => {
        if (record.name === globalSearchItem) return "row-searchTarget";
        if (record.collected) return "row-collected";
        return "row-missing";
      }}
      onRow={(record) => ({
        onMouseEnter: () => handleMouseEnter(record),
        onMouseLeave: handleMouseLeave,
        onClick: () => {
          getStoreAction({
            name: record.name,
            category: record.type,
            subcategory,
            dispatch,
          });
        },
      })}
    />
  );
}

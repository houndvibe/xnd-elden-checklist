import type { Item, ItemSubCategory } from "../../../global-types";
import {
  convertArmourItemNameToWikiImageUrl,
  getNameToImgUrlConverter,
} from "../../../lib/utils/converters";
import { useAppDispatch } from "../../../store/typedDispatch";
import { CheckOutlined } from "@ant-design/icons";

import styles from "./SubCategoryContent.module.scss";
import {
  Table as AntdTable,
  Checkbox,
  Flex,
  Image,
  Tooltip,
  type TableProps,
} from "antd";
import Link from "antd/es/typography/Link";
import dlcIcon from "../../../assets/dlc-icon.png";
import { getStoreAction } from "../../../store/actions";

export default function HierarchyTable({
  setHoveredImg,
  dataSource,
  category,
}: {
  setHoveredImg: React.Dispatch<
    React.SetStateAction<{
      url: string | undefined;
      name: string;
    }>
  >;
  dataSource: Item[];
  category: ItemSubCategory;
}) {
  const dispatch = useAppDispatch();

  const columns: TableProps<Item>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "90%",
      render: (value, record) => {
        return (
          <Flex gap={10}>
            <Link
              href={record.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <span className={styles.link}>{value}</span>
            </Link>

            {record.dlc && (
              <Tooltip title={"Shadow of the Erdtree Dlc content"}>
                <Image src={dlcIcon} height={20} />
              </Tooltip>
            )}
          </Flex>
        );
      },
    },
    {
      title: <CheckOutlined />,
      dataIndex: "collected",
      key: "collected",
      width: "60%",
      render: (_value: boolean, record: Item) => <Checkbox />,
    },
  ];

  return (
    <AntdTable
      className={styles.table}
      columns={columns}
      dataSource={dataSource}
      rowKey={(item) => item.name}
      expandable={{
        expandedRowRender: (record) => {
          if ("items" in record) {
            const parts = Object.entries(record.items)
              .filter(([_, piece]) => piece !== null)
              .map(([partName, piece]) => ({
                key: `${record.name}-${partName}`,
                ...piece!,
              }));
            return (
              <AntdTable
                expandable={{ defaultExpandAllRows: true }}
                showHeader={false}
                columns={columns}
                dataSource={parts}
                pagination={false}
                rowKey={(item) => item.name}
                onRow={(record) => ({
                  onMouseEnter: () => {
                    const imgUrl = record.imgUrl
                      ? record.imgUrl
                      : convertArmourItemNameToWikiImageUrl(
                          record.name,
                          record.dlc
                        );

                    setHoveredImg({ url: imgUrl, name: record.name });
                  },
                  onClick: () => {
                    getStoreAction(
                      record.type,
                      record.name,
                      category,
                      dispatch
                    );
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
      rowClassName={(record) =>
        record.collected ? "row-collected" : "row-missing"
      }
      onRow={(record) => ({
        onMouseEnter: () => {
          const imgUrl = record.imgUrl
            ? record.imgUrl
            : getNameToImgUrlConverter(record);

          setHoveredImg({ url: imgUrl, name: record.name });
        },
        onClick: () => {
          getStoreAction(record.type, record.name, category, dispatch);
        },
      })}
    />
  );
}

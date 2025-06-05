import { Flex, Progress } from "antd";

export default function SubCategoryLabel({
  title,
  percent,
}: {
  title: string;
  percent: number;
}) {
  return (
    <Flex align="center" gap={10}>
      <span style={{ fontSize: 30, flex: 1 }}>{title}</span>
      <span style={{ flex: 0.2, fontSize: 20, marginTop: 7 }}>0/123</span>
      <Progress percent={percent} style={{ flex: 3, fontSize: 20 }} />
    </Flex>
  );
}

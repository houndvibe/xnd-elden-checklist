import { Flex, Progress } from "antd";

export default function SubCategoryLabel({
  title,
  percent,
  pieces,
}: {
  title: string;
  percent: number;
  pieces: string;
}) {
  return (
    <Flex align="center" gap={10}>
      <span style={{ fontSize: 30, flex: 1 }}>{title}</span>
      <span style={{ flex: 0.2, fontSize: 20, marginTop: 7 }}>{pieces}</span>
      <Progress percent={percent} style={{ flex: 3, fontSize: 20 }} />
    </Flex>
  );
}

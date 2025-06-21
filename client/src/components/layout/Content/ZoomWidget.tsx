import { Button, Flex } from "antd";
import { ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";

export default function ZoomWidget() {
  const zoomIn = () => window.electronAPI?.zoom?.(1);
  const zoomOut = () => window.electronAPI?.zoom?.(-1);
  const resetZoom = () => window.electronAPI?.zoom?.(0);

  return (
    <Flex justify="center" align="center" gap={2}>
      <>Zoom</>
      <Button type="text" size="small" onClick={zoomIn}>
        <ZoomInOutlined />
      </Button>
      <span>/</span>
      <Button type="text" size="small" onClick={zoomOut}>
        <ZoomOutOutlined />
      </Button>
      <span>/</span>
      <Button type="text" size="small" onClick={resetZoom}>
        default
      </Button>
    </Flex>
  );
}

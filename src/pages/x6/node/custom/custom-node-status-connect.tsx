import { Tooltip } from "antd";

//   const isConnected = (node.model?.getConnectedEdges(node)!).length > 0;

export function NodeSatatusConnect({ isConnected } = { isConnected: false }) {
  const clsColor = isConnected ? 'bg-green-600' : 'bg-red-600';
  const tips = isConnected ? '已连接' : '未连接';
  return (
    <Tooltip title={tips}>
      <div className={'rounded-full w-3 h-3 ' + clsColor}></div>
    </Tooltip>
  );
}

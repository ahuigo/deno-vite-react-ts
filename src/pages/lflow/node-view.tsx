import LogicFlow from "@logicflow/core";
import { useEffect, useRef } from "react";
// import { EllipseNode, EllipseNodeModel } from "@logicflow/core";
import '@logicflow/core/es/index.css';
//import "@logicflow/core/dist/style/index.css";
// import "@logicflow/core/dist/style/index.css";




const SilentConfig = {
  isSilentMode: true, // 仅浏览不可编辑
  stopScrollGraph: true, // 禁止鼠标滚动移动画布
  stopMoveGraph: true, // 禁止拖动画布
  stopZoomGraph: true, // 禁止缩放画布
  adjustNodePosition: true, // 允许拖动节点
};

const styleConfig: Partial<LogicFlow.Options> = {
  style: {
    rect: {
      rx: 5,
      ry: 5,
      strokeWidth: 2,
    },
    circle: {
      fill: '#f5f5f5',
      stroke: '#666',
    },
    ellipse: {
      fill: '#dae8fc',
      stroke: '#6c8ebf',
    },
    polygon: {
      fill: '#d5e8d4',
      stroke: '#82b366',
    },
    diamond: {
      fill: '#ffe6cc',
      stroke: '#d79b00',
    },
    text: {
      color: '#b85450',
      fontSize: 12,
    },
  },
};

const graphData = {
  nodes: [
    {
      id: '1',
      type: 'rect',
      x: 100,
      y: 60,
      text: '矩形',
    },
    {
      id: '2',
      type: 'circle',
      x: 300,
      y: 60,
      text: '圆形',
    },
    {
      id: '3',
      type: 'ellipse',
      x: 500,
      y: 60,
      text: '椭圆',
    },
    {
      id: '4',
      type: 'polygon',
      x: 100,
      y: 200,
      text: '多边形',
    },
    {
      id: '5',
      type: 'diamond',
      x: 300,
      y: 200,
      text: '菱形',
    },
    {
      id: '6',
      type: 'text',
      x: 500,
      y: 200,
      text: '纯文本节点',
    },
    {
      id: '7',
      type: 'html',
      x: 100,
      y: 320,
      text: 'html节点',
    },
  ],
};
const graphData1 = {
  nodes: [
    {
      id: '1',
      type: 'rect',
      x: 100,
      y: 60,
      text: '矩形',
    },
    {
      id: '2',
      type: 'circle',
      x: 300,
      y: 60,
      text: '圆形',
    },
    {
      id: '3',
      type: 'ellipse',
      x: 500,
      y: 60,
      text: '椭圆',
    },
    {
      id: '4',
      type: 'polygon',
      x: 100,
      y: 200,
      text: '多边形',
    },
    {
      id: '5',
      type: 'diamond',
      x: 300,
      y: 200,
      text: '菱形',
    },
    {
      id: '6',
      type: 'text',
      x: 500,
      y: 200,
      text: '纯文本节点',
    },
    {
      id: '7',
      type: 'html',
      x: 100,
      y: 320,
      text: 'html节点',
    },
  ],
  edges: [
    {
      id: "edge_id",
      type: "polyline",
      sourceNodeId: "node_id_1",
      targetNodeId: "node_id_2",
      text: { x: 139, y: 200, value: "连线28" },
      // startPoint: { x: 100, y: 140 },
      // endPoint: { x: 200, y: 250 },
      // pointsList: [
      //   { x: 100, y: 140 },
      //   { x: 100, y: 200 },
      //   { x: 200, y: 200 },
      //   { x: 200, y: 250 },
      // ],
      properties: {},
    },
  ],
};
export default function App() {
  const refContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const lf = new LogicFlow({
      container: refContainer.current!,
      grid: true,
      width: 1000,
      height: 500,
      ...SilentConfig,
      ...styleConfig,
    });
    lf.render(graphData);
    lf.translateCenter();
  }, []);
  return <div>
    <style>
      {`#container {
        width: 1000px;
      height: 500px;`
      }
    </style>
    <div className="App" ref={refContainer}></div>;
  </div>;
}

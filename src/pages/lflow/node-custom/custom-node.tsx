import LogicFlow from "@logicflow/core";
import '@logicflow/core/es/index.css';
import { useEffect, useRef } from "react";
import CustomEllipse from "./custom-ellipse";
import CustomCircle from "./custom-circle";
import CustomPolygon from "./custom-polygon";
import CustomDiamond from "./custom-diamond";
import CustomRect from "./custom-rect";

const data = {
  nodes: [
    {
      id: 'node_id_1',
      type: 'custom-circle',
      x: 100,
      y: 60,
      text: '自定义圆形',
    },
    {
      id: 'node_id_2',
      type: 'custom-ellipse',
      x: 300,
      y: 60,
      text: '自定义椭圆',
    },
    {
      id: 'node_id_4',
      type: 'custom-diamond',
      x: 500,
      y: 60,
      text: '自定义菱形',
    },
    {
      id: 'node_id_3',
      type: 'custom-polygon',
      x: 110,
      y: 220,
      text: '自定义多边形',
    },
    {
      id: 'node_id_5',
      type: 'custom-rect',
      x: 350,
      y: 220,
      text: '自定义矩形',
    },
  ],
  edges: [],
};
const SilentConfig = {
  isSilentMode: true,
  stopScrollGraph: true,
  stopMoveGraph: true,
  stopZoomGraph: true,
  adjustNodePosition: true,
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
    });
    // 注册自定义节点
    lf.register(CustomEllipse);
    lf.register(CustomCircle);
    lf.register(CustomPolygon);
    lf.register(CustomDiamond);
    lf.register(CustomRect);
    lf.render(data);
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

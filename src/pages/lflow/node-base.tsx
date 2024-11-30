import LogicFlow from "@logicflow/core";
import '@logicflow/core/es/index.css';
import { useEffect, useRef } from "react";
// import { EllipseNode, EllipseNodeModel } from "@logicflow/core";

const graphData = {
  nodes: [
    {
      id: "node_id_1",
      type: "rect",
      x: 100,
      y: 100,
      text: { x: 100, y: 100, value: "节点1" },
      properties: {},
    },
    {
      id: "node_id_2",
      type: "circle",
      x: 200,
      y: 300,
      text: { x: 300, y: 300, value: "节点2" },
      properties: {},
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

import LogicFlow from "@logicflow/core";
// import "@logicflow/core/dist/style/index.css";
import '@logicflow/core/es/index.css';
import { useEffect, useRef } from "react";
import { RectNode, RectNodeModel } from "@logicflow/core";

class UserTaskModel extends RectNodeModel {
  getNodeStyle() {
    // 1.重写节点的样式属性
    const style = super.getNodeStyle();
    style.strokeDasharray = "3 3";
    const properties = this.properties;
    if (properties.statu === "pass") {
      style.stroke = "green";
    } else if (properties.statu === "reject") {
      style.stroke = "red";
    } else {
      style.stroke = "rgb(24, 125, 255)";
    }
    return style;
  }
  initNodeData(data: any) {
    super.initNodeData(data);
    // 2. 设置节点的形状属性: 使用setAttributes　or　initNodeData
    this.width = 200;
    this.height = 90;
    this.radius = 50;
  }
}

class UserTaskView extends RectNode { }

const UserTaskNode = {
  type: "UserTaskNode",
  view: UserTaskView,// 定义节点的视图: getShape, getLabelShape
  /**
  定义节点的数据模型: 
  1. style
  2. data: 
  3. 形状属性：width/height
   */
  model: UserTaskModel,
};
const graphData = {
  nodes: [
    {
      id: "node_id_1",
      type: "UserTaskNode",
      x: 100,
      y: 100,
      text: { x: 100, y: 100, value: "节点1" },
      properties: {
        statu: "reject",
      },
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
    // 注册自定义节点
    lf.register(UserTaskNode);
    lf.render(graphData);
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
